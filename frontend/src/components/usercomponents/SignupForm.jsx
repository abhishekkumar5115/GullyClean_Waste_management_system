import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { signup, reset } from '../../store/authSlice';
import { addNotification } from '../../store/notificationsSlice';
import { Eye, EyeOff, UserPlus, CheckCircle, AlertCircle } from 'lucide-react';

/* ---------------- Password Strength ---------------- */
const checkPasswordStrength = (password) => {
  if (!password) return { score: 0, text: '', color: '' };

  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
  };

  const score = Object.values(checks).filter(Boolean).length;

  if (score <= 2) return { score, text: 'Weak', color: 'bg-red-500' };
  if (score <= 3) return { score, text: 'Fair', color: 'bg-yellow-500' };
  if (score <= 4) return { score, text: 'Good', color: 'bg-blue-500' };
  return { score, text: 'Strong', color: 'bg-green-500' };
};

/* ---------------- Validation Schema ---------------- */
const schema = yup.object({
  name: yup.string().required().min(2).max(100).trim(),
  email: yup.string().required().email().lowercase(),
  phone: yup.string().optional().nullable(),
  password: yup.string().required().min(6),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Passwords must match'),
  role: yup.string().required().oneOf(['citizen', 'worker', 'admin']),
});

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0 });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid, touchedFields },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      role: 'citizen',
    },
  });

  const watchPassword = watch('password');

  useEffect(() => {
    setPasswordStrength(checkPasswordStrength(watchPassword));
  }, [watchPassword]);

  useEffect(() => {
    if (error) {
      dispatch(addNotification({ title: 'Signup Failed', message: error, type: 'error' }));
      dispatch(reset());
    }

    if (user) {
      setShowSuccess(true);
      setTimeout(() => navigate('/dashboard'), 2000);
    }
  }, [user, error, navigate, dispatch]);

  const onSubmit = async ({ confirmPassword, ...data }) => {
    await dispatch(signup(data));
  };

  const isLoading = status === 'loading' || isSubmitting;

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 px-4">
        <div className="max-w-lg w-full bg-white p-12 rounded-3xl shadow-2xl text-center">
          <CheckCircle className="mx-auto text-green-500 h-16 w-16 mb-6" />
          <h2 className="text-4xl font-bold mb-4">Account Created!</h2>
          <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">


    {/* ================= CENTERED FORM SECTION ================= */}
    <section className="w-full flex justify-center px-6 pb-16">

      {/* 👇 THIS CONTROLS FORM WIDTH */}
      <div className="w-100 max-w-5xl">

        {error && (
          <div className="mb-6 p-4 text-lg text-red-700 bg-red-100 border border-red-400 rounded-lg shadow-md">
            <strong>Signup Failed:</strong> {error}
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-2xl p-16">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">

            {/* Name */}
            <div>
              <label className="block text-xl font-semibold mb-2">Full Name</label>
              <input
                {...register('name')}
                className="w-full px-6 py-5 text-lg border-2 rounded-2xl"
              />
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <input
                {...register('email')}
                placeholder="Email"
                className="px-6 py-5 text-lg border-2 rounded-2xl"
              />
              <input
                {...register('phone')}
                placeholder="Phone (optional)"
                className="px-6 py-5 text-lg border-2 rounded-2xl"
              />
            </div>

            {/* Role */}
            <select
              {...register('role')}
              className="w-full px-6 py-5 text-lg border-2 rounded-2xl"
            >
              <option value="citizen">Citizen</option>
              <option value="worker">Worker</option>
            </select>

            {/* Passwords */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <input
                {...register('password')}
                type="password"
                placeholder="Password"
                className="px-6 py-5 text-lg border-2 rounded-2xl"
              />
              <input
                {...register('confirmPassword')}
                type="password"
                placeholder="Confirm Password"
                className="px-6 py-5 text-lg border-2 rounded-2xl"
              />
            </div>

            <button
              type="submit"
              className="w-full py-6 text-xl font-bold text-black rounded-2xl bg-green"
            >
              Create Account
            </button>
          </form>
        </div>

        <p className="text-center mt-12 text-xl">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Sign in here
          </Link>
        </p>

      </div>
    </section>
  </div>
);
};

export default SignupForm;
