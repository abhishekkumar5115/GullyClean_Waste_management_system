// src/components/worker/WorkerDashboard.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPickups, completePickup } from '../../store/pickupSlice';
import { Clock, ClipboardList } from 'lucide-react';

function AssignmentCard({ pickup, onComplete }) {
  return (
    <div className="card bg-base-100 shadow-md mb-4">
      <div className="card-body">
        <div className="flex justify-between items-start">
          <h2 className="card-title flex items-center">
            <ClipboardList className="mr-2 h-5 w-5 text-green-600" />
            Pickup #{pickup.id}
          </h2>
          <span className="badge badge-info">{pickup.status.toUpperCase()}</span>
        </div>

        <p className="flex items-center mt-2">
          <span className="font-medium mr-1">Bin:</span> #{pickup.binId}
        </p>

        <p className="flex items-center mt-2">
          <Clock className="mr-1 h-4 w-4 text-gray-600" />
          {new Date(pickup.requestedDate).toLocaleString()}
        </p>

        <div className="card-actions justify-end mt-4">
          <button
            onClick={() => onComplete(pickup.id)}
            className="btn btn-success btn-sm"
          >
            Mark Complete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function WorkerDashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { list: pickups, status, error } = useSelector((state) => state.pickup);

  // Load pickups once
  useEffect(() => {
    if (status === 'idle') dispatch(fetchPickups());
  }, [status, dispatch]);

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="text-center text-red-500 mt-10">
        Error loading assignments: {error}
      </div>
    );
  }

  // Filter to only this worker’s assigned, pending pickups for today
  const today = new Date().toDateString();
  const myAssignments = pickups.filter(
    (p) =>
      p.assignedTo === user.id &&
      p.status === 'assigned' &&
      new Date(p.requestedDate).toDateString() === today
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Hello, {user.name}. Your Assignments for {today}:
      </h1>

      {myAssignments.length === 0 ? (
        <p className="text-gray-500">You have no assignments for today.</p>
      ) : (
        myAssignments.map((pickup) => (
          <AssignmentCard
            key={pickup.id}
            pickup={pickup}
            onComplete={(id) => dispatch(completePickup(id))}
          />
        ))
      )}
    </div>
  );
}
