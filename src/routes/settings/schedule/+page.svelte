<script>
  import SettingsHeader from '$lib/components/settings/SettingsHeader.svelte';
  import SettingToggleBefore from '$lib/components/settings/SettingToggleBefore.svelte';
  import TimeRangeInput from '$lib/components/settings/TimeRangeInput.svelte';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Clock, Plus } from 'lucide-svelte';

  let { data } = $props();

  let weekDays = $state([
    { id: "monday", name: "Lunes", active: true, start: "09:00", end: "18:00" },
    { id: "tuesday", name: "Martes", active: true, start: "09:00", end: "18:00" },
    { id: "wednesday", name: "Miércoles", active: true, start: "09:00", end: "18:00" },
    { id: "thursday", name: "Jueves", active: true, start: "09:00", end: "18:00" },
    { id: "friday", name: "Viernes", active: true, start: "09:00", end: "17:00" },
    { id: "saturday", name: "Sábado", active: false, start: "10:00", end: "14:00" },
    { id: "sunday", name: "Domingo", active: false, start: "10:00", end: "14:00" },
  ]);

  // Auto-save cuando cambian los horarios
  $effect(() => {
    saveSchedule(weekDays);
  });

  async function saveSchedule(schedule) {
    // Debounced save implementation
  }
</script>

<div class="max-w-4xl mx-auto space-y-8">
  <SettingsHeader 
    icon={Clock} 
    title="Horarios de Disponibilidad"
    description="Define cuándo estás disponible para sesiones"
  />

  <Card>
    <CardHeader>
      <CardTitle>
        <div class="text-2xl">Horario Semanal</div>
      </CardTitle>
      <CardDescription>Configura tu disponibilidad para cada día de la semana</CardDescription>
    </CardHeader>
    <CardContent class="space-y-4">
      {#each weekDays as day (day.id)}
        <div class="flex items-center justify-between p-4 border rounded-lg">
          <SettingToggleBefore
            bind:checked={day.active}
            title={day.name}
          />
          
          {#if day.active}
            <TimeRangeInput
              bind:startTime={day.start}
              bind:endTime={day.end}
            />
          {/if}
        </div>
      {/each}
    </CardContent>
  </Card>

  <Card>
    <CardHeader>
      <div class="flex items-center justify-between">
        <div>
          <CardTitle>
            <div class="text-2xl">Bloqueos Especiales</div>
          </CardTitle>
          <CardDescription>Días específicos no disponibles</CardDescription>
        </div>
        <Button variant="outline" class="bg-transparent">
          <Plus class="w-4 h-4 mr-2" />
          Añadir Bloqueo
        </Button>
      </div>
    </CardHeader>
    <CardContent>
      <p class="text-gray-500 text-center py-8">No tienes bloqueos programados</p>
    </CardContent>
  </Card>
</div>