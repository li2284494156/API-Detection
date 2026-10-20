window.__ModuleLoader__.load({
  id: 'dsh-deepseek-balance',
  factory(require) {
    const React = require('react')
    const h = React.createElement
    const Fragment = React.Fragment

    const NS = 'api-detection'
    const ROUTE = '/dsh-deepseek-balance/snapshot.json'
    const SETTINGS_KEY = 'dsh.api-detection.settings.v1'
    const DEFAULT_INTERVAL_SECONDS = 5
    const SYMBOLS = { CNY: '¥', USD: '$' }

    const DICT = {
      zh: {
        panelTitle: 'API Detection',
        eyebrow: 'DeepSeek API',
        panelSubtitle: '余额、今日消费与 API 请求',
        total: '账户余额',
        topUp: '充值余额',
        todaySpend: '今日消费',
        todaySpendHint: '登录平台后为官方数据；未登录时为本地余额采样估算',
        localEstimate: '本地估算',
        official: '官方',
        requests: 'API 申请次数',
        todayRequests: '今日请求',
        requestsDeepSeek: 'DeepSeek 模型',
        requestsAll: '全部模型',
        granted: '赠送余额',
        totalCost: '累计消费',
        todayTokens: '今日 Token',
        todayTokensHint: '官方今日 Token 消耗，需登录 DeepSeek 开放平台',
        tokensNeedLogin: '登录平台后显示',
        available: '账户可用',
        unavailable: '余额不足',
        unknownStatus: '状态未知',
        live: '实时',
        syncing: '同步中',
        offline: '离线',
        collapse: '收起统计',
        expand: '展开统计',
        updatedAgo: '更新于 {time} · {ago}',
        justNow: '刚刚',
        secondsAgo: '{n} 秒前',
        minutesAgo: '{n} 分钟前',
        never: '尚未同步',
        autoSync: '每 {n} 秒自动同步官方接口',
        nextSync: '{n} 秒后同步',
        chart: '余额走势 · 自动采样',
        collecting: '正在采集余额样本…',
        low: '最低',
        high: '最高',
        rangeMinutes: '近 {n} 分钟',
        rangeHours: '近 {n} 小时',
        errorTitle: '同步失败',
        staleTitle: '官方接口暂时不可用',
        staleNote: '当前显示上一次成功同步的数据',
        lastSuccess: '上次成功：{time}',
        errCredentialMissing: '未找到 DEEPSEEK_API_KEY',
        errCredentialMissingHint: '请在「设置 → 模型 → DeepSeek」中填写 API Key，保存后会自动生效，无需重启。',
        errUnauthorized: 'API Key 无效或已失效',
        errNetwork: '无法连接 DeepSeek 官方接口',
        errTimeout: '连接官方接口超时',
        errInvalid: '官方接口返回了无法识别的数据',
        errHttp: '官方接口返回错误',
        errClient: '无法读取本地余额服务',
        errUnknown: '未知错误',
        sourceLabel: '数据源',
        officialSource: 'DeepSeek 开放平台',
        otherCurrencies: '其他币种',
        loading: '正在读取余额…',
        platformSignedOut: '平台未登录 · 今日消费/请求为本地估算',
        platformError: '平台官方数据暂时不可用 · 已回退本地估算',
        platformLoginHint: '在 Harness 设置 → 账户中登录 DeepSeek 开放平台后，会自动读取官方余额、今日消费和今日请求；未登录时使用本地估算。',
        settingsSubtitle: '自定义显示内容与刷新频率；预览与下方设置实时联动。',
        autoSaved: '修改即时生效，并保存在本浏览器。',
        sectionDisplay: '显示内容',
        showTotal: '总余额',
        showTotalDesc: '显示账户总余额大数字。',
        showTopUp: '充值余额',
        showTopUpDesc: '显示官方充值余额卡片。',
        showTodaySpend: '今日消费',
        showTodaySpendDesc: '显示今日消费；登录平台后用官方数据，否则用本地采样估算。',
        showRequests: 'API 申请次数',
        showRequestsDesc: '显示今日请求；未登录平台时显示本地本次运行计数。',
        showTokens: '今日 Token',
        showTokensDesc: '显示官方今日 Token 消耗（登录平台后）。',
        showChart: '余额走势',
        showChartDesc: '显示自动采样的余额迷你走势图。',
        showStatus: '可用状态',
        showStatusDesc: '显示官方 is_available 状态标签。',
        showMeta: '数据源与更新时间',
        showMetaDesc: '显示官方数据源、更新时间、今日 Token 和累计消费等明细。',
        showCountdown: '同步倒计时',
        showCountdownDesc: '显示下次自动同步倒计时与进度。',
        showGranted: '赠送余额',
        showGrantedDesc: '显示官方赠送余额卡片。',
        sectionData: '数据与刷新',
        refreshRate: '刷新频率',
        refreshRateDesc: '余额栏与统计界面的自动同步间隔；没有手动刷新按钮。',
        seconds: '{n} 秒',
        requestMode: '本地请求计数口径',
        requestModeDesc: '未登录平台时，本地计数统计 DeepSeek 模型还是全部模型。',
        requestModeDeepSeek: '仅 DeepSeek',
        requestModeAll: '全部模型',
        requestNote: '登录平台后优先显示官方“今日请求”；未登录时使用 Host 本地计数（本次运行）。',
        todaySpendNote: '本地“今日消费”来自余额采样差值，只覆盖余额栏运行期间；登录平台后自动切换为官方今日消费。',
        preview: '实时预览',
        previewHint: '预览会随下方显示项实时变化。',
        previewLinked: '实时联动',
        previewEmpty: '所有显示项已关闭',
        reset: '恢复默认',
        resetDesc: '恢复默认的显示与刷新设置。',
        panelSection: '侧边栏',
        panelLocation: '位置',
        panelLocationDesc: '平时隐藏在工作区左边缘；鼠标移到左侧边缘时滑出，点击展开统计。',
        collapseHint: '展开后侧边栏按钮消失；统计界面右侧的竖线点击可收回。',
        railHint: '鼠标移到这里展开余额栏',
        toastTitle: '“token&余额”消耗提示',
        toastUnknown: '—',
        toastConsumed: '消耗 {tokens} tokens · 余额 {cost} · 剩余 {remaining}',
        largeDropTitle: '余额消耗提醒',
        largeDropBody: '余额下降 {amount}，超过总余额的 10%；当前剩余 {balance}',
        alertsNote: '每次模型消耗会在顶部提示；余额从上次提醒累计下降超过 10% 时，会自动弹出左侧余额栏。',
        providersSection: '其他厂商',
        providersHint: 'OpenRouter 已内置，配置 OPENROUTER_API_KEY 即可读取余额；其他厂商可填写通用余额接口。',
        providersFormat: '字段：id、label、match、url、credentialEnv、balancePath、usagePath、currency、inputPrice、outputPrice。价格按每百万 tokens 填写；输入有效 JSON 后自动应用。',
        providersPlaceholder: '[{"id":"my-provider","label":"My Provider","match":"my-provider","url":"https://example.com/api/balance","credentialEnv":"MY_PROVIDER_KEY","balancePath":"data.balance","currency":"CNY"}]',
        providersUsageNote: '本次运行',
        providersUnconfigured: '未配置密钥',
        providersError: '读取失败',
        endpoint: '官方接口',
        credential: '凭据',
      },
      en: {
        panelTitle: 'API Detection',
        eyebrow: 'DeepSeek API',
        panelSubtitle: 'Balance, today’s spend & API requests',
        total: 'Total balance',
        topUp: 'Top-up',
        todaySpend: 'Today’s spend',
        todaySpendHint: 'Official after platform sign-in; otherwise a local balance-sample estimate',
        localEstimate: 'Local estimate',
        official: 'Official',
        requests: 'API requests',
        todayRequests: 'Requests today',
        requestsDeepSeek: 'DeepSeek models',
        requestsAll: 'All models',
        granted: 'Granted balance',
        totalCost: 'Total spend',
        todayTokens: 'Tokens today',
        todayTokensHint: 'Today’s official token usage; requires DeepSeek Platform sign-in',
        tokensNeedLogin: 'after platform sign-in',
        available: 'Available',
        unavailable: 'Insufficient',
        unknownStatus: 'Unknown',
        live: 'Live',
        syncing: 'Syncing',
        offline: 'Offline',
        collapse: 'Close statistics',
        expand: 'Expand statistics',
        updatedAgo: 'Updated {time} · {ago}',
        justNow: 'just now',
        secondsAgo: '{n}s ago',
        minutesAgo: '{n}m ago',
        never: 'Not synced yet',
        autoSync: 'Auto-syncs with the official API every {n}s',
        nextSync: 'Next sync in {n}s',
        chart: 'Balance trend · auto-sampled',
        collecting: 'Collecting balance samples…',
        low: 'Low',
        high: 'High',
        rangeMinutes: 'Last {n} min',
        rangeHours: 'Last {n} h',
        errorTitle: 'Sync failed',
        staleTitle: 'Official API temporarily unavailable',
        staleNote: 'Showing the last successful sync',
        lastSuccess: 'Last success: {time}',
        errCredentialMissing: 'DEEPSEEK_API_KEY not found',
        errCredentialMissingHint: 'Add an API key in Settings → Models → DeepSeek. It takes effect automatically; no restart is needed.',
        errUnauthorized: 'The API key is invalid or expired',
        errNetwork: 'Cannot reach the official DeepSeek API',
        errTimeout: 'The official API timed out',
        errInvalid: 'The official API returned unexpected data',
        errHttp: 'The official API returned an error',
        errClient: 'Cannot read the local balance service',
        errUnknown: 'Unknown error',
        sourceLabel: 'Source',
        officialSource: 'DeepSeek Platform',
        otherCurrencies: 'Other currencies',
        loading: 'Reading balance…',
        platformSignedOut: 'Platform signed out · today’s spend/requests use local estimates',
        platformError: 'Platform data temporarily unavailable · local estimates in use',
        platformLoginHint: 'Sign in to DeepSeek Platform in Harness Settings → Account to read the official balance, today’s spend and today’s requests. Otherwise local estimates are used.',
        settingsSubtitle: 'Customize visible sections and refresh rate. The preview follows the controls below live.',
        autoSaved: 'Changes apply instantly and are saved in this browser.',
        sectionDisplay: 'Visible sections',
        showTotal: 'Total balance',
        showTotalDesc: 'Show the large total balance figure.',
        showTopUp: 'Top-up balance',
        showTopUpDesc: 'Show the official top-up balance card.',
        showTodaySpend: 'Today’s spend',
        showTodaySpendDesc: 'Show today’s spend; official after platform sign-in, otherwise a local sample estimate.',
        showRequests: 'API requests',
        showRequestsDesc: 'Show requests today; local this-run count when the platform is signed out.',
        showTokens: 'Tokens today',
        showTokensDesc: 'Show today’s official token usage (after platform sign-in).',
        showChart: 'Balance trend',
        showChartDesc: 'Show the auto-sampled balance sparkline.',
        showStatus: 'Availability',
        showStatusDesc: 'Show the official is_available status chip.',
        showMeta: 'Source, time & details',
        showMetaDesc: 'Show the official source, update time, today’s tokens and total spend.',
        showCountdown: 'Sync countdown',
        showCountdownDesc: 'Show the next auto-sync countdown and progress.',
        showGranted: 'Granted balance',
        showGrantedDesc: 'Show the official granted balance card.',
        sectionData: 'Data & refresh',
        refreshRate: 'Refresh rate',
        refreshRateDesc: 'Auto-sync interval for the balance rail and statistics panel; there is no manual refresh button.',
        seconds: '{n}s',
        requestMode: 'Local request counter',
        requestModeDesc: 'When the platform is signed out, count DeepSeek model requests or all model requests.',
        requestModeDeepSeek: 'DeepSeek only',
        requestModeAll: 'All models',
        requestNote: 'After platform sign-in, official “requests today” is preferred; otherwise the Host’s local this-run counter is used.',
        todaySpendNote: 'Local today’s spend comes from balance-sample drops and only covers time while the rail was running. After platform sign-in it switches to official today’s spend.',
        preview: 'Live preview',
        previewHint: 'The preview follows the visible sections below live.',
        previewLinked: 'Live linked',
        previewEmpty: 'All sections are off',
        reset: 'Reset to defaults',
        resetDesc: 'Restore default display and refresh settings.',
        panelSection: 'Sidebar',
        panelLocation: 'Location',
        panelLocationDesc: 'Hidden at the left edge; hover the left edge to slide it out, then click to open statistics.',
        collapseHint: 'The rail disappears when open; click the vertical line on the right of the panel to close it.',
        railHint: 'Hover the left edge to reveal the balance rail',
        toastTitle: '“token & balance” notice',
        toastUnknown: '—',
        toastConsumed: 'Consumed {tokens} tokens · cost {cost} · {remaining} left',
        largeDropTitle: 'Balance alert',
        largeDropBody: 'Balance dropped {amount}, more than 10% of the total; {balance} left',
        alertsNote: 'Each model call shows a top notice; when the balance drops more than 10% cumulatively since the last alert, the left rail slides out automatically.',
        providersSection: 'Other providers',
        providersHint: 'OpenRouter is built in: set OPENROUTER_API_KEY to read its balance. Other vendors can use a generic balance endpoint.',
        providersFormat: 'Fields: id, label, match, url, credentialEnv, balancePath, usagePath, currency, inputPrice, outputPrice. Prices are per 1M tokens; valid JSON applies automatically.',
        providersPlaceholder: '[{"id":"my-provider","label":"My Provider","match":"my-provider","url":"https://example.com/api/balance","credentialEnv":"MY_PROVIDER_KEY","balancePath":"data.balance","currency":"CNY"}]',
        providersUsageNote: 'this run',
        providersUnconfigured: 'No API key',
        providersError: 'Unavailable',
        endpoint: 'Official endpoint',
        credential: 'Credential',
      },
    }

    const CSS = `
.ad-rail-root{position:fixed;left:0;top:50%;transform:translateY(-50%);z-index:80;height:220px;width:0;pointer-events:none}
.ad-rail-hotzone{position:absolute;left:0;top:50%;transform:translateY(-50%);width:18px;height:220px;pointer-events:auto;z-index:2}
.ad-rail-hotzone::after{content:'';position:absolute;left:0;top:50%;transform:translateY(-50%);width:2px;height:44px;border-radius:2px;background:var(--dsw-alias-border-l2);transition:background .16s ease,height .16s ease,width .16s ease}
.ad-rail-hotzone:hover::after{background:var(--dsw-alias-brand-primary);width:3px;height:64px}
.ad-rail{position:absolute;left:0;top:50%;transform:translateY(-50%) translateX(-110%);pointer-events:auto;width:54px;display:flex;flex-direction:column;align-items:center;gap:7px;padding:6px 0 9px;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);border-left:none;border-radius:0 16px 16px 0;box-shadow:10px 0 28px rgba(0,0,0,.18);color:var(--dsw-alias-label-primary);cursor:default;user-select:none;transition:transform .2s ease,background .16s ease,border-color .16s ease,box-shadow .16s ease}
.ad-rail-root.visible .ad-rail{transform:translateY(-50%) translateX(0)}
.ad-rail-root.force .ad-rail{border-color:var(--dsw-alias-brand-primary);animation:ad-rail-pulse 1.2s ease-in-out 3}
.ad-rail:hover{background:var(--dsw-alias-bg-layer-2);border-color:var(--dsw-alias-brand-primary);box-shadow:12px 0 34px rgba(0,0,0,.24)}
.ad-fold{width:40px;height:40px;border:none;border-radius:10px;background:transparent;color:var(--dsw-alias-label-secondary);position:relative;cursor:pointer;transition:background .16s ease,color .16s ease;padding:0;flex:0 0 auto}
.ad-fold:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-brand-primary)}
.ad-fold:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}
.ad-fold-line{position:absolute;left:50%;width:2px;height:12px;border-radius:2px;background:currentColor;transition:transform .2s ease}
.ad-fold-line-up{top:8px;transform:translateX(-50%);transform-origin:bottom center}
.ad-fold-line-down{top:20px;transform:translateX(-50%);transform-origin:top center}
.ad-rail:hover .ad-fold-line-up,.ad-fold:hover .ad-fold-line-up{transform:translateX(-50%) rotate(-45deg)}
.ad-rail:hover .ad-fold-line-down,.ad-fold:hover .ad-fold-line-down{transform:translateX(-50%) rotate(45deg)}
.ad-rail-amount{display:flex;flex-direction:column;align-items:center;gap:1px;line-height:1.15;min-width:0;max-width:50px;cursor:pointer;border-radius:8px;padding:3px 2px}
.ad-rail-amount:hover{background:var(--dsw-alias-bg-layer-2)}
.ad-rail-amount:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}
.ad-rail-value{font-size:12px;font-weight:700;font-variant-numeric:tabular-nums;max-width:50px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ad-rail-dot{width:6px;height:6px;border-radius:50%;background:var(--dsw-alias-state-success-primary);margin-top:3px}
.ad-rail-dot.idle{background:var(--dsw-alias-state-idle-primary)}
.ad-rail-dot.err{background:var(--dsw-alias-state-error-primary)}
.ad-rail-label{font-size:8px;font-weight:650;letter-spacing:.08em;text-transform:uppercase;color:var(--dsw-alias-label-secondary)}
.ad-drawer{position:fixed;left:0;top:50%;transform:translateY(-50%) translateX(-18px);opacity:0;visibility:hidden;pointer-events:none;z-index:80;width:min(430px,calc(100vw - 12px));max-height:min(84vh,780px);display:flex;background:var(--dsw-alias-bg-overlay);border:1px solid var(--dsw-alias-border-l1);border-left:none;border-radius:0 16px 16px 0;box-shadow:12px 0 40px rgba(0,0,0,.28);overflow:hidden;transition:transform .2s ease,opacity .2s ease,visibility .2s ease}
.ad-drawer.open{transform:translateY(-50%) translateX(0);opacity:1;visibility:visible;pointer-events:auto}
.ad-drawer-content{flex:1;min-width:0;overflow:auto;background:var(--dsw-alias-bg-overlay)}
.ad-drawer-content .ad-sheet{border:none;border-radius:0;box-shadow:none;background:transparent;min-height:0;width:100%}
.ad-drawer-close{flex:0 0 34px;display:grid;place-items:center;border:none;border-left:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary);cursor:pointer;transition:background .16s ease,color .16s ease;padding:0;position:relative}
.ad-drawer-close:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-brand-primary)}
.ad-drawer-close:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-2px}
.ad-close-line{position:absolute;left:50%;width:2px;height:12px;border-radius:2px;background:currentColor;transition:transform .2s ease}
.ad-close-line-up{top:calc(50% - 12px);transform:translateX(-50%);transform-origin:bottom center}
.ad-close-line-down{top:50%;transform:translateX(-50%);transform-origin:top center}
.ad-drawer-close:hover .ad-close-line-up{transform:translateX(-50%) rotate(45deg)}
.ad-drawer-close:hover .ad-close-line-down{transform:translateX(-50%) rotate(-45deg)}
.ad-toasts{position:fixed;top:14px;left:50%;transform:translateX(-50%);z-index:90;display:flex;flex-direction:column;gap:8px;align-items:center;pointer-events:none;width:min(560px,calc(100vw - 24px))}
.ad-toast{pointer-events:none;width:100%;background:var(--dsw-alias-bg-overlay);border:1px solid var(--dsw-alias-border-l1);border-radius:12px;box-shadow:0 12px 32px rgba(0,0,0,.28);padding:10px 12px;color:var(--dsw-alias-label-primary);animation:ad-toast-in .18s ease-out;transition:opacity .2s ease,transform .2s ease;transform-origin:top center}
.ad-toast-large{border-color:var(--dsw-alias-state-warn-primary)}
.ad-toast-large .ad-toast-title{color:var(--dsw-alias-state-warn-primary)}
.ad-toast-out{opacity:0;transform:translateY(-8px) scale(.98)}
.ad-toast-title{font-size:11.5px;font-weight:650;line-height:1.4;display:flex;align-items:center;gap:6px}
.ad-toast-body{font-size:10.5px;color:var(--dsw-alias-label-secondary);margin-top:2px;line-height:1.5;font-variant-numeric:tabular-nums}
.ad-toast-note{font-size:9.5px;color:var(--dsw-alias-state-warn-primary);margin-top:2px}
.ad-rail-root *,.ad-settings *{box-sizing:border-box}
.ad-sheet{display:flex;flex-direction:column;gap:13px;padding:18px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-overlay);border:1px solid var(--dsw-alias-border-l1);border-radius:16px;box-shadow:0 22px 60px rgba(0,0,0,.30);box-sizing:border-box}
.ad-sheet>*{min-width:0}
.ad-head{display:flex;align-items:flex-start;gap:10px}
.ad-head-drag{cursor:grab;touch-action:none;user-select:none}
.ad-head-drag:active{cursor:grabbing}
.ad-head-text{min-width:0;flex:1}
.ad-eyebrow{font-size:10px;font-weight:650;letter-spacing:.09em;text-transform:uppercase;color:var(--dsw-alias-label-secondary);line-height:1.25}
.ad-title{font-size:16px;font-weight:700;letter-spacing:-.01em;line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ad-subtitle{font-size:11px;color:var(--dsw-alias-label-secondary);line-height:1.4;margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ad-live{display:inline-flex;align-items:center;gap:4px;flex:0 0 auto;font-size:10px;font-weight:600;padding:3px 7px;border-radius:999px;border:1px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-secondary);white-space:nowrap}
.ad-iconbtn{flex:0 0 auto;width:30px;height:30px;display:grid;place-items:center;border:none;border-radius:9px;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;transition:background .15s ease,color .15s ease}
.ad-iconbtn:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}
.ad-iconbtn:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}
.ad-card{background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);border-radius:14px}
.ad-hero{position:relative;overflow:hidden;padding:14px 15px 15px}
.ad-hero-center{display:flex;flex-direction:column;align-items:center;text-align:center;padding:16px 15px 14px}
.ad-hero-label{font-size:11px;color:var(--dsw-alias-label-secondary)}
.ad-hero-center .ad-hero-value-row{margin-top:4px;justify-content:center}
.ad-hero-meta{display:flex;align-items:center;justify-content:center;gap:8px;margin-top:4px;flex-wrap:wrap}
.ad-hero-meta .ad-hero-note{margin-top:0}
.ad-hero-top{position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;gap:8px}
.ad-label{font-size:11px;color:var(--dsw-alias-label-secondary)}
.ad-hero-value-row{position:relative;z-index:1;display:flex;align-items:baseline;gap:4px;margin-top:3px}
.ad-hero-symbol{font-size:18px;font-weight:650;color:var(--dsw-alias-label-secondary)}
.ad-hero-value{font-size:38px;font-weight:750;letter-spacing:-.03em;line-height:1.05;font-variant-numeric:tabular-nums}
.ad-hero-note{position:relative;z-index:1;margin-top:4px;font-size:9.5px;color:var(--dsw-alias-label-secondary)}
.ad-status{display:inline-flex;align-items:center;gap:4px;font-size:9.5px;font-weight:600;padding:2px 6px;border-radius:999px;background:color-mix(in srgb,var(--dsw-alias-bg-layer-2) 70%,transparent);color:var(--dsw-alias-label-secondary);white-space:nowrap}
.ad-status.ok{color:var(--dsw-alias-state-success-primary);background:color-mix(in srgb,var(--dsw-alias-state-success-primary) 12%,transparent)}
.ad-status.err{color:var(--dsw-alias-state-error-primary);background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 12%,transparent)}
.ad-dot{width:6px;height:6px;border-radius:50%;display:inline-block;flex:0 0 auto;background:var(--dsw-alias-state-idle-primary)}
.ad-dot.ok{background:var(--dsw-alias-state-success-primary)}
.ad-dot.err{background:var(--dsw-alias-state-error-primary)}
.ad-dot.live{box-shadow:0 0 0 3px color-mix(in srgb,var(--dsw-alias-state-success-primary) 16%,transparent);animation:ad-pulse 2s ease-in-out infinite}
.ad-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(112px,1fr));gap:8px}
.ad-stat{padding:10px 11px;min-width:0}
.ad-stat-label{display:flex;align-items:center;gap:4px;font-size:10.5px;color:var(--dsw-alias-label-secondary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ad-stat-value{margin-top:3px;font-size:17px;font-weight:700;line-height:1.25;font-variant-numeric:tabular-nums;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ad-stat-sub{margin-top:1px;font-size:9.5px;color:var(--dsw-alias-label-secondary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ad-chart-card{padding:10px 12px 8px}
.ad-chart-head{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:3px;font-size:10.5px;color:var(--dsw-alias-label-secondary)}
.ad-chart-head span:last-child{white-space:nowrap;font-variant-numeric:tabular-nums}
.ad-chart-svg{display:block;width:100%;height:96px;overflow:visible;color:var(--dsw-alias-brand-primary)}
.ad-chart-empty{height:96px;display:grid;place-items:center;border:1px dashed var(--dsw-alias-border-l1);border-radius:11px;font-size:11px;color:var(--dsw-alias-label-secondary)}
.ad-chart-foot{display:flex;justify-content:space-between;gap:8px;margin-top:2px;font-size:10px;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums}
.ad-detail-row{display:flex;align-items:center;gap:8px;padding:9px 12px;font-size:11px;color:var(--dsw-alias-label-secondary)}
.ad-detail-row b{font-weight:650;color:var(--dsw-alias-label-primary);font-variant-numeric:tabular-nums}
.ad-detail-row .ad-badge{margin-left:auto}
.ad-badge{font-size:9px;font-weight:600;padding:1px 6px;border-radius:999px;background:color-mix(in srgb,var(--dsw-alias-brand-primary) 12%,transparent);color:var(--dsw-alias-brand-primary)}
.ad-error{padding:10px 12px;border-radius:13px;border:1px solid color-mix(in srgb,var(--dsw-alias-state-warn-primary) 38%,var(--dsw-alias-border-l1));background:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 10%,transparent)}
.ad-error-head{display:flex;align-items:center;gap:5px;font-size:11px;font-weight:650;color:var(--dsw-alias-state-warn-primary)}
.ad-error-text{margin-top:3px;font-size:11px;color:var(--dsw-alias-label-primary);line-height:1.45}
.ad-error-detail{margin-top:2px;font-size:10px;color:var(--dsw-alias-label-secondary);line-height:1.4;word-break:break-word}
.ad-foot{display:flex;flex-direction:column;gap:5px;margin-top:1px}
.ad-meta{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:10.5px;line-height:1.5;color:var(--dsw-alias-label-secondary);flex-wrap:wrap}
.ad-meta b{font-weight:600;color:var(--dsw-alias-label-primary)}
.ad-meta-dim{font-size:9.5px;opacity:.85}
.ad-progress{height:3px;border-radius:3px;background:color-mix(in srgb,var(--dsw-alias-border-l1) 70%,transparent);overflow:hidden}
.ad-progress>i{display:block;height:100%;border-radius:3px;background:var(--dsw-alias-brand-primary);transition:width .6s linear}
.ad-platform-note{font-size:9.5px;line-height:1.45;color:var(--dsw-alias-label-secondary);padding-top:1px}
.ad-setup{display:flex;gap:9px;padding:12px;border-radius:14px;border:1px solid var(--dsw-alias-border-l1);background:color-mix(in srgb,var(--dsw-alias-bg-layer-1) 60%,transparent)}
.ad-setup svg{flex:0 0 auto;margin-top:1px;color:var(--dsw-alias-state-warn-primary)}
.ad-setup-title{font-size:12.5px;font-weight:650;line-height:1.4}
.ad-setup-body{margin-top:3px;font-size:11px;line-height:1.55;color:var(--dsw-alias-label-secondary)}
.ad-setup-detail{margin-top:3px;font-size:10px;line-height:1.4;color:var(--dsw-alias-label-secondary);word-break:break-word}
.ad-skeleton{display:flex;flex-direction:column;gap:10px}
.ad-sk-line{height:14px;border-radius:7px;background:linear-gradient(90deg,var(--dsw-alias-bg-layer-2),var(--dsw-alias-bg-layer-1),var(--dsw-alias-bg-layer-2));background-size:200% 100%;animation:ad-shimmer 1.2s linear infinite}
.ad-settings{max-width:820px;display:flex;flex-direction:column;gap:16px;padding:4px 2px 40px;box-sizing:border-box;color:var(--dsw-alias-label-primary);font-family:inherit;text-align:left}
.ad-settings-head{display:flex;align-items:flex-start;justify-content:space-between;gap:16px}
.ad-settings h2{font-size:18px;font-weight:700;letter-spacing:-.01em;margin:0;line-height:1.3}
.ad-settings-sub{font-size:12px;line-height:1.55;color:var(--dsw-alias-label-secondary);margin:4px 0 0;max-width:620px}
.ad-saved{font-size:11px;color:var(--dsw-alias-label-secondary);margin:0}
.ad-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;border:1px solid var(--dsw-alias-border-l2);border-radius:9px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);font:inherit;font-size:12px;font-weight:600;padding:7px 12px;cursor:pointer;white-space:nowrap;transition:background .15s ease,border-color .15s ease}
.ad-btn:hover{border-color:var(--dsw-alias-brand-primary)}
.ad-btn:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}
.ad-section{border:1px solid var(--dsw-alias-border-l1);border-radius:14px;background:var(--dsw-alias-bg-layer-1);overflow:hidden}
.ad-section-head{padding:12px 14px;border-bottom:1px solid var(--dsw-alias-border-l1);display:flex;align-items:baseline;justify-content:space-between;gap:10px}
.ad-section-head h3{font-size:12.5px;font-weight:650;margin:0;line-height:1.4}
.ad-section-head span{font-size:10.5px;color:var(--dsw-alias-label-secondary);line-height:1.4}
.ad-row{display:flex;align-items:center;justify-content:space-between;gap:18px;padding:11px 14px;border-top:1px solid var(--dsw-alias-border-l1)}
.ad-section-head+.ad-row{border-top:none}
.ad-row-text{min-width:0;flex:1}
.ad-row-title{font-size:12.5px;font-weight:600;line-height:1.4}
.ad-row-desc{font-size:11px;color:var(--dsw-alias-label-secondary);line-height:1.5;margin-top:2px}
.ad-row-control{flex:0 0 auto;display:flex;align-items:center;gap:8px}
.ad-switch{width:38px;height:22px;border-radius:999px;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2);position:relative;cursor:pointer;transition:background .15s ease,border-color .15s ease;flex:0 0 auto;padding:0}
.ad-switch[aria-checked="true"]{background:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary)}
.ad-switch::after{content:'';position:absolute;top:2px;left:2px;width:16px;height:16px;border-radius:50%;background:var(--dsw-alias-bg-base);box-shadow:0 1px 3px rgba(0,0,0,.3);transition:transform .15s ease}
.ad-switch[aria-checked="true"]::after{transform:translateX(16px);background:#fff}
.ad-switch:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}
.ad-select{appearance:auto;min-width:132px;background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l2);border-radius:8px;color:var(--dsw-alias-label-primary);font:inherit;font-size:12px;padding:6px 8px;cursor:pointer}
.ad-select:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}
.ad-range{display:flex;align-items:center;gap:10px;min-width:190px}
.ad-range input[type=range]{width:130px;accent-color:var(--dsw-alias-brand-primary)}
.ad-range-value{font-size:11px;color:var(--dsw-alias-label-secondary);min-width:42px;text-align:right;font-variant-numeric:tabular-nums}
.ad-color{display:flex;align-items:center;gap:8px}
.ad-color input[type=color]{width:34px;height:26px;padding:0;border:1px solid var(--dsw-alias-border-l2);border-radius:7px;background:transparent;cursor:pointer}
.ad-color input[type=color]:disabled{opacity:.45;cursor:not-allowed}
.ad-color code{font-size:11px;color:var(--dsw-alias-label-secondary);font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
.ad-providers-json{display:block;width:calc(100% - 28px);margin:0 14px 10px;min-height:104px;resize:vertical;border:1px solid var(--dsw-alias-border-l2);border-radius:9px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);font:11px/1.5 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;padding:8px 9px;box-sizing:border-box}
.ad-provider-card{padding:9px 12px 7px}
.ad-provider-row{display:flex;align-items:flex-start;justify-content:space-between;gap:8px;padding:7px 0;border-top:1px solid var(--dsw-alias-border-l1);font-size:10.5px}
.ad-provider-row:first-of-type{border-top:none}
.ad-provider-name{font-weight:600;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ad-provider-meta{color:var(--dsw-alias-label-secondary);text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}
.ad-note{font-size:10.5px;line-height:1.5;color:var(--dsw-alias-label-secondary);margin:0;padding:0 14px 11px}
.ad-preview-sticky{position:sticky;top:0;z-index:6;padding-top:2px;background:var(--dsw-alias-bg-base);box-shadow:0 8px 18px rgba(0,0,0,.12)}
.ad-preview{padding:14px;background:var(--dsw-alias-bg-layer-2)}
.ad-preview-card{padding:14px;min-height:112px;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);border-radius:14px}
.ad-preview-top{display:flex;align-items:center;gap:8px;font-size:12px;font-weight:650}
.ad-preview-title{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ad-preview-live{margin-left:auto;font-size:9px;font-weight:600;color:var(--dsw-alias-state-success-primary);display:inline-flex;align-items:center;gap:4px}
.ad-preview-total{font-size:26px;font-weight:750;letter-spacing:-.02em;margin-top:7px;font-variant-numeric:tabular-nums;line-height:1.1}
.ad-preview-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(88px,1fr));gap:8px;margin-top:9px}
.ad-preview-grid>div{min-width:0}
.ad-preview-grid span{display:block;font-size:9.5px;color:var(--dsw-alias-label-secondary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ad-preview-grid b{display:block;font-size:12px;font-weight:650;margin-top:1px;font-variant-numeric:tabular-nums;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ad-preview-chart{display:block;width:100%;height:44px;margin-top:8px;color:var(--dsw-alias-brand-primary)}
.ad-preview-row{display:flex;align-items:center;gap:6px;margin-top:8px;font-size:10px;color:var(--dsw-alias-label-secondary)}
.ad-preview-row b{color:var(--dsw-alias-label-primary);font-variant-numeric:tabular-nums}
.ad-preview-foot{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:9px;padding-top:7px;border-top:1px solid var(--dsw-alias-border-l1);font-size:9.5px;color:var(--dsw-alias-label-secondary);flex-wrap:wrap}
.ad-preview-empty{display:grid;place-items:center;height:56px;font-size:11px;color:var(--dsw-alias-label-secondary);border:1px dashed var(--dsw-alias-border-l1);border-radius:10px;margin-top:8px}
.ad-reset-row{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:12px 14px}
.ad-error-fallback{position:fixed;right:18px;bottom:18px;z-index:80;max-width:min(380px,calc(100vw - 24px));padding:12px 14px;border-radius:14px;border:1px solid var(--dsw-alias-state-error-primary);background:var(--dsw-alias-bg-overlay);color:var(--dsw-alias-label-primary);box-shadow:0 12px 32px rgba(0,0,0,.3);font-size:11px;line-height:1.5;pointer-events:auto}
.ad-error-fallback-title{font-weight:650;margin-bottom:3px}
.ad-error-fallback-text{color:var(--dsw-alias-state-error-primary);word-break:break-word}
@keyframes ad-pulse{0%,100%{box-shadow:0 0 0 3px color-mix(in srgb,var(--dsw-alias-state-success-primary) 16%,transparent)}50%{box-shadow:0 0 0 5px color-mix(in srgb,var(--dsw-alias-state-success-primary) 5%,transparent)}}
@keyframes ad-shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
@keyframes ad-toast-in{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}
@keyframes ad-rail-pulse{0%,100%{box-shadow:10px 0 28px rgba(0,0,0,.18)}50%{box-shadow:10px 0 34px color-mix(in srgb,var(--dsw-alias-brand-primary) 45%,transparent)}}
@media (max-width:680px){.ad-settings-head{flex-direction:column}.ad-row{flex-direction:column;align-items:flex-start;gap:8px}.ad-row-control{width:100%;justify-content:flex-start;flex-wrap:wrap}.ad-range{width:100%}.ad-range input[type=range]{flex:1;width:auto}.ad-preview-grid{grid-template-columns:1fr 1fr}.ad-title{font-size:15px}}
@media (prefers-reduced-motion:reduce){.ad-dot.live{animation:none}.ad-sk-line{animation:none}.ad-progress>i{transition:none}.ad-trigger{transition:none}}
`

    function clampNumber(value, min, max, fallback) {
      const number = Number(value)
      if (!Number.isFinite(number)) return fallback
      return Math.min(max, Math.max(min, Math.round(number)))
    }

    function money(value) {
      if (value === null || value === undefined || value === '') return '—'
      const number = Number(value)
      if (!Number.isFinite(number)) return String(value)
      return number.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    }

    function moneyPrecise(value) {
      const number = Number(value)
      if (!Number.isFinite(number)) return '—'
      return number.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })
    }

    function symbolOf(currency) {
      return SYMBOLS[currency] || (currency ? `${currency} ` : '')
    }

    function absTime(ms) {
      if (!ms) return '—'
      return new Date(ms).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    }

    function relativeTime(ms, tr, now) {
      if (!ms) return tr('never')
      const seconds = Math.max(0, Math.round((now - ms) / 1000))
      if (seconds < 5) return tr('justNow')
      if (seconds < 60) return tr('secondsAgo').replace('{n}', String(seconds))
      if (seconds < 3600) return tr('minutesAgo').replace('{n}', String(Math.round(seconds / 60)))
      return absTime(ms)
    }

    function translate(t, key) {
      if (typeof t === 'function') {
        const value = t(key)
        if (typeof value === 'string' && value !== key) return value
      }
      return DICT.zh[key] || key
    }

    function computeConsumed(history) {
      if (!Array.isArray(history) || history.length < 2) return null
      let total = 0
      for (let index = 1; index < history.length; index += 1) {
        const previous = Number(history[index - 1] && history[index - 1].v)
        const current = Number(history[index] && history[index].v)
        if (Number.isFinite(previous) && Number.isFinite(current) && current < previous) {
          total += previous - current
        }
      }
      return total
    }

    function formatCount(value) {
      const number = Number(value)
      return Number.isFinite(number) ? number.toLocaleString() : '—'
    }

    function formatTokens(value) {
      const number = Number(value)
      if (!Number.isFinite(number)) return '—'
      if (number >= 1000) {
        return new Intl.NumberFormat(undefined, { notation: 'compact', maximumFractionDigits: 1 }).format(number)
      }
      return number.toLocaleString()
    }

    function errorCopy(code, tr) {
      switch (code) {
        case 'credential-missing':
          return { title: tr('errCredentialMissing'), hint: tr('errCredentialMissingHint') }
        case 'unauthorized':
          return { title: tr('errUnauthorized') }
        case 'network':
          return { title: tr('errNetwork') }
        case 'timeout':
          return { title: tr('errTimeout') }
        case 'invalid-response':
          return { title: tr('errInvalid') }
        case 'http-error':
          return { title: tr('errHttp') }
        case 'client-network':
          return { title: tr('errClient') }
        default:
          return { title: tr('errUnknown') }
      }
    }

    function defaultSettings() {
      return {
        version: 1,
        showTotal: true,
        showTopUp: true,
        showConsumed: true,
        showTokens: true,
        showRequests: true,
        showChart: true,
        showStatus: true,
        showMeta: true,
        showCountdown: true,
        showGranted: true,
        requestMode: 'deepseek',
        refreshSeconds: DEFAULT_INTERVAL_SECONDS,
        providerJson: '',
      }
    }

    function normalizeSettings(input) {
      const raw = input && typeof input === 'object' ? input : {}
      const defaults = defaultSettings()
      return {
        version: 1,
        showTotal: typeof raw.showTotal === 'boolean' ? raw.showTotal : defaults.showTotal,
        showTopUp: typeof raw.showTopUp === 'boolean' ? raw.showTopUp : defaults.showTopUp,
        showConsumed: typeof raw.showConsumed === 'boolean' ? raw.showConsumed : defaults.showConsumed,
        showTokens: typeof raw.showTokens === 'boolean' ? raw.showTokens : defaults.showTokens,
        showRequests: typeof raw.showRequests === 'boolean' ? raw.showRequests : defaults.showRequests,
        showChart: typeof raw.showChart === 'boolean' ? raw.showChart : defaults.showChart,
        showStatus: typeof raw.showStatus === 'boolean' ? raw.showStatus : defaults.showStatus,
        showMeta: typeof raw.showMeta === 'boolean' ? raw.showMeta : defaults.showMeta,
        showCountdown: typeof raw.showCountdown === 'boolean' ? raw.showCountdown : defaults.showCountdown,
        showGranted: typeof raw.showGranted === 'boolean' ? raw.showGranted : defaults.showGranted,
        requestMode: raw.requestMode === 'all' ? 'all' : 'deepseek',
        refreshSeconds: [3, 5, 10, 20].includes(Number(raw.refreshSeconds)) ? Number(raw.refreshSeconds) : DEFAULT_INTERVAL_SECONDS,
        providerJson: typeof raw.providerJson === 'string' ? raw.providerJson.slice(0, 20000) : '',
      }
    }

    function loadSettings() {
      try {
        const raw = window.localStorage.getItem(SETTINGS_KEY)
        return raw ? normalizeSettings(JSON.parse(raw)) : defaultSettings()
      } catch {
        return defaultSettings()
      }
    }

    function createSettingsStore() {
      let state = loadSettings()
      const listeners = new Set()
      function persist() {
        try {
          window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(state))
        } catch {
          /* private windows can reject storage */
        }
      }
      function emit() {
        listeners.forEach((listener) => listener())
      }
      return {
        getSnapshot() {
          return state
        },
        subscribe(listener) {
          listeners.add(listener)
          return () => listeners.delete(listener)
        },
        update(patch) {
          const next = { ...state, ...patch }
          state = normalizeSettings(next)
          persist()
          emit()
        },
        reset() {
          state = defaultSettings()
          persist()
          emit()
        },
      }
    }

    const settingsStore = createSettingsStore()

    const balanceCache = (() => {
      let value = null
      const listeners = new Set()
      return {
        getSnapshot() {
          return value
        },
        subscribe(listener) {
          listeners.add(listener)
          return () => listeners.delete(listener)
        },
        set(next) {
          value = next
          listeners.forEach((listener) => listener())
        },
      }
    })()

    function useSettings() {
      return React.useSyncExternalStore(settingsStore.subscribe, settingsStore.getSnapshot)
    }

    function useNow(active) {
      const [now, setNow] = React.useState(() => Date.now())
      React.useEffect(() => {
        if (!active) return undefined
        const id = window.setInterval(() => setNow(Date.now()), 1000)
        return () => window.clearInterval(id)
      }, [active])
      return now
    }

    function useBalanceFeed(enabled, intervalMs) {
      const [state, setState] = React.useState({
        loading: true,
        syncing: false,
        payload: null,
        clientError: null,
        receivedAt: 0,
      })

      React.useEffect(() => {
        if (!enabled) return undefined
        let cancelled = false
        let busy = false
        let timer = 0
        const controller = new AbortController()

        async function request(first) {
          if (cancelled || busy) return
          busy = true
          setState((prev) => ({ ...prev, syncing: true, loading: first && !prev.payload }))
          try {
            const response = await fetch(ROUTE, {
              cache: 'no-store',
              headers: { accept: 'application/json' },
              signal: controller.signal,
            })
            if (!response.ok) throw new Error(`HTTP ${response.status}`)
            const payload = await response.json()
            if (cancelled) return
            balanceCache.set(payload && payload.data ? payload.data : null)
            setState({
              loading: false,
              syncing: false,
              payload,
              clientError: null,
              receivedAt: Date.now(),
            })
          } catch (error) {
            if (cancelled) return
            setState((prev) => ({
              ...prev,
              loading: false,
              syncing: false,
              clientError: {
                code: 'client-network',
                message: String((error && error.message) || error),
              },
              receivedAt: Date.now(),
            }))
          } finally {
            busy = false
            if (!cancelled) {
              window.clearTimeout(timer)
              timer = window.setTimeout(() => request(false), intervalMs)
            }
          }
        }

        request(true)

        function onVisibilityChange() {
          if (document.visibilityState !== 'visible') return
          window.clearTimeout(timer)
          request(false)
        }
        document.addEventListener('visibilitychange', onVisibilityChange)

        return () => {
          cancelled = true
          window.clearTimeout(timer)
          document.removeEventListener('visibilitychange', onVisibilityChange)
          controller.abort()
        }
      }, [enabled, intervalMs])

      return state
    }

    function StyleTag() {
      return h('style', { dangerouslySetInnerHTML: { __html: CSS } })
    }

    function Chevron({ dir = 'up' }) {
      const path = dir === 'down' ? 'M4 6l4 4 4-4' : dir === 'up' ? 'M4 10l4-4 4 4' : 'M6 4l4 4-4 4'
      return h(
        'svg',
        { viewBox: '0 0 16 16', width: 14, height: 14, 'aria-hidden': 'true' },
        h('path', {
          d: path,
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.6,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }),
      )
    }

    function AlertIcon() {
      return h(
        'svg',
        { viewBox: '0 0 16 16', width: 14, height: 14, 'aria-hidden': 'true' },
        h('path', {
          d: 'M8 1.8 14.4 13H1.6L8 1.8Z',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.3,
          strokeLinejoin: 'round',
        }),
        h('path', { d: 'M8 6v3.4', stroke: 'currentColor', strokeWidth: 1.3, strokeLinecap: 'round' }),
        h('circle', { cx: 8, cy: 11.4, r: 0.7, fill: 'currentColor' }),
      )
    }

    function InfoIcon() {
      return h(
        'svg',
        { viewBox: '0 0 16 16', width: 12, height: 12, 'aria-hidden': 'true' },
        h('circle', { cx: 8, cy: 8, r: 6.2, fill: 'none', stroke: 'currentColor', strokeWidth: 1.3 }),
        h('path', { d: 'M8 7.2v3.4', stroke: 'currentColor', strokeWidth: 1.3, strokeLinecap: 'round' }),
        h('circle', { cx: 8, cy: 5.2, r: 0.7, fill: 'currentColor' }),
      )
    }

    function rangeLabel(points, tr) {
      const first = points[0] && points[0].t
      const last = points[points.length - 1] && points[points.length - 1].t
      if (!first || !last || last <= first) return ''
      const minutes = Math.max(1, Math.round((last - first) / 60000))
      if (minutes < 60) return tr('rangeMinutes').replace('{n}', String(minutes))
      return tr('rangeHours').replace('{n}', String(Math.round(minutes / 60)))
    }

    function Sparkline({ points, tr, currency }) {
      const list = Array.isArray(points)
        ? points.filter((point) => point && Number.isFinite(Number(point.v))).map((point) => ({ t: point.t, v: Number(point.v) }))
        : []
      const head = h(
        'div',
        { className: 'ad-chart-head' },
        h('span', null, tr('chart')),
        list.length > 1 ? h('span', null, rangeLabel(list, tr)) : null,
      )

      if (list.length < 2) {
        return h('div', null, head, h('div', { className: 'ad-chart-empty' }, tr('collecting')))
      }

      const width = 320
      const height = 96
      const padX = 2
      const padY = 8
      const values = list.map((point) => point.v)
      const min = Math.min(...values)
      const max = Math.max(...values)
      const span = max - min
      const x = (index) => padX + (index / (list.length - 1)) * (width - padX * 2)
      const y = (value) => (span === 0 ? height / 2 : height - padY - ((value - min) / span) * (height - padY * 2))
      const line = list
        .map((point, index) => `${index === 0 ? 'M' : 'L'} ${x(index).toFixed(2)} ${y(point.v).toFixed(2)}`)
        .join(' ')
      const area = `${line} L ${x(list.length - 1).toFixed(2)} ${height - padY} L ${x(0).toFixed(2)} ${height - padY} Z`
      const last = list[list.length - 1]

      return h(
        Fragment,
        null,
        head,
        h(
          'svg',
          {
            className: 'ad-chart-svg',
            viewBox: `0 0 ${width} ${height}`,
            preserveAspectRatio: 'none',
            role: 'img',
            'aria-label': tr('chart'),
          },
          h(
            'defs',
            null,
            h(
              'linearGradient',
              { id: 'ad-area-fill', x1: '0', y1: '0', x2: '0', y2: '1' },
              h('stop', { offset: '0%', stopColor: 'currentColor', stopOpacity: '0.26' }),
              h('stop', { offset: '100%', stopColor: 'currentColor', stopOpacity: '0' }),
            ),
          ),
          h('path', { d: area, fill: 'url(#ad-area-fill)' }),
          h('path', {
            d: line,
            fill: 'none',
            stroke: 'currentColor',
            strokeWidth: 1.8,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            vectorEffect: 'non-scaling-stroke',
          }),
          h('circle', {
            cx: x(list.length - 1),
            cy: y(last.v),
            r: 2.4,
            fill: 'currentColor',
            vectorEffect: 'non-scaling-stroke',
          }),
        ),
        h(
          'div',
          { className: 'ad-chart-foot' },
          h('span', null, `${tr('low')} ${symbolOf(currency)}${money(min)}`),
          h('span', null, `${tr('high')} ${symbolOf(currency)}${money(max)}`),
        ),
      )
    }

    function Dashboard({ loading, syncing, payload, clientError, receivedAt, settings, t, now, onCollapse, onDragStart }) {
      const tr = (key) => translate(t, key)
      const data = payload && payload.data ? payload.data : null
      const primary = data && data.primary ? data.primary : null
      const currency = (primary && primary.currency) || 'CNY'
      const history = payload && Array.isArray(payload.history) ? payload.history : []
      const requestInfo = payload && payload.requests ? payload.requests : null
      const platform = payload && payload.platform ? payload.platform : null
      const platformSignedIn = Boolean(platform && platform.signedIn)
      const officialTodayCostEntry = platform && Array.isArray(platform.todayCost)
        ? (platform.todayCost.find((entry) => entry && entry.currency === currency) || platform.todayCost[0] || null)
        : null
      const officialTodayCostAvailable = Boolean(platform && platform.signedIn && Array.isArray(platform.todayCost))
      const officialTodaySpend = officialTodayCostEntry && Number.isFinite(Number(officialTodayCostEntry.amount))
        ? Number(officialTodayCostEntry.amount)
        : (officialTodayCostAvailable ? 0 : null)
      const startOfToday = new Date()
      startOfToday.setHours(0, 0, 0, 0)
      const todayHistory = history.filter((point) => point && Number(point.t) >= startOfToday.getTime())
      const localTodaySpend = computeConsumed(todayHistory)
      const todaySpend = officialTodaySpend !== null ? officialTodaySpend : localTodaySpend
      const todaySpendOfficial = officialTodaySpend !== null
      const todaySymbol = officialTodayCostEntry ? symbolOf(officialTodayCostEntry.currency) : symbolOf(currency)
      const officialTodayRequests = platform && platform.todayRequests != null && Number.isFinite(Number(platform.todayRequests))
        ? Number(platform.todayRequests)
        : null
      const localRequestCount = requestInfo
        ? (settings.requestMode === 'all' ? requestInfo.total : requestInfo.deepseek)
        : null
      const requestCount = officialTodayRequests !== null ? officialTodayRequests : localRequestCount
      const requestsOfficial = officialTodayRequests !== null
      const officialTodayTokens = platform && platform.todayTokens != null && Number.isFinite(Number(platform.todayTokens))
        ? Number(platform.todayTokens)
        : null
      const totalCostEntry = platform && Array.isArray(platform.totalCost)
        ? (platform.totalCost.find((entry) => entry && entry.currency === currency) || null)
        : null
      const availability = data ? data.isAvailable : null
      const statusClass = availability === true ? 'ok' : availability === false ? 'err' : 'idle'
      const statusText = availability === true ? tr('available') : availability === false ? tr('unavailable') : tr('unknownStatus')
      const error = clientError || (payload && payload.error) || null
      const copy = error ? errorCopy(error.code, tr) : null
      const stale = Boolean(error && data)
      const fetchedAt = (data && data.fetchedAt) || 0
      const cycleStart = receivedAt || fetchedAt || 0
      const interval = Math.max(3000, Math.min(60000, (Number(settings.refreshSeconds) || DEFAULT_INTERVAL_SECONDS) * 1000))
      const hasCycle = cycleStart > 0
      const remaining = hasCycle ? Math.max(0, Math.ceil((cycleStart + interval - now) / 1000)) : Math.round(interval / 1000)
      const progress = hasCycle ? Math.min(100, Math.max(0, ((now - cycleStart) / interval) * 100)) : 0
      const symbol = symbolOf(currency)
      const otherBalances = data && Array.isArray(data.balances)
        ? data.balances.filter((entry) => entry && entry.currency !== currency)
        : []

      const header = h(
        'div',
        {
          className: `ad-head ${onDragStart ? 'ad-head-drag' : ''}`,
          onPointerDown: onDragStart ? (event) => onDragStart(event) : undefined,
        },
        h(
          'div',
          { className: 'ad-head-text' },
          h('div', { className: 'ad-eyebrow' }, tr('eyebrow')),
          h('div', { className: 'ad-title' }, tr('panelTitle')),
          h('div', { className: 'ad-subtitle' }, tr('panelSubtitle')),
        ),
        settings.showStatus
          ? h(
              'span',
              { className: 'ad-live' },
              h('i', { className: `ad-dot ${error ? 'err' : 'ok'} ${error ? '' : 'live'}` }),
              error ? tr('offline') : syncing ? tr('syncing') : tr('live'),
            )
          : null,
        onCollapse
          ? h(
              'button',
              {
                type: 'button',
                className: 'ad-iconbtn',
                onPointerDown: (event) => event.stopPropagation(),
                onClick: onCollapse,
                'aria-label': tr('collapse'),
                title: tr('collapse'),
              },
              h(Chevron, { dir: 'down' }),
            )
          : null,
      )

      const stats = []
      if (settings.showTopUp) {
        stats.push({
          key: 'topUp',
          label: tr('topUp'),
          value: `${symbol}${money(primary && primary.toppedUp)}`,
          sub: null,
          hint: null,
        })
      }
      if (settings.showGranted) {
        stats.push({
          key: 'granted',
          label: tr('granted'),
          value: `${symbol}${money(primary && primary.granted)}`,
          sub: tr('official'),
          hint: null,
        })
      }
      if (settings.showConsumed) {
        stats.push({
          key: 'todaySpend',
          label: tr('todaySpend'),
          value: todaySpend === null ? '—' : `${todaySymbol}${money(todaySpend)}`,
          sub: todaySpendOfficial ? tr('official') : tr('localEstimate'),
          hint: tr('todaySpendHint'),
        })
      }
      if (settings.showTokens) {
        stats.push({
          key: 'todayTokens',
          label: tr('todayTokens'),
          value: officialTodayTokens !== null ? formatTokens(officialTodayTokens) : '—',
          sub: platformSignedIn ? tr('official') : tr('tokensNeedLogin'),
          hint: tr('todayTokensHint'),
        })
      }
      if (settings.showRequests) {
        stats.push({
          key: 'requests',
          label: requestsOfficial ? tr('todayRequests') : tr('requests'),
          value: requestCount === null ? '—' : formatCount(requestCount),
          sub: requestsOfficial ? tr('official') : (settings.requestMode === 'all' ? tr('requestsAll') : tr('requestsDeepSeek')),
          hint: tr('requestNote'),
        })
      }

      const hero = settings.showTotal
        ? h(
            'div',
            { className: 'ad-hero ad-card ad-hero-center' },
            h('div', { className: 'ad-hero-label' }, tr('total')),
            h(
              'div',
              { className: 'ad-hero-value-row' },
              h('span', { className: 'ad-hero-symbol' }, symbol),
              h('span', { className: 'ad-hero-value' }, money(primary && primary.total)),
            ),
            h(
              'div',
              { className: 'ad-hero-meta' },
              settings.showStatus
                ? h('span', { className: `ad-status ${statusClass}` }, h('i', { className: `ad-dot ${statusClass}` }), statusText)
                : null,
              h('span', { className: 'ad-hero-note' }, tr('official')),
              otherBalances.length
                ? h('span', { className: 'ad-hero-note' }, `${tr('otherCurrencies')}: ${otherBalances.map((entry) => `${symbolOf(entry.currency)}${money(entry.total)}`).join(' · ')}`)
                : null,
            ),
          )
        : null

      const statsGrid = stats.length
        ? h(
            'div',
            { className: 'ad-stats' },
            stats.map((stat) =>
              h(
                'div',
                { className: 'ad-stat ad-card', key: stat.key, title: stat.hint || undefined },
                h('div', { className: 'ad-stat-label' }, stat.label),
                h('div', { className: 'ad-stat-value' }, stat.value),
                stat.sub ? h('div', { className: 'ad-stat-sub' }, stat.sub) : null,
              ),
            ),
          )
        : null

      const details = []
      if (settings.showMeta && platformSignedIn && totalCostEntry) {
        details.push(
          h(
            'div',
            { className: 'ad-detail-row ad-card', key: 'totalCost' },
            h('span', null, tr('totalCost')),
            h('b', null, `${symbol}${money(totalCostEntry.amount)}`),
            h('span', { className: 'ad-badge' }, tr('official')),
          ),
        )
      }

      const chart = settings.showChart
        ? h('div', { className: 'ad-chart-card ad-card' }, h(Sparkline, { points: history.slice(-180), tr, currency }))
        : null

      const footerParts = []
      if (settings.showMeta) {
        footerParts.push(
          h(
            'div',
            { className: 'ad-meta', key: 'source' },
            h('span', { className: 'ad-meta-left' }, h(InfoIcon), h('span', null, tr('sourceLabel')), h('b', null, tr('officialSource'))),
            h('span', null, fetchedAt ? tr('updatedAgo').replace('{time}', absTime(fetchedAt)).replace('{ago}', relativeTime(fetchedAt, tr, now)) : tr('never')),
          ),
        )
        footerParts.push(
          h(
            'div',
            { className: 'ad-meta ad-meta-dim', key: 'credential' },
            h('span', null, `${tr('credential')}: ${(data && data.credential && data.credential.ref) || 'DEEPSEEK_API_KEY'}`),
            h('span', null, `${tr('endpoint')}: ${(payload && payload.endpointHost) || 'api.deepseek.com'}`),
          ),
        )
      }
      if (settings.showCountdown) {
        footerParts.push(
          h(
            'div',
            { className: 'ad-meta ad-meta-dim', key: 'sync' },
            h('span', null, tr('autoSync').replace('{n}', String(Math.round(interval / 1000)))),
            h('span', null, syncing ? tr('syncing') : tr('nextSync').replace('{n}', String(remaining))),
          ),
        )
        footerParts.push(
          h('div', { className: 'ad-progress', key: 'progress', 'aria-hidden': 'true' }, h('i', { style: { width: `${progress}%` } })),
        )
      }
      if (settings.showMeta) {
        if (platform && platform.error) {
          footerParts.push(h('div', { className: 'ad-platform-note', key: 'platform-error' }, tr('platformError')))
        } else if (platform && !platform.signedIn) {
          footerParts.push(h('div', { className: 'ad-platform-note', key: 'platform-signed-out' }, tr('platformSignedOut')))
        }
      }
      const footer = footerParts.length ? h('div', { className: 'ad-foot' }, footerParts) : null

      const errorBanner = error && data
        ? h(
            'div',
            { className: 'ad-error', role: 'status' },
            h('div', { className: 'ad-error-head' }, h(AlertIcon), h('span', null, stale ? tr('staleTitle') : tr('errorTitle'))),
            h('div', { className: 'ad-error-text' }, copy ? copy.title : tr('errUnknown')),
            copy && copy.hint ? h('div', { className: 'ad-error-detail' }, copy.hint) : null,
            !copy || !copy.hint ? h('div', { className: 'ad-error-detail' }, error.detail || error.message || '') : null,
            stale && fetchedAt ? h('div', { className: 'ad-error-detail' }, tr('lastSuccess').replace('{time}', absTime(fetchedAt))) : null,
            stale ? h('div', { className: 'ad-error-detail' }, tr('staleNote')) : null,
          )
        : null

      const providerUsages = payload && Array.isArray(payload.providerUsage)
        ? payload.providerUsage.filter((item) => item && !/deepseek/i.test(String(item.provider || '')))
        : []
      const providerBalancesList = payload && Array.isArray(payload.providerBalances) ? payload.providerBalances : []
      const providerRows = []
      for (const item of providerBalancesList) {
        const match = String(item.match || item.id || '').toLowerCase()
        const used = providerUsages.some((usage) => match && String(usage.provider || '').toLowerCase().includes(match))
        if (item.status === 'unconfigured' && !used) continue
        const statusText = item.status === 'ok'
          ? `${symbolOf(item.currency || 'CNY')}${money(item.balance)}`
          : item.status === 'unconfigured'
            ? tr('providersUnconfigured')
            : tr('providersError')
        providerRows.push(
          h(
            'div',
            { className: 'ad-provider-row', key: `balance-${item.id}` },
            h('span', { className: 'ad-provider-name' }, item.label || item.id),
            h('span', { className: 'ad-provider-meta' }, statusText),
          ),
        )
      }
      for (const usage of providerUsages) {
        const usageCurrency = usage.currency || 'CNY'
        const costText = usage.costKnown ? `≈${symbolOf(usageCurrency)}${moneyPrecise(usage.cost)}` : '—'
        providerRows.push(
          h(
            'div',
            { className: 'ad-provider-row', key: `usage-${usage.provider}` },
            h('span', { className: 'ad-provider-name' }, usage.label || usage.provider),
            h('span', { className: 'ad-provider-meta' }, `${formatTokens(usage.tokens)} · ${costText} · ${usage.requests}`),
          ),
        )
      }
      const providerSection = providerRows.length
        ? h(
            'div',
            { className: 'ad-card ad-provider-card' },
            h(
              'div',
              { className: 'ad-chart-head' },
              h('span', null, tr('providersSection')),
              h('span', null, tr('providersUsageNote')),
            ),
            providerRows,
          )
        : null

      let content
      if (!data) {
        if (loading) {
          content = h(
            'div',
            { className: 'ad-skeleton', 'aria-label': tr('loading') },
            h('div', { className: 'ad-sk-line', style: { width: '54%' } }),
            h('div', { className: 'ad-sk-line', style: { width: '84%', height: '38px' } }),
            h('div', { className: 'ad-sk-line', style: { width: '70%' } }),
          )
        } else {
          const setupCopy = error
            ? copy
            : { title: tr('errCredentialMissing'), hint: tr('errCredentialMissingHint') }
          content = h(
            'div',
            { className: 'ad-setup' },
            h(AlertIcon),
            h(
              'div',
              null,
              h('div', { className: 'ad-setup-title' }, setupCopy ? setupCopy.title : tr('errUnknown')),
              h(
                'div',
                { className: 'ad-setup-body' },
                (setupCopy && setupCopy.hint) || (error && (error.detail || error.message)) || '',
              ),
              error && error.detail && setupCopy && setupCopy.hint
                ? h('div', { className: 'ad-setup-detail' }, error.detail)
                : null,
            ),
          )
        }
      } else {
        content = h(Fragment, null, hero, statsGrid, providerSection, details, chart)
      }

      return h(
        'section',
        {
          className: 'ad-sheet',
          'aria-label': tr('panelTitle'),
          role: 'region',
        },
        header,
        errorBanner,
        content,
        data ? (settings.showMeta || settings.showCountdown ? footer : null) : null,
      )
    }

    function ToastCenter({ t, payload, onLargeConsumption }) {
      const tr = React.useCallback((key) => translate(t, key), [t])
      const [toasts, setToasts] = React.useState([])
      const lastAtRef = React.useRef(null)
      const dropBaselineRef = React.useRef(null)
      const dropBaselineCurrencyRef = React.useRef(null)
      const closingRef = React.useRef(new Set())
      const timersRef = React.useRef(new Set())

      const dismiss = React.useCallback((id) => {
        if (closingRef.current.has(id)) return
        closingRef.current.add(id)
        setToasts((prev) => prev.map((toast) => (toast.id === id ? { ...toast, closing: true } : toast)))
        const timer = window.setTimeout(() => {
          setToasts((prev) => prev.filter((toast) => toast.id !== id))
          closingRef.current.delete(id)
        }, 200)
        timersRef.current.add(timer)
      }, [])

      const push = React.useCallback(
        (toast) => {
          setToasts((prev) => [...prev.slice(-3), toast])
          const timer = window.setTimeout(() => dismiss(toast.id), toast.kind === 'large' ? 12000 : 9000)
          timersRef.current.add(timer)
        },
        [dismiss],
      )

      React.useEffect(
        () => () => {
          timersRef.current.forEach((timer) => window.clearTimeout(timer))
          timersRef.current.clear()
        },
        [],
      )

      React.useEffect(() => {
        if (!payload) return
        const events = Array.isArray(payload.events) ? payload.events : []
        const latestAt = events.length
          ? Math.max(...events.map((event) => Number(event && event.at) || 0))
          : 0
        const data = payload.data
        const primary = data && data.primary ? data.primary : null
        const currency = primary && primary.currency ? primary.currency : 'CNY'
        const remaining = primary && Number.isFinite(Number(primary.total)) ? Number(primary.total) : null
        const remainingText = remaining !== null ? `${symbolOf(currency)}${money(remaining)}` : tr('toastUnknown')

        if (lastAtRef.current === null) {
          lastAtRef.current = latestAt
        } else {
          const fresh = events
            .filter((event) => event && Number(event.at) > lastAtRef.current)
            .sort((a, b) => Number(a.at) - Number(b.at))
          for (const event of fresh) {
            const costText = event.cost !== null && event.cost !== undefined && Number.isFinite(Number(event.cost))
              ? `≈${symbolOf(event.currency || currency)}${moneyPrecise(event.cost)}`
              : tr('toastUnknown')
            const tokensText = Number.isFinite(Number(event.tokens)) ? Number(event.tokens).toLocaleString() : '—'
            const eventBalance = Number(event.balance)
            const isDeepSeekEvent = /deepseek/i.test(String(event.provider || ''))
            const eventRemaining = isDeepSeekEvent
              ? remainingText
              : Number.isFinite(eventBalance)
                ? `${symbolOf(event.currency || currency)}${money(eventBalance)}`
                : tr('toastUnknown')
            const body = tr('toastConsumed')
              .replace('{tokens}', tokensText)
              .replace('{cost}', costText)
              .replace('{remaining}', eventRemaining)
            push({
              id: `consume-${event.at}-${event.id}`,
              kind: 'consume',
              title: tr('toastTitle'),
              body,
              note: null,
            })
          }
          lastAtRef.current = latestAt > lastAtRef.current ? latestAt : lastAtRef.current
        }

        if (remaining !== null) {
          if (dropBaselineRef.current === null || dropBaselineCurrencyRef.current !== currency) {
            dropBaselineRef.current = remaining
            dropBaselineCurrencyRef.current = currency
          } else if (remaining >= dropBaselineRef.current) {
            dropBaselineRef.current = remaining
          } else if (dropBaselineRef.current - remaining > dropBaselineRef.current * 0.1) {
            const previous = dropBaselineRef.current
            const dropText = `${symbolOf('CNY')}${money(previous - remaining)}`
            push({
              id: `drop-${Date.now()}`,
              kind: 'large',
              title: tr('largeDropTitle'),
              body: tr('largeDropBody').replace('{amount}', dropText).replace('{balance}', remainingText),
              note: null,
            })
            if (typeof onLargeConsumption === 'function') onLargeConsumption()
            dropBaselineRef.current = remaining
          }
        }

      }, [payload, push, tr, onLargeConsumption])

      if (!toasts.length) return null

      return h(
        'div',
        { className: 'ad-toasts', 'aria-live': 'polite' },
        toasts.map((toast) =>
          h(
            'div',
            { key: toast.id, className: `ad-toast ad-toast-${toast.kind}${toast.closing ? ' ad-toast-out' : ''}`, role: 'status' },
            h('div', { className: 'ad-toast-title' }, toast.title),
            h('div', { className: 'ad-toast-body' }, toast.body),
            toast.note ? h('div', { className: 'ad-toast-note' }, toast.note) : null,
          ),
        ),
      )
    }

    function SidebarWidget({ t }) {
      const tr = (key) => translate(t, key)
      const settings = useSettings()
      const intervalMs = Math.max(3000, (Number(settings.refreshSeconds) || DEFAULT_INTERVAL_SECONDS) * 1000)
      const feed = useBalanceFeed(true, intervalMs)
      const now = useNow(true)
      const [open, setOpen] = React.useState(false)
      const [hovered, setHovered] = React.useState(false)
      const [forceRail, setForceRail] = React.useState(false)
      const hideTimerRef = React.useRef(0)
      const forceTimerRef = React.useRef(0)

      const showRail = () => {
        window.clearTimeout(hideTimerRef.current)
        setHovered(true)
      }
      const hideRail = () => {
        window.clearTimeout(hideTimerRef.current)
        hideTimerRef.current = window.setTimeout(() => setHovered(false), 250)
      }
      const revealRail = React.useCallback(() => {
        setForceRail(true)
        window.clearTimeout(forceTimerRef.current)
        forceTimerRef.current = window.setTimeout(() => setForceRail(false), 15000)
      }, [])
      React.useEffect(
        () => () => {
          window.clearTimeout(hideTimerRef.current)
          window.clearTimeout(forceTimerRef.current)
        },
        [],
      )

      React.useEffect(() => {
        const raw = String(settings.providerJson || '').trim()
        let providers = []
        if (raw) {
          try {
            providers = JSON.parse(raw)
          } catch {
            return undefined
          }
          if (!Array.isArray(providers)) return undefined
        }
        const timer = window.setTimeout(() => {
          window
            .fetch('/dsh-deepseek-balance/providers', {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({ providers }),
            })
            .catch(() => {})
        }, 400)
        return () => window.clearTimeout(timer)
      }, [settings.providerJson])
      const railVisible = !open && (hovered || forceRail)

      const data = feed.payload && feed.payload.data ? feed.payload.data : null
      const primary = data && data.primary ? data.primary : null
      const total = primary ? primary.total : null
      const feedError = feed.clientError || (feed.payload && feed.payload.error)
      const status = feedError ? 'err' : data ? (data.isAvailable === false ? 'err' : 'ok') : 'idle'
      const amount = data ? money(total) : '—'
      const toggleLabel = open ? tr('collapse') : tr('expand')

      const toggle = () => setOpen((value) => !value)

      const rail = h(
        'div',
        {
          className: 'ad-rail',
          title: `${tr('panelTitle')} · ${toggleLabel}`,
          onMouseEnter: showRail,
          onMouseLeave: hideRail,
        },
        h(
          'button',
          {
            type: 'button',
            className: 'ad-fold',
            onClick: toggle,
            'aria-expanded': open ? 'true' : 'false',
            'aria-label': toggleLabel,
            title: toggleLabel,
          },
          h('span', { className: 'ad-fold-line ad-fold-line-up', 'aria-hidden': 'true' }),
          h('span', { className: 'ad-fold-line ad-fold-line-down', 'aria-hidden': 'true' }),
        ),
        h(
          'div',
          {
            className: 'ad-rail-amount',
            role: 'button',
            tabIndex: 0,
            onClick: toggle,
            onKeyDown: (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                toggle()
              }
            },
            'aria-label': `${tr('panelTitle')} ${amount}`,
          },
          h('span', { className: 'ad-rail-value' }, amount),
          h('i', { className: `ad-rail-dot ${status}` }),
        ),
        h('div', { className: 'ad-rail-label' }, 'API'),
      )

      const drawer = h(
        'div',
        { className: `ad-drawer ${open ? 'open' : ''}`, 'aria-hidden': open ? 'false' : 'true' },
        h(
          'div',
          { className: 'ad-drawer-content' },
          h(Dashboard, {
            loading: feed.loading,
            syncing: feed.syncing,
            payload: feed.payload,
            clientError: feed.clientError,
            receivedAt: feed.receivedAt,
            settings,
            t,
            now,
          }),
        ),
        h(
          'button',
          {
            type: 'button',
            className: 'ad-drawer-close',
            onClick: () => setOpen(false),
            'aria-label': tr('collapse'),
            title: tr('collapse'),
          },
          h('span', { className: 'ad-close-line ad-close-line-up', 'aria-hidden': 'true' }),
          h('span', { className: 'ad-close-line ad-close-line-down', 'aria-hidden': 'true' }),
        ),
      )

      return h(
        Fragment,
        null,
        h(StyleTag),
        h(ToastCenter, { t, payload: feed.payload, onLargeConsumption: revealRail }),
        open
          ? null
          : h(
              'div',
              { className: `ad-rail-root ${railVisible ? 'visible' : ''} ${forceRail ? 'force' : ''}` },
              h('div', {
                className: 'ad-rail-hotzone',
                onMouseEnter: showRail,
                onMouseLeave: hideRail,
                title: tr('railHint'),
              }),
              rail,
            ),
        drawer,
      )
    }

    class FloatingBoundary extends React.Component {
      constructor(props) {
        super(props)
        this.state = { error: null }
      }

      static getDerivedStateFromError(error) {
        return { error }
      }

      componentDidCatch(error, info) {
        try {
          console.error('[api-detection] floating widget crashed', error, info && info.componentStack)
        } catch {
          /* ignore logging failures */
        }
      }

      render() {
        if (this.state.error) {
          return h(
            'div',
            { className: 'ad-error-fallback', role: 'alert' },
            h('div', { className: 'ad-error-fallback-title' }, 'API Detection'),
            h('div', { className: 'ad-error-fallback-text' }, String((this.state.error && this.state.error.message) || this.state.error)),
          )
        }
        return this.props.children
      }
    }

    function Switch({ checked, onChange, label }) {
      return h('button', {
        type: 'button',
        className: 'ad-switch',
        role: 'switch',
        'aria-checked': checked ? 'true' : 'false',
        'aria-label': label,
        onClick: () => onChange(!checked),
      })
    }

    function Row({ title, desc, children }) {
      return h(
        'div',
        { className: 'ad-row' },
        h(
          'div',
          { className: 'ad-row-text' },
          h('div', { className: 'ad-row-title' }, title),
          desc ? h('div', { className: 'ad-row-desc' }, desc) : null,
        ),
        h('div', { className: 'ad-row-control' }, children),
      )
    }

    function ToggleRow({ title, desc, checked, onChange }) {
      return h(Row, { title, desc }, h(Switch, { checked, onChange, label: title }))
    }

    function SelectRow({ title, desc, value, onChange, options }) {
      return h(
        Row,
        { title, desc },
        h(
          'select',
          { className: 'ad-select', value, onChange: (event) => onChange(event.target.value) },
          options.map((option) => h('option', { key: option.value, value: option.value }, option.label)),
        ),
      )
    }

    function RangeRow({ title, desc, value, min, max, step = 1, suffix = '', onChange }) {
      return h(
        Row,
        { title, desc },
        h(
          'div',
          { className: 'ad-range' },
          h('input', {
            type: 'range',
            min,
            max,
            step,
            value,
            'aria-label': title,
            onChange: (event) => onChange(Number(event.target.value)),
          }),
          h('span', { className: 'ad-range-value' }, `${value}${suffix}`),
        ),
      )
    }

    function PreviewCard({ settings, tr, cache }) {
      const primary = cache && cache.primary
        ? cache.primary
        : { currency: 'CNY', total: '12.83', toppedUp: '13.63', granted: '0.00' }
      const symbol = symbolOf(primary.currency)
      const stats = []
      if (settings.showTopUp) stats.push({ key: 'topUp', label: tr('topUp'), value: `${symbol}${money(primary.toppedUp)}` })
      if (settings.showGranted) stats.push({ key: 'granted', label: tr('granted'), value: `${symbol}${money(primary.granted)}` })
      if (settings.showConsumed) stats.push({ key: 'todaySpend', label: tr('todaySpend'), value: `${symbol}0.80` })
      if (settings.showTokens) stats.push({ key: 'todayTokens', label: tr('todayTokens'), value: '12.3K' })
      if (settings.showRequests) stats.push({ key: 'requests', label: tr('requests'), value: '128' })

      return h(
        'div',
        { className: 'ad-preview-card' },
        h(
          'div',
          { className: 'ad-preview-top' },
          h('span', { className: 'ad-preview-title' }, tr('panelTitle')),
          settings.showStatus
            ? h('span', { className: 'ad-preview-live' }, h('i', { className: 'ad-dot ok' }), tr('live'))
            : null,
        ),
        settings.showTotal ? h('div', { className: 'ad-preview-total' }, `${symbol}${money(primary.total)}`) : null,
        stats.length
          ? h(
              'div',
              { className: 'ad-preview-grid' },
              stats.map((stat) =>
                h('div', { key: stat.key }, h('span', null, stat.label), h('b', null, stat.value)),
              ),
            )
          : null,
        settings.showChart
          ? h(
              'svg',
              { className: 'ad-preview-chart', viewBox: '0 0 320 44', preserveAspectRatio: 'none', 'aria-hidden': 'true' },
              h('path', {
                d: 'M2 34 L42 30 L82 32 L122 24 L162 27 L202 18 L242 21 L282 12 L318 15',
                fill: 'none',
                stroke: 'currentColor',
                strokeWidth: 1.8,
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                vectorEffect: 'non-scaling-stroke',
              }),
            )
          : null,
        settings.showMeta || settings.showCountdown
          ? h(
              'div',
              { className: 'ad-preview-foot' },
              settings.showMeta ? h('span', null, tr('officialSource')) : null,
              settings.showCountdown
                ? h('span', null, tr('autoSync').replace('{n}', String(settings.refreshSeconds)))
                : null,
            )
          : null,
        !settings.showTotal && !stats.length && !settings.showChart && !settings.showMeta && !settings.showCountdown
          ? h('div', { className: 'ad-preview-empty' }, tr('previewEmpty'))
          : null,
      )
    }

    function SettingsPage({ t, close }) {
      const tr = (key) => translate(t, key)
      const settings = useSettings()
      const cache = React.useSyncExternalStore(balanceCache.subscribe, balanceCache.getSnapshot)
      const update = settingsStore.update

      const refreshOptions = [3, 5, 10, 20].map((seconds) => ({
        value: String(seconds),
        label: tr('seconds').replace('{n}', String(seconds)),
      }))
      const requestOptions = [
        { value: 'deepseek', label: tr('requestModeDeepSeek') },
        { value: 'all', label: tr('requestModeAll') },
      ]

      return h(
        'div',
        { className: 'ad-settings' },
        h(StyleTag),
        h(
          'div',
          { className: 'ad-settings-head' },
          h(
            'div',
            null,
            h('h2', null, 'API Detection'),
            h('p', { className: 'ad-settings-sub' }, tr('settingsSubtitle')),
          ),
        ),
        h('p', { className: 'ad-saved' }, tr('autoSaved')),
        h(
          'div',
          { className: 'ad-preview-sticky' },
          h(
            'section',
            { className: 'ad-section' },
            h(
              'div',
              { className: 'ad-section-head' },
              h('h3', null, tr('preview')),
              h('span', null, `${tr('previewLinked')} · ${tr('previewHint')}`),
            ),
            h('div', { className: 'ad-preview' }, h(PreviewCard, { settings, tr, cache })),
          ),
        ),
        h(
          'section',
          { className: 'ad-section' },
          h('div', { className: 'ad-section-head' }, h('h3', null, tr('sectionDisplay'))),
          h(ToggleRow, {
            title: tr('showTotal'),
            desc: tr('showTotalDesc'),
            checked: settings.showTotal,
            onChange: (value) => update({ showTotal: value }),
          }),
          h(ToggleRow, {
            title: tr('showTopUp'),
            desc: tr('showTopUpDesc'),
            checked: settings.showTopUp,
            onChange: (value) => update({ showTopUp: value }),
          }),
          h(ToggleRow, {
            title: tr('showTodaySpend'),
            desc: tr('showTodaySpendDesc'),
            checked: settings.showConsumed,
            onChange: (value) => update({ showConsumed: value }),
          }),
          h(ToggleRow, {
            title: tr('showRequests'),
            desc: tr('showRequestsDesc'),
            checked: settings.showRequests,
            onChange: (value) => update({ showRequests: value }),
          }),
          h(ToggleRow, {
            title: tr('showTokens'),
            desc: tr('showTokensDesc'),
            checked: settings.showTokens,
            onChange: (value) => update({ showTokens: value }),
          }),
          h(ToggleRow, {
            title: tr('showChart'),
            desc: tr('showChartDesc'),
            checked: settings.showChart,
            onChange: (value) => update({ showChart: value }),
          }),
          h(ToggleRow, {
            title: tr('showStatus'),
            desc: tr('showStatusDesc'),
            checked: settings.showStatus,
            onChange: (value) => update({ showStatus: value }),
          }),
          h(ToggleRow, {
            title: tr('showMeta'),
            desc: tr('showMetaDesc'),
            checked: settings.showMeta,
            onChange: (value) => update({ showMeta: value }),
          }),
          h(ToggleRow, {
            title: tr('showCountdown'),
            desc: tr('showCountdownDesc'),
            checked: settings.showCountdown,
            onChange: (value) => update({ showCountdown: value }),
          }),
          h(ToggleRow, {
            title: tr('showGranted'),
            desc: tr('showGrantedDesc'),
            checked: settings.showGranted,
            onChange: (value) => update({ showGranted: value }),
          }),
        ),
        h(
          'section',
          { className: 'ad-section' },
          h('div', { className: 'ad-section-head' }, h('h3', null, tr('sectionData'))),
          h(SelectRow, {
            title: tr('refreshRate'),
            desc: tr('refreshRateDesc'),
            value: String(settings.refreshSeconds),
            onChange: (value) => update({ refreshSeconds: Number(value) }),
            options: refreshOptions,
          }),
          h(SelectRow, {
            title: tr('requestMode'),
            desc: tr('requestModeDesc'),
            value: settings.requestMode,
            onChange: (value) => update({ requestMode: value }),
            options: requestOptions,
          }),
          h('p', { className: 'ad-note' }, tr('requestNote')),
          h('p', { className: 'ad-note' }, tr('todaySpendNote')),
          h('p', { className: 'ad-note' }, tr('platformLoginHint')),
          h('p', { className: 'ad-note' }, tr('alertsNote')),
        ),
        h(
          'section',
          { className: 'ad-section' },
          h('div', { className: 'ad-section-head' }, h('h3', null, tr('providersSection'))),
          h('p', { className: 'ad-note' }, tr('providersHint')),
          h('textarea', {
            className: 'ad-providers-json',
            value: settings.providerJson,
            placeholder: tr('providersPlaceholder'),
            spellCheck: false,
            onChange: (event) => update({ providerJson: event.target.value }),
          }),
          h('p', { className: 'ad-note' }, tr('providersFormat')),
        ),
        h(
          'section',
          { className: 'ad-section' },
          h('div', { className: 'ad-section-head' }, h('h3', null, tr('panelSection'))),
          h(Row, { title: tr('panelLocation'), desc: tr('panelLocationDesc') }),
          h('p', { className: 'ad-note' }, tr('collapseHint')),
        ),
        h(
          'section',
          { className: 'ad-section' },
          h(
            'div',
            { className: 'ad-reset-row' },
            h(
              'div',
              { className: 'ad-row-text' },
              h('div', { className: 'ad-row-title' }, tr('reset')),
              h('div', { className: 'ad-row-desc' }, tr('resetDesc')),
            ),
            h('button', { type: 'button', className: 'ad-btn', onClick: () => settingsStore.reset() }, tr('reset')),
          ),
        ),
      )
    }

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        ctx.effect(() => ctx.locale.register(NS, DICT), 'api-detection: dictionaries')

        ctx.slots.inject('shell.overlay', () =>
          ctx.slots.register(
            { name: 'shell.overlay', id: 'api-detection', order: 40, locale: NS },
            (props) => h(FloatingBoundary, null, h(SidebarWidget, props)),
          ),
        )

        ctx.slots.inject('settings.section', () =>
          ctx.slots.register(
            {
              name: 'settings.section',
              id: 'api-detection',
              order: 30,
              label: () => 'API Detection',
              locale: NS,
            },
            (props) => h(SettingsPage, props),
          ),
        )
      },
    }
  },
})
