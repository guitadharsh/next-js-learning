'use client';
import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLoginClick = async () => {
    // Call the NextAuth.js signIn function
    const res = await signIn('credentials', {
      redirect: false, // Prevent automatic redirection on successful sign-in
      email,
      password,
    });

    // Check if the response contains an error and display it
    if (res?.error) {
      setError(res.error); // Set the error message to display to the user
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg p-10 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Login</h1>
        <div className="mb-6">
          <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
            className="w-full mt-1 px-4 py-3 border text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
            className="w-full mt-1 px-4 py-3 border text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        {/* Login Button */}
        <button
          type="button" // Prevent the form from submitting
          onClick={handleLoginClick} // Handle login when clicked
          className="w-full py-3 px-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700"
        >
          Login
        </button>

        {/* Optional Links */}
        <div className="mt-6 text-center">
          <p className="text-lg text-gray-600">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-500 font-bold hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
