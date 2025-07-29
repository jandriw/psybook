import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  // Datos hardcodeados para testing UI
  // En producción aquí cargarías las citas desde Supabase
  
  return {
    appointments: [], // Los datos están hardcodeados en el componente por ahora
    meta: {
      title: 'Gestión de Citas',
      description: 'Administra todas tus sesiones programadas'
    }
  };
};