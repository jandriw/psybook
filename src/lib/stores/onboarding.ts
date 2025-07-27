// src/lib/stores/onboarding.ts
import { writable } from 'svelte/store';

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface OnboardingState {
  currentStep: number;
  steps: OnboardingStep[];
  completedSteps: number[];
  profile: any;
  services: any[];
  schedule: any;
  videoPlatform: any;
}

function createOnboardingStore() {
  const initialState: OnboardingState = {
    currentStep: 1,
    steps: [
      { id: 1, title: "Perfil Básico", description: "Información personal y profesional", completed: false },
      { id: 2, title: "Configurar Servicios", description: "Define tus tipos de sesiones", completed: false },
      { id: 3, title: "Definir Horarios", description: "Establece tu disponibilidad", completed: false },
      { id: 4, title: "Plataforma de Video", description: "Conecta Zoom o Teams", completed: false },
      { id: 5, title: "Finalización", description: "Revisa y activa tu página", completed: false }
    ],
    completedSteps: [],
    profile: null,
    services: [],
    schedule: null,
    videoPlatform: null
  };

  const { subscribe, set, update } = writable(initialState);

  return {
    subscribe,
    setCurrentStep: (step: number) => update(state => ({ ...state, currentStep: step })),
    completeStep: (step: number) => update(state => ({
      ...state,
      completedSteps: [...state.completedSteps, step].filter((v, i, arr) => arr.indexOf(v) === i)
    })),
    setProfile: (profile: any) => update(state => ({ ...state, profile })),
    setServices: (services: any[]) => update(state => ({ ...state, services })),
    setSchedule: (schedule: any) => update(state => ({ ...state, schedule })),
    setVideoPlatform: (videoPlatform: any) => update(state => ({ ...state, videoPlatform })),
    reset: () => set(initialState)
  };
}

export const onboardingStore = createOnboardingStore();