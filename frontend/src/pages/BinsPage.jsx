import React from 'react';
import BinList from '../components/bincomponents/BinList';

const BinsPage = () => {
    return (
        <div>
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold">All Bins</h1>
                <p className="text-lg text-neutral-500 mt-2">Here is a live overview of all smart bins in the city.</p>
            </div>
            <BinList />
        </div>
    );
};

export default BinsPage;