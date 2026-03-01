import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBins } from '../../store/binSlice';
import BinCard from './BinCard';
import Spinner from '../common/Spinner';

const BinList = ({ limit }) => {
    const dispatch = useDispatch();
    const { bins, status, error } = useSelector((state) => state.bin);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchBins());
        }
    }, [status, dispatch]);

    if (status === 'loading') {
        return <Spinner />;
    }

    if (status === 'failed') {
        return <div className="text-center text-red-500">{error}</div>;
    }

    const displayBins = limit ? bins.slice(0, limit) : bins;

    return (
        <div>
            {displayBins.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayBins.map((bin) => (
                        <BinCard key={bin._id} bin={bin} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-10">
                    <p className="text-neutral-500">No bins found.</p>
                </div>
            )}
        </div>
    );
};

export default BinList;