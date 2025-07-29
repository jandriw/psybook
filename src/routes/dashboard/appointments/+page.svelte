<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { Input } from '$lib/components/ui/input';
  import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
  import AppointmentStatusBadge from '$lib/components/dashboard/AppointmentStatusBadge.svelte';
  import AppointmentFilters from '$lib/components/dashboard/AppointmentFilters.svelte';
  import {
    Calendar,
    Clock,
    User,
    Phone,
    Video,
    FileText,
    Edit,
    Trash2,
    Plus,
    ChevronRight,
    Euro,
    MessageSquare
  } from 'lucide-svelte';

  let { data } = $props();

  // Estados reactivos para filtros
  let searchTerm = $state('');
  let selectedStatus = $state('all');
  let selectedDate = $state('');
  let activeTab = $state('upcoming');

  // Datos hardcodeados
  const appointments = [
    {
      id: '1',
      date: '2025-01-29',
      time: '09:00',
      client: {
        name: 'María García Rodríguez',
        phone: '+34 666 123 456',
        email: 'maria@example.com'
      },
      service: 'Primera consulta',
      duration: 45,
      price: 45,
      status: 'confirmed',
      notes: 'Primera sesión. Cliente derivado por médico de cabecera.',
      videoLink: 'https://zoom.us/j/123456789'
    },
    {
      id: '2',
      date: '2025-01-29',
      time: '11:00',
      client: {
        name: 'Carlos Ruiz López',
        phone: '+34 666 987 654',
        email: 'carlos@example.com'
      },
      service: 'Terapia individual',
      duration: 50,
      price: 60,
      status: 'confirmed',
      notes: 'Tercera sesión. Evolución favorable.',
      videoLink: 'https://zoom.us/j/987654321'
    },
    {
      id: '3',
      date: '2025-01-29',
      time: '15:30',
      client: {
        name: 'Ana Martín Sánchez',
        phone: '+34 666 555 333',
        email: 'ana@example.com'
      },
      service: 'Seguimiento',
      duration: 30,
      price: 50,
      status: 'pending',
      notes: 'Seguimiento post-tratamiento.',
      videoLink: null
    },
    {
      id: '4',
      date: '2025-01-29',
      time: '17:00',
      client: {
        name: 'Pareja López-Sánchez',
        phone: '+34 666 111 222',
        email: 'pareja@example.com'
      },
      service: 'Terapia de pareja',
      duration: 60,
      price: 75,
      status: 'confirmed',
      notes: 'Sesión conjunta. Trabajar comunicación.',
      videoLink: 'https://zoom.us/j/555666777'
    },
    {
      id: '5',
      date: '2025-01-28',
      time: '10:00',
      client: {
        name: 'Pedro Jiménez',
        phone: '+34 666 444 555',
        email: 'pedro@example.com'
      },
      service: 'Terapia individual',
      duration: 50,
      price: 60,
      status: 'completed',
      notes: 'Sesión completada. Buena evolución.',
      videoLink: null
    },
    {
      id: '6',
      date: '2025-01-28',
      time: '16:00',
      client: {
        name: 'Laura Fernández',
        phone: '+34 666 777 888',
        email: 'laura@example.com'
      },
      service: 'Primera consulta',
      duration: 45,
      price: 45,
      status: 'no_show',
      notes: 'No asistió. Reagendar.',
      videoLink: null
    }
  ];

  // Filtros computados (Svelte 5)
  let filteredAppointments = $derived(appointments.filter(appointment => {
    const matchesSearch = appointment.client.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || appointment.status === selectedStatus;
    const matchesDate = !selectedDate || appointment.date === selectedDate;
    
    return matchesSearch && matchesStatus && matchesDate;
  }));

  let upcomingAppointments = $derived(filteredAppointments.filter(apt => {
    const aptDate = new Date(apt.date + 'T' + apt.time);
    return aptDate > new Date() || apt.status === 'pending' || apt.status === 'confirmed';
  }));

  let pastAppointments = $derived(filteredAppointments.filter(apt => {
    const aptDate = new Date(apt.date + 'T' + apt.time);
    return aptDate < new Date() || apt.status === 'completed' || apt.status === 'no_show' || apt.status === 'cancelled';
  }));

  // Funciones de acciones
  function handleNewAppointment() {
    alert('Crear nueva cita');
  }

  function handleEditAppointment(id: string) {
    alert(`Editar cita ${id}`);
  }

  function handleDeleteAppointment(id: string) {
    if (confirm('¿Estás seguro de eliminar esta cita?')) {
      alert(`Eliminar cita ${id}`);
    }
  }

  function handleVideoCall(appointment: any) {
    if (appointment.videoLink) {
      window.open(appointment.videoLink, '_blank');
    } else {
      alert('Enlace de video no disponible');
    }
  }

  function handleViewNotes(id: string) {
    alert(`Ver notas de cita ${id}`);
  }

  function handleCallClient(phone: string) {
    window.open(`tel:${phone}`);
  }

  function handleMessageClient(phone: string) {
    window.open(`https://wa.me/${phone.replace(/\s/g, '')}`);
  }

  function clearFilters() {
    searchTerm = '';
    selectedStatus = 'all';
    selectedDate = '';
  }

  // Estadísticas rápidas (Svelte 5)
  let stats = $derived({
    today: appointments.filter(apt => apt.date === new Date().toISOString().split('T')[0]).length,
    confirmed: appointments.filter(apt => apt.status === 'confirmed').length,
    pending: appointments.filter(apt => apt.status === 'pending').length,
    totalRevenue: appointments
      .filter(apt => apt.status === 'completed')
      .reduce((sum, apt) => sum + apt.price, 0)
  });
</script>

<svelte:head>
  <title>Citas - Dashboard PsyBooking</title>
</svelte:head>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Gestión de Citas</h1>
      <p class="text-gray-600">Administra todas tus sesiones programadas</p>
    </div>
    <Button class="bg-blue-600 hover:bg-blue-700" onclick={handleNewAppointment}>
      <Plus class="mr-2 h-4 w-4" />
      Nueva Cita
    </Button>
  </div>

  <!-- Stats Cards -->
  <div class="grid gap-4 md:grid-cols-4">
    <Card>
      <CardContent>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Citas Hoy</p>
            <p class="text-2xl font-bold">{stats.today}</p>
          </div>
          <Calendar class="h-8 w-8 text-blue-600" />
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Confirmadas</p>
            <p class="text-2xl font-bold text-green-600">{stats.confirmed}</p>
          </div>
          <Clock class="h-8 w-8 text-green-600" />
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Pendientes</p>
            <p class="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
          <Clock class="h-8 w-8 text-yellow-600" />
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Ingresos</p>
            <p class="text-2xl font-bold text-green-600">{stats.totalRevenue}€</p>
          </div>
          <Euro class="h-8 w-8 text-green-600" />
        </div>
      </CardContent>
    </Card>
  </div>

  <!-- Filtros -->
  <AppointmentFilters 
    bind:searchTerm 
    bind:selectedStatus 
    bind:selectedDate 
    onClearFilters={clearFilters}
  />

  <!-- Tabs -->
  <Tabs bind:value={activeTab}>
    <TabsList class="grid w-fit grid-cols-2">
      <TabsTrigger value="upcoming">
        Próximas ({upcomingAppointments.length})
      </TabsTrigger>
      <TabsTrigger value="past">
        Pasadas ({pastAppointments.length})
      </TabsTrigger>
    </TabsList>

    <!-- Próximas Citas -->
    <TabsContent value="upcoming" class="space-y-4">
      {#if upcomingAppointments.length === 0}
        <Card>
          <CardContent class="p-12 text-center">
            <Calendar class="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 class="text-lg font-medium text-gray-900 mb-2">No hay citas próximas</h3>
            <p class="text-gray-600 mb-4">No tienes citas programadas que coincidan con los filtros.</p>
            <Button onclick={handleNewAppointment}>Programar Nueva Cita</Button>
          </CardContent>
        </Card>
      {:else}
        {#each upcomingAppointments as appointment}
          <Card class="hover:shadow-md transition-shadow">
            <CardContent class="px-6">
              <div class="flex items-center justify-between">
                <!-- Info Principal -->
                <div class="flex items-center space-x-4">
                  <div class="flex flex-col items-center justify-center w-16 h-16 bg-blue-50 rounded-lg">
                    <span class="text-lg font-bold text-blue-600">
                      {appointment.time.split(':')[0]}
                    </span>
                    <span class="text-xs text-blue-600">
                      {appointment.time.split(':')[1]}
                    </span>
                  </div>

                  <div class="flex-1">
                    <div class="flex items-center space-x-2 mb-1">
                      <h3 class="text-lg font-semibold text-gray-900">
                        {appointment.client.name}
                      </h3>
                      <AppointmentStatusBadge status={appointment.status} />
                    </div>
                    
                    <div class="flex items-center space-x-4 text-sm text-gray-600">
                      <span class="flex items-center">
                        <Calendar class="mr-1 h-3 w-3" />
                        {new Date(appointment.date).toLocaleDateString('es-ES', { 
                          weekday: 'long', 
                          day: 'numeric', 
                          month: 'long' 
                        })}
                      </span>
                      <span class="flex items-center">
                        <Clock class="mr-1 h-3 w-3" />
                        {appointment.duration} min
                      </span>
                      <span class="flex items-center">
                        <Euro class="mr-1 h-3 w-3" />
                        {appointment.price}€
                      </span>
                    </div>

                    <p class="text-sm text-gray-800 mt-1">{appointment.service}</p>
                    {#if appointment.notes}
                      <p class="text-xs text-gray-500 mt-1">{appointment.notes}</p>
                    {/if}
                  </div>
                </div>

                <!-- Acciones -->
                <div class="flex items-center space-x-2">
                  <!-- Llamar cliente -->
                  <Button
                    variant="outline"
                    size="sm"
                    onclick={() => handleCallClient(appointment.client.phone)}
                    title="Llamar"
                  >
                    <Phone class="h-4 w-4" />
                  </Button>

                  <!-- WhatsApp -->
                  <Button
                    variant="outline"
                    size="sm"
                    onclick={() => handleMessageClient(appointment.client.phone)}
                    title="WhatsApp"
                  >
                    <MessageSquare class="h-4 w-4" />
                  </Button>

                  <!-- Video llamada -->
                  {#if appointment.videoLink}
                    <Button
                      variant="outline"
                      size="sm"
                      class="text-green-600 border-green-200 hover:bg-green-50"
                      onclick={() => handleVideoCall(appointment)}
                      title="Unirse a videollamada"
                    >
                      <Video class="h-4 w-4" />
                    </Button>
                  {/if}

                  <!-- Notas -->
                  <Button
                    variant="outline"
                    size="sm"
                    onclick={() => handleViewNotes(appointment.id)}
                    title="Ver notas"
                  >
                    <FileText class="h-4 w-4" />
                  </Button>

                  <!-- Editar -->
                  <Button
                    variant="outline"
                    size="sm"
                    onclick={() => handleEditAppointment(appointment.id)}
                    title="Editar"
                  >
                    <Edit class="h-4 w-4" />
                  </Button>

                  <!-- Eliminar -->
                  <Button
                    variant="outline"
                    size="sm"
                    class="text-red-600 border-red-200 hover:bg-red-50"
                    onclick={() => handleDeleteAppointment(appointment.id)}
                    title="Eliminar"
                  >
                    <Trash2 class="h-4 w-4" />
                  </Button>

                  <!-- Ver detalle -->
                  <Button
                    variant="ghost"
                    size="sm"
                    onclick={() => window.location.href = `/dashboard/appointments/${appointment.id}`}
                  >
                    <ChevronRight class="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        {/each}
      {/if}
    </TabsContent>

    <!-- Citas Pasadas -->
    <TabsContent value="past" class="space-y-4">
      {#if pastAppointments.length === 0}
        <Card>
          <CardContent class="p-12 text-center">
            <Clock class="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 class="text-lg font-medium text-gray-900 mb-2">No hay citas pasadas</h3>
            <p class="text-gray-600">No tienes historial de citas que coincidan con los filtros.</p>
          </CardContent>
        </Card>
      {:else}
        {#each pastAppointments as appointment}
          <Card class="hover:shadow-md transition-shadow opacity-75">
            <CardContent class="p-6">
              <div class="flex items-center justify-between">
                <!-- Info Principal -->
                <div class="flex items-center space-x-4">
                  <div class="flex flex-col items-center justify-center w-16 h-16 bg-gray-50 rounded-lg">
                    <span class="text-lg font-bold text-gray-600">
                      {appointment.time.split(':')[0]}
                    </span>
                    <span class="text-xs text-gray-600">
                      {appointment.time.split(':')[1]}
                    </span>
                  </div>

                  <div class="flex-1">
                    <div class="flex items-center space-x-2 mb-1">
                      <h3 class="text-lg font-semibold text-gray-700">
                        {appointment.client.name}
                      </h3>
                      <AppointmentStatusBadge status={appointment.status} />
                    </div>
                    
                    <div class="flex items-center space-x-4 text-sm text-gray-500">
                      <span class="flex items-center">
                        <Calendar class="mr-1 h-3 w-3" />
                        {new Date(appointment.date).toLocaleDateString('es-ES', { 
                          day: 'numeric', 
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                      <span class="flex items-center">
                        <Clock class="mr-1 h-3 w-3" />
                        {appointment.duration} min
                      </span>
                      <span class="flex items-center">
                        <Euro class="mr-1 h-3 w-3" />
                        {appointment.price}€
                      </span>
                    </div>

                    <p class="text-sm text-gray-600 mt-1">{appointment.service}</p>
                    {#if appointment.notes}
                      <p class="text-xs text-gray-400 mt-1">{appointment.notes}</p>
                    {/if}
                  </div>
                </div>

                <!-- Acciones limitadas para citas pasadas -->
                <div class="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onclick={() => handleViewNotes(appointment.id)}
                    title="Ver notas"
                  >
                    <FileText class="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onclick={() => window.location.href = `/dashboard/appointments/${appointment.id}`}
                  >
                    <ChevronRight class="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        {/each}
      {/if}
    </TabsContent>
  </Tabs>
</div>