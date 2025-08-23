<!-- src/routes/patient/appointments/+page.svelte -->
 <script lang="ts">
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { Calendar, Clock, ArrowLeft, Plus } from 'lucide-svelte';
  import { goto } from '$app/navigation';

  let { data } = $props();

  function goBack() {
    goto('/patient');
  }

  function handleNewAppointment() {
    alert('Reservar nueva sesión');
  }

  function getStatusColor(status: string, daysUntil: number) {
    if (daysUntil <= 1) return "bg-blue-100 text-blue-700 border-blue-200";
    if (daysUntil <= 2) return "bg-orange-100 text-orange-700 border-orange-200";
    return "bg-green-100 text-green-700 border-green-200";
  }
</script>

<svelte:head>
  <title>Mis Citas - PsyBooking</title>
</svelte:head>

<div class="max-w-4xl mx-auto space-y-6">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <div class="flex items-center space-x-4">
      <Button variant="ghost" onclick={goBack} class="bg-transparent">
        <ArrowLeft class="w-4 h-4 mr-2" />
        Volver
      </Button>
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Mis Citas</h1>
        <p class="text-gray-600">Gestiona todas tus sesiones programadas</p>
      </div>
    </div>
    
    <Button class="bg-blue-600 hover:bg-blue-700" onclick={handleNewAppointment}>
      <Plus class="w-4 h-4 mr-2" />
      Nueva Sesión
    </Button>
  </div>

  <!-- Lista completa de citas -->
  {#if data.allAppointments && data.allAppointments.length > 0}
    <div class="space-y-4">
      {#each data.allAppointments as appointment}
        <Card class="hover:shadow-md transition-shadow">
          <CardContent class="p-6">
            <div class="flex items-center justify-between">
              <div class="space-y-2">
                <div class="flex items-center space-x-2">
                  <h3 class="font-semibold text-gray-900">{appointment.date}</h3>
                  <Badge class={getStatusColor(appointment.status, appointment.daysUntil)}>
                    {appointment.daysUntil <= 1 ? 'Mañana' : 'Confirmada'}
                  </Badge>
                </div>
                
                <div class="flex items-center space-x-4 text-sm text-gray-600">
                  <div class="flex items-center space-x-1">
                    <Clock class="w-4 h-4" />
                    <span>{appointment.time}</span>
                  </div>
                  <span>•</span>
                  <span>{appointment.duration}</span>
                  <span>•</span>
                  <span>{appointment.sessionType}</span>
                </div>
                
                <p class="text-sm text-gray-500">con {appointment.psychologist}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      {/each}
    </div>
  {:else}
    <Card>
      <CardContent class="p-12 text-center">
        <Calendar class="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h3 class="text-xl font-medium text-gray-900 mb-2">No tienes citas programadas</h3>
        <p class="text-gray-600 mb-6">Reserva tu primera sesión para comenzar tu proceso terapéutico</p>
        <Button class="bg-blue-600 hover:bg-blue-700" onclick={handleNewAppointment}>
          Reservar Primera Sesión
        </Button>
      </CardContent>
    </Card>
  {/if}
</div>