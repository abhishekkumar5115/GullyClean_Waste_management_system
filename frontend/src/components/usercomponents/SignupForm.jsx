// src/components/auth/SignupForm.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import api from '../../api';
import { login } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

export default function SignupForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((s) => s.auth);
  const [errorMessage, setErrorMessage] = useState('');

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'citizen',
  });

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    // Clear error message when user starts typing
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // check if either email or phone is provided
    if(!form.email && !form.phone){
      setErrorMessage('Please provide either an email or a phone number.');
      return;
    }
    try {
      const res = await fetch('http://localhost:3000/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const resData = await res.json();
      if (!res.ok) {
        setErrorMessage(resData.msg || 'user already exist. Please try again.');
        return;
      }
      dispatch(login(resData));
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Inline error message */}
      {errorMessage && (
        <div className="p-2 bg-red-100 text-red-700 rounded text-center">
          {errorMessage}
        </div>
      )}
      {/* Name */}
      <div className="form-control">
        <label className="label" htmlFor="name">
          <span className="label-text">Full Name</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
          className="input input-bordered"
          placeholder="Your name"
        />
      </div>

      {/* Email */}
      <div className="form-control">
        <label className="label" htmlFor="email">
          <span className="label-text">Email</span>
        </label>
        <br></br>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="input input-bordered"
          placeholder="you@example.com"
        />
      </div>
       {/* phone number */}
      <div className="form-control">
      <label className="label" htmlFor="phone">
        <span className="label-text">Phone Number</span>
      </label>
      <div className="input-group">
          {/* Static prefix */}
        <span className="btn btn-disabled">+91</span>
      <input
      id="phone"
      name="phone"
      type="tel"
      pattern="^[6-9][0-9]{9}$"
      value={form.phone}
      onChange={handleChange}
      className="input input-bordered flex-1"
      required={!form.email}
      />
    </div>
    </div>


      {/* Password */}
      <div className="form-control">
        <label className="label" htmlFor="password">
          <span className="label-text">Password</span>
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          value={form.password}
          onChange={handleChange}
          className="input input-bordered"
          placeholder="••••••••"
        />
      </div>

      {/* Role */}
      <div className="form-control">
        <label className="label" htmlFor="role">
          <span className="label-text">Role</span>
        </label>
        <br></br>
        <select
          id="role"
          name="role"
          value={form.role}
          onChange={handleChange}
          className="select select-bordered"
        >
          <option value="citizen">Citizen</option>
          <option value="worker">Worker</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {status === 'failed' && (
        <p className="text-red-600 text-center">{error}</p>
      )}

      <div className="form-control mt-4">
        <button
          type="submit"
          className={`btn btn-primary ${status === 'loading' ? 'loading' : ''}`}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Signing Up...' : 'Sign Up'}
        </button>
      </div>
    </form>
  );
}
