// import { redirect } from '@sveltejs/kit';
// import type { LayoutServerLoad } from './$types';

// export const load: LayoutServerLoad = async ({ locals, url }) => {
//   // Verificar autenticación
//   if (!locals.user) {
//     throw redirect(302, '/auth/login');
//   }

//   // Verificar que es un psicólogo
//   if (locals.user.role !== 'psychologist') {
//     throw redirect(302, '/dashboard');
//   }

//   return {
//     user: locals.user
//   };
// };