// src/App.jsx
import React,{useEffect} from 'react';
import {  Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/usercomponents/ProtectedRoute';
import { useDispatch } from 'react-redux';
import {login,logout} from './store/authSlice';

import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

import BinsPage from './pages/BinsPage';
import BinDetailPage from './pages/BinDetailPage';

import PickupRequestPage from './pages/PickupRequestPage';
import PickupsPage from './pages/PickupsPage';
import PickupDetailPage from './pages/PickupDetailPage';

import AssignmentPage from './pages/AssignmentPage';

import WorkerDashboardPage from './pages/WorkerDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

export default function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
      const checkAuth = async () => {
        try{
          const res = await fetch('http://localhost:3000/user/check-auth', {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            include: 'credentials' ,
          }
        })
        if(res.ok){
          const data = await res.json();
          dispatch(login(data));
        }
        else{
          dispatch(logout())
        }
      }
      catch(err){
          console.error('Error checking auth:', err);
          dispatch(logout());
        }
      }
  },[dispatch])
  return (
      <Routes>
      {/* Layout wraps all these child routes */}
      <Route path="/" element={<Layout />}>
        {/* Public */}
        <Route index element={<HomePage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="login"  element={<LoginPage />} />

        {/* Authenticated users */}
        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<ProfilePage />} />
          <Route path="bins"    element={<BinsPage />} />
          <Route path="bins/:id" element={<BinDetailPage />} />
          <Route path="request-pickup" element={<PickupRequestPage />} />
        </Route>

        {/* Dispatcher/Admin */}
        <Route element={<ProtectedRoute allowedRoles={['admin','dispatcher']} />}>
          <Route path="pickups" element={<PickupsPage />} />
          <Route path="pickups/:id" element={<PickupDetailPage />} />
          <Route path="assignments" element={<AssignmentPage />} />
        </Route>

        {/* Worker */}
        <Route element={<ProtectedRoute allowedRoles={['worker']} />}>
          <Route path="worker" element={<WorkerDashboardPage />} />
        </Route>

        {/* Admin-only */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="admin" element={<AdminDashboardPage />} />
        </Route>

        {/* Fallback for 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
