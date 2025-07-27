<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from '$lib/components/ui/breadcrumb';
  import { Bell, Plus, CalendarIcon, Menu } from 'lucide-svelte';

  let { sidebarOpen = $bindable(), user } = $props();

  // Estado para dropdown de notificaciones
  let showNotifications = $state(false);

  // Fecha actual
  const today = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric", 
    month: "long",
    day: "numeric",
  });

  // Notificaciones simuladas
  const notifications = [
    {
      title: "Nueva reserva confirmada",
      description: "Laura Martínez - Terapia individual - Mañana 10:00",
      time: "Hace 15 min"
    },
    {
      title: "Pago recibido", 
      description: "60€ de Carlos Ruiz - Sesión completada",
      time: "Hace 1 hora"
    },
    {
      title: "Recordatorio",
      description: "Sesión con Ana Martín en 30 minutos", 
      time: "Hace 2 horas"
    },
  ];

  function handleNewAppointment() {
    // Navegar a crear nueva cita
    alert('Navegar a nueva cita');
  }
</script>

<header class="bg-white border-b border-gray-200 px-6 py-4">
  <div class="flex items-center justify-between">
    <!-- Left side -->
    <div class="flex items-center gap-4">
      <!-- Mobile menu button -->
      <Button 
        variant="ghost" 
        size="icon" 
        class="lg:hidden"
        onclick={() => sidebarOpen = true}
      >
        <Menu class="h-4 w-4" />
      </Button>

      <!-- Breadcrumb -->
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem class="hidden md:block">
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator class="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>Resumen</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>

    <!-- Right side -->
    <div class="flex items-center gap-4">
      <!-- Date -->
      <div class="hidden md:flex items-center text-sm text-gray-600">
        <CalendarIcon class="mr-2 h-4 w-4" />
        {today}
      </div>

      <!-- Notifications -->
      <!-- Notifications (versión simplificada) -->
      <div class="relative">
        <Button 
          variant="outline" 
          size="icon" 
          class="relative"
          onclick={() => showNotifications = !showNotifications}
        >
          <Bell class="h-4 w-4" />
          <Badge class="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 p-0 text-xs text-white">
            {notifications.length}
          </Badge>
        </Button>

        {#if showNotifications}
          <div class="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-md shadow-lg z-50">
            <div class="p-3 border-b border-gray-200">
              <h3 class="font-medium">Notificaciones</h3>
            </div>
            {#each notifications as notification}
              <div class="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                <div class="flex flex-col space-y-1">
                  <p class="text-sm font-medium">{notification.title}</p>
                  <p class="text-xs text-gray-500">{notification.description}</p>
                  <p class="text-xs text-gray-400">{notification.time}</p>
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>

      <!-- New Appointment Button -->
      <Button size="sm" class="bg-blue-600 hover:bg-blue-700" onclick={handleNewAppointment}>
        <Plus class="mr-2 h-4 w-4" />
        <span class="hidden sm:inline">Nueva Cita</span>
      </Button>
    </div>
  </div>
</header>