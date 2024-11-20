export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  image: string;
  availableSlots: string[];
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  symptoms?: string;
  notes?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor';
  image?: string;
}