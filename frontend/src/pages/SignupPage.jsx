import React from 'react';
import SignupForm from '../components/usercomponents/SignupForm';
import { UserPlus, Sparkles, Recycle } from 'lucide-react';

const SignupPage = () => {
    return (
        <div className="hero min-h-[calc(100vh-200px)] bg-gradient-to-br from-secondary/5 to-primary/5">
            <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-6xl gap-16 p-8">
                <div className="text-center lg:text-right lg:w-1/2">
                    <div className="flex items-center justify-center lg:justify-end gap-3 mb-6">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            SmartWaste
                        </h1>
                        <div className="bg-gradient-to-r from-primary to-secondary p-3 rounded-xl">
                            <Recycle className="text-white" size={36} />
                        </div>
                    </div>
                    <h1 className="text-5xl font-bold mb-6 flex items-center gap-4 justify-center lg:justify-end">
                        <UserPlus className="text-primary"/> Join the Movement!
                    </h1>
                    <p className="py-6 text-lg text-gray-600 max-w-md ml-auto">
                        Create an account to become a part of the SmartWaste community. Report full bins and help us build a more sustainable future.
                    </p>
                    <div className="flex items-center gap-2 text-gray-500 mt-8 justify-center lg:justify-end">
                        <Sparkles className="text-yellow-500" />
                        <span>Join 5,000+ users making a difference</span>
                    </div>
                </div>
                <div className="card w-full lg:w-1/2 shadow-2xl bg-base-100">
                    <SignupForm />
                </div>
            </div>
        </div>
    );
};

export default SignupPage;