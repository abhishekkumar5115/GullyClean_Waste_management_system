// src/pages/WorkerDashboardPage.jsx
import React from 'react';
import WorkerDashboard from '../components/workercomponents/WorkerDashboard';

export default function WorkerDashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">My Assignments</h1>
      <WorkerDashboard />
    </div>
  );
}
