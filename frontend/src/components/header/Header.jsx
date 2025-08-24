import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Bell, User } from 'lucide-react';
import { logout } from '../../store/authSlice';

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const navItems = [
    { name: 'Home', path: '/', public: true },
    { name: 'Report Bin', path: '/citizen', roles: ['citizen'] },
    { name: 'My Routes', path: '/worker', roles: ['worker'] },
    { name: 'Dashboard', path: '/admin', roles: ['admin'] },
  ];

  const links = navItems.filter(
    (item) => item.public || (user && item.roles?.includes(user.role))
  );

  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="navbar-start">
        {/* Mobile menu toggle */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {links.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  onClick={() => document.activeElement.blur()}
                  className={({ isActive }) =>
                    `rounded-md ${isActive ? 'bg-green-600 text-white' : ''}`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
            {user && (
              <li>
                <button
                  className="rounded-md"
                  onClick={() => {
                    dispatch(logout());
                    navigate('/login');
                  }}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
        {/* Logo */}
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          SmartWaste<span className="text-green-500">Manager</span>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md hover:bg-green-200 ${
                    isActive ? 'bg-green-600 text-white' : 'text-gray-700'
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Right side: notifications & profile */}
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <Bell className="h-5 w-5" />
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="/avatar.png" alt="User Avatar" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/settings">Settings</Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    dispatch(logout());
                    navigate('/login');
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex space-x-2">
            <Link to="/login" className="btn btn-primary btn-sm">
              Login
            </Link>
            <Link to="/signup" className="btn btn-outline btn-sm">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
