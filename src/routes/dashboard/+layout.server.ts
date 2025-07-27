// import { redirect } from '@sveltejs/kit';
// import type { LayoutServerLoad } from './$types';

// export const load: LayoutServerLoad = async ({ locals }) => {
//   // Verificar autenticación
//   if (!locals.user) {
//     throw redirect(302, '/auth/login');
//   }

//   // Verificar que es un psicólogo
//   if (locals.user.role !== 'psychologist') {
//     throw redirect(302, '/client');
//   }

//   return {
//     user: {
//       id: locals.user.id,
//       name: locals.user.name || 'Dra. Carmen Rodríguez',
//       email: locals.user.email,
//       specialty: 'Psicóloga Clínica',
//       avatar: locals.user.avatar || null,
//       initials: getInitials(locals.user.name || 'Carmen Rodríguez')
//     }
//   };
// };

// function getInitials(name: string): string {
//   return name
//     .split(' ')
//     .map(part => part[0])
//     .join('')
//     .toUpperCase()
//     .slice(0, 2);
// }