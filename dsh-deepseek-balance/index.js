/**
 * DeepSeek API balance monitor — Host half.
 *
 * Resolves the official DeepSeek API key from the Host credential store on every
 * refresh, calls GET https://api.deepseek.com/user/balance, and exposes the
 * normalized snapshot on one read-only same-origin route. The browser half polls
 * that route; the route itself caches for a few seconds so a page reopen or a
 * second tab never multiplies upstream traffic.
 */

const DEFAULTS = Object.freeze({
  apiKeyEnv: 'DEEPSEEK_API_KEY',
  baseUrl: 'https://api.deepseek.com',
  refreshIntervalMs: 5000,
  minIntervalMs: 2000,
  timeoutMs: 15000,
  historyLimit: 720,
})

const ROUTE_PATH = '/dsh-deepseek-balance/snapshot.json'

function clampInt(value, fallback, min, max) {
  const number = Number(value)
  if (!Number.isFinite(number)) return fallback
  return Math.min(max, Math.max(min, Math.round(number)))
}

function normalizeBaseUrl(value) {
  const url = new URL(String(value || DEFAULTS.baseUrl))
  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    throw new Error('baseUrl must be an http(s) URL')
  }
  url.search = ''
  url.hash = ''
  url.pathname = url.pathname.replace(/\/+$/, '')
  return url.toString().replace(/\/+$/, '')
}

function balanceEndpoint(baseUrl) {
  const url = new URL(baseUrl)
  url.pathname = `${url.pathname.replace(/\/+$/, '')}/user/balance`
  return url.toString()
}

function resolveSettings(config) {
  const raw = config && typeof config === 'object' ? config : {}
  const baseUrl = normalizeBaseUrl(raw.baseUrl)
  const refreshIntervalMs = clampInt(raw.refreshIntervalMs, DEFAULTS.refreshIntervalMs, 5000, 300000)
  return {
    apiKeyEnv: typeof raw.apiKeyEnv === 'string' && raw.apiKeyEnv.trim() ? raw.apiKeyEnv.trim() : DEFAULTS.apiKeyEnv,
    baseUrl,
    endpoint: balanceEndpoint(baseUrl),
    refreshIntervalMs,
    minIntervalMs: clampInt(raw.minIntervalMs, DEFAULTS.minIntervalMs, 1000, Math.min(60000, refreshIntervalMs)),
    timeoutMs: clampInt(raw.timeoutMs, DEFAULTS.timeoutMs, 1000, 60000),
    historyLimit: clampInt(raw.historyLimit, DEFAULTS.historyLimit, 20, 2000),
  }
}

function codedError(code, message, detail) {
  const error = new Error(message)
  error.code = code
  if (detail !== undefined) error.detail = detail
  return error
}

function numberFrom(value) {
  const number = Number(value)
  return Number.isFinite(number) ? number : null
}

function parsePlatformSummary(json) {
  const biz = json && json.data && json.data.biz_data
  if (!biz) return { totalCost: null }
  const totalCost = Array.isArray(biz.total_costs)
    ? biz.total_costs
        .map((entry) => ({ currency: String(entry.currency || 'CNY'), amount: Number(entry.amount) }))
        .filter((entry) => Number.isFinite(entry.amount))
    : null
  return { totalCost }
}

function parsePlatformCost(json) {
  const biz = json && json.data && json.data.biz_data
  if (!biz || !Array.isArray(biz.data)) return null
  const totals = new Map()
  for (const entry of biz.data) {
    if (!entry) continue
    const currency = String(entry.currency || 'CNY')
    let amount = 0
    for (const group of [entry.series, entry.function_series]) {
      if (!Array.isArray(group)) continue
      for (const series of group) {
        for (const bucket of (series && series.buckets) || []) {
          const value = Number(bucket && bucket.cost)
          if (Number.isFinite(value)) amount += value
        }
      }
    }
    totals.set(currency, (totals.get(currency) || 0) + amount)
  }
  return [...totals].map(([currency, amount]) => ({ currency, amount }))
}

function parsePlatformAmount(json) {
  const biz = json && json.data && json.data.biz_data
  if (!biz) return null
  let requests = 0
  let tokens = 0
  for (const group of [biz.series, biz.function_series]) {
    if (!Array.isArray(group)) continue
    for (const series of group) {
      for (const bucket of (series && series.buckets) || []) {
        const usage = bucket && bucket.usage
        if (!usage) continue
        const request = Number(usage.REQUEST ?? usage.request ?? usage.FUNCTION_CALL ?? usage.functionCall)
        const hit = Number(usage.PROMPT_CACHE_HIT_TOKEN ?? usage.promptCacheHitToken)
        const miss = Number(usage.PROMPT_CACHE_MISS_TOKEN ?? usage.promptCacheMissToken)
        const response = Number(usage.RESPONSE_TOKEN ?? usage.responseToken)
        if (Number.isFinite(request)) requests += request
        if (Number.isFinite(hit)) tokens += hit
        if (Number.isFinite(miss)) tokens += miss
        if (Number.isFinite(response)) tokens += response
      }
    }
  }
  return { requests, tokens }
}

function normalizeBalance(json) {
  if (!json || typeof json !== 'object' || Array.isArray(json)) {
    throw codedError('invalid-response', 'The balance response is not a JSON object')
  }
  const infos = Array.isArray(json.balance_infos) ? json.balance_infos : []
  const balances = []
  for (const info of infos) {
    if (!info || typeof info !== 'object') continue
    const total = info.total_balance === undefined || info.total_balance === null ? '0' : String(info.total_balance)
    balances.push({
      currency: typeof info.currency === 'string' && info.currency ? info.currency : 'CNY',
      total,
      granted: info.granted_balance === undefined || info.granted_balance === null ? '0' : String(info.granted_balance),
      toppedUp: info.topped_up_balance === undefined || info.topped_up_balance === null ? '0' : String(info.topped_up_balance),
      totalNumber: numberFrom(total),
    })
  }
  if (balances.length === 0) {
    throw codedError('invalid-response', 'The balance response contains no balance_infos')
  }
  const primary = balances.find((entry) => entry.currency === 'CNY') || balances[0]
  return {
    isAvailable: typeof json.is_available === 'boolean' ? json.is_available : null,
    balances,
    primary,
  }
}

export const inject = ['webServer']

export function apply(ctx, config) {
  const settings = resolveSettings(config)
  const webServer = ctx.get('webServer')
  if (!webServer || typeof webServer.register !== 'function') {
    console.warn('[deepseek-balance] webServer is unavailable; the balance route was not registered')
    return
  }
  const credentials = ctx.get('credentials')

  let disposed = false
  let lastAttempt = 0
  let inFlight = null
  let cachedPayload = null
  let lastGood = null
  let lastError = null
  let lastLoggedError = ''
  let history = []

  // Local model-request counter. The official balance endpoint exposes no
  // request history, so this is the only honest "API request count" available.
  const requests = {
    total: 0,
    deepseek: 0,
    byProvider: Object.create(null),
    startedAt: Date.now(),
    lastAt: 0,
  }

  function recordModelRequest(options) {
    const provider = options && typeof options.provider === 'string' && options.provider
      ? options.provider
      : 'unknown'
    requests.total += 1
    requests.lastAt = Date.now()
    requests.byProvider[provider] = (requests.byProvider[provider] || 0) + 1
    if (provider.toLowerCase().includes('deepseek')) requests.deepseek += 1
  }

  function requestSnapshot() {
    return {
      total: requests.total,
      deepseek: requests.deepseek,
      byProvider: { ...requests.byProvider },
      startedAt: requests.startedAt,
      lastAt: requests.lastAt,
    }
  }

  let consumptionSeq = 0
  const consumptionEvents = []

  // Other vendors expose no common balance API. OpenRouter has a stable one and
  // is built in; any other endpoint can be mapped through the provider config
  // posted by the settings page.
  const BUILTIN_PROVIDERS = [
    {
      id: 'openrouter',
      label: 'OpenRouter',
      match: 'openrouter',
      url: 'https://openrouter.ai/api/v1/credits',
      credentialEnv: 'OPENROUTER_API_KEY',
      authHeader: 'Authorization',
      authPrefix: 'Bearer ',
      balancePath: 'data.total_credits',
      usagePath: 'data.total_usage',
      currency: 'USD',
      inputPrice: null,
      outputPrice: null,
      timeoutMs: 12000,
    },
  ]
  let customProviders = []
  let providerConfigError = null
  let providerBalances = []
  let providerBalanceFetchedAt = 0
  let providerBalanceLastAttempt = 0
  let providerBalanceInFlight = null
  const providerUsage = Object.create(null)

  function readJsonPath(value, path) {
    if (!path) return value
    return String(path)
      .split('.')
      .reduce((current, key) => (current === null || current === undefined ? undefined : current[key]), value)
  }

  function normalizeProviderConfig(input, index) {
    if (!input || typeof input !== 'object') return null
    const id = String(input.id || `provider-${index + 1}`).trim().slice(0, 40)
    const label = String(input.label || id).trim().slice(0, 60)
    const match = String(input.match || id).trim().toLowerCase()
    const url = String(input.url || '').trim()
    const balancePath = String(input.balancePath || '').trim()
    if (!/^https?:\/\//i.test(url) || !balancePath) return null
    return {
      id,
      label,
      match,
      url,
      credentialEnv: String(input.credentialEnv || '').trim(),
      authHeader: String(input.authHeader || 'Authorization').trim(),
      authPrefix: typeof input.authPrefix === 'string' ? input.authPrefix : 'Bearer ',
      balancePath,
      usagePath: String(input.usagePath || '').trim(),
      currency: String(input.currency || 'CNY').toUpperCase().slice(0, 3),
      inputPrice: Number.isFinite(Number(input.inputPrice)) ? Number(input.inputPrice) : null,
      outputPrice: Number.isFinite(Number(input.outputPrice)) ? Number(input.outputPrice) : null,
      timeoutMs: Math.min(30000, Math.max(3000, Number(input.timeoutMs) || 12000)),
    }
  }

  function effectiveProviders() {
    const map = new Map()
    for (const provider of BUILTIN_PROVIDERS) map.set(provider.id, provider)
    for (const provider of customProviders) map.set(provider.id, provider)
    return [...map.values()]
  }

  function providerMatches(config, provider) {
    const needle = String(provider || '').toLowerCase()
    const match = String(config.match || '').toLowerCase()
    if (!needle || !match) return false
    return needle === match || needle.startsWith(`${match}/`) || needle.includes(match)
  }

  async function resolveProviderCredential(env) {
    if (!env) return null
    if (credentials && typeof credentials.resolve === 'function') {
      try {
        const resolved = await credentials.resolve(env)
        if (typeof resolved === 'string' && resolved) return resolved
        if (resolved && typeof resolved.value === 'string' && resolved.value) return resolved.value
      } catch {
        /* fall through to the ambient environment */
      }
    }
    const ambient = process.env[env]
    return typeof ambient === 'string' && ambient ? ambient : null
  }

  async function fetchProviderBalances() {
    const results = await Promise.all(
      effectiveProviders().map(async (config) => {
        const secret = config.credentialEnv
          ? await resolveProviderCredential(config.credentialEnv)
          : ''
        if (config.credentialEnv && !secret) {
          return {
            ...config,
            balance: null,
            usage: null,
            status: 'unconfigured',
            error: 'missing credential',
            fetchedAt: Date.now(),
          }
        }
        try {
          const headers = { accept: 'application/json' }
          if (config.authHeader && secret) headers[config.authHeader] = `${config.authPrefix || ''}${secret}`
          const response = await fetch(config.url, {
            headers,
            signal: AbortSignal.timeout(config.timeoutMs),
          })
          if (!response.ok) throw new Error(`HTTP ${response.status}`)
          const json = await response.json()
          const rawBalance = readJsonPath(json, config.balancePath)
          if (rawBalance === null || rawBalance === undefined) throw new Error('balance path not found')
          let balance = Number(rawBalance)
          if (!Number.isFinite(balance)) throw new Error('balance is not a number')
          let usage = null
          if (config.usagePath) {
            const rawUsage = readJsonPath(json, config.usagePath)
            const parsedUsage = Number(rawUsage)
            if (Number.isFinite(parsedUsage)) {
              usage = parsedUsage
              balance -= parsedUsage
            }
          }
          return { ...config, balance, usage, status: 'ok', error: null, fetchedAt: Date.now() }
        } catch (error) {
          return {
            ...config,
            balance: null,
            usage: null,
            status: 'error',
            error: error && error.message ? String(error.message) : 'provider request failed',
            fetchedAt: Date.now(),
          }
        }
      }),
    )
    providerBalances = results
    providerBalanceFetchedAt = Date.now()
    return results
  }

  function ensureProviderBalances() {
    const now = Date.now()
    if (providerBalanceInFlight) return providerBalanceInFlight
    if (now - providerBalanceLastAttempt < 60000) return Promise.resolve(providerBalances)
    providerBalanceLastAttempt = now
    providerBalanceInFlight = fetchProviderBalances().finally(() => {
      providerBalanceInFlight = null
    })
    return providerBalanceInFlight
  }

  ctx.effect(
    () =>
      ctx.on('llm/stream', (options, next) => {
        try {
          recordModelRequest(options)
        } catch (error) {
          // Counting must never interfere with a model request.
          console.warn('[deepseek-balance] request counter failed:', error && error.message ? error.message : error)
        }
        return trackModelStream(next(), options)
      }),
    'deepseek-balance: model request counter',
  )

  // Platform usage data (today's spend, today's requests, total spend) is not
  // available through the public API key. It is read from the signed-in
  // DeepSeek Platform account session when one exists; otherwise the client
  // falls back to the local sample/counter estimates.
  let platformState = {
    signedIn: false,
    todayCost: null,
    totalCost: null,
    todayRequests: null,
    todayTokens: null,
    fetchedAt: 0,
    error: null,
  }
  let platformLastAttempt = 0
  let platformInFlight = null

  function platformHeaders(session, timezoneOffsetSeconds) {
    const deploymentHeaders = session && session.requestHeaders && typeof session.requestHeaders === 'object'
      ? session.requestHeaders
      : {}
    return {
      accept: 'application/json',
      ...deploymentHeaders,
      'x-dsh-auth-token': session.token,
      'x-client-bundle-id': '',
      'x-client-platform': 'web',
      'x-client-version': '0.2.1-rc.2',
      'x-client-locale': 'zh_CN',
      'x-client-timezone-offset': String(timezoneOffsetSeconds),
    }
  }

  async function fetchPlatformJson(url, headers) {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 12000)
    try {
      let response
      try {
        response = await fetch(url, { method: 'GET', headers, signal: controller.signal })
      } catch (error) {
        if (controller.signal.aborted) throw codedError('platform-timeout', 'The platform request timed out')
        const cause = error && error.cause && error.cause.message ? ` (${error.cause.message})` : ''
        throw codedError('platform-network', `Cannot reach the DeepSeek Platform${cause}`)
      }
      if (response.status === 401 || response.status === 403) {
        throw codedError('platform-unauthorized', 'The DeepSeek Platform session was rejected', `HTTP ${response.status}`)
      }
      if (!response.ok) {
        throw codedError('platform-http', `The DeepSeek Platform returned HTTP ${response.status}`, `HTTP ${response.status}`)
      }
      let json
      try {
        json = await response.json()
      } catch (error) {
        throw codedError('platform-invalid', 'The DeepSeek Platform returned a non-JSON body')
      }
      if (json && typeof json.code === 'number' && json.code !== 0) {
        const code = json.code === 40002 || json.code === 40003 ? 'platform-unauthorized' : 'platform-api'
        throw codedError(code, typeof json.msg === 'string' ? json.msg : `Platform code ${json.code}`, String(json.code))
      }
      return json
    } finally {
      clearTimeout(timer)
    }
  }

  async function fetchPlatformUsage() {
    const now = Date.now()
    const empty = {
      signedIn: false,
      todayCost: null,
      totalCost: null,
      todayRequests: null,
      todayTokens: null,
      fetchedAt: now,
      error: null,
    }
    const account = ctx.get('deepseekAccount')
    if (!account || typeof account.getPlatformSession !== 'function') return empty

    let session
    try {
      session = await account.getPlatformSession()
    } catch (error) {
      return {
        ...empty,
        error: { code: 'platform-session', message: error && error.message ? String(error.message) : 'Platform session read failed' },
      }
    }
    if (!session || typeof session.token !== 'string' || !session.token) return empty

    const origin = (typeof session.origin === 'string' && session.origin
      ? session.origin
      : 'https://platform.deepseek.com').replace(/\/+$/, '')
    const timezoneOffsetSeconds = -new Date().getTimezoneOffset() * 60
    const hourOffset = 3600 * Math.floor(timezoneOffsetSeconds / 3600)
    const remainder = timezoneOffsetSeconds - hourOffset
    const startDate = new Date()
    startDate.setHours(0, 0, 0, 0)
    const start = Math.floor(startDate.getTime() / 1000) + remainder
    // The Platform usage API expects a full-day window: start = local midnight,
    // end = next local midnight. A partial `end` (now) returns INVALID_PARAM.
    const end = start + 86400
    const headers = platformHeaders(session, timezoneOffsetSeconds)
    const query = `start=${start}&end=${end}&tz=${hourOffset}`

    const [summaryResult, costResult, amountResult] = await Promise.allSettled([
      fetchPlatformJson(`${origin}/api/v0/users/get_user_summary`, headers),
      fetchPlatformJson(`${origin}/api/v0/usage/by_api_key/cost?${query}`, headers),
      fetchPlatformJson(`${origin}/api/v0/usage/by_api_key/amount?${query}`, headers),
    ])

    const errors = []
    for (const result of [summaryResult, costResult, amountResult]) {
      if (result.status === 'rejected' && result.reason) errors.push(result.reason)
    }
    if (errors.some((error) => error.code === 'platform-unauthorized')) {
      return {
        ...empty,
        fetchedAt: now,
        error: { code: 'platform-unauthorized', message: 'The DeepSeek Platform session was rejected; sign in again to read official usage.' },
      }
    }

    const summary = summaryResult.status === 'fulfilled' ? parsePlatformSummary(summaryResult.value) : null
    const todayCost = costResult.status === 'fulfilled' ? parsePlatformCost(costResult.value) : null
    const amount = amountResult.status === 'fulfilled' ? parsePlatformAmount(amountResult.value) : null
    const firstError = errors[0]

    return {
      signedIn: true,
      todayCost,
      totalCost: summary ? summary.totalCost : null,
      todayRequests: amount ? amount.requests : null,
      todayTokens: amount ? amount.tokens : null,
      fetchedAt: now,
      error: firstError
        ? {
            code: firstError.code || 'platform-error',
            message: firstError.message ? String(firstError.message) : 'Platform request failed',
          }
        : null,
    }
  }

  function ensurePlatform() {
    const now = Date.now()
    if (platformInFlight) return platformInFlight
    if (now - platformLastAttempt < 30000) return Promise.resolve(platformState)
    platformLastAttempt = now
    platformInFlight = fetchPlatformUsage()
      .then((state) => {
        platformState = state
        return state
      })
      .catch((error) => {
        platformState = {
          ...platformState,
          fetchedAt: now,
          error: {
            code: error && error.code ? error.code : 'platform-error',
            message: error && error.message ? String(error.message) : 'Platform request failed',
          },
        }
        return platformState
      })
      .finally(() => {
        platformInFlight = null
      })
    return platformInFlight
  }

  function resolveAgentName(options) {
    try {
      const sessions = ctx.get('sessions')
      const titles = ctx.get('sessionTitle')
      const session = options && options.sessionId && sessions && typeof sessions.get === 'function'
        ? sessions.get(options.sessionId)
        : undefined
      if (session) {
        const title = titles && typeof titles.get === 'function' ? titles.get(session) : undefined
        if (title && typeof title.title === 'string' && title.title.trim()) return title.title.trim()
        const header = session.header
        if (header && header.origin === 'subagent') return '子智能体'
        if (header && typeof header.agentPreset === 'string' && header.agentPreset) return header.agentPreset
      }
    } catch {
      /* name resolution must never break a stream */
    }
    if (options && options.purpose === 'session-title') return '会话标题生成'
    if (options && options.purpose === 'compaction') return '上下文压缩'
    return (options && (options.model || options.provider)) || '智能体'
  }

  function averageCostPerToken(currency) {
    const platform = platformState
    if (!platform || !Array.isArray(platform.todayCost) || platform.todayTokens == null) return null
    const entry = platform.todayCost.find((item) => item && item.currency === currency)
    const cost = entry ? Number(entry.amount) : null
    const tokens = Number(platform.todayTokens)
    if (!Number.isFinite(cost) || !Number.isFinite(tokens) || tokens <= 0) return null
    return cost / tokens
  }

  // DeepSeek official CNY prices per 1M tokens, off-peak. Peak hours double.
  const DEEPSEEK_PRICES_CNY = {
    flash: { hit: 0.02, miss: 1, output: 4 },
    pro: { hit: 0.15, miss: 4.5, output: 13.5 },
  }

  function isDeepSeekPeak(date) {
    try {
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Shanghai',
        weekday: 'short',
        hour: '2-digit',
        hourCycle: 'h23',
      }).formatToParts(date)
      const value = (type) => {
        const part = parts.find((item) => item.type === type)
        return part ? part.value : ''
      }
      const weekday = value('weekday')
      const hour = Number(value('hour'))
      const weekdayPeak = weekday !== 'Sat' && weekday !== 'Sun'
      return weekdayPeak && ((hour >= 9 && hour < 12) || (hour >= 14 && hour < 18))
    } catch {
      return false
    }
  }

  function estimateConsumptionCost(model, usage, at) {
    const name = String(model || '').toLowerCase()
    if (!name) return null
    const prices = name.includes('pro') || name.includes('reasoner')
      ? DEEPSEEK_PRICES_CNY.pro
      : name.includes('flash') || name.includes('vision') || name.includes('chat')
        ? DEEPSEEK_PRICES_CNY.flash
        : null
    if (!prices) return null
    const hit = Number(usage.cacheReadTokens) || 0
    const miss = (Number(usage.inputTokens) || 0) + (Number(usage.cacheWriteTokens) || 0)
    const output = Number(usage.outputTokens) || 0
    const multiplier = isDeepSeekPeak(new Date(at)) ? 2 : 1
    return ((hit * prices.hit + miss * prices.miss + output * prices.output) * multiplier) / 1e6
  }

  function recordConsumption(options, usage) {
    if (!usage) return
    const totalTokens = Number(usage.totalTokens)
    const inputTokens = Number(usage.inputTokens)
    const outputTokens = Number(usage.outputTokens)
    const tokens = Number.isFinite(totalTokens) && totalTokens > 0
      ? totalTokens
      : (Number.isFinite(inputTokens) ? inputTokens : 0) + (Number.isFinite(outputTokens) ? outputTokens : 0)
    if (!Number.isFinite(tokens) || tokens <= 0) return

    const provider = options && options.provider ? String(options.provider) : 'unknown'
    const model = options && options.model ? String(options.model) : null
    const isDeepSeek = /deepseek/i.test(provider)
    const config = effectiveProviders().find((item) => providerMatches(item, provider)) || null
    const providerBalance = !isDeepSeek
      ? providerBalances.find((item) => providerMatches(item, provider))
      : null
    const balance = isDeepSeek
      ? (lastGood && lastGood.primary && Number.isFinite(lastGood.primary.totalNumber)
        ? lastGood.primary.totalNumber
        : null)
      : (providerBalance && Number.isFinite(providerBalance.balance) ? providerBalance.balance : null)
    const currency = isDeepSeek
      ? ((lastGood && lastGood.primary && lastGood.primary.currency) || 'CNY')
      : ((providerBalance && providerBalance.currency) || (config && config.currency) || 'CNY')

    let cost = null
    if (isDeepSeek) {
      const perToken = averageCostPerToken(currency)
      const priced = currency === 'CNY'
        ? estimateConsumptionCost(model, usage, Date.now())
        : null
      cost = priced !== null ? priced : (perToken !== null ? tokens * perToken : null)
    } else if (config && (config.inputPrice !== null || config.outputPrice !== null)) {
      const input = (Number(usage.inputTokens) || 0) + (Number(usage.cacheReadTokens) || 0) + (Number(usage.cacheWriteTokens) || 0)
      const output = Number(usage.outputTokens) || 0
      cost = ((input * (config.inputPrice || 0)) + (output * (config.outputPrice || 0))) / 1e6
    }

    const providerLabel = (config && config.label) || provider
    const agent = resolveAgentName(options)
    const now = Date.now()
    const stat = providerUsage[provider] || {
      provider,
      label: providerLabel,
      currency,
      tokens: 0,
      cost: 0,
      costKnown: false,
      requests: 0,
      lastAt: 0,
    }
    stat.label = providerLabel
    stat.currency = currency
    stat.tokens += tokens
    stat.requests += 1
    stat.lastAt = now
    if (cost !== null) {
      stat.cost += cost
      stat.costKnown = true
    }
    providerUsage[provider] = stat

    consumptionSeq += 1
    consumptionEvents.push({
      id: consumptionSeq,
      at: now,
      agent,
      model,
      provider,
      providerLabel,
      tokens,
      cost,
      currency,
      balance,
    })
    if (consumptionEvents.length > 50) consumptionEvents.shift()
  }

  async function* trackModelStream(stream, options) {
    let usage = null
    try {
      for await (const chunk of stream) {
        if (chunk && chunk.usage) usage = chunk.usage
        yield chunk
      }
    } finally {
      try {
        recordConsumption(options, usage)
      } catch (error) {
        console.warn('[deepseek-balance] consumption record failed:', error && error.message ? error.message : error)
      }
    }
  }

  async function resolveApiKey() {
    if (credentials && typeof credentials.resolve === 'function') {
      try {
        const resolved = await credentials.resolve(settings.apiKeyEnv)
        if (resolved && typeof resolved.value === 'string' && resolved.value.trim()) {
          return {
            key: resolved.value.trim(),
            source: typeof resolved.source === 'string' ? resolved.source : 'credential store',
          }
        }
      } catch (error) {
        console.warn('[deepseek-balance] credential resolution failed:', error && error.message ? error.message : error)
      }
    }
    const ambient = process.env[settings.apiKeyEnv]
    if (typeof ambient === 'string' && ambient.trim()) {
      return { key: ambient.trim(), source: 'environment' }
    }
    return null
  }

  async function fetchBalance() {
    const keyInfo = await resolveApiKey()
    if (!keyInfo) {
      throw codedError(
        'credential-missing',
        `No API key is configured for ${settings.apiKeyEnv}`,
        settings.apiKeyEnv,
      )
    }

    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), settings.timeoutMs)
    try {
      let response
      try {
        response = await fetch(settings.endpoint, {
          method: 'GET',
          headers: {
            authorization: `Bearer ${keyInfo.key}`,
            accept: 'application/json',
          },
          signal: controller.signal,
        })
      } catch (error) {
        if (controller.signal.aborted) {
          throw codedError('timeout', `The balance request timed out after ${settings.timeoutMs}ms`)
        }
        const cause = error && error.cause && error.cause.message ? ` (${error.cause.message})` : ''
        throw codedError('network', `Cannot reach ${new URL(settings.endpoint).host}${cause}`)
      }

      if (response.status === 401 || response.status === 403) {
        throw codedError('unauthorized', 'The DeepSeek API key was rejected', `HTTP ${response.status}`)
      }
      if (!response.ok) {
        throw codedError('http-error', `The official API returned HTTP ${response.status}`, `HTTP ${response.status}`)
      }

      let json
      try {
        json = await response.json()
      } catch (error) {
        throw codedError('invalid-response', 'The official API returned a non-JSON body')
      }

      const parsed = normalizeBalance(json)
      return {
        ...parsed,
        credential: { ref: settings.apiKeyEnv, source: keyInfo.source },
      }
    } finally {
      clearTimeout(timer)
    }
  }

  function buildPayload(ok) {
    return {
      ok,
      stale: !ok && Boolean(lastGood),
      source: 'official-api',
      endpoint: settings.endpoint,
      endpointHost: new URL(settings.endpoint).host,
      refreshIntervalMs: settings.refreshIntervalMs,
      serverTime: Date.now(),
      data: lastGood,
      error: ok ? null : lastError,
      history,
      requests: requestSnapshot(),
      events: consumptionEvents,
      eventSeq: consumptionSeq,
      providerUsage: Object.values(providerUsage),
      providerBalances,
      providerConfigError,
      platform: platformState,
    }
  }

  async function refresh() {
    // Platform usage is optional and slower; never block the balance response.
    void ensurePlatform()
    void ensureProviderBalances()
    try {
      const fresh = await fetchBalance()
      const fetchedAt = Date.now()
      if (lastGood && lastGood.primary.currency !== fresh.primary.currency) history = []
      if (fresh.primary.totalNumber !== null) {
        history.push({ t: fetchedAt, v: fresh.primary.totalNumber })
        if (history.length > settings.historyLimit) history = history.slice(-settings.historyLimit)
      }
      lastGood = {
        ...fresh,
        fetchedAt,
        fetchedAtIso: new Date(fetchedAt).toISOString(),
      }
      lastError = null
      lastLoggedError = ''
      return buildPayload(true)
    } catch (error) {
      const code = typeof error.code === 'string' ? error.code : 'unknown'
      lastError = {
        code,
        detail: typeof error.detail === 'string' ? error.detail : undefined,
        message: error && error.message ? String(error.message) : 'Unknown error',
      }
      const signature = `${code}:${lastError.detail || lastError.message}`
      if (signature !== lastLoggedError) {
        lastLoggedError = signature
        console.warn(`[deepseek-balance] ${code}: ${lastError.message}`)
      }
      return buildPayload(false)
    }
  }

  function getSnapshot() {
    if (inFlight) return inFlight
    const now = Date.now()
    if (cachedPayload && now - lastAttempt < settings.minIntervalMs) return Promise.resolve(cachedPayload)
    lastAttempt = now
    inFlight = refresh()
      .then((payload) => {
        if (!disposed) cachedPayload = payload
        return payload
      })
      .finally(() => {
        inFlight = null
      })
    return inFlight
  }

  const providerRoute = {
    kind: 'exact',
    path: '/dsh-deepseek-balance/providers',
    async handler(req, res) {
      if (req.method !== 'POST') {
        res.writeHead(405, { allow: 'POST', 'content-type': 'text/plain; charset=utf-8' })
        res.end('Method Not Allowed')
        return
      }
      try {
        let raw = ''
        for await (const chunk of req) {
          raw += chunk
          if (raw.length > 40000) throw new Error('provider config too large')
        }
        const parsed = JSON.parse(raw || '{}')
        const list = Array.isArray(parsed)
          ? parsed
          : parsed && Array.isArray(parsed.providers)
            ? parsed.providers
            : null
        if (!list) throw new Error('providers must be an array')
        const normalized = list.slice(0, 10).map(normalizeProviderConfig).filter(Boolean)
        customProviders = normalized
        providerConfigError = normalized.length === list.length
          ? null
          : '部分厂商配置无效，已忽略'
        providerBalanceLastAttempt = 0
        const balances = await ensureProviderBalances()
        const body = JSON.stringify({
          ok: true,
          providers: normalized,
          balances,
          error: providerConfigError,
        })
        res.writeHead(200, {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, max-age=0',
          'content-length': Buffer.byteLength(body),
        })
        res.end(body)
      } catch (error) {
        const body = JSON.stringify({
          ok: false,
          error: error && error.message ? String(error.message) : 'invalid provider config',
        })
        res.writeHead(400, {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, max-age=0',
          'content-length': Buffer.byteLength(body),
        })
        res.end(body)
      }
    },
  }

  const route = {
    kind: 'exact',
    path: ROUTE_PATH,
    async handler(req, res) {
      if (req.method !== 'GET' && req.method !== 'HEAD') {
        res.writeHead(405, { allow: 'GET, HEAD', 'content-type': 'text/plain; charset=utf-8' })
        res.end('Method Not Allowed')
        return
      }
      let payload
      try {
        payload = await getSnapshot()
      } catch (error) {
        payload = {
          ok: false,
          stale: false,
          source: 'official-api',
          endpoint: settings.endpoint,
          serverTime: Date.now(),
          data: null,
          error: { code: 'unknown', message: error && error.message ? String(error.message) : 'Unknown error' },
          history: [],
          requests: requestSnapshot(),
          events: consumptionEvents,
          eventSeq: consumptionSeq,
          providerUsage: Object.values(providerUsage),
          providerBalances,
          providerConfigError,
          platform: platformState,
        }
      }
      const body = JSON.stringify(payload)
      res.writeHead(200, {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'no-store, max-age=0',
        'x-content-type-options': 'nosniff',
        'content-length': Buffer.byteLength(body),
      })
      if (req.method === 'HEAD') res.end()
      else res.end(body)
    },
  }

  ctx.effect(() => {
    disposed = false
    const disposeRoute = webServer.register(route)
    const disposeProviderRoute = webServer.register(providerRoute)
    return () => {
      disposed = true
      cachedPayload = null
      disposeRoute()
      disposeProviderRoute()
    }
  }, 'deepseek-balance: snapshot route')
}
