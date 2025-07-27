import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  // En producción aquí cargaríamos datos reales desde Supabase
  
  return {
    // Datos que se pasarán al componente
    // Por ahora hardcodeados, luego vendrán de la DB
    dashboardData: {
      stats: {
        monthlyRevenue: 2340,
        completedSessions: 42,
        cancellationRate: 3.2,
        newClients: 8
      },
      todayAppointments: [],
      weeklyData: [],
      notifications: []
    }
  };
};