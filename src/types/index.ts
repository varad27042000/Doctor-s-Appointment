export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  image: string;
  availableSlots: string[];
  reviews?: Review[];
  education?: string[];
  experience?: number;
  languages?: string[];
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  symptoms?: string;
  notes?: string;
  prescription?: string;
  followUp?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor';
  image?: string;
  phone?: string;
  address?: string;
  preferredTime?: string;
  medicalHistory?: MedicalRecord[];
}

export interface Review {
  id: string;
  doctorId: string;
  patientId: string;
  patientName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  date: string;
  diagnosis: string;
  prescription?: string;
  notes?: string;
  attachments?: string[];
  type: 'consultation' | 'test' | 'surgery' | 'vaccination';
}