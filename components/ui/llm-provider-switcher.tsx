"use client"

import React, { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

// LLM Provider Switcher Component
// This component provides a form to select an LLM provider (openai, anthropic, or openrouter) 
// and specify a model name. The selected values can be used to override or inform the 
// backend configuration when making API calls for LLM tasks.

export default function LlmProviderSwitcher() {
  // State for provider and model
  const [provider, setProvider] = useState<string>("openai")
  const [model, setModel] = useState<string>("")

  // Optionally load saved values from localStorage on mount
  useEffect(() => {
    const savedProvider = localStorage.getItem("llmProvider")
    const savedModel = localStorage.getItem("llmModel")
    if (savedProvider) {
      setProvider(savedProvider)
      // If provider is openrouter, use a default model if none saved
      if (savedProvider === "openrouter") {
        setModel(savedModel || "deepseek-r1-disitill-qwen-32b")
      } else {
        setModel(savedModel || "")
      }
    }
  }, [])

  // When provider selection changes, update state accordingly
  const handleProviderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value
    setProvider(selected)
    // If provider is 'openrouter', set a default model; otherwise clear the model field
    if (selected === "openrouter") {
      setModel("deepseek-r1-disitill-qwen-32b")
    } else {
      setModel("")
    }
  }

  // Update model state on input change
  const handleModelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModel(e.target.value)
  }

  return (
    <div className={cn("p-4", "flex", "flex-col", "space-y-4", "border", "rounded-md", "shadow-md")}>
      <form className="space-y-4">
        <div>
          <label htmlFor="llm-provider" className="block text-sm font-medium mb-1">
            LLM Provider
          </label>
          <select
            id="llm-provider"
            value={provider}
            onChange={handleProviderChange}
            className={cn("border", "border-gray-300", "rounded-md", "p-2", "w-full")}
          >
            <option value="openai">OpenAI</option>
            <option value="anthropic">Anthropic</option>
            <option value="openrouter">OpenRouter</option>
          </select>
        </div>
        <div>
          <label htmlFor="llm-model" className="block text-sm font-medium mb-1">
            Model Name
          </label>
          <input
            id="llm-model"
            type="text"
            value={model}
            onChange={handleModelChange}
            placeholder={provider === "openrouter" ? "deepseek-r1-disitill-qwen-32b" : "Enter model name"}
            className={cn("border", "border-gray-300", "rounded-md", "p-2", "w-full")}
          />
        </div>
      </form>
      <div className="text-sm text-gray-500">
        Selected provider: {provider}, Model: {model || "default"}
      </div>
      {/* 
        The values selected in this component can be used to override or inform the backend configuration. 
        For instance, when making API requests to an LLM, you might include the chosen provider and model 
        in the request payload or query parameters. This allows dynamic switching between LLM services based on 
        user preference.
      */}
    </div>
  )
}
