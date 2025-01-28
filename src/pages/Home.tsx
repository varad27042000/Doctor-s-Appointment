import React, { useState } from 'react';
import { SearchBar } from '../components/SearchBar';
import { DoctorCard } from '../components/DoctorCard';
import { MOCK_DOCTORS } from '../data/mockData';
import { useAuth } from '../hooks/useAuth';
import { DoctorStats } from '../components/doctors/DoctorStats';
import { DoctorAvailability } from '../components/doctors/DoctorAvailbility';

export function Home() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [location, setLocation] = useState('');

  const filteredDoctors = MOCK_DOCTORS.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = !specialty || doctor.specialty.toLowerCase() === specialty.toLowerCase();
    const matchesLocation = !location || doctor.location.toLowerCase() === location.toLowerCase();
    
    return matchesSearch && matchesSpecialty && matchesLocation;
  });

  if (user?.role === 'doctor') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome back, {user.name}
            </h1>
            <p className="text-xl text-gray-600">
              Manage your appointments and availability
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <DoctorAvailability
                onSave={(availability) => {
                  console.log('Saving availability:', availability);
                }}
              />
            </div>
            <div>
              <DoctorStats
                totalPatients={150}
                completedAppointments={45}
                pendingAppointments={12}
                cancelledAppointments={3}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find and Book Your Doctor
          </h1>
          <p className="text-xl text-gray-600">
            Search from our network of qualified healthcare professionals
          </p>
        </div>

        <SearchBar
          onSearch={setSearchQuery}
          onSpecialtyChange={setSpecialty}
          onLocationChange={setLocation}
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-1">
          {filteredDoctors.map(doctor => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center mt-12">
            <p className="text-gray-600 text-lg">
              No doctors found matching your criteria. Try adjusting your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}