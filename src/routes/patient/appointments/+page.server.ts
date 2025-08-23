// src/routes/patient/appointments/+page.server.ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  // Combinar citas próximas y pasadas
  const allAppointments = [
    {
      id: 1,
      date: "Miércoles, 24 enero",
      time: "10:00",
      psychologist: "Dra. Carmen Rodríguez",
      sessionType: "Terapia individual",
      duration: "50 min",
      status: "confirmed",
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
      daysUntil: 6,
    },
    {
      id: 3,
      date: "15 enero 2025",
      time: "10:00",
      psychologist: "Dra. Carmen Rodríguez",
      sessionType: "Primera consulta",
      duration: "45 min",
      status: "completed",
      daysUntil: -8,
    }
  ];

  return {
    allAppointments
  };
};