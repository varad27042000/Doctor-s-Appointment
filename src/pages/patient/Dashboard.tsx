import React from 'react';
import { Calendar, Clock, AlertCircle } from 'lucide-react';
import { MOCK_APPOINTMENTS } from '../../data/mockAppointments';
import { useAuth } from '../../hooks/useAuth';


export function PatientDashboard() {
  const { user } = useAuth();
  const appointments = MOCK_APPOINTMENTS.filter(apt => apt.patientId === user?.id);


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Patient Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Upcoming Appointments</h2>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {appointment.doctorName}
                      </h3>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-2" />
                          {appointment.date}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-2" />
                          {appointment.time}
                        </div>
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
                  {appointment.symptoms && (
                    <div className="mt-3 flex items-start text-sm text-gray-500">
                      <AlertCircle className="w-4 h-4 mr-2 mt-0.5" />
                      <p>{appointment.symptoms}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Book New Appointment
              </button>
              <button className="w-full py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50">
                View Medical History
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Health Reminders</h2>
            <ul className="space-y-3">
              <li className="flex items-center text-sm text-gray-600">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Annual check-up due in 2 months
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Update vaccination records
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}