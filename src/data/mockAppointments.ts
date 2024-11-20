import { Appointment } from '../types';

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: '1',
    doctorId: '1',
    doctorName: 'Dr. Sarah Johnson',
    patientId: '1',
    patientName: 'John Doe',
    date: '2024-03-20',
    time: '10:00 AM',
    status: 'confirmed',
    symptoms: 'Chest pain and shortness of breath',
    notes: 'Follow-up required in 2 weeks'
  },
  {
    id: '2',
    doctorId: '2',
    doctorName: 'Dr. Michael Chen',
    patientId: '1',
    patientName: 'John Doe',
    date: '2024-03-25',
    time: '2:00 PM',
    status: 'pending',
    symptoms: 'Skin rash and itching'
  }
];