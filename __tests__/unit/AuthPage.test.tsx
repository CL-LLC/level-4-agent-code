import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthPage from '@/app/auth/page';

describe('AuthPage Component', () => {
  beforeEach(() => {
    render(<AuthPage />);
  });

  it('should display the Login form by default', () => {
    // Check that login email and password inputs are rendered
    const loginEmailInput = screen.getByPlaceholderText('Enter your email');
    const loginPasswordInput = screen.getByPlaceholderText('Enter your password');

    expect(loginEmailInput).toBeInTheDocument();
    expect(loginPasswordInput).toBeInTheDocument();

    // Check that the Login button is present
    const loginButton = screen.getByRole('button', { name: /login/i });
    expect(loginButton).toBeInTheDocument();
  });

  it('should show an error if login form is submitted with empty fields', () => {
    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);

    const errorMessage = screen.getByText(/please fill in all fields\./i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('should allow switching to the Register form and display its fields', () => {
    // Switch to Register tab by clicking on the Register trigger
    const registerTrigger = screen.getByRole('button', { name: /register/i });
    fireEvent.click(registerTrigger);

    // Check for registration email input
    const regEmailInput = screen.getByPlaceholderText('Enter your email');
    expect(regEmailInput).toBeInTheDocument();

    // Check for registration password input
    const regPasswordInput = screen.getByPlaceholderText('Enter your password');
    expect(regPasswordInput).toBeInTheDocument();

    // Check for confirm password input
    const regConfirmPasswordInput = screen.getByPlaceholderText('Confirm your password');
    expect(regConfirmPasswordInput).toBeInTheDocument();

    // Check that the Register button is present
    const registerButton = screen.getByRole('button', { name: /register/i });
    expect(registerButton).toBeInTheDocument();
  });

  it('should show an error if registration form is submitted with empty fields', () => {
    // Switch to Register tab
    const registerTrigger = screen.getByRole('button', { name: /register/i });
    fireEvent.click(registerTrigger);

    const registerButton = screen.getByRole('button', { name: /^register$/i });
    fireEvent.click(registerButton);

    const errorMessage = screen.getByText(/please fill in all fields\./i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('should show an error if registration passwords do not match', () => {
    // Switch to Register tab
    const registerTrigger = screen.getByRole('button', { name: /register/i });
    fireEvent.click(registerTrigger);

    // Fill registration form with mismatching passwords
    const regEmailInput = screen.getByPlaceholderText('Enter your email');
    const regPasswordInput = screen.getByPlaceholderText('Enter your password');
    const regConfirmPasswordInput = screen.getByPlaceholderText('Confirm your password');

    fireEvent.change(regEmailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(regPasswordInput, { target: { value: 'password123' } });
    fireEvent.change(regConfirmPasswordInput, { target: { value: 'differentPassword' } });

    const registerButton = screen.getByRole('button', { name: /^register$/i });
    fireEvent.click(registerButton);

    const errorMessage = screen.getByText(/passwords do not match\./i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('should submit the login form successfully when fields are filled', () => {
    // Fill in login inputs
    const loginEmailInput = screen.getByPlaceholderText('Enter your email');
    const loginPasswordInput = screen.getByPlaceholderText('Enter your password');

    fireEvent.change(loginEmailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(loginPasswordInput, { target: { value: 'securePassword' } });

    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);

    // Expect no error message in the login form
    const errorMessage = screen.queryByText(/please fill in all fields\./i);
    expect(errorMessage).not.toBeInTheDocument();
  });

  it('should submit the register form successfully when fields are valid', () => {
    // Switch to Register tab
    const registerTrigger = screen.getByRole('button', { name: /register/i });
    fireEvent.click(registerTrigger);

    // Fill in registration inputs with matching passwords
    const regEmailInput = screen.getByPlaceholderText('Enter your email');
    const regPasswordInput = screen.getByPlaceholderText('Enter your password');
    const regConfirmPasswordInput = screen.getByPlaceholderText('Confirm your password');

    fireEvent.change(regEmailInput, { target: { value: 'newuser@example.com' } });
    fireEvent.change(regPasswordInput, { target: { value: 'newPassword' } });
    fireEvent.change(regConfirmPasswordInput, { target: { value: 'newPassword' } });

    const registerButton = screen.getByRole('button', { name: /^register$/i });
    fireEvent.click(registerButton);

    // Expect no error message in the registration form
    const errorMessage = screen.queryByText(/passwords do not match|please fill in all fields\./i);
    expect(errorMessage).not.toBeInTheDocument();
  });
});
