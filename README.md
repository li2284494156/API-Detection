# API Detection（DSH 插件）

在工作区左边缘显示 DeepSeek API 余额，并在顶部提示每次模型调用的 token / 余额消耗。

## 交互

- **左侧隐藏余额栏**：默认完全隐藏在屏幕最左侧，只留一条很细的竖线提示。鼠标移到左边缘时滑出，移开后自动缩回，不再遮挡对话。
- **展开统计**：点击余额栏后余额栏消失，统计面板从左侧滑入；面板右侧有一条反向竖线，悬浮变 `<`，点击收回。
- **折叠按钮**：两条等长小竖线，上下端点重合；悬浮时分别旋转 45°，形成 `>`。
- **没有手动刷新按钮**：默认每 5 秒自动同步；可在设置里改成 3/10/20 秒。
- **纯主题色界面**：已移除液态玻璃、背景模糊和高光，统计面板、余额栏和设置预览都使用实色主题背景。

## 顶部提示

- 每次模型调用完成后，顶部中间弹出：
  - 标题：`“token&余额”消耗提示`
  - 内容：本次消耗 token、估算消费余额、当前剩余余额
- 提示消失时有 200ms 的收起动画（上移、缩小、淡出），不是瞬间消失。
- 当余额从上次提醒累计下降超过 10% 时，左侧余额栏会自动滑出 15 秒，并弹出“余额消耗提醒”。
- 已移除“余额不足 ¥10”提示。

## 非 DeepSeek 厂商

Token、请求次数和本次运行消费对所有 provider 都会统计；余额和官方消费没有通用 API，需要按厂商适配。

- **OpenRouter（内置）**：配置 `OPENROUTER_API_KEY` 后自动读取 `/api/v1/credits`，余额 = `total_credits - total_usage`。
- **其他厂商**：在 **设置 → API Detection → 其他厂商** 填写 JSON。示例：

```json
[
  {
    "id": "moonshot",
    "label": "Moonshot",
    "match": "moonshot",
    "url": "https://api.moonshot.cn/v1/users/me/balance",
    "credentialEnv": "MOONSHOT_API_KEY",
    "balancePath": "data.available_balance",
    "currency": "CNY",
    "inputPrice": 0,
    "outputPrice": 0
  }
]
```

字段：

- `match`：匹配 DSH 的 provider 路由（如 `moonshot`、`openrouter`）。
- `url`：余额接口。
- `credentialEnv`：凭据名（凭据库或环境变量）。
- `balancePath`：返回 JSON 中余额字段的点路径；`usagePath` 可选，用于“总额 - 已用”。
- `currency`：币种。
- `inputPrice` / `outputPrice`：每百万 tokens 价格，可选；未配置时消费显示 `—`。

统计面板的“其他厂商”区块会显示各厂商余额，以及本次运行的 tokens、估算消费和请求数。非 DeepSeek 的顶部消耗提示会优先使用该厂商的余额和币种。厂商没有余额接口时，只能统计 token 和请求数。

## 数据

- **DeepSeek 账户余额**：Host 调用官方 `GET https://api.deepseek.com/user/balance`。
- **今日消费 / 今日请求 / 累计消费 / 今日 Token**：登录 DeepSeek 开放平台后读取官方数据：
  - `GET /api/v0/users/get_user_summary`
  - `GET /api/v0/usage/by_api_key/cost?start=…&end=…&tz=…`
  - `GET /api/v0/usage/by_api_key/amount?start=…&end=…&tz=…`
- **未登录平台时**：今日消费回退为本地余额采样差值，API 申请次数回退为本地计数，并标注“本地估算”。
- **余额走势**：Host 在内存中保留最近 720 个采样点。
- **其他厂商**：余额来自配置的 HTTP 接口；消费来自本次运行的 token 用量 × 配置价格；请求数来自 `llm/stream` 本地计数。

> 公开 API Key 只能访问余额接口，不能访问平台账户的用量接口。官方“今日消费/今日请求”需要登录 DeepSeek 开放平台：Harness 设置 → 账户 → 登录。

## 设置：API Detection

- 显示内容：总余额、充值余额、今日消费、API 申请次数、今日 Token、余额走势、可用状态、明细、同步倒计时、赠送余额。
- 数据与刷新：3/5/10/20 秒自动刷新；本地请求计数口径。
- 其他厂商：OpenRouter 内置说明 + 通用余额接口 JSON 配置。
- 侧边栏：位置与收起说明。
- 恢复默认。

设置的实时预览固定在顶部，并与显示项实时联动；设置保存在浏览器 `localStorage`（`dsh.api-detection.settings.v1`）。

## 安装

通过 Harness 的 Plugin Manager 安装本地目录（`plugin_manager` 的 `install_bundle`，target 指向本目录绝对路径）。桌面版 profile 由 Electron 管理，不能用 `dsh plugin add` 直接安装。

## 配置

可在 `cordis.patch.yml` 的 `deepseek-balance` 行覆盖 Host 配置：

| 配置 | 默认值 | 说明 |
| --- | --- | --- |
| `apiKeyEnv` | `DEEPSEEK_API_KEY` | 凭据引用名 |
| `baseUrl` | `https://api.deepseek.com` | 官方 API 根地址 |
| `refreshIntervalMs` | `5000` | Host 建议刷新间隔 |
| `minIntervalMs` | `2000` | Host 端最小缓存时间 |
| `timeoutMs` | `15000` | 上游请求超时 |
| `historyLimit` | `720` | 余额采样点上限 |

平台数据每 30 秒在后台刷新；其他厂商余额每 60 秒刷新。

## 隐私

- API Key、平台会话 token 和其他厂商凭据只在 Host 进程内解析，浏览器拿不到。
- 浏览器只访问同源只读 JSON 路由 `/dsh-deepseek-balance/snapshot.json`；厂商配置通过同源 POST `/dsh-deepseek-balance/providers` 设置，响应不含凭据。
- 余额、采样和本地请求计数只保存在 Host 内存；插件卸载或 Harness 退出后清空。
- 显示设置、厂商配置和侧边栏状态只保存在本浏览器。
