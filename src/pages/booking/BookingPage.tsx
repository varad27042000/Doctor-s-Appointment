import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '../../hooks/useAuth';
import { MOCK_DOCTORS } from '../../data/mockData';

export function BookingPage() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const doctor = MOCK_DOCTORS.find(d => d.id === doctorId);

  if (!doctor) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">Doctor not found</p>
      </div>
    );
  }

  const handleBooking = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Mock booking creation - replace with actual API call
    const booking = {
      doctorId,
      patientId: user.id,
      date: selectedDate,
      time: selectedTime,
      status: 'pending'
    };

    console.log('Booking created:', booking);
    navigate('/booking-confirmation');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4 mb-8">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{doctor.name}</h1>
            <p className="text-gray-600">{doctor.specialty}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">Select Date</h2>
            <div className="flex items-center space-x-2">
              <Calendar className="text-gray-400" />
              <input
                type="date"
                className="w-full p-2 border rounded-md"
                min={format(new Date(), 'yyyy-MM-dd')}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Select Time</h2>
            <div className="flex items-center space-x-2">
              <Clock className="text-gray-400" />
              <select
                className="w-full p-2 border rounded-md"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                <option value="">Select a time</option>
                {doctor.availableSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <button
          onClick={handleBooking}
          disabled={!selectedDate || !selectedTime}
          className="mt-8 w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
}