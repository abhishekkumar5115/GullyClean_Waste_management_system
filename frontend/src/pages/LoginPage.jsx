import React from 'react';
import LoginForm from '../components/usercomponents/LoginForm';
import { Recycle } from 'lucide-react'; 

const LoginPage = () => {
    return (
        <div className="hero min-h-[calc(100vh-200px)] bg-base-100">
            <div className="hero-content flex-col lg:flex-row w-full max-w-6xl gap-16">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold flex items-center gap-4 text-primary">
                        <Recycle className="text-secondary"/> Welcome Back!
                    </h1>
                    <p className="py-6 text-lg text-gray-600">
                        Log in to access your dashboard, manage pickups, and view bin statuses. Let's continue making our city cleaner together.
                    </p>
                </div>
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;