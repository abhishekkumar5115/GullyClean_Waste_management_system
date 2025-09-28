import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { signup, reset } from '../../store/authSlice';
import { addNotification } from '../../store/notificationsSlice';
import { Eye, EyeOff, UserPlus, CheckCircle, AlertCircle } from 'lucide-react';

// Password strength checker
const checkPasswordStrength = (password) => {
  if (!password) return { score: 0, text: '', color: '' };
  
  let score = 0;
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  };
  
  score = Object.values(checks).filter(Boolean).length;
  
  if (score <= 2) return { score, text: 'Weak', color: 'bg-red-500' };
  if (score <= 3) return { score, text: 'Fair', color: 'bg-yellow-500' };
  if (score <= 4) return { score, text: 'Good', color: 'bg-blue-500' };
  return { score, text: 'Strong', color: 'bg-green-500' };
};

// Validation schema matching the mongoose schema
const schema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .trim(),
  
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address')
    .lowercase('Email must be lowercase'),
  
  phone: yup
    .string()
    .optional()
    .matches(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number')
    .nullable(),
  
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  
  role: yup
    .string()
    .required('Please select a role')
    .oneOf(['citizen', 'worker', 'admin'], 'Please select a valid role'),
});

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, text: '', color: '' });
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid, touchedFields },
    reset: resetForm,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      role: 'citizen', // Default as per schema
    },
  });

  // Watch password for strength checking
  const watchPassword = watch('password');
  
  useEffect(() => {
    setPasswordStrength(checkPasswordStrength(watchPassword));
  }, [watchPassword]);

  useEffect(() => {
    if (error) {
      dispatch(addNotification({ 
        title: 'Signup Failed', 
        message: error, 
        type: 'error' 
      }));
      dispatch(reset());
    }
    
    if (user) {
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }
  }, [user, error, navigate, dispatch]);

  const onSubmit = async (data) => {
    try {
      // Remove confirmPassword before sending to backend
      const { confirmPassword, ...signupData } = data;
      await dispatch(signup(signupData));
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  const isLoading = status === 'loading' || isSubmitting;

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 px-4">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-12 text-center">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-14 w-14 text-green-500" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Account Created!</h2>
          <p className="text-gray-600 mb-8 text-xl">
            Welcome! Your account has been successfully created.
          </p>
          <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">

      <div className="w-full h-full px-6 py-12">
        {/* 🔴 Global Error at Top */}
      {error && (
        <div className="mb-6 p-4 text-lg text-red-700 bg-red-100 border border-red-400 rounded-lg shadow-md">
          <strong className="font-semibold">Signup Failed: </strong> {error}
        </div>
      )}
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">Create Account</h1>
          <p className="text-2xl text-gray-600 max-w-2xl mx-auto">
            Join our platform today! Please fill in your information below.
          </p>
        </div>
        <div className="w-full max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-16">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
              
              {/* Name Field */}
              <div className="space-y-4">
                <label htmlFor="name" className="block text-xl font-semibold text-gray-800">
                  Full Name
                </label>
                <input 
                  {...register('name')}
                  type="text" 
                  id="name"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  className={`w-full px-6 py-5 text-lg border-2 rounded-2xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 ${
                    errors.name 
                      ? 'border-red-300 bg-red-50' 
                      : touchedFields.name && !errors.name 
                      ? 'border-green-300 bg-green-50' 
                      : 'border-gray-200 bg-gray-50 hover:bg-white hover:border-gray-300'
                  }`}
                  disabled={isLoading}
                />
                {errors.name && (
                  <p className="text-red-600 font-medium flex items-center gap-2 text-lg" role="alert">
                    <AlertCircle size={20} />
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email and Phone Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Email */}
                <div className="space-y-4">
                  <label htmlFor="email" className="block text-xl font-semibold text-gray-800">
                    Email Address
                  </label>
                  <input 
                    {...register('email')}
                    type="email" 
                    id="email"
                    placeholder="Enter your email address"
                    autoComplete="email"
                    className={`w-full px-6 py-5 text-lg border-2 rounded-2xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 ${
                      errors.email 
                        ? 'border-red-300 bg-red-50' 
                        : touchedFields.email && !errors.email 
                        ? 'border-green-300 bg-green-50' 
                        : 'border-gray-200 bg-gray-50 hover:bg-white hover:border-gray-300'
                    }`}
                    disabled={isLoading}
                  />
                  {errors.email && (
                    <p className="text-red-600 font-medium flex items-center gap-2 text-lg" role="alert">
                      <AlertCircle size={20} />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-4">
                  <label htmlFor="phone" className="block text-xl font-semibold text-gray-800">
                    Phone Number <span className="text-gray-500 font-normal">(Optional)</span>
                  </label>
                  <input 
                    {...register('phone')}
                    type="tel" 
                    id="phone"
                    placeholder="Enter your phone number"
                    autoComplete="tel"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Role Selection */}
              <div className="space-y-4">
                <label htmlFor="role" className="block text-xl font-semibold text-gray-800">
                  Role
                </label>
                <select 
                  {...register('role')}
                  id="role"
                  className={`w-full px-6 py-5 text-lg border-2 rounded-2xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 ${
                    errors.role 
                      ? 'border-red-300 bg-red-50' 
                      : touchedFields.role && !errors.role 
                      ? 'border-green-300 bg-green-50' 
                      : 'border-gray-200 bg-gray-50 hover:bg-white hover:border-gray-300'
                  }`}
                  disabled={isLoading}
                >
                  <option value="citizen">Citizen</option>
                  <option value="worker">Worker</option>
                  
                </select>
                {errors.role && (
                  <p className="text-red-600 font-medium flex items-center gap-2 text-lg" role="alert">
                    <AlertCircle size={20} />
                    {errors.role.message}
                  </p>
                )}
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Password */}
                <div className="space-y-4">
                  <label htmlFor="password" className="block text-xl font-semibold text-gray-800">
                    Password
                  </label>
                  <div className="relative">
                    <input 
                      {...register('password')}
                      type={showPassword ? "text" : "password"} 
                      id="password"
                      placeholder="Create a password"
                      autoComplete="new-password"
                      className={`w-full px-6 py-5 pr-16 text-lg border-2 rounded-2xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 ${
                        errors.password 
                          ? 'border-red-300 bg-red-50' 
                          : touchedFields.password && !errors.password 
                          ? 'border-green-300 bg-green-50' 
                          : 'border-gray-200 bg-gray-50 hover:bg-white hover:border-gray-300'
                      }`}
                      disabled={isLoading}
                    />
                    <button 
                      type="button"
                      className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                    </button>
                  </div>
                  
                  {/* Password Strength */}
                  {watchPassword && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                            style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                          />
                        </div>
                        <span className={`text-sm font-semibold ${
                          passwordStrength.score <= 2 ? 'text-red-500' :
                          passwordStrength.score <= 3 ? 'text-yellow-500' :
                          passwordStrength.score <= 4 ? 'text-blue-500' :
                          'text-green-500'
                        }`}>
                          {passwordStrength.text}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {errors.password && (
                    <p className="text-red-600 font-medium flex items-center gap-2 text-lg" role="alert">
                      <AlertCircle size={20} />
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-4">
                  <label htmlFor="confirmPassword" className="block text-xl font-semibold text-gray-800">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input 
                      {...register('confirmPassword')}
                      type={showConfirmPassword ? "text" : "password"} 
                      id="confirmPassword"
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                      className={`w-full px-6 py-5 pr-16 text-lg border-2 rounded-2xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 ${
                        errors.confirmPassword 
                          ? 'border-red-300 bg-red-50' 
                          : touchedFields.confirmPassword && !errors.confirmPassword 
                          ? 'border-green-300 bg-green-50' 
                          : 'border-gray-200 bg-gray-50 hover:bg-white hover:border-gray-300'
                      }`}
                      disabled={isLoading}
                    />
                    <button 
                      type="button"
                      className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      disabled={isLoading}
                      aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                    >
                      {showConfirmPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-600 font-medium flex items-center gap-2 text-lg" role="alert">
                      <AlertCircle size={20} />
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-8">
                <button 
                  type="submit" 
                  disabled={!isValid || isLoading}
                  className={`w-full py-6 px-8 text-xl font-bold text-white rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 transform hover:scale-[1.02] active:scale-[0.98] ${
                    !isValid || isLoading
                      ? 'bg-gray-400 cursor-not-allowed shadow-lg' 
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-xl hover:shadow-2xl'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <UserPlus size={24} />
                      <span>Create Account</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Login Link */}
          <div className="text-center mt-12">
            <p className="text-xl text-gray-600">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-blue-600 hover:text-blue-700 font-semibold text-xl transition-colors duration-200 hover:underline"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
