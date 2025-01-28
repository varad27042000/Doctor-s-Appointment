import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { Navbar } from './components/Layout/Navbar';
import { Home } from './pages/Home';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { BookingPage } from './pages/booking/BookingPage';
import { BookingConfirmation } from './pages/booking/BookingConfirmation';
import { PatientDashboard } from './pages/patient/Dashboard';
import { DoctorDashboard } from './pages/doctor/Dashboard';
import { Profile } from './pages/profile/Profile';
import { MedicalHistory } from './pages/patient/MedicalHistory';
import { Reviews } from './pages/doctor/Reviews';
import { PrivateRoute } from './components/PrivateRoute';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/book/:doctorId" element={<BookingPage />} />
            <Route path="/booking-confirmation" element={<BookingConfirmation />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute role="patient">
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/patient/dashboard"
              element={
                <PrivateRoute role="patient">
                  <PatientDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/patient/medical-history"
              element={
                <PrivateRoute role="patient">
                  <MedicalHistory />
                </PrivateRoute>
              }
            />
            <Route
              path="/doctor/dashboard"
              element={
                <PrivateRoute role="doctor">
                  <DoctorDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/doctor/reviews"
              element={
                <PrivateRoute role="doctor">
                  <Reviews />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}