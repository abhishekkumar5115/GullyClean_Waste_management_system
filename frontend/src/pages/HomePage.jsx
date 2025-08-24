// src/pages/HomePage.jsx
import React from 'react';
import BinStatusCard from '../components/bincomponents/BinStatusCard';
import PickupRequestForm from '../components/pickupcomponents/Pickuprequestform';
import wasteTruckImage from '../assets/recycling-truck.png'; // Adjust the path as necessary

export default function HomePage() {
  return (
    <div className="p-6 space-y-8">
      {/* Hero Section */}
      <section className="hero bg-base-200 rounded-lg p-8">
        <div className="hero-content flex-col lg:flex-row">
          <div className="lg:w-1/2 space-y-4">
            <h1 className="text-4xl font-bold">Welcome to SmartWaste Manager</h1>
            <p className="py-2 text-lg text-gray-700">
              Manage your neighborhood waste effortlessly. Check bin statuses,
              schedule pickups, and stay informed—all from one place.
            </p>
            <button
              onClick={() => document.getElementById('request-form').scrollIntoView({ behavior: 'smooth' })}
              className="btn btn-primary btn-lg"
            >
              Request a Pickup
            </button>
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <img
              src={wasteTruckImage}
              alt="Waste Truck Illustration"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Bin Status & Request Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Current Bin Status</h2>
          <BinStatusCard />
        </div>
        <div id="request-form">
          <h2 className="text-2xl font-semibold mb-4">Schedule a Pickup</h2>
          <PickupRequestForm />
        </div>
      </div>
    </div>
  );
}
