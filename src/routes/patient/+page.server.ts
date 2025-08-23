//src/routes/patient/+page.server.ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  // Datos simulados - en real vendrían de Supabase
  const nextSession = {
    date: "Mañana",
    time: "10:00",
    fullDate: "Miércoles, 24 de enero de 2025",
    psychologist: "Dra. Carmen Rodríguez",
    sessionType: "Terapia individual",
    duration: "50 min",
    canJoin: false,
    minutesUntil: 1260, // 21 horas
    videoLink: "https://zoom.us/j/123456789"
  };

  const upcomingAppointments = [
    {
      id: 1,
      date: "Miércoles, 24 enero",
      time: "10:00",
      psychologist: "Dra. Carmen Rodríguez",
      sessionType: "Terapia individual",
      duration: "50 min",
      status: "confirmed",
      statusText: "Confirmada",
      daysUntil: 1,
    },
    {
      id: 2,
      date: "Lunes, 29 enero",
      time: "15:30",
      psychologist: "Dra. Carmen Rodríguez",
      sessionType: "Terapia individual",
      duration: "50 min",
      status: "confirmed",
      statusText: "Confirmada",
      daysUntil: 6,
    },
    {
      id: 3,
      date: "Lunes, 5 febrero",
      time: "15:30",
      psychologist: "Dra. Carmen Rodríguez",
      sessionType: "Terapia individual",
      duration: "50 min",
      status: "confirmed",
      statusText: "Confirmada",
      daysUntil: 13,
    }
  ];

  const sessionHistory = [
    {
      id: 1,
      date: "15 enero 2025",
      sessionType: "Primera consulta",
      psychologist: "Dra. Carmen Rodríguez",
      duration: "45 min",
      status: "completed",
      receiptAvailable: true,
    },
    {
      id: 2,
      date: "8 enero 2025",
      sessionType: "Terapia individual",
      psychologist: "Dra. Carmen Rodríguez",
      duration: "50 min",
      status: "completed",
      receiptAvailable: true,
    },
    {
      id: 3,
      date: "22 diciembre 2024",
      sessionType: "Terapia individual",
      psychologist: "Dra. Carmen Rodríguez",
      duration: "50 min",
      status: "completed",
      receiptAvailable: true,
    }
  ];

  const progressStats = {
    sessionsCompleted: 3,
    startDate: "enero 2025",
    totalHours: 2.4,
    nextMilestone: 5,
  };

  const psychologist = {
    name: "Dra. Carmen Rodríguez",
    phone: "+34 666 123 456",
    email: "carmen.rodriguez@psybooking.com"
  };

  return {
    nextSession,
    upcomingAppointments,
    sessionHistory,
    progressStats,
    psychologist
  };
};