"use client"

import LlmProviderSelector from "@/components/ui/llm-provider-selector"

export default function LlmProviderSettings() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">LLM Provider Settings</h1>
      <LlmProviderSelector />
    </div>
  );
}
