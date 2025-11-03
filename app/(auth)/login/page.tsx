// ######################################################################
// # TEMPORARY FILE FOR LOGIC TESTING - THINH WILL REPLACE WITH REAL UI #
// ######################################################################
"use client";

import { useAuth } from "@/hooks/useAuth";

export default function LoginPagePlaceholder() {
  const { login, isLoggingIn, error } = useAuth();

  const handleFakeLogin = () => {
    // Use fake information to test
    login({ email: 'test@example.com', password: 'password123' });
  };
  
  console.log("Login page rendered. Logging in:", isLoggingIn);
  if (error) {
    console.error("Login Error:", error.message);
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>This is a temporary login page</h1>
      <p>This page is only for testing login logic.</p>
      <button onClick={handleFakeLogin} disabled={isLoggingIn} style={{ padding: '10px', background: 'blue', color: 'white' }}>
        {isLoggingIn ? 'Logging in...' : 'Test Login (Check Console & Network)'}
      </button>
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      <p>After clicking, if successful, will redirect to /profile.</p>
    </div>
  );
}