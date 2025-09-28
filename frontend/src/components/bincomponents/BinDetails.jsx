import React from 'react';
import { MapPin, BatteryFull, BatteryMedium, Battery, Clock, Calendar, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';

const BinDetails = ({ bin }) => {
    
    const statusConfig = {
        empty: { 
          color: 'text-success', 
          label: 'Empty', 
          icon: <Battery className="inline-block mr-2 text-green-500"/> 
        },
        'half-full': { 
          color: 'text-warning', 
          label: 'Half Full', 
          icon: <BatteryMedium className="inline-block mr-2 text-yellow-500"/> 
        },
        full: { 
          color: 'text-error', 
          label: 'Full', 
          icon: <BatteryFull className="inline-block mr-2 text-red-500"/> 
        },
    };

    const currentStatus = statusConfig[bin.status] || { 
      color: 'text-gray-500', 
      label: 'Unknown', 
      icon: null 
    };

    return (
        <div className="card lg:card-side bg-base-100 shadow-xl rounded-2xl overflow-hidden">
            <div className="card-body">
                <h2 className="card-title text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Bin #{bin._id.substring(18)}
                </h2>
                <p className="flex items-center gap-2 text-lg mt-4">
                  <MapPin className="text-primary"/> 
                  {bin.location}
                </p>
                
                <div className="divider my-4"></div>
                
                <div className="stats bg-base-200 shadow rounded-lg">
                    <div className="stat">
                        <div className="stat-figure text-primary">
                            <Navigation size={30} />
                        </div>
                        <div className="stat-title">Status</div>
                        <div className={`stat-value text-2xl ${currentStatus.color}`}>
                            {currentStatus.icon}
                            {currentStatus.label}
                        </div>
                    </div>
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <Calendar size={30} />
                        </div>
                        <div className="stat-title">Last Emptied</div>
                        <div className="stat-value text-xl">
                            <Clock className="inline-block mr-2"/>
                            {bin.lastEmptied ? new Date(bin.lastEmptied).toLocaleDateString() : 'N/A'}
                        </div>
                    </div>
                </div>

                <div className="card-actions justify-end mt-6">
                    <Link 
                      to={`/request-pickup?binId=${bin._id}`} 
                      className="btn btn-secondary btn-wide hover:shadow-lg transform hover:-translate-y-1 transition-all"
                    >
                        Request Pickup for this Bin
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BinDetails;