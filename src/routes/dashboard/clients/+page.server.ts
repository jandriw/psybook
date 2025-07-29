import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  // Datos hardcodeados para testing UI
  // En producción aquí cargarías los clientes desde Supabase
  
  return {
    clients: [], // Los datos están hardcodeados en el componente por ahora
    meta: {
      title: 'Gestión de Clientes',
      description: 'Administra toda tu base de clientes'
    }
  };
};