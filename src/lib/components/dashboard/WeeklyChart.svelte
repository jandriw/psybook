<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Progress } from '$lib/components/ui/progress';
  import { Calendar } from 'lucide-svelte';

  let { weeklyData } = $props();
</script>

<Card>
  <CardHeader>
    <CardTitle class="flex items-center gap-2 text-2xl">
      <Calendar class="h-5 w-5" />
      Resumen Semanal
    </CardTitle>
    <CardDescription>Citas programadas y completadas esta semana</CardDescription>
  </CardHeader>
  <CardContent>
    <div class="grid grid-cols-7 gap-4">
      {#each weeklyData as day}
        <div class="text-center space-y-2">
          <div class="text-sm font-medium text-gray-600">{day.day}</div>
          <div class="space-y-1">
            <div class="text-lg font-bold">{day.appointments}</div>
            <Progress
              value={day.appointments > 0 ? (day.completed / day.appointments) * 100 : 0}
              class="h-2"
            />
            <div class="text-xs text-gray-600">
              {day.completed}/{day.appointments}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </CardContent>
</Card>