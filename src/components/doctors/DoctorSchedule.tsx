import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Card } from '../ui/Card';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface DoctorScheduleProps {
  availableSlots: string[];
  onSlotSelect: (slot: string) => void;
}

export function DoctorSchedule({ availableSlots, onSlotSelect }: DoctorScheduleProps) {
  const [selectedDate, setSelectedDate] = useState('');

  const timeSlots: TimeSlot[] = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ].map(time => ({
    time,
    available: availableSlots.includes(time)
  }));

  return (
    <Card>
      <h3 className="text-lg font-semibold mb-4">Schedule Appointment</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              className="pl-10 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Available Time Slots
          </label>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map(({ time, available }) => (
              <button
                key={time}
                className={`p-2 text-sm rounded-md ${
                  available
                    ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                    : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                }`}
                disabled={!available}
                onClick={() => available && onSlotSelect(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}