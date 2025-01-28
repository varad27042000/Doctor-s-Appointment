import React from 'react';
import { Link } from 'react-router-dom';
import { UserCircle2, Menu, Stethoscope, Calendar, Star, ClipboardList, Home } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export function Navbar() {
  const { user, logout } = useAuth();

  const doctorLinks = [
    { to: '/doctor/dashboard', icon: ClipboardList, label: 'Dashboard' },
    { to: '/doctor/reviews', icon: Star, label: 'Reviews' }
  ];

  const patientLinks = [
    { to: '/patient/dashboard', icon: Calendar, label: 'My Appointments' },
    { to: '/patient/medical-history', icon: ClipboardList, label: 'Medical History' }
  ];

  const navigationLinks = user?.role === 'doctor' ? doctorLinks : patientLinks;

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Stethoscope className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-blue-600">MedBook</span>
            </Link>

            {user && (
              <div className="hidden md:flex ml-10 space-x-8">
                <Link to="/" className="flex items-center text-gray-700 hover:text-gray-900">
                  <Home className="w-5 h-5 mr-1" />
                  Home
                </Link>
                {navigationLinks.map(({ to, icon: Icon, label }) => (
                  <Link
                    key={to}
                    to={to}
                    className="flex items-center text-gray-700 hover:text-gray-900"
                  >
                    <Icon className="w-5 h-5 mr-1" />
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  {user.role === 'doctor' ? ' ' : ''}{user.name}
                </span>
                <div className="relative group">
                  <button className="flex items-center space-x-2">
                    <UserCircle2 className="w-8 h-8 text-gray-700" />
                    <Menu className="w-5 h-5 text-gray-500" />
                  </button>
                  <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile Settings
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}