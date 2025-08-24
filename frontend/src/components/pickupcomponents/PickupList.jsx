// src/components/pickups/PickupList.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPickups } from '../../store/pickupSlice';
import AssignModal from './AssignModal'; // you can create this to handle assignment
import PickupItem from './PickupItems'; // component to display each pickup item

export default function PickupList() {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.pickup);
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPickups());
    }
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
      <div className="text-center text-red-600 mt-10">
        Error loading pickups: {error}
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Pending Pickups</h1>
      {list.length === 0 ? (
        <p className="text-gray-500">No pickup requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Bin ID</th>
                <th>Requester</th>
                <th>Scheduled For</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
    <tbody>
     {list.map((pickup) => (
     <PickupItem
      key={pickup.id}
      pickup={pickup}
      onAssign={(p) => {
        setSelected(p);
        setIsModalOpen(true);
      }}
      onView={(p) => {
        // navigate or open view modal
      }}
    />
  ))}
  </tbody>
          </table>
        </div>
      )}

      {/* Assignment Modal */}
      {isModalOpen && (
        <AssignModal
          pickup={selected}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
