"use client"

import { useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"

export default function LlmProviderSelector() {
  const [provider, setProvider] = useState("openai");

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newProvider = e.target.value;
    setProvider(newProvider);
    try {
      const res = await fetch("/api/update-llm-provider", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider: newProvider })
      });
      if (!res.ok) throw new Error("Failed to update provider");
      toast({ title: "LLM provider updated successfully!" });
    } catch (error) {
      toast({ title: "Error updating provider", variant: "destructive" });
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor="llm-provider" className="font-medium">LLM Provider</label>
      <select
        id="llm-provider"
        value={provider}
        onChange={handleChange}
        className="border rounded px-2 py-1"
      >
        <option value="openai">OpenAI</option>
        <option value="anthropic">Anthropic</option>
        <option value="openrouter">OpenRouter</option>
      </select>
    </div>
  );
}
