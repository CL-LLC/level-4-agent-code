import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LlmProviderSettings from '@/app/settings/llm-provider';

// Helper to update input/select values
const changeEvent = (element: HTMLElement, value: string) => {
  fireEvent.change(element, { target: { value } });
};

describe('LlmProviderSettings Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders with default state when localStorage is empty', () => {
    render(<LlmProviderSettings />);
    
    // Check header
    expect(screen.getByText(/LLM Provider Settings/i)).toBeInTheDocument();

    // Check default provider select is 'openai'
    const providerSelect = screen.getByLabelText(/LLM Provider/i) as HTMLSelectElement;
    expect(providerSelect.value).toBe('openai');

    // Check model input is empty
    const modelInput = screen.getByLabelText(/Model Name/i) as HTMLInputElement;
    expect(modelInput.value).toBe('');
  });

  it('updates model field automatically when provider is changed to openrouter', () => {
    render(<LlmProviderSettings />);
    
    const providerSelect = screen.getByLabelText(/LLM Provider/i) as HTMLSelectElement;
    const modelInput = screen.getByLabelText(/Model Name/i) as HTMLInputElement;

    // Change provider to openrouter
    changeEvent(providerSelect, 'openrouter');
    
    // The model input should update to default for openrouter
    expect(modelInput.value).toBe('deepseek-r1-disitill-qwen-32b');
  });

  it('saves settings on form submission and displays a confirmation message', async () => {
    jest.useFakeTimers();
    render(<LlmProviderSettings />);
    
    const providerSelect = screen.getByLabelText(/LLM Provider/i) as HTMLSelectElement;
    const modelInput = screen.getByLabelText(/Model Name/i) as HTMLInputElement;
    
    // Change provider to anthropic and set a custom model
    changeEvent(providerSelect, 'anthropic');
    changeEvent(modelInput, 'custom-model');

    // Submit the form by clicking the Save Settings button
    const saveButton = screen.getByRole('button', { name: /Save Settings/i });
    fireEvent.click(saveButton);

    // Check localStorage has been updated
    expect(localStorage.getItem('llmProvider')).toBe('anthropic');
    expect(localStorage.getItem('llmModel')).toBe('custom-model');

    // Confirmation message should appear
    const confirmation = screen.getByText(/Settings have been saved\./i);
    expect(confirmation).toBeInTheDocument();

    // Fast-forward timers to clear the message after 3 seconds
    jest.advanceTimersByTime(3000);

    await waitFor(() => {
      expect(screen.queryByText(/Settings have been saved\./i)).not.toBeInTheDocument();
    });

    jest.useRealTimers();
  });

  it('loads saved settings from localStorage on mount', () => {
    // Pre-populate localStorage
    localStorage.setItem('llmProvider', 'openrouter');
    localStorage.setItem('llmModel', 'pre-saved-model');

    render(<LlmProviderSettings />);

    // For openrouter, even if a saved value exists, the default should be applied if none provided
    const providerSelect = screen.getByLabelText(/LLM Provider/i) as HTMLSelectElement;
    const modelInput = screen.getByLabelText(/Model Name/i) as HTMLInputElement;
    
    expect(providerSelect.value).toBe('openrouter');
    // Model should be default for openrouter if not explicitly set
    expect(modelInput.value).toBe('pre-saved-model' || 'deepseek-r1-disitill-qwen-32b');
  });
});
