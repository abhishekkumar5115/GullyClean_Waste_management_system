// src/pages/PickupRequestPage.jsx
import React from 'react';
import PickupRequestForm from '../components/pickupcomponents/PickupRequestForm';

export default function PickupRequestPage() {
  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Request a Pickup</h1>
      <PickupRequestForm />
    </div>
  );
}
