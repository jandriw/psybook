<script>
  import { CheckCircle } from 'lucide-svelte';
  
  let { steps, currentStep, completedSteps } = $props();
  
  // Calcular progreso con rune derivado
  let progress = $derived(((currentStep - 1) / (steps.length - 1)) * 100);
</script>

<div class="w-full">
  <!-- Progress Bar -->
  <div class="mb-8" style="margin-bottom: 2rem;">
    <div class="flex items-center justify-between mb-4" style="margin-bottom: 1rem;">
      <h1 class="text-2xl font-bold text-gray-900">Configuración de tu consulta</h1>
      <div class="text-sm text-gray-600">
        Paso {currentStep} de {steps.length}
      </div>
    </div>
    
    <div class="relative">
      <div class="absolute top-5 left-0 w-full h-0.5 bg-gray-200"></div>
      <div
        class="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500"
        style="width: {progress}%"
      ></div>
      
      <div class="relative flex justify-between">
        {#each steps as step (step.id)}
          {@const isCompleted = completedSteps.includes(step.id)}
          {@const isCurrent = step.id === currentStep}
          {@const isUpcoming = step.id > currentStep && !isCompleted}
          
          <div class="flex flex-col items-center">
            <!-- Step Circle con estilos inline como fallback -->
            {#if isCompleted}
              <div 
                class="step-circle completed"
                style="background-color: #10b981; border-color: #10b981; color: white;"
              >
                <CheckCircle class="w-5 h-5" />
              </div>
            {:else if isCurrent}
              <div 
                class="step-circle current"
                style="background-color: #3b82f6; border-color: #3b82f6; color: white;"
              >
                <span class="text-sm font-semibold">{step.id}</span>
              </div>
            {:else}
              <div 
                class="step-circle upcoming"
                style="background-color: white; border-color: #d1d5db; color: #9ca3af;"
              >
                <span class="text-sm font-semibold">{step.id}</span>
              </div>
            {/if}
            
            <!-- Step Labels -->
            <div class="mt-3 text-center max-w-[120px]" style="margin-top: 0.75rem;">
              {#if isCompleted}
                <div class="step-title completed" style="color: #059669;">
                  {step.title}
                </div>
              {:else if isCurrent}
                <div class="step-title current" style="color: #2563eb;">
                  {step.title}
                </div>
              {:else}
                <div class="step-title upcoming" style="color: #9ca3af;">
                  {step.title}
                </div>
              {/if}
              <div class="text-xs text-gray-500 mt-1 hidden sm:block" style="margin-top: 0.25rem;">
                {step.description}
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
  
  <!-- Encouraging Message -->
  <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8" 
       style="background-color: #eff6ff; border-color: #bfdbfe; margin-bottom: 2rem; padding: 1rem;">
    <p class="text-blue-800 text-center" style="color: #1e40af; text-align: center;">
      <span class="font-semibold">¡Estás haciendo un gran progreso!</span> 
      Estás a pocos pasos de automatizar tu consulta y empezar a recibir reservas automáticas.
    </p>
  </div>
</div>

<style>
  /* Estilos CSS explícitos para asegurar que se vean correctamente */
  .step-circle {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    border-width: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    position: relative;
    z-index: 10;
  }
  
  .step-circle.completed {
    background-color: #10b981 !important;
    border-color: #10b981 !important;
    color: white !important;
  }
  
  .step-circle.current {
    background-color: #3b82f6 !important;
    border-color: #3b82f6 !important;
    color: white !important;
  }
  
  .step-circle.upcoming {
    background-color: white !important;
    border-color: #d1d5db !important;
    color: #9ca3af !important;
  }
  
  .step-title {
    font-size: 0.875rem;
    font-weight: 500;
  }
  
  .step-title.completed {
    color: #059669 !important;
  }
  
  .step-title.current {
    color: #2563eb !important;
  }
  
  .step-title.upcoming {
    color: #9ca3af !important;
  }
  
  /* Asegurar que los colores se apliquen incluso si Tailwind no los carga */
  :global(.step-circle.completed) {
    background-color: #10b981 !important;
    border-color: #10b981 !important;
    color: white !important;
  }
  
  :global(.step-circle.current) {
    background-color: #3b82f6 !important;
    border-color: #3b82f6 !important;
    color: white !important;
  }
  
  :global(.step-circle.upcoming) {
    background-color: white !important;
    border-color: #d1d5db !important;
    color: #9ca3af !important;
  }
</style>