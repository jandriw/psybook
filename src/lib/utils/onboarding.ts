// src/lib/utils/onboarding.ts
export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  icon: string;
}

export function validateService(service: Service): boolean {
  return !!(service.name && service.price > 0 && service.duration > 0);
}

export function validateAllServices(services: Service[]): boolean {
  return services.length > 0 && services.every(validateService);
}

export function generateServiceId(): string {
  return Date.now().toString();
}

export const DEFAULT_SERVICES: Omit<Service, 'id'>[] = [
  {
    name: "Terapia individual",
    description: "Sesión estándar de terapia cognitivo-conductual",
    duration: 50,
    price: 60,
    icon: "user"
  },
  {
    name: "Primera consulta",
    description: "Evaluación inicial y plan de tratamiento",
    duration: 45,
    price: 45,
    icon: "heart"
  }
];

export const PREDEFINED_SERVICES: Record<string, Omit<Service, 'id'>> = {
  couple: {
    name: "Terapia de pareja",
    description: "Sesión conjunta para parejas",
    duration: 60,
    price: 75,
    icon: "users"
  },
  followup: {
    name: "Sesión de seguimiento",
    description: "Revisión de progreso y ajustes",
    duration: 30,
    price: 40,
    icon: "heart"
  },
  family: {
    name: "Terapia familiar",
    description: "Sesión familiar con múltiples participantes",
    duration: 90,
    price: 90,
    icon: "users"
  },
  intensive: {
    name: "Sesión intensiva",
    description: "Sesión extendida para casos complejos",
    duration: 90,
    price: 120,
    icon: "user"
  }
};