import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPickups, assignPickup } from '../../store/pickupSlice';
import { fetchWorkers } from '../../store/authSlice';
import Spinner from '../common/spinner';
import { UserCheck, Calendar, MapPin } from 'lucide-react';

const PickupList = () => {
    const dispatch = useDispatch();
    const { pickups, status } = useSelector(state => state.pickup);
    const { workers } = useSelector(state => state.auth);
    const [selectedPickup, setSelectedPickup] = useState(null);
    const [selectedWorker, setSelectedWorker] = useState('');

    useEffect(() => {
        dispatch(fetchPickups());
        dispatch(fetchWorkers());
    }, [dispatch]);
    
    const handleAssign = () => {
        dispatch(assignPickup({ pickupId: selectedPickup._id, workerId: selectedWorker }));
        document.getElementById('assign_modal').close();
    }

    if (status === 'loading') return <Spinner />;

    return (
        <>
            <div className="overflow-x-auto rounded-2xl shadow-lg">
                <table className="table w-full">
                    <thead className="bg-primary text-primary-content">
                        <tr>
                            <th className="rounded-tl-2xl">Bin Location</th>
                            <th>Status</th>
                            <th>Requested By</th>
                            <th>Assigned To</th>
                            <th className="rounded-tr-2xl">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pickups.map(pickup => (
                            <tr key={pickup._id} className="hover:bg-base-200 transition-colors">
                                <td>
                                  <div className="flex items-center gap-2">
                                    <MapPin size={16} className="text-primary" />
                                    {pickup.bin.location}
                                  </div>
                                </td>
                                <td>
                                  <span className={`badge ${
                                      pickup.status === 'pending' ? 'badge-warning' :
                                      pickup.status === 'assigned' ? 'badge-info' : 'badge-success'
                                  }`}>
                                    {pickup.status}
                                  </span>
                                </td>
                                <td>{pickup.user.name}</td>
                                <td>
                                  {pickup.assignedTo ? (
                                    <div className="flex items-center gap-2">
                                      <UserCheck size={16} className="text-success" />
                                      {pickup.assignedTo.name}
                                    </div>
                                  ) : (
                                    'Unassigned'
                                  )}
                                </td>
                                <td>
                                    {pickup.status === 'pending' && (
                                        <button 
                                          className="btn btn-sm btn-primary gap-2"
                                          onClick={() => {
                                              setSelectedPickup(pickup);
                                              document.getElementById('assign_modal').showModal();
                                          }}
                                        >
                                          <UserCheck size={16} />
                                          Assign
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Assign Worker Modal */}
            <dialog id="assign_modal" className="modal">
                <div className="modal-box rounded-2xl">
                    <h3 className="font-bold text-lg">Assign Worker</h3>
                    <div className="py-4">
                        <select 
                          className="select select-bordered w-full rounded-lg" 
                          value={selectedWorker} 
                          onChange={e => setSelectedWorker(e.target.value)}
                        >
                            <option disabled value="">Select a worker</option>
                            {workers.map(worker => (
                                <option key={worker._id} value={worker._id}>{worker.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="modal-action">
                        <button className="btn btn-ghost rounded-lg" onClick={() => document.getElementById('assign_modal').close()}>
                          Cancel
                        </button>
                        <button className="btn btn-primary rounded-lg gap-2" onClick={handleAssign}>
                          <UserCheck size={16} />
                          Assign
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default PickupList;