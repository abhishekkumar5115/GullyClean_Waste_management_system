import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPickup } from '../../store/pickupSlice';
import { addNotification } from '../../store/notificationsSlice';
import { useNavigate } from 'react-router-dom';
import { Send, MapPin, AlertCircle } from 'lucide-react';

const PickupRequestForm = () => {
  const [binId, setBinId] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.pickup);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createPickup({ binId, location, notes }))
      .unwrap()
      .then(() => {
        dispatch(
          addNotification({
            title: 'Success',
            message: 'Pickup requested successfully!',
            type: 'success',
          })
        );
        navigate('/bins');
      })
      .catch((error) => {
        dispatch(
          addNotification({
            title: 'Error',
            message: error,
            type: 'error',
          })
        );
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-6">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-12">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Request a Pickup
          </h2>
          <p className="text-lg text-gray-600">
            Report a full bin and help keep the city clean 🌱
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Bin ID */}
          <div className="space-y-2">
            <label className=" text-lg font-semibold text-gray-800 flex items-center gap-2">
              <MapPin size={18} />
              Bin ID
            </label>
            <input
              type="text"
              placeholder="e.g. 123, A-45"
              className="w-full px-6 py-4 text-lg border-2 rounded-2xl border-gray-200 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition"
              required
              value={binId}
              onChange={(e) => setBinId(e.target.value)}
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className=" text-lg font-semibold text-gray-800 flex items-center gap-2">
              <MapPin size={18} />
              Location
            </label>
            <input
              type="text"
              placeholder="e.g. Near Main Gate, Block A"
              className="w-full px-6 py-4 text-lg border-2 rounded-2xl border-gray-200 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label className=" text-lg font-semibold text-gray-800 flex items-center gap-2">
              <AlertCircle size={18} />
              Additional Notes (Optional)
            </label>
            <textarea
              rows={4}
              placeholder="e.g. Bin is overflowing behind the main building"
              className="w-full px-6 py-4 text-lg border-2 rounded-2xl border-gray-200 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition resize-none"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={status === 'loading'}
              className={`w-full py-5 px-8 text-xl font-bold text-white rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 transform ${
                status === 'loading'
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:scale-[1.02]'
              }`}
            >
              {status === 'loading' ? (
                <span className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Submit Request
                  <Send size={22} />
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
