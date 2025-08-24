import React from 'react';
import LoginForm from '../components/usercomponents/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-6">
      <div className="w-full max-w-md bg-base-100 shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Log In</h2>
        <LoginForm />
      </div>
    </div>
  );
}
