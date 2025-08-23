<!-- src/lib/components/patient/UpcomingAppointments.svelte -->
<script lang="ts">
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
  } from '$lib/components/ui/dropdown-menu';
  import { Calendar, Clock, MoreHorizontal, RefreshCw, X } from 'lucide-svelte';

  let { appointments = [] } = $props();

  function getStatusBadge(status: string, daysUntil: number) {
    if (daysUntil <= 1) {
      return { class: "bg-blue-100 text-blue-700 border-blue-200", text: "Mañana" };
    }
    if (daysUntil <= 2) {
      return { class: "bg-orange-100 text-orange-700 border-orange-200", text: "En 2 días" };
    }
    return { class: "bg-green-100 text-green-700 border-green-200", text: "Confirmada" };
  }

  function handleReschedule(appointmentId: number) {
    alert(`Reprogramar cita ${appointmentId}`);
  }

  function handleCancel(appointmentId: number) {
    if (confirm('¿Estás seguro de que quieres cancelar esta cita?')) {
      alert(`Cancelar cita ${appointmentId}`);
    }
  }
</script>

<Card class="border-blue-50">
  <CardHeader>
    <CardTitle class="flex items-center gap-2 text-gray-800">
      <Calendar class="w-5 h-5 text-blue-600" />
      Próximas citas
    </CardTitle>
  </CardHeader>
  <CardContent class="space-y-4">
    {#if appointments.length > 0}
      {#each appointments as appointment}
        {@const badge = getStatusBadge(appointment.status, appointment.daysUntil)}
        <Card class="border-gray-100 hover:border-blue-200 transition-colors">
          <CardContent class="p-6">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div class="space-y-3">
                <div class="flex items-center space-x-3">
                  <div>
                    <h3 class="font-semibold text-gray-800">{appointment.date}</h3>
                    <div class="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <div class="flex items-center space-x-1">
                        <Clock class="w-4 h-4" />
                        <span>{appointment.time}</span>
                      </div>
                      <span>•</span>
                      <span>{appointment.duration}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <p class="font-medium text-gray-700">{appointment.sessionType}</p>
                  <p class="text-sm text-gray-600">con {appointment.psychologist}</p>
                </div>
              </div>

              <div class="flex items-center space-x-3">
                <Badge class={badge.class}>
                  {badge.text}
                </Badge>

                <DropdownMenu>
                  <DropdownMenuTrigger>
                    {#snippet child({ props })}
                      <Button {...props} variant="ghost" size="sm" class="bg-transparent">
                        <MoreHorizontal class="w-4 h-4" />
                      </Button>
                    {/snippet}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onclick={() => handleReschedule(appointment.id)}>
                      <RefreshCw class="mr-2 h-4 w-4" />
                      Reprogramar
                    </DropdownMenuItem>
                    <DropdownMenuItem onclick={() => handleCancel(appointment.id)} class="text-red-600">
                      <X class="mr-2 h-4 w-4" />
                      Cancelar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>
      {/each}
    {:else}
      <div class="text-center py-8 text-gray-500">
        <Calendar class="w-12 h-12 mx-auto mb-4 text-gray-300" />
        <p>No tienes citas programadas</p>
        <Button class="mt-4 bg-blue-600 hover:bg-blue-700">Reservar nueva sesión</Button>
      </div>
    {/if}
  </CardContent>
</Card>