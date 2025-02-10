"use client"

import { useState, useEffect } from "react"

export default function LlmProviderSettings() {
  // Initialize state with defaults. Default provider is 'openai' and model is empty,
  // but if 'openrouter' is selected we default to the specified model name.
  const [provider, setProvider] = useState<string>('openai')
  const [model, setModel] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  // On component mount, try to load saved settings from localStorage
  useEffect(() => {
    const savedProvider = localStorage.getItem('llmProvider')
    const savedModel = localStorage.getItem('llmModel')
    if (savedProvider) {
      setProvider(savedProvider)
      if (savedProvider === 'openrouter') {
        // If openrouter is selected and there is no saved model, default it
        setModel(savedModel || 'deepseek-r1-disitill-qwen-32b')
      } else {
        setModel(savedModel || '')
      }
    }
  }, [])

  // When the provider changes, if openrouter is selected, default model
  const handleProviderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value
    setProvider(val)
    if (val === 'openrouter') {
      setModel('deepseek-r1-disitill-qwen-32b')
    } else {
      setModel('')
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    localStorage.setItem('llmProvider', provider)
    localStorage.setItem('llmModel', model)
    setMessage('Settings have been saved.')
    // Clear the confirmation message after 3 seconds
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">LLM Provider Settings</h1>
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div>
          <label htmlFor="provider" className="block text-sm font-medium mb-1">LLM Provider</label>
          <select
            id="provider"
            value={provider}
            onChange={handleProviderChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          >
            <option value="openai">OpenAI</option>
            <option value="anthropic">Anthropic</option>
            <option value="openrouter">OpenRouter</option>
          </select>
        </div>
        <div>
          <label htmlFor="model" className="block text-sm font-medium mb-1">Model Name</label>
          <input
            id="model"
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholder={provider === 'openrouter' ? 'deepseek-r1-disitill-qwen-32b' : 'Enter model name'}
          />
        </div>
        <button type="submit" className="bg-primary text-primary-foreground rounded-md px-4 py-2">
          Save Settings
        </button>
      </form>
      {message && <div className="mt-4 text-green-600">{message}</div>}
    </div>
  )
}
