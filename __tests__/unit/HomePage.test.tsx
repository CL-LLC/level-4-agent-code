import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '@/app/page';

describe('HomePage', () => {
  it('renders navigation with LLM Settings link', async () => {
    // HomePage is an async server component
    const page = await HomePage();
    render(page);

    // Find the LLM Settings link
    const llmLink = screen.getByRole('link', { name: /LLM Settings/i });
    expect(llmLink).toBeInTheDocument();
    expect(llmLink).toHaveAttribute('href', '/settings/llm-provider');
  });
});
