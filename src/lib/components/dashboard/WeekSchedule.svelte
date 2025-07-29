<script lang="ts">
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Switch } from '$lib/components/ui/switch';
  import { Label } from '$lib/components/ui/label';
  import { Clock, Save, RotateCcw } from 'lucide-svelte';

  interface DaySchedule {
    active: boolean;
    startTime: string;
    endTime: string;
  }

  interface WeekScheduleData {
    [key: string]: DaySchedule;
  }

  let { weekSchedule = $bindable(), onSave = () => {} }: {
    weekSchedule: WeekScheduleData;
    onSave: (schedule: WeekScheduleData) => void;
  } = $props();

  const daysOfWeek = [
    { id: 'monday', name: 'Lunes', short: 'Lun' },
    { id: 'tuesday', name: 'Martes', short: 'Mar' },
    { id: 'wednesday', name: 'Miércoles', short: 'Mié' },
    { id: 'thursday', name: 'Jueves', short: 'Jue' },
    { id: 'friday', name: 'Viernes', short: 'Vie' },
    { id: 'saturday', name: 'Sábado', short: 'Sáb' },
    { id: 'sunday', name: 'Domingo', short: 'Dom' }
  ];

  function toggleDay(dayId: string): void {
    weekSchedule[dayId].active = !weekSchedule[dayId].active;
  }

  function updateTime(dayId: string, field: 'startTime' | 'endTime', value: string): void {
    weekSchedule[dayId][field] = value;
  }

  function copyToAllDays(sourceDay: string): void {
    const sourceSchedule = weekSchedule[sourceDay];
    daysOfWeek.forEach(day => {
      if (day.id !== sourceDay) {
        weekSchedule[day.id] = {
          ...weekSchedule[day.id],
          startTime: sourceSchedule.startTime,
          endTime: sourceSchedule.endTime
        };
      }
    });
  }

  function handleSave(): void {
    onSave(weekSchedule);
  }
</script>

<Card>
  <CardHeader>
    <div class="flex items-center justify-between">
      <CardTitle class="flex items-center gap-2">
        <Clock class="h-5 w-5" />
        Horario Semanal
      </CardTitle>
      <Button onclick={handleSave} class="bg-blue-600 hover:bg-blue-700">
        <Save class="mr-2 h-4 w-4" />
        Guardar Cambios
      </Button>
    </div>
  </CardHeader>
  <CardContent class="space-y-4">
    {#each daysOfWeek as day}
      <div class="flex items-center justify-between p-4 border rounded-lg {
        weekSchedule[day.id].active ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
      }">
        <!-- Día y toggle -->
        <div class="flex items-center space-x-4 min-w-32">
          <Switch 
            checked={weekSchedule[day.id].active}
            onCheckedChange={() => toggleDay(day.id)}
          />
          <Label class="font-medium {weekSchedule[day.id].active ? 'text-blue-900' : 'text-gray-500'}">
            {day.name}
          </Label>
        </div>

        <!-- Horarios -->
        {#if weekSchedule[day.id].active}
          <div class="flex items-center space-x-4 flex-1">
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-600">De:</span>
              <Input
                type="time"
                value={weekSchedule[day.id].startTime}
                oninput={(e) => updateTime(day.id, 'startTime', (e.target as HTMLInputElement).value)}
                class="w-32"
              />
            </div>
            <span class="text-gray-400">—</span>
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-600">A:</span>
              <Input
                type="time"
                value={weekSchedule[day.id].endTime}
                oninput={(e) => updateTime(day.id, 'endTime', (e.target as HTMLInputElement).value)}
                class="w-32"
              />
            </div>
            
            <!-- Copiar a otros días -->
            <Button
              variant="outline"
              size="sm"
              onclick={() => copyToAllDays(day.id)}
              title="Copiar este horario a todos los días"
              class="ml-4"
            >
              <RotateCcw class="h-4 w-4" />
            </Button>
          </div>
        {:else}
          <div class="flex-1 text-center">
            <span class="text-gray-500 text-sm">Día no disponible</span>
          </div>
        {/if}
      </div>
    {/each}

    <!-- Resumen semanal -->
    <div class="mt-6 p-4 bg-gray-50 rounded-lg">
      <h4 class="font-medium text-gray-900 mb-2">Resumen Semanal</h4>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div>
          <span class="text-gray-600">Días activos:</span>
          <span class="font-medium ml-1">
            {Object.values(weekSchedule).filter(day => day.active).length}/7
          </span>
        </div>
        <div>
          <span class="text-gray-600">Total horas:</span>
          <span class="font-medium ml-1">
            {Object.values(weekSchedule)
              .filter(day => day.active)
              .reduce((total, day) => {
                const start = new Date(`1970-01-01T${day.startTime}`);
                const end = new Date(`1970-01-01T${day.endTime}`);
                return total + (end.getTime() - start.getTime()) / (1000 * 60 * 60);
              }, 0)
              .toFixed(1)}h
          </span>
        </div>
      </div>
    </div>
  </CardContent>
</Card>