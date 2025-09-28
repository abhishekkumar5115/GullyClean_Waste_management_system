import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import { Recycle, LogIn, UserPlus, User, LogOut, LayoutDashboard, Truck, Trash2, Menu, X, MapPin, ChevronDown } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [location]);

  const onLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const navLinks = [
    { to: '/bins', text: 'Find Bins', icon: <Trash2 size={18} /> },
    { to: '/request-pickup', text: 'Request Pickup', icon: <Truck size={18} /> },
    { to: '/admin', text: 'Admin Dashboard', icon: <LayoutDashboard size={18} />, roles: ['admin'] },
    { to: '/pickups', text: 'Manage Pickups', icon: <Truck size={18} />, roles: ['admin'] },
    { to: '/worker-dashboard', text: 'My Assignments', icon: <MapPin size={18} />, roles: ['worker'] },
  ];

  const filteredNavLinks = navLinks.filter(link => !link.roles || (user && link.roles.includes(user.role)));

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  const isHomePage = location.pathname === '/';

  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 ${
      scrolled || !isHomePage 
        ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100' 
        : 'bg-transparent'
    }`}>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-2 px-4 text-sm text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium">✨</span>
          <span>Join 5,000+ users making our cities cleaner</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">Real-time bin monitoring</span>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group"
            onClick={handleLinkClick}
          >
            <div className="relative">
              <div className="bg-gradient-to-r from-green-500 to-blue-600 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Recycle className="text-white" size={28} />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl blur-sm opacity-50 group-hover:opacity-75 transition-opacity -z-10"></div>
            </div>
            <div className="flex flex-col">
              <span className={`text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent ${
                scrolled || !isHomePage ? 'block' : 'text-white-90'
              }`}>
                Gully clean
              </span>
              <span className="text-xs text-gray-500 font-medium">Clean Cities Initiative</span>
            </div>
          </Link>

          {/* Desktop Navigation - SIMPLIFIED AND WORKING */}
          <div className="hidden lg:flex items-center space-x-4">
            {filteredNavLinks.map(link => (
              <NavLink 
                key={link.to}
                to={link.to} 
                className={({ isActive }) => 
                  `group relative flex items-center gap-2 font-medium py-3 px-5 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-lg' 
                      : scrolled || !isHomePage 
                        ? 'text-gray-700 hover:text-green-600 hover:bg-gray-50' 
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                {link.icon}
                <span>{link.text}</span>
              </NavLink>
            ))}
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                {/* Desktop User Menu */}
                <div className="hidden lg:block relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-3 bg-gradient-to-r from-green-500 to-blue-600 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <User size={16} />
                    </div>
                    <span className="font-medium">{user.name?.split(' ')[0]}</span>
                    <ChevronDown 
                      size={16} 
                      className={`transition-transform duration-300 ${userDropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* User Dropdown */}
                  {userDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50">
                      <div className="p-4 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <img 
                            alt="User avatar" 
                            src={`https://ui-avatars.com/api/?name=${user.name?.replace(/\s/g, '+')}&background=4f46e5&color=fff&bold=true&size=64`} 
                            className="w-12 h-12 rounded-full border-2 border-green-200"
                          />
                          <div>
                            <p className="font-semibold text-gray-800">{user.name}</p>
                            <p className="text-sm text-gray-500 capitalize">{user.role}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-2">
                        <Link 
                          to="/profile" 
                          className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                          onClick={handleLinkClick}
                        >
                          <User size={18} />
                          My Profile
                        </Link>
                        <button 
                          onClick={onLogout}
                          className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full text-left"
                        >
                          <LogOut size={18} />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className='hidden lg:flex gap-3'>
                <Link 
                  to="/login" 
                  className={`flex items-center gap-2 px-6 py-2 rounded-xl font-medium transition-all duration-300 ${
                    scrolled || !isHomePage 
                      ? 'text-gray-700 hover:text-green-600 border border-gray-200 hover:border-green-200' 
                      : 'text-white/90 hover:text-white border border-white/30 hover:border-white'
                  }`}
                >
                  <LogIn size={16} /> 
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                >
                  <UserPlus size={16} /> 
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-3 rounded-xl transition-all duration-300 ${
                scrolled || !isHomePage 
                  ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' 
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-500 overflow-hidden ${
          mobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-100 p-4">
            {/* User Info Mobile */}
            {user && (
              <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl mb-4">
                <div className="flex items-center gap-3">
                  <img 
                    alt="User avatar" 
                    src={`https://ui-avatars.com/api/?name=${user.name?.replace(/\s/g, '+')}&background=4f46e5&color=fff&bold=true`} 
                    className="w-10 h-10 rounded-full border-2 border-green-200"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{user.name}</p>
                    <p className="text-sm text-gray-500 capitalize">{user.role}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Navigation Links */}
            <div className="space-y-2">
              {filteredNavLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-green-600'
                    }`
                  }
                  onClick={handleLinkClick}
                >
                  {link.icon}
                  {link.text}
                </NavLink>
              ))}
            </div>

            {/* Mobile Auth Buttons */}
            {!user && (
              <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
                <Link 
                  to="/login" 
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-gray-700 border border-gray-200 rounded-xl hover:border-green-200 transition-colors"
                  onClick={handleLinkClick}
                >
                  <LogIn size={16} />
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all"
                  onClick={handleLinkClick}
                >
                  <UserPlus size={16} />
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile User Actions */}
            {user && (
              <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                <Link 
                  to="/profile" 
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                  onClick={handleLinkClick}
                >
                  <User size={18} />
                  My Profile
                </Link>
                <button 
                  onClick={onLogout}
                  className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors w-full text-left"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Backdrop for mobile menu */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;