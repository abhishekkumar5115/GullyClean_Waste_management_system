import React,{useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import { fetchBins } from '../../store/binSlice'
import BinItems from './BinItems'

function BinList() {
    const dispatch = useDispatch();
    const { bins, status, error } = useSelector((state) => state.bin);

    useEffect(() => {
        if (status === "idle") {
          dispatch(fetchBins());
        }
    }, [status, dispatch]);

    if (status === "loading") {
        return (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        );
    }

    if (status === "failed") {
        return (
          <div className="text-center text-red-600 mt-10">
            Error loading bins: {error}
          </div>
        );
    }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {bins.map((bin) => (
        <div
          key={bin.id}
          className={`border p-4 rounded-lg shadow ${
            bin.status === 'full' ? 'bg-red-100' : 'bg-green-100'
          }`}
        >
          <h2 className="text-xl font-bold">Bin ID: {bin.id}</h2>
          <p>Status: <span className="font-semibold">{bin.status}</span></p>
          <p>Location: {bin.location}</p>
          <p>Last Emptied: {bin.lastEmptied || 'N/A'}</p>
        </div>
      ))}
    </div>
  )
}

export default BinList