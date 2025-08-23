// src/routes/patient/+layout.server.ts
// import { redirect } from '@sveltejs/kit';
// import type { LayoutServerLoad } from './$types';

// export const load: LayoutServerLoad = async ({ locals, url }) => {
//   // Verificar autenticación
//   if (!locals.user) {
//     throw redirect(302, '/auth/login');
//   }

//   // Verificar que es un paciente/cliente
//   if (locals.user.role !== 'patient' && locals.user.role !== 'client') {
//     throw redirect(302, '/dashboard'); // Si es psicólogo, al dashboard
//   }

//   return {
//     user: locals.user
//   };
// };