// src/lib/utils/dashboard.ts
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount);
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function getTimeRemaining(appointmentTime: string): string {
  const now = new Date();
  const appointment = new Date(`${now.toDateString()} ${appointmentTime}`);
  const diff = appointment.getTime() - now.getTime();
  
  if (diff < 0) return 'Pasada';
  if (diff < 60 * 60 * 1000) return `En ${Math.floor(diff / (60 * 1000))} min`;
  if (diff < 24 * 60 * 60 * 1000) return `En ${Math.floor(diff / (60 * 60 * 1000))} horas`;
  
  return 'Próximamente';
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Buenos días';
  if (hour < 18) return 'Buenas tardes';
  return 'Buenas noches';
}

export function calculateWeeklyProgress(completed: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}