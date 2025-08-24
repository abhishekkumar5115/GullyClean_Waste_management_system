// src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 p-6">
      <h1 className="text-6xl font-extrabold mb-4">404</h1>
      <p className="text-xl mb-6">Oops! The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="btn btn-primary">
        Go to Home
      </Link>
    </div>
  );
}
