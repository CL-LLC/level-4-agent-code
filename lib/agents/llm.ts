/**
 * llm.ts
 * --------------------------------------------------------------------
 * This module chooses which Large Language Model (LLM) provider to use
 * based on environment variables and returns a model instance for
 * the rest of the code to call.
 *
 * Supported providers:
 *  - OpenAI (using the openai compatibility from '@ai-sdk/openai')
 *  - Anthropic (using '@ai-sdk/anthropic')
 *  - OpenRouter (using the openai compatibility, but with a default model of "deepseek-r1-disitill-qwen-32b")
 *
 * The environment variables are:
 *   - LLM_PROVIDER: "openai" (default), "anthropic", or "openrouter"
 *   - OPENAI_API_KEY
 *   - ANTHROPIC_API_KEY
 *   - LLM_MODEL: (optional) override default model
 *
 * e.g.:
 *   LLM_PROVIDER=openai
 *   OPENAI_API_KEY=<your openai key>
 *   LLM_MODEL=gpt-4
 *
 *   or
 *
 *   LLM_PROVIDER=anthropic
 *   ANTHROPIC_API_KEY=<your anthropic key>
 *   LLM_MODEL=claude-2
 *
 *   or
 *
 *   LLM_PROVIDER=openrouter
 *   OPENAI_API_KEY=<your openai key>
 *   LLM_MODEL=deepseek-r1-disitill-qwen-32b
 * --------------------------------------------------------------------
 */

import { createAnthropic } from "@ai-sdk/anthropic"
import { createOpenAI } from "@ai-sdk/openai"

/**
 * getLLMModel:
 * ------------------------------------------------------------------
 * Checks the environment variables to decide which LLM provider
 * to return. Throws an error if no valid API key is found.
 *
 * For Anthropic, the default model is "claude-3-5-sonnet-latest".
 * For OpenRouter, the default model is "deepseek-r1-disitill-qwen-32b".
 * For OpenAI, the default model is "o3-mini" (but you can override).
 */
export function getLLMModel() {
  const provider = process.env.LLM_PROVIDER || "openai"

  const openAIDefaultModel = "o3-mini"
  const anthropicDefaultModel = "claude-3-5-sonnet-latest"
  const openrouterDefaultModel = "deepseek-r1-disitill-qwen-32b"

  if (provider === "anthropic") {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error("Missing ANTHROPIC_API_KEY.")
    }
    const anthropic = createAnthropic({
      apiKey: process.env.ANTHROPIC_API_KEY
    })
    return anthropic(process.env.LLM_MODEL || anthropicDefaultModel)
  }

  if (provider === "openrouter") {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("Missing OPENAI_API_KEY.")
    }
    const openai = createOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      compatibility: "strict"
    })
    return openai(process.env.LLM_MODEL || openrouterDefaultModel)
  }

  // Default path: OpenAI
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY.")
  }
  const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    compatibility: "strict"
  })
  return openai(process.env.LLM_MODEL || openAIDefaultModel)
}
