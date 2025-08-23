<!-- src/lib/components/patient/ProgressStats.svelte -->
<script lang="ts">
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { TrendingUp, Calendar, Clock } from 'lucide-svelte';

  let { stats } = $props();
</script>

<Card class="border-green-100 bg-gradient-to-br from-green-25 to-blue-25">
  <CardHeader>
    <CardTitle class="flex items-center gap-2 text-green-700">
      <TrendingUp class="w-5 h-5" />
      Tu progreso
    </CardTitle>
  </CardHeader>
  <CardContent class="space-y-4">
    <div class="text-center space-y-2">
      <div class="text-3xl font-bold text-green-600">{stats.sessionsCompleted}</div>
      <p class="text-sm text-gray-600">sesiones completadas</p>
    </div>

    <div class="space-y-3">
      <div class="flex items-center justify-between text-sm">
        <div class="flex items-center space-x-2">
          <Calendar class="w-4 h-4 text-blue-600" />
          <span class="text-gray-600">En terapia desde</span>
        </div>
        <span class="font-medium text-gray-800">{stats.startDate}</span>
      </div>

      <div class="flex items-center justify-between text-sm">
        <div class="flex items-center space-x-2">
          <Clock class="w-4 h-4 text-purple-600" />
          <span class="text-gray-600">Tiempo invertido</span>
        </div>
        <span class="font-medium text-gray-800">{stats.totalHours}h</span>
      </div>
    </div>

    <div class="pt-4 border-t border-green-100">
      <p class="text-xs text-center text-gray-600">
        ¡Vas muy bien! Tu próximo hito son {stats.nextMilestone} sesiones
      </p>
    </div>
  </CardContent>
</Card>