<script>
  import { goto } from '$app/navigation';
  import OnboardingSteps from '$lib/components/onboarding/OnboardingSteps.svelte';
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Switch } from '$lib/components/ui/switch';
  import { Label } from '$lib/components/ui/label';
  import { Clock, Calendar } from 'lucide-svelte';
  
  const steps = [
    { id: 1, title: "Perfil Básico", description: "Información personal y profesional" },
    { id: 2, title: "Configurar Servicios", description: "Define tus tipos de sesiones" },
    { id: 3, title: "Definir Horarios", description: "Establece tu disponibilidad" },
    { id: 4, title: "Plataforma de Video", description: "Conecta Zoom o Teams" },
    { id: 5, title: "Finalización", description: "Revisa y activa tu página" }
  ];
  
  let currentStep = $state(3);
  let completedSteps = $state([1, 2]);
  
  let schedule = $state([
    { id: "monday", name: "Lunes", active: true, start: "09:00", end: "18:00" },
    { id: "tuesday", name: "Martes", active: true, start: "09:00", end: "18:00" },
    { id: "wednesday", name: "Miércoles", active: true, start: "09:00", end: "18:00" },
    { id: "thursday", name: "Jueves", active: true, start: "09:00", end: "18:00" },
    { id: "friday", name: "Viernes", active: true, start: "09:00", end: "17:00" },
    { id: "saturday", name: "Sábado", active: false, start: "10:00", end: "14:00" },
    { id: "sunday", name: "Domingo", active: false, start: "10:00", end: "14:00" }
  ]);
  
  function handleNext() {
    goto('/onboarding/video-platform');
  }
  
  function handlePrevious() {
    goto('/onboarding/services');
  }
  
  let hasActiveDay = $derived(schedule.some(day => day.active));
</script>

<div class="max-w-6xl mx-auto">
  <OnboardingSteps {steps} {currentStep} {completedSteps} />
  
  <div class="mt-8 grid lg:grid-cols-3 gap-8">
    <!-- Main Content -->
    <div class="lg:col-span-2 space-y-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Define tus horarios</h2>
        <p class="text-gray-600">
          Establece cuándo estás disponible para sesiones. Los clientes solo podrán reservar en estos horarios.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2 text-2xl">
            <Calendar class="w-5 h-5" />
            Horario Semanal
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          {#each schedule as day (day.id)}
            <div class="flex items-center justify-between p-4 border rounded-lg">
              <div class="flex items-center space-x-3">
                <Switch bind:checked={day.active} />
                <Label class="font-medium">{day.name}</Label>
              </div>
              
              {#if day.active}
                <div class="flex items-center space-x-2">
                  <span class="text-sm text-gray-600">de</span>
                  <input 
                    type="time" 
                    bind:value={day.start}
                    class="border rounded px-2 py-1 text-sm"
                  />
                  <span class="text-sm text-gray-600">a</span>
                  <input 
                    type="time" 
                    bind:value={day.end}
                    class="border rounded px-2 py-1 text-sm"
                  />
                </div>
              {/if}
            </div>
          {/each}
        </CardContent>
      </Card>

      <!-- Navigation -->
      <div class="flex items-center justify-between pt-6 border-t">
        <Button variant="outline" onclick={() => handlePrevious()} class="bg-transparent">
          Anterior
        </Button>

        <div class="flex gap-3">
          <Button variant="ghost" class="text-gray-600 bg-transparent">
            Saltar por ahora
          </Button>
          <Button
            onclick={() => handleNext()}
            class="bg-blue-600 hover:bg-blue-700"
            disabled={!hasActiveDay}
          >
            Guardar y continuar
          </Button>
        </div>
      </div>
    </div>

    <!-- Sidebar -->
    <div class="space-y-6">
      <Card class="border-green-100">
        <CardHeader>
          <CardTitle class="text-green-700">✅ Horarios más populares</CardTitle>
        </CardHeader>
        <CardContent class="space-y-3 text-sm">
          <div>
            <h4 class="font-medium">Lunes a Viernes</h4>
            <p class="text-gray-600">9:00 - 18:00 (más demandado)</p>
          </div>
          <div>
            <h4 class="font-medium">Tardes</h4>
            <p class="text-gray-600">15:00 - 20:00 (alta demanda)</p>
          </div>
          <div>
            <h4 class="font-medium">Sábados</h4>
            <p class="text-gray-600">10:00 - 14:00 (opcional)</p>
          </div>
        </CardContent>
      </Card>

      <Card class="border-blue-100">
        <CardHeader>
          <CardTitle class="text-blue-700">💡 Consejos</CardTitle>
        </CardHeader>
        <CardContent class="space-y-3 text-sm">
          <p class="text-gray-600">
            <strong>Flexibilidad:</strong> Podrás modificar estos horarios en cualquier momento desde tu dashboard.
          </p>
          <p class="text-gray-600">
            <strong>Descansos:</strong> El sistema automáticamente añade 10 minutos entre sesiones.
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
</div>