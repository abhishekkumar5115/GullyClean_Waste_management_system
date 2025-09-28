import React from 'react';
import PickupRequestForm from '../components/pickupcomponents/Pickuprequestform';

const PickupRequestPage = () => {
    return (
        <div className="flex flex-col items-center">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold">Request a Pickup</h1>
                <p className="text-lg text-neutral-500 mt-2">Report a full bin and help us keep our city clean.</p>
            </div>
            <PickupRequestForm />
        </div>
    );
};

export default PickupRequestPage;