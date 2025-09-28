import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Battery, BatteryFull, BatteryMedium, Calendar } from 'lucide-react';

const BinCard = ({ bin }) => {
  const statusConfig = {
    empty: { 
      color: 'bg-green-100 text-green-800 border-green-200', 
      label: 'Empty', 
      icon: <Battery size={20} className="text-green-600"/> 
    },
    'half-full': { 
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
      label: 'Half Full', 
      icon: <BatteryMedium size={20} className="text-yellow-600"/> 
    },
    full: { 
      color: 'bg-red-100 text-red-800 border-red-200', 
      label: 'Full', 
      icon: <BatteryFull size={20} className="text-red-600"/> 
    },
  };

  const currentStatus = statusConfig[bin.status] || { 
    color: 'bg-gray-100 text-gray-800 border-gray-200', 
    label: 'Unknown', 
    icon: <Battery size={20} className="text-gray-600"/> 
  };

  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 transform hover:-translate-y-2 rounded-2xl overflow-hidden group">
      <div className="card-body p-5">
        <div className="flex justify-between items-center">
            <h2 className="card-title font-bold text-xl">Bin #{bin._id.substring(18)}</h2>
            <div className={`badge ${currentStatus.color} border font-semibold p-3 flex gap-1 items-center`}>
              {currentStatus.icon}
              {currentStatus.label}
            </div>
        </div>
        <p className="flex items-center gap-2 text-neutral-600 mt-2">
          <MapPin size={16} className="text-primary" /> 
          {bin.location}
        </p>
        <p className="text-sm text-neutral-400 mt-1 flex items-center gap-2">
          <Calendar size={14} />
          Last Emptied: {bin.lastEmptied ? new Date(bin.lastEmptied).toLocaleString() : 'N/A'}
        </p>
        <div className="card-actions justify-end mt-4">
          <Link to={`/bins/${bin._id}`} className="btn btn-secondary btn-sm group-hover:btn-primary transition-colors">
            View Details 
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BinCard;