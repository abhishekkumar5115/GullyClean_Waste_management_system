import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPickup } from '../../store/pickupSlice';
import { addNotification } from '../../store/notificationsSlice';
import { useNavigate } from 'react-router-dom';
import { Send, MapPin, AlertCircle } from 'lucide-react';

const PickupRequestForm = () => {
    const [binId, setBinId] = useState('');
    const [notes, setNotes] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status } = useSelector(state => state.pickup);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createPickup({ binId, notes }))
            .unwrap()
            .then(() => {
                dispatch(addNotification({ title: 'Success', message: 'Pickup requested successfully!', type: 'success' }));
                navigate('/bins');
            })
            .catch((error) => {
                 dispatch(addNotification({ title: 'Error', message: error, type: 'error' }));
            });
    };

    return (
        <div className="card w-full max-w-lg shadow-2xl bg-base-100 rounded-2xl overflow-hidden">
            <div className="card-body p-6">
                <h2 className="card-title text-2xl mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Request a Pickup
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold flex items-center gap-2">
                                <MapPin size={16} />
                                Bin ID
                            </span>
                        </label>
                        <input 
                            type="text" 
                            placeholder="Enter the ID of the full bin" 
                            className="input input-bordered rounded-lg" 
                            required 
                            value={binId}
                            onChange={(e) => setBinId(e.target.value)}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold flex items-center gap-2">
                                <AlertCircle size={16} />
                                Additional Notes (Optional)
                            </span>
                        </label>
                        <textarea 
                            className="textarea textarea-bordered h-24 rounded-lg" 
                            placeholder="e.g., Bin is overflowing, located behind the main building."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="form-control mt-6">
                        <button 
                          type="submit" 
                          className="btn btn-secondary rounded-lg gap-2 hover:shadow-lg transform hover:-translate-y-1 transition-all"
                          disabled={status === 'loading'}
                        >
                            {status === 'loading' ? (
                                <span className="loading loading-spinner"></span>
                            ) : (
                                <>
                                    Submit Request 
                                    <Send size={16}/>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PickupRequestForm;