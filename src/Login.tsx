import React, { useState } from 'react';
import { useAuth } from './AuthContext';

/**
 * Login Component
 * Provides user authentication interface with email/password and Google OAuth
 * Handles both login and registration flows in a single component
 */
export function Login() {
  // Form state management
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);  // Toggle between login and signup modes
  const [error, setError] = useState('');           // Error message display
  const [loading, setLoading] = useState(false);    // Loading state for form submission

  // Extract authentication functions from context
  const { login, signup, loginWithGoogle } = useAuth();

  /**
   * Handles form submission for both login and signup
   * Validates password length and calls appropriate auth function
   * Note: Claude AI assisted with form validation and error handling patterns
   */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Basic password validation
    if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    try {
      // Clear any previous errors
      setError('');
      setLoading(true);

      // Call appropriate auth function based on current mode
      if (isSignUp) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
    } catch (error: any) {
      // Display user-friendly error message
      setError('Failed to ' + (isSignUp ? 'create account' : 'sign in'));
    }
    setLoading(false);
  }

  /**
   * Handles Google OAuth login
   * Provides social authentication option for better user experience
   */
  async function handleGoogleLogin() {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
    } catch (error: any) {
      setError('Failed to sign in with Google');
    }
    setLoading(false);
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#1a1a1a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Login Card Container */}
      <div style={{
        backgroundColor: '#2a2a2a',
        padding: '40px',
        borderRadius: '12px',
        width: '400px',
        maxWidth: '90vw'
      }}>
        {/* Dynamic title based on current mode */}
        <h2 style={{
          color: '#fff',
          textAlign: 'center',
          marginBottom: '30px',
          fontSize: '24px'
        }}>
          {isSignUp ? 'Create Account' : 'Sign In'}
        </h2>

        {/* Error Message Display */}
        {error && (
          <div style={{
            backgroundColor: '#ff4444',
            color: '#fff',
            padding: '10px',
            borderRadius: '6px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {/* Email/Password Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Input Field */}
          <div style={{ marginBottom: '20px' }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#333',
                border: '1px solid #555',
                borderRadius: '6px',
                color: '#fff',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Password Input Field */}
          <div style={{ marginBottom: '20px' }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#333',
                border: '1px solid #555',
                borderRadius: '6px',
                color: '#fff',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Submit Button - Dynamic text and disabled state during loading */}
          <button
            disabled={loading}
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#9fef00',
              color: '#000',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginBottom: '15px',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
          </button>
        </form>

        {/* Google OAuth Button */}
        <button
          disabled={loading}
          onClick={handleGoogleLogin}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#4285f4',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom: '20px',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'Loading...' : 'Sign in with Google'}
        </button>

        {/* Mode Toggle - Switch between login and signup */}
        <div style={{ textAlign: 'center' }}>
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            style={{
              background: 'none',
              border: 'none',
              color: '#9fef00',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
}