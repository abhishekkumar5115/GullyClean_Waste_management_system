// src/components/pickups/PickupRequestForm.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPickup } from '../../store/pickupSlice';
import { useNavigate } from 'react-router-dom';

export default function PickupRequestForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bins } = useSelector((state) => state.bin);
  const { status, error } = useSelector((state) => state.pickup);

  const [form, setForm] = useState({
    binId: '',
    requestedDate: '',
    notes: '',
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createPickup(form)).unwrap();
      navigate('/thank-you'); // or wherever
    } catch (err) {
      console.error('Create pickup failed:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 space-y-4 bg-base-100 shadow-md rounded">
      <h2 className="text-2xl font-bold">Request a Bin Pickup</h2>

      <div className="form-control">
        <label className="label" htmlFor="binId">
          <span className="label-text">Enter BinId</span>
        </label>
        <br />
        <input
          type = 'text'
          id = "binId"
          name = "binId"
          value = {form.binId}
          onChange = {handleChange}
          required
          className = "input input-bordered"
          />
      </div>

      <div className="form-control">
        <label className="label" htmlFor="requestedDate">
          <span className="label-text">Pickup Date & Time</span>
        </label>
        <br/>
        <input
          type="datetime-local"
          id="requestedDate"
          name="requestedDate"
          value={form.requestedDate}
          onChange={handleChange}
          required
          className="input input-bordered"
        />
      </div>

      <div className="form-control">
        <label className="label" htmlFor="notes">
          <span className="label-text">Additional Notes</span>
        </label>
        <br/>
        <textarea
          id="notes"
          name="notes"
          value={form.notes}
          onChange={handleChange}
          className="textarea textarea-bordered"
          placeholder="Any special instructions or details"
        />
      </div>

      {status === 'failed' && (
        <p className="text-red-600">Error: {error}</p>
      )}

      <div className="form-control mt-4">
        <button
          type="submit"
          className={`btn btn-primary ${status === 'loading' ? 'loading' : ''}`}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Submitting...' : 'Request Pickup'}
        </button>
      </div>
    </form>
  );
}
