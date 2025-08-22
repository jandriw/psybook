// src/lib/types/calendar.ts
export interface Appointment {
  id: string;
  clientName: string;
  service: string;
  startTime: string;
  endTime: string;
  date: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  price: number;
  hasVideo: boolean;
}

export interface TimeBlock {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  date: string;
  type: 'blocked' | 'vacation' | 'personal';
  reason?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  active: boolean;
}

export interface Psychologist {
  id: string;
  name: string;
  slug: string;
  title: string;
  specialization: string;
  collegiateNumber: string;
  experience: string;
  approach: string;
  languages: string[];
  avatar: string;
  description: string;
  schedule: string;
  location: string;
  videoPreference: string;
}