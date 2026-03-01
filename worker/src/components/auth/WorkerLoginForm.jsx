import React, { useState, useEffect } from 'react';
import { useForm as useRHForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { workerLogin, clearError } from '../../store/authSlice';
import { Navigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, HardHat } from 'lucide-react';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const WorkerLoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { status, error, workerUser } = useSelector((state) => state.auth);

  const { register, handleSubmit, formState: { errors } } = useRHForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const onSubmit = (data) => {
    dispatch(workerLogin(data));
  };

  if (workerUser) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-700">
        <div className="p-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-500/20 mb-4">
              <HardHat size={40} className="text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Worker Portal</h2>
            <p className="text-gray-400">Sign in to view assigned pickups</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-500" />
                </div>
                <input
                  type="email"
                  {...register('email')}
                  className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="worker@example.com"
                />
              </div>
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-500" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  className="w-full pl-10 pr-12 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
                <p className="text-red-400 text-sm text-center">{typeof error === 'string' ? error : 'Login failed'}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
              ) : (
                'Sign In to Dashboard'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WorkerLoginForm;
