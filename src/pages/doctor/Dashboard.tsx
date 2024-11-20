import React, { useState } from 'react';
import { Calendar, Clock, User, FileText } from 'lucide-react';
import { MOCK_APPOINTMENTS } from '../../data/mockAppointments';
import { useAuth } from '../../hooks/useAuth';
import { Appointment } from '../../types';

export function DoctorDashboard() {
  const { user } = useAuth();
  const appointments = MOCK_APPOINTMENTS.filter(apt => apt.doctorId === user?.id);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const updateAppointmentStatus = (appointmentId: string, status: 'confirmed' | 'cancelled') => {
    // Mock update - replace with actual API call
    console.log(`Updating appointment ${appointmentId} to ${status}`);
  };

  const addNotes = (appointmentId: string, notes: string) => {
    // Mock update - replace with actual API call
    console.log(`Adding notes to appointment ${appointmentId}: ${notes}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Doctor Dashboard</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Update Availability
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Today's Appointments</h2>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedAppointment(appointment)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {appointment.patientName}
                      </h3>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-2" />
                          {appointment.time}
                        </div>
                        {appointment.symptoms && (
                          <div className="flex items-center text-sm text-gray-500">
                            <FileText className="w-4 h-4 mr-2" />
                            {appointment.symptoms}
                          </div>
                        )}
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        appointment.status === 'confirmed'
                          ? 'bg-green-100 text-green-800'
                          : appointment.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Statistics</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Today's Patients</p>
                <p className="text-2xl font-bold text-blue-600">8</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">5</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">2</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600">Cancelled</p>
                <p className="text-2xl font-bold text-purple-600">1</p>
              </div>
            </div>
          </div>

          {selectedAppointment && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Appointment Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Patient</label>
                  <p className="mt-1">{selectedAppointment.patientName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Symptoms</label>
                  <p className="mt-1">{selectedAppointment.symptoms || 'None reported'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Notes</label>
                  <textarea
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    rows={3}
                    defaultValue={selectedAppointment.notes}
                    onChange={(e) => addNotes(selectedAppointment.id, e.target.value)}
                  ></textarea>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => updateAppointmentStatus(selectedAppointment.id, 'confirmed')}
                    className="flex-1 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => updateAppointmentStatus(selectedAppointment.id, 'cancelled')}
                    className="flex-1 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}