<script>
  import { goto } from '$app/navigation';
  import OnboardingSteps from '$lib/components/onboarding/OnboardingSteps.svelte';
  import ConfigureServices from '$lib/components/onboarding/ConfigureServices.svelte';
  
  let { data } = $props();
  
  const steps = [
    { id: 1, title: "Perfil Básico", description: "Información personal y profesional" },
    { id: 2, title: "Configurar Servicios", description: "Define tus tipos de sesiones" },
    { id: 3, title: "Definir Horarios", description: "Establece tu disponibilidad" },
    { id: 4, title: "Plataforma de Video", description: "Conecta Zoom o Teams" },
    { id: 5, title: "Finalización", description: "Revisa y activa tu página" }
  ];
  
  let currentStep = $state(2);
  let completedSteps = $state([1]);
  
  function handleNext() {
    goto('/onboarding/schedule');
  }
  
  function handlePrevious() {
    goto('/onboarding/profile');
  }
</script>

<div class="max-w-6xl mx-auto">
  <OnboardingSteps {steps} {currentStep} {completedSteps} />
  
  <div class="mt-8">
    <ConfigureServices 
      onNext={handleNext}
      onPrevious={handlePrevious}
      initialServices={data.services || []}
    />
  </div>
</div>