// src/lib/utils/onboarding-navigation.ts
export const ONBOARDING_STEPS = [
  { path: '/onboarding/profile', step: 1 },
  { path: '/onboarding/services', step: 2 },
  { path: '/onboarding/schedule', step: 3 },
  { path: '/onboarding/video-platform', step: 4 },
  { path: '/onboarding/complete', step: 5 }
];

export function getStepFromPath(pathname: string): number {
  const found = ONBOARDING_STEPS.find(s => s.path === pathname);
  return found?.step || 1;
}

export function getPathFromStep(step: number): string {
  const found = ONBOARDING_STEPS.find(s => s.step === step);
  return found?.path || '/onboarding/profile';
}

export function getNextStep(currentStep: number): string | null {
  const nextStep = currentStep + 1;
  return nextStep <= 5 ? getPathFromStep(nextStep) : null;
}

export function getPreviousStep(currentStep: number): string | null {
  const prevStep = currentStep - 1;
  return prevStep >= 1 ? getPathFromStep(prevStep) : null;
}