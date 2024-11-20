import React from 'react';
import { Star, MapPin, Calendar } from 'lucide-react';
import { Doctor } from '../types';
import { useNavigate } from 'react-router-dom';

interface DoctorCardProps {
  doctor: Doctor;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="md:flex">
        <div className="md:shrink-0">
          <img
            className="h-48 w-full object-cover md:h-full md:w-48"
            src={doctor.image}
            alt={doctor.name}
          />
        </div>
        <div className="p-8">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-gray-800">{doctor.name}</h2>
            <div className="flex items-center text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="ml-1 text-sm">{doctor.rating}</span>
            </div>
          </div>
          
          <p className="mt-2 text-slate-600">{doctor.specialty}</p>
          
          <div className="mt-4 flex items-center text-slate-500">
            <MapPin className="w-4 h-4" />
            <span className="ml-2 text-sm">{doctor.location}</span>
          </div>

          <div className="mt-4 flex items-center text-slate-500">
            <Calendar className="w-4 h-4" />
            <span className="ml-2 text-sm">{doctor.availableSlots.length} available slots</span>
          </div>

          <button
            onClick={() => navigate(`/book/${doctor.id}`)}
            className="mt-6 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}