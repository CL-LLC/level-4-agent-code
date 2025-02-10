import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import LlmProviderSettings from '@/app/settings/llm-provider/page';

// Since LlmProviderSettings uses LlmProviderSelector, we can either render it directly
// or mock it. In this test, we ensure that the page renders the header and the selector label.

describe('LlmProviderSettings Page', () => {
  it('renders the header and the provider selector', () => {
    render(<LlmProviderSettings />);
    
    // Check if header is rendered
    const header = screen.getByText('LLM Provider Settings');
    expect(header).toBeInTheDocument();

    // Check if provider selector label is rendered
    const selectorLabel = screen.getByLabelText('LLM Provider');
    expect(selectorLabel).toBeInTheDocument();
  });
});
