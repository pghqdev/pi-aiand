import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

/**
 * ai& Provider Extension for pi
 *
 * Registers ai& (https://aiand.com) as an OpenAI-compatible inference provider.
 *
 * Authentication:
 *   Run `pi --login aiand` and enter your API key when prompted.
 *   Or pass `--api-key sk-...` on the CLI.
 *
 * Usage:
 *   pi --model deepseek-ai/deepseek-v4-flash "your prompt"
 *
 * The provider supports dynamic model discovery via GET /v1/models if you
 * prefer to fetch instead of hardcode. This extension uses a static list for
 * fast startup and offline availability.
 */

async function loginAiand(callbacks: any) {
	const key = await callbacks.onPrompt({ message: "Enter your ai& API key:" });
	return {
		refresh: key,
		access: key,
		expires: Date.now() + 100 * 365 * 24 * 60 * 60 * 1000, // 100 years
	};
}

async function refreshAiand(credentials: any) {
	return credentials; // API keys don't expire
}

function getApiKey(credentials: any) {
	return credentials.access;
}

export default function (pi: ExtensionAPI) {
	pi.registerProvider("aiand", {
		name: "aiand",
		baseUrl: "https://api.aiand.com/v1",
		api: "openai-completions",
		apiKey: "$AIAND_API_KEY",
		authHeader: true,
		oauth: {
			name: "aiand",
			login: loginAiand,
			refreshToken: refreshAiand,
			getApiKey,
		},
		models: [
			{
				id: "qwen/qwen3.6-27b",
				name: "Qwen 3.6 27B",
				reasoning: true,
				input: ["text"],
				contextWindow: 262_144,
				maxTokens: 16_384,
				cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
			},
			{
				id: "deepseek-ai/deepseek-v4-flash",
				name: "DeepSeek V4 Flash",
				reasoning: true,
				input: ["text"],
				contextWindow: 1_000_000,
				maxTokens: 16_384,
				cost: { input: 0.15, output: 0.25, cacheRead: 0, cacheWrite: 0 },
			},
			{
				id: "google/gemma-4-31b-it",
				name: "Gemma 4 31B IT",
				reasoning: true,
				input: ["text", "image"],
				contextWindow: 262_144,
				maxTokens: 16_384,
				cost: { input: 0.20, output: 0.50, cacheRead: 0, cacheWrite: 0 },
			},
			{
				id: "openai/gpt-oss-120b",
				name: "GPT-OSS 120B",
				reasoning: true,
				input: ["text"],
				contextWindow: 131_072,
				maxTokens: 16_384,
				cost: { input: 0.15, output: 0.60, cacheRead: 0, cacheWrite: 0 },
			},
			{
				id: "deepseek-ai/deepseek-v4-pro",
				name: "DeepSeek V4 Pro",
				reasoning: true,
				input: ["text"],
				contextWindow: 1_000_000,
				maxTokens: 16_384,
				cost: { input: 1.00, output: 2.50, cacheRead: 0, cacheWrite: 0 },
			},
			{
				id: "moonshotai/kimi-k2.7-code",
				name: "Kimi K2.7 Code",
				reasoning: true,
				input: ["text", "image"],
				contextWindow: 262_144,
				maxTokens: 16_384,
				cost: { input: 0.75, output: 3.50, cacheRead: 0, cacheWrite: 0 },
			},
			{
				id: "moonshotai/kimi-k2.6",
				name: "Kimi K2.6",
				reasoning: true,
				input: ["text", "image"],
				contextWindow: 262_144,
				maxTokens: 16_384,
				cost: { input: 0.85, output: 3.50, cacheRead: 0, cacheWrite: 0 },
			},
			{
				id: "zai-org/glm-5.2",
				name: "GLM 5.2",
				reasoning: true,
				input: ["text"],
				contextWindow: 1_000_000,
				maxTokens: 16_384,
				cost: { input: 1.00, output: 4.00, cacheRead: 0, cacheWrite: 0 },
			},
			{
				id: "zai-org/glm-5.1",
				name: "GLM 5.1",
				reasoning: true,
				input: ["text"],
				contextWindow: 203_000,
				maxTokens: 16_384,
				cost: { input: 1.40, output: 4.40, cacheRead: 0, cacheWrite: 0 },
			},
		],
	});
}
