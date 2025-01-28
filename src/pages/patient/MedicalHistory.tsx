import React from 'react';
import { FileText, Calendar, User, Activity } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { MedicalRecord } from '../../types';

const MOCK_MEDICAL_RECORDS: MedicalRecord[] = [
  {
    id: '1',
    patientId: '1',
    doctorId: '1',
    doctorName: 'Dr. Sarah Johnson',
    date: '2024-02-15',
    diagnosis: 'Seasonal Allergies',
    prescription: 'Antihistamine - 10mg daily',
    notes: 'Follow up in 2 weeks if symptoms persist',
    type: 'consultation'
  },
  {
    id: '2',
    patientId: '1',
    doctorId: '2',
    doctorName: 'Dr. Michael Chen',
    date: '2024-01-20',
    diagnosis: 'Annual Physical Examination',
    notes: 'All vitals normal. Recommended routine exercise.',
    type: 'consultation'
  }
];

export function MedicalHistory() {
  const { user } = useAuth();
  const records = MOCK_MEDICAL_RECORDS.filter(record => record.patientId === user?.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Medical History</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-6">
              {records.map((record) => (
                <div key={record.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        record.type === 'consultation' ? 'bg-blue-100 text-blue-800' :
                        record.type === 'test' ? 'bg-purple-100 text-purple-800' :
                        record.type === 'surgery' ? 'bg-red-100 text-red-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {record.type.charAt(0).toUpperCase() + record.type.slice(1)}
                      </span>
                      <h3 className="mt-2 text-lg font-medium text-gray-900">{record.diagnosis}</h3>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {record.date}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <User className="w-4 h-4 mr-1" />
                        {record.doctorName}
                      </div>
                      {record.prescription && (
                        <div className="flex items-start text-sm text-gray-500">
                          <Activity className="w-4 h-4 mr-1 mt-1" />
                          <span>{record.prescription}</span>
                        </div>
                      )}
                    </div>
                    {record.notes && (
                      <div className="flex items-start text-sm text-gray-500">
                        <FileText className="w-4 h-4 mr-1 mt-1" />
                        <span>{record.notes}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Consultations</span>
                <span className="font-medium">{records.filter(r => r.type === 'consultation').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Last Visit</span>
                <span className="font-medium">{records[0]?.date || 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Download Records
              </button>
              <button className="w-full py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50">
                Share with Doctor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}