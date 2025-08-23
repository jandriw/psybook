// src/lib/types/patient.ts
export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  createdAt: string;
}

export interface NextSession {
  date: string;
  time: string;
  fullDate: string;
  psychologist: string;
  sessionType: string;
  duration: string;
  canJoin: boolean;
  minutesUntil: number;
  videoLink?: string;
}

export interface Appointment {
  id: number;
  date: string;
  time: string;
  psychologist: string;
  sessionType: string;
  duration: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  statusText: string;
  daysUntil: number;
}

export interface SessionHistoryItem {
  id: number;
  date: string;
  sessionType: string;
  psychologist: string;
  duration: string;
  status: 'completed';
  receiptAvailable: boolean;
}

export interface ProgressStats {
  sessionsCompleted: number;
  startDate: string;
  totalHours: number;
  nextMilestone: number;
}

export interface Psychologist {
  name: string;
  phone: string;
  email: string;
}