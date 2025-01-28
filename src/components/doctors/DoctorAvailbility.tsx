import React, { useState } from 'react';
import { Calendar, Clock, Plus, Trash2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { formatDate } from '../../utils/date';

interface TimeRange {
  start: string;
  end: string;
}

interface AvailabilityDay {
  date: string;
  timeRanges: TimeRange[];
}

interface DoctorAvailabilityProps {
  initialAvailability?: AvailabilityDay[];
  onSave: (availability: AvailabilityDay[]) => void;
}

export function DoctorAvailability({ initialAvailability = [], onSave }: DoctorAvailabilityProps) {
  const [availability, setAvailability] = useState<AvailabilityDay[]>(initialAvailability);

  const addDay = () => {
    const newDay: AvailabilityDay = {
      date: '',
      timeRanges: [{ start: '', end: '' }]
    };
    setAvailability([...availability, newDay]);
  };

  const removeDay = (index: number) => {
    setAvailability(availability.filter((_, i) => i !== index));
  };

  const addTimeRange = (dayIndex: number) => {
    const newAvailability = [...availability];
    newAvailability[dayIndex].timeRanges.push({ start: '', end: '' });
    setAvailability(newAvailability);
  };

  const removeTimeRange = (dayIndex: number, rangeIndex: number) => {
    const newAvailability = [...availability];
    newAvailability[dayIndex].timeRanges = newAvailability[dayIndex].timeRanges.filter(
      (_, i) => i !== rangeIndex
    );
    setAvailability(newAvailability);
  };

  const updateDate = (index: number, date: string) => {
    const newAvailability = [...availability];
    newAvailability[index].date = date;
    setAvailability(newAvailability);
  };

  const updateTimeRange = (dayIndex: number, rangeIndex: number, field: keyof TimeRange, value: string) => {
    const newAvailability = [...availability];
    newAvailability[dayIndex].timeRanges[rangeIndex][field] = value;
    setAvailability(newAvailability);
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Set Availability</h3>
        <button
          onClick={addDay}
          className="flex items-center px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Day
        </button>
      </div>

      <div className="space-y-6">
        {availability.map((day, dayIndex) => (
          <div key={dayIndex} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex-1 mr-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    value={day.date}
                    onChange={(e) => updateDate(dayIndex, e.target.value)}
                    className="pl-10 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              <button
                onClick={() => removeDay(dayIndex)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-md"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {day.timeRanges.map((range, rangeIndex) => (
                <div key={rangeIndex} className="flex items-center space-x-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Clock className="text-gray-400 w-5 h-5" />
                      <input
                        type="time"
                        value={range.start}
                        onChange={(e) => updateTimeRange(dayIndex, rangeIndex, 'start', e.target.value)}
                        className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                      <span className="text-gray-500">to</span>
                      <input
                        type="time"
                        value={range.end}
                        onChange={(e) => updateTimeRange(dayIndex, rangeIndex, 'end', e.target.value)}
                        className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => removeTimeRange(dayIndex, rangeIndex)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded-md"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addTimeRange(dayIndex)}
                className="flex items-center text-sm text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Time Range
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => onSave(availability)}
        className="mt-6 w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Save Availability
      </button>
    </Card>
  );
}