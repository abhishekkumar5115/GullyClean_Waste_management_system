import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { adminLogin, reset } from '../../store/authSlice';
import { Eye, EyeOff, ShieldCheck, LogIn } from 'lucide-react';

const schema = yup.object({
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, touchedFields },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (user && user.role === 'admin') {
      navigate('/dashboard');
    }
    // We can show error notifications here using a toast if needed
  }, [user, navigate]);

  const onSubmit = async (data) => {
    dispatch(adminLogin(data));
  };

  const isLoading = status === 'loading' || isSubmitting;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-8 transform transition-all hover:shadow-cyan-500/10">
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="bg-cyan-500/10 p-4 rounded-full mb-4">
            <ShieldCheck className="w-12 h-12 text-cyan-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-gray-400">Secure access for system administrators</p>
        </div>

        {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 mb-6">
                <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Email Address</label>
            <input 
              {...register('email')}
              type="email" 
              placeholder="admin@example.com"
              className={`w-full px-4 py-3 bg-gray-900/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all ${
                errors.email ? 'border-red-500' : 'border-gray-700'
              }`}
            />
            {errors.email && <p className="text-sm text-red-400 mt-1">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <div className="relative">
              <input 
                {...register('password')}
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••"
                className={`w-full pl-4 pr-12 py-3 bg-gray-900/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all ${
                  errors.password ? 'border-red-500' : 'border-gray-700'
                }`}
              />
              <button 
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-sm text-red-400 mt-1">{errors.password.message}</p>}
          </div>

          <button 
            type="submit" 
            disabled={!isValid || isLoading}
            className={`w-full py-3 px-4 rounded-xl font-bold text-gray-900 transition-all flex items-center justify-center gap-2 ${
              !isValid || isLoading
                ? 'bg-gray-600 cursor-not-allowed text-gray-400' 
                : 'bg-cyan-500 hover:bg-cyan-400 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40'
            }`}
          >
            {isLoading ? (
               <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <LogIn size={20} />
                Sign In to System
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
