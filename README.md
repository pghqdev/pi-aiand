<div align="center">

# pi-aiand

### The provider extension that adds open-weight models to [pi](https://pi.dev)

[![npm version](https://img.shields.io/npm/v/pi-aiand.svg)](https://www.npmjs.com/package/pi-aiand)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![pi package](https://img.shields.io/badge/pi-package-6C5CE7)](https://pi.dev/packages)

One `pi install` and your agent gains 9 [ai&](https://aiand.com) models — one **free**, a **1M-context** one for **$0.15**, all wired into `/model`. No config, no new SDK.

</div>

## 30-second start

```bash
pi install npm:pi-aiand           # 1. install
export AIAND_API_KEY="sk-..."     # 2. add your key  → console.aiand.com
pi --model qwen/qwen3.6-27b "explain this repo"   # 3. code for free
```

```console
$ pi --model qwen/qwen3.6-27b "add a --json flag to the CLI"

  ● reading  src/cli.ts
  ● editing  src/cli.ts   +14 −2
  ● running  bun test     ✓ 23 passed

  Added `--json`: parses argv, prints structured output, keeps the
  human-readable path as the default. Tests green.

  tokens: 4,812 in · 631 out · cost: $0.00
```

> The `qwen/qwen3.6-27b` model is **free** — input and output. Point pi at it and your agent bill is literally zero.

## What this extension does

- **Registers `aiand` as a pi provider** — Qwen · DeepSeek · Kimi · GLM · Gemma · GPT-OSS show up in `/model` alongside your other providers.
- **Zero config.** No provider block to hand-write, no base URL to look up. `pi install` and you're done.
- **Handles auth for you** — env var, CLI flag, or `pi --login aiand`.
- **Stays current** — new ai& models appear after `pi update`, no code changes.
- **Gives your agent a free option** — `qwen/qwen3.6-27b` runs at $0, so you can leave a coding agent running without watching a meter.

## Models

| Model | Context | Vision | Input / 1M | Output / 1M |
|-------|:-------:|:------:|:----------:|:-----------:|
| `qwen/qwen3.6-27b` | 262K | — | **Free** | **Free** |
| `deepseek-ai/deepseek-v4-flash` | **1M** | — | $0.15 | $0.25 |
| `google/gemma-4-31b-it` | 262K | ✅ | $0.20 | $0.50 |
| `openai/gpt-oss-120b` | 131K | — | $0.15 | $0.60 |
| `deepseek-ai/deepseek-v4-pro` | **1M** | — | $1.00 | $2.50 |
| `moonshotai/kimi-k2.7-code` | 262K | ✅ | $0.75 | $3.50 |
| `moonshotai/kimi-k2.6` | 262K | ✅ | $0.85 | $3.50 |
| `zai-org/glm-5.2` | **1M** | — | $1.00 | $4.00 |
| `zai-org/glm-5.1` | 203K | — | $1.40 | $4.40 |

USD per million tokens. Synced from the [ai& model catalog](https://docs.aiand.com/models/catalog/).

## Usage

```bash
pi                                          # interactive → /model to pick any ai& model
pi --model deepseek-ai/deepseek-v4-flash "refactor this to async/await"
cat src/utils.ts | pi --model openai/gpt-oss-120b "review for bugs"
```

## Authentication

Set an environment variable and you're done:

```bash
export AIAND_API_KEY="sk-your-api-key-here"
```

<details>
<summary>Other ways to authenticate</summary>

**CLI flag**

```bash
pi --api-key sk-... --model deepseek-ai/deepseek-v4-flash "your prompt"
```

**Interactive login**

```bash
pi --login aiand    # paste your key when prompted
```

**Manual `~/.pi/agent/auth.json`**

```json
{
  "aiand": { "type": "api_key", "key": "sk-your-api-key-here" }
}
```

</details>

Get a key at [console.aiand.com](https://console.aiand.com).

## Configuration

None needed. The extension auto-registers `aiand` as an `openai-completions` provider. New ai& models show up under `/model` after `pi update`.

## License

MIT
