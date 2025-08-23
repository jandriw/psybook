// src/routes/patient/profile/+page.server.ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const user = {
    name: 'Mario López',
    email: 'mario.lopez@email.com',
    phone: '+34 666 555 777',
    avatar: null,
    createdAt: '2025-01-01'
  };

  return {
    user
  };
};