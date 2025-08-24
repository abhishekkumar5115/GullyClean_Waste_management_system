// src/components/bins/BinDetail.jsx
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  setBin,
  setFull,
  setEmpty,
  updateLastEmptied,
} from '../../store/binSlice';

import { Clock, MapPin } from 'lucide-react';

export default function BinDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { bins, binData } = useSelector((state) => state.bin);

  // On mount, find the bin in the list and set it in the slice
  useEffect(() => {
    const found = bins.find((b) => String(b.id) === id);
    if (found) {
      dispatch(setBin(found));
    }
  }, [bins, id, dispatch]);

  if (!binData.id) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Bin not found.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Bin Detail: #{binData.id}</h1>

      <div className="space-y-4">
        <p className="flex items-center">
          <MapPin className="mr-2 h-5 w-5 text-green-600" />
          <span className="font-medium">Location:</span>
          <span className="ml-2">{binData.location}</span>
        </p>

        <p className="flex items-center">
          <span className="font-medium">Status:</span>
          <span
            className={`ml-2 badge ${
              binData.status === 'full' ? 'badge-error' : 'badge-success'
            }`}
          >
            {binData.status.toUpperCase()}
          </span>
        </p>

        <p className="flex items-center">
          <Clock className="mr-2 h-5 w-5 text-gray-600" />
          <span className="font-medium">Last Emptied:</span>
          <span className="ml-2">
            {binData.lastEmptied
              ? new Date(binData.lastEmptied).toLocaleString()
              : 'Never'}
          </span>
        </p>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => dispatch(setFull())}
          className="btn btn-error"
        >
          Mark Full
        </button>
        <button
          onClick={() => dispatch(setEmpty())}
          className="btn btn-success"
        >
          Mark Empty
        </button>
        <button
          onClick={() =>
            dispatch(updateLastEmptied(new Date().toISOString()))
          }
          className="btn btn-outline"
        >
          Update Emptied Time
        </button>
      </div>
    </div>
  );
}
