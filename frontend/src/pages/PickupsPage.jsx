// src/pages/PickupsPage.jsx
import React from 'react';
import PickupList from '../components/pickupcomponents/PickupList';

export default function PickupsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Pending Pickup Requests</h1>
      <PickupList />
    </div>
  );
}
