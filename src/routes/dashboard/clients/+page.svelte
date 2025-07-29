<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import ClientFilters from '$lib/components/dashboard/ClientFilters.svelte';
  import ClientCard from '$lib/components/dashboard/ClientCard.svelte';
  import {
    Users,
    UserPlus,
    Search,
    Plus,
    TrendingUp,
    Calendar,
    FileText,
    Download
  } from 'lucide-svelte';

  let { data } = $props();

  // Estados reactivos para filtros
  let searchTerm = $state('');
  let selectedStatus = $state('all');
  let sortBy = $state('name');

  // Datos hardcodeados de clientes
  const clients = [
    {
      id: '1',
      name: 'María García Rodríguez',
      email: 'maria.garcia@email.com',
      phone: '+34 666 123 456',
      avatar: null,
      status: 'active',
      totalSessions: 8,
      lastSession: '2025-01-25',
      createdAt: '2024-11-15',
      quickNotes: 'Cliente muy colaborativa. Trabajando ansiedad generalizada. Evolución muy positiva.',
      totalSpent: 480,
      nextAppointment: '2025-01-30T10:00'
    },
    {
      id: '2',
      name: 'Carlos Ruiz López',
      email: 'carlos.ruiz@email.com',
      phone: '+34 666 987 654',
      avatar: null,
      status: 'active',
      totalSessions: 12,
      lastSession: '2025-01-26',
      createdAt: '2024-10-08',
      quickNotes: 'Terapia cognitivo-conductual para depresión. Muy comprometido con el proceso.',
      totalSpent: 720,
      nextAppointment: '2025-01-29T11:00'
    },
    {
      id: '3',
      name: 'Ana Martín Sánchez',
      email: 'ana.martin@email.com',
      phone: '+34 666 555 333',
      avatar: null,
      status: 'active',
      totalSessions: 15,
      lastSession: '2025-01-24',
      createdAt: '2024-09-20',
      quickNotes: 'Tratamiento para trastorno de estrés postraumático. Requiere seguimiento cercano.',
      totalSpent: 900,
      nextAppointment: '2025-01-29T15:30'
    },
    {
      id: '4',
      name: 'Pedro Jiménez Morales',
      email: 'pedro.jimenez@email.com',
      phone: '+34 666 444 555',
      avatar: null,
      status: 'inactive',
      totalSessions: 6,
      lastSession: '2024-12-15',
      createdAt: '2024-11-01',
      quickNotes: 'Paró el tratamiento por motivos económicos. Mostró interés en continuar más adelante.',
      totalSpent: 360,
      nextAppointment: null
    },
    {
      id: '5',
      name: 'Laura Fernández Castro',
      email: 'laura.fernandez@email.com',
      phone: '+34 666 777 888',
      avatar: null,
      status: 'new',
      totalSessions: 2,
      lastSession: '2025-01-20',
      createdAt: '2025-01-10',
      quickNotes: 'Nueva cliente. Primera consulta muy positiva. Trabajar autoestima y relaciones.',
      totalSpent: 90,
      nextAppointment: '2025-01-30T16:00'
    },
    {
      id: '6',
      name: 'Pareja López-Sánchez',
      email: 'pareja.lopez@email.com',
      phone: '+34 666 111 222',
      avatar: null,
      status: 'active',
      totalSessions: 10,
      lastSession: '2025-01-27',
      createdAt: '2024-10-15',
      quickNotes: 'Terapia de pareja. Buenos avances en comunicación. Próxima fase: intimidad.',
      totalSpent: 750,
      nextAppointment: '2025-01-29T17:00'
    },
    {
      id: '7',
      name: 'Roberto Vázquez Gil',
      email: 'roberto.vazquez@email.com',
      phone: '+34 666 999 000',
      avatar: null,
      status: 'archived',
      totalSessions: 20,
      lastSession: '2024-08-30',
      createdAt: '2024-03-15',
      quickNotes: 'Tratamiento completado exitosamente. Alta terapéutica por objetivos cumplidos.',
      totalSpent: 1200,
      nextAppointment: null
    },
    {
      id: '8',
      name: 'Sofía Ruiz Martínez',
      email: 'sofia.ruiz@email.com',
      phone: '+34 666 333 444',
      avatar: null,
      status: 'active',
      totalSessions: 5,
      lastSession: '2025-01-23',
      createdAt: '2024-12-20',
      quickNotes: 'Adolescente derivada por instituto. Trabajando problemas de conducta y familia.',
      totalSpent: 225,
      nextAppointment: '2025-01-31T12:00'
    }
  ];

  // Filtros computados (Svelte 5)
  let filteredClients = $derived(
    clients
      .filter(client => {
        const matchesSearch = 
          client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = selectedStatus === 'all' || client.status === selectedStatus;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'name_desc':
            return b.name.localeCompare(a.name);
          case 'recent':
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          case 'sessions':
            return b.totalSessions - a.totalSessions;
          case 'last_session':
            if (!a.lastSession && !b.lastSession) return 0;
            if (!a.lastSession) return 1;
            if (!b.lastSession) return -1;
            return new Date(b.lastSession).getTime() - new Date(a.lastSession).getTime();
          default:
            return 0;
        }
      })
  );

  // Estadísticas computadas (Svelte 5)
  let stats = $derived({
    total: clients.length,
    active: clients.filter(c => c.status === 'active').length,
    new: clients.filter(c => c.status === 'new').length,
    totalRevenue: clients.reduce((sum, c) => sum + c.totalSpent, 0),
    avgSessions: Math.round(
      clients.reduce((sum, c) => sum + c.totalSessions, 0) / clients.length
    )
  });

  // Funciones de acciones
  function handleNewClient() {
    alert('Crear nuevo cliente');
  }

  function handleViewProfile(clientId: string) {
    window.location.href = `/dashboard/clients/${clientId}`;
  }

  function handleEditClient(clientId: string) {
    alert(`Editar cliente ${clientId}`);
  }

  function handleCallClient(phone: string) {
    window.open(`tel:${phone}`);
  }

  function handleMessageClient(phone: string) {
    window.open(`https://wa.me/${phone.replace(/\s/g, '')}`);
  }

  function handleViewNotes(clientId: string) {
    alert(`Ver notas del cliente ${clientId}`);
  }

  function handleExportClients() {
    alert('Exportar listado de clientes');
  }

  function clearFilters() {
    searchTerm = '';
    selectedStatus = 'all';
    sortBy = 'name';
  }
</script>

<svelte:head>
  <title>Clientes - Dashboard PsyBooking</title>
</svelte:head>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Gestión de Clientes</h1>
      <p class="text-gray-600">Administra toda tu base de clientes</p>
    </div>
    <div class="flex items-center space-x-2">
      <Button variant="outline" onclick={handleExportClients}>
        <Download class="mr-2 h-4 w-4" />
        Exportar
      </Button>
      <Button class="bg-blue-600 hover:bg-blue-700" onclick={handleNewClient}>
        <Plus class="mr-2 h-4 w-4" />
        Nuevo Cliente
      </Button>
    </div>
  </div>

  <!-- Stats Cards -->
  <div class="grid gap-4 md:grid-cols-5">
    <Card>
      <CardContent>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Clientes</p>
            <p class="text-2xl font-bold">{stats.total}</p>
          </div>
          <Users class="h-8 w-8 text-blue-600" />
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Activos</p>
            <p class="text-2xl font-bold text-green-600">{stats.active}</p>
          </div>
          <TrendingUp class="h-8 w-8 text-green-600" />
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Nuevos</p>
            <p class="text-2xl font-bold text-blue-600">{stats.new}</p>
          </div>
          <UserPlus class="h-8 w-8 text-blue-600" />
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Ingresos Total</p>
            <p class="text-2xl font-bold text-green-600">{stats.totalRevenue}€</p>
          </div>
          <TrendingUp class="h-8 w-8 text-green-600" />
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Promedio Sesiones</p>
            <p class="text-2xl font-bold">{stats.avgSessions}</p>
          </div>
          <Calendar class="h-8 w-8 text-purple-600" />
        </div>
      </CardContent>
    </Card>
  </div>

  <!-- Filtros -->
  <ClientFilters 
    bind:searchTerm 
    bind:selectedStatus 
    bind:sortBy
    onClearFilters={clearFilters}
  />

  <!-- Lista de Clientes -->
  <div class="space-y-4">
    {#if filteredClients.length === 0}
      <Card>
        <CardContent class="p-12 text-center">
          <Users class="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 class="text-lg font-medium text-gray-900 mb-2">No se encontraron clientes</h3>
          <p class="text-gray-600 mb-4">No hay clientes que coincidan con los filtros aplicados.</p>
          <Button onclick={clearFilters} variant="outline">Limpiar Filtros</Button>
        </CardContent>
      </Card>
    {:else}
      <div class="text-sm text-gray-600 mb-4">
        Mostrando {filteredClients.length} de {stats.total} clientes
      </div>
      
      {#each filteredClients as client}
        <ClientCard 
          {client}
          onViewProfile={handleViewProfile}
          onEditClient={handleEditClient}
          onCallClient={handleCallClient}
          onMessageClient={handleMessageClient}
          onViewNotes={handleViewNotes}
        />
      {/each}
    {/if}
  </div>

  <!-- Paginación (preparada para el futuro) -->
  {#if filteredClients.length > 10}
    <div class="flex justify-center">
      <div class="flex items-center space-x-2">
        <Button variant="outline" disabled>Anterior</Button>
        <span class="px-4 py-2 text-sm text-gray-600">Página 1 de 1</span>
        <Button variant="outline" disabled>Siguiente</Button>
      </div>
    </div>
  {/if}
</div>