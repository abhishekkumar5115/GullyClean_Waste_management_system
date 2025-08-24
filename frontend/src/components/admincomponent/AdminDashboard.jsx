// src/components/admin/AdminDashboard.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBins } from '../../store/binSlice';
import { fetchPickups } from '../../store/pickupSlice';
import { Trash2, MapPin, ClipboardList, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { bins, status: binsStatus } = useSelector((state) => state.bin);
  const { list: pickups, status: pickupsStatus } = useSelector((state) => state.pickup);

  // Fetch data on mount
  useEffect(() => {
    if (binsStatus === 'idle') dispatch(fetchBins());
    if (pickupsStatus === 'idle') dispatch(fetchPickups());
  }, [binsStatus, pickupsStatus, dispatch]);

  // Compute stats
  const totalBins = bins.length;
  const fullBins = bins.filter((b) => b.status === 'full').length;
  const pendingPickups = pickups.filter((p) => p.status === 'pending').length;
  const workersCount = useSelector((state) => state.auth.workers?.length || 0);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-base-100 shadow-md p-4 flex items-center space-x-4">
          <Trash2 className="text-green-600" size={32} />
          <div>
            <p className="text-2xl font-semibold">{totalBins}</p>
            <p className="text-sm text-gray-600">Total Bins</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-md p-4 flex items-center space-x-4">
          <MapPin className="text-red-600" size={32} />
          <div>
            <p className="text-2xl font-semibold">{fullBins}</p>
            <p className="text-sm text-gray-600">Full Bins</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-md p-4 flex items-center space-x-4">
          <ClipboardList className="text-blue-600" size={32} />
          <div>
            <p className="text-2xl font-semibold">{pendingPickups}</p>
            <p className="text-sm text-gray-600">Pending Pickups</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-md p-4 flex items-center space-x-4">
          <Users className="text-purple-600" size={32} />
          <div>
            <p className="text-2xl font-semibold">{workersCount}</p>
            <p className="text-sm text-gray-600">Workers</p>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/admin/bins" className="btn btn-outline btn-success w-full">
          Manage Bins
        </Link>
        <Link to="/admin/assignments" className="btn btn-outline btn-info w-full">
          Assign Pickups
        </Link>
        <Link to="/admin/users" className="btn btn-outline btn-warning w-full">
          Manage Users
        </Link>
      </div>
    </div>
);
}
