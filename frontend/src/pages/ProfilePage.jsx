// src/pages/ProfilePage.jsx
import React from 'react';
import Profile from '../components/usercomponents/Profile';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-2xl mx-auto bg-base-100 shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">My Profile</h1>
        <Profile />
      </div>
    </div>
  );
}
