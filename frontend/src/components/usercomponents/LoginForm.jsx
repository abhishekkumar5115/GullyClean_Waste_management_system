import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { login, reset } from '../../store/authSlice';
import { addNotification } from '../../store/notificationsSlice';
import {  Eye, EyeOff, LogIn, CheckCircle } from 'lucide-react';

// Validation schema
const schema = yup.object({
  identifier: yup
    .string()
    .required('Email or phone is required')
    .test('email-or-phone', 'Please enter a valid email or phone number', (value) => {
      if (!value) return false;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      return emailRegex.test(value) || phoneRegex.test(value);
    }),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, touchedFields },
    reset: resetForm,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  useEffect(() => {
    if (error) {
      dispatch(addNotification({ 
        title: 'Login Failed', 
        message: error, 
        type: 'error' 
      }));
      dispatch(reset());
    }
    
    if (user) {
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }
  }, [user, error, navigate, dispatch]);

  const onSubmit = async (data) => {
  try {
    await dispatch(login(data)); // 
  } catch (error) {
    console.error('Login error:', error);
  }
};


  const isLoading = status === 'loading' || isSubmitting;

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500 animate-bounce" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back!</h2>
          <p className="text-gray-600 mb-4">You have been successfully logged in.</p>
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8 transform transition-all duration-300 hover:shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h1>
          <p className="text-gray-600">Welcome back! Please enter your details.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email/Phone Input */}
          <div className="space-y-2">
            <label 
              htmlFor="identifier" 
              className="block text-sm font-semibold text-gray-700"
            >
              Email or Phone
            </label>
            <div className="relative">
              
              <input 
                {...register('identifier')}
                type="text" 
                id="identifier"
                placeholder="you@example.com"
                autoComplete="username"
                className={`w-full pl-10 pr-4 py-3 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white ${
                  errors.identifier 
                    ? 'border-red-300 focus:ring-red-500' 
                    : touchedFields.identifier && !errors.identifier 
                    ? 'border-green-300 focus:ring-green-500' 
                    : 'border-gray-200'
                }`}
                disabled={isLoading}
                aria-invalid={errors.identifier ? 'true' : 'false'}
                aria-describedby={errors.identifier ? 'identifier-error' : undefined}
              />
            </div>
            {errors.identifier && (
              <p 
                id="identifier-error"
                className="text-sm text-red-600 flex items-center gap-1 animate-fadeIn"
                role="alert"
              >
                <span className="text-red-500">•</span>
                {errors.identifier.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label 
              htmlFor="password" 
              className="block text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <div className="relative">
  
              <input 
                {...register('password')}
                type={showPassword ? "text" : "password"} 
                id="password"
                placeholder="••••••••"
                autoComplete="current-password"
                className={`w-full pl-10 pr-12 py-3 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white ${
                  errors.password 
                    ? 'border-red-300 focus:ring-red-500' 
                    : touchedFields.password && !errors.password 
                    ? 'border-green-300 focus:ring-green-500' 
                    : 'border-gray-200'
                }`}
                disabled={isLoading}
                aria-invalid={errors.password ? 'true' : 'false'}
                aria-describedby={errors.password ? 'password-error' : undefined}
              />
              <button 
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 z-10"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p 
                id="password-error"
                className="text-sm text-red-600 flex items-center gap-1 animate-fadeIn"
                role="alert"
              >
                <span className="text-red-500">•</span>
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={!isValid || isLoading}
            className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-[0.98] ${
              !isValid || isLoading
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <LogIn size={20} />
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center mt-8 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200 hover:underline"
            >
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
