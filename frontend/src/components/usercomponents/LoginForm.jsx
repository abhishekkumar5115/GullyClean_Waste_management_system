// src/components/auth/LoginForm.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import api from '../../api';
import { login } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((s) => s.auth);
  const [form, setForm] = useState({
     identifier: '',
     password: '' 
    });

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Email */}
      <div className="form-control">
        <label className="label" >
          <span className="label-text">Email or phone number</span>
        </label>
        <input
          id="identifier"
          name="identifier"
          type="text"
          required
          value={form.email}
          onChange={handleChange}
          className="input input-bordered"
        />
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

      {status === 'failed' && (
        <p className="text-red-600 text-center">{error}</p>
      )}

      <div className="form-control mt-4">
        <button
          type="submit"
          className={`btn btn-primary ${status === 'loading' ? 'loading' : ''}`}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Logging In...' : 'Log In'}
        </button>
      </div>
    </form>
  );
}
