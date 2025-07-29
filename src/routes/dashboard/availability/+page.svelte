<!--src/routes/dashboard/availability/+page.svelte-->
<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import WeekCalendar from '$lib/components/dashboard/WeekCalendar.svelte';
  import QuickBlockModal from '$lib/components/dashboard/QuickBlockModal.svelte';
  import SpecialBlocks from '$lib/components/dashboard/SpecialBlocks.svelte';
  import AvailabilitySettings from '$lib/components/dashboard/AvailabilitySettings.svelte';
  import {
    Clock,
    Calendar,
    Settings,
    CheckCircle,
    AlertCircle,
    TrendingUp,
    Users
  } from 'lucide-svelte';

  interface Appointment {
    id: string;
    clientName: string;
    service: string;
    startTime: string;
    endTime: string;
    date: string;
    status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
    price: number;
    hasVideo: boolean;
  }

  interface TimeBlock {
    id: string;
    title: string;
    startTime: string;
    endTime: string;
    date: string;
    type: 'blocked' | 'vacation' | 'personal';
    reason?: string;
  }

  interface Block {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    reason: string;
    type: string;
  }

  interface AvailabilitySettingsData {
    bufferTime: number;
    maxDailyAppointments: number;
    advanceBookingDays: number;
    minAdvanceBooking: number;
    autoConfirm: boolean;
    allowWeekends: boolean;
    sessionDuration: number;
  }

  let { data } = $props();

  // Estado de la página
  let activeTab = $state('schedule');
  let showBlockModal = $state(false);

  // Estados para modales del calendario
  let showQuickBlockModal = $state(false);
  let blockModalData = $state({
    date: '',
    startTime: '',
    endTime: ''
  });

  // Citas de ejemplo para el calendario
  let calendarAppointments = $state<Appointment[]>([
    {
      id: '1',
      clientName: 'María García',
      service: 'Terapia individual',
      startTime: '09:00',
      endTime: '09:50',
      date: '2025-01-29',
      status: 'confirmed',
      price: 60,
      hasVideo: true
    },
    {
      id: '2',
      clientName: 'Carlos Ruiz',
      service: 'Primera consulta',
      startTime: '11:00',
      endTime: '11:45',
      date: '2025-01-29',
      status: 'confirmed',
      price: 45,
      hasVideo: true
    },
    {
      id: '3',
      clientName: 'Ana Martín',
      service: 'Seguimiento',
      startTime: '15:30',
      endTime: '16:00',
      date: '2025-01-29',
      status: 'pending',
      price: 50,
      hasVideo: false
    },
    {
      id: '4',
      clientName: 'Pareja López',
      service: 'Terapia de pareja',
      startTime: '17:00',
      endTime: '18:00',
      date: '2025-01-29',
      status: 'confirmed',
      price: 75,
      hasVideo: true
    },
    {
      id: '5',
      clientName: 'Pedro Jiménez',
      service: 'Terapia individual',
      startTime: '10:00',
      endTime: '10:50',
      date: '2025-01-30',
      status: 'completed',
      price: 60,
      hasVideo: false
    },
    {
      id: '6',
      clientName: 'Laura Fernández',
      service: 'Primera consulta',
      startTime: '16:00',
      endTime: '16:45',
      date: '2025-01-31',
      status: 'pending',
      price: 45,
      hasVideo: true
    }
  ]);

  // Bloqueos para el calendario
  let calendarBlocks = $state<TimeBlock[]>([
    {
      id: '1',
      title: 'Almuerzo',
      startTime: '13:00',
      endTime: '14:00',
      date: '2025-01-29',
      type: 'personal',
      reason: 'Pausa para almorzar'
    },
    {
      id: '2',
      title: 'Tiempo personal',
      startTime: '16:30',
      endTime: '17:00',
      date: '2025-01-30',
      type: 'blocked',
      reason: 'Descanso'
    },
    {
      id: '3',
      title: 'Formación',
      startTime: '12:00',
      endTime: '13:00',
      date: '2025-01-31',
      type: 'personal',
      reason: 'Curso online'
    }
  ]);

  // Bloqueos especiales (para el tab de blocks)
  let specialBlocks = $state<Block[]>([
    {
      id: '1',
      title: 'Vacaciones de Navidad',
      startDate: '2024-12-23',
      endDate: '2025-01-07',
      startTime: '',
      endTime: '',
      reason: 'Vacaciones navideñas familiares',
      type: 'vacation'
    },
    {
      id: '2',
      title: 'Cita médica',
      startDate: '2025-02-15',
      endDate: '2025-02-15',
      startTime: '10:00',
      endTime: '12:00',
      reason: 'Revisión médica anual',
      type: 'medical'
    },
    {
      id: '3',
      title: 'Formación profesional',
      startDate: '2025-03-10',
      endDate: '2025-03-12',
      startTime: '',
      endTime: '',
      reason: 'Curso de actualización en terapia cognitivo-conductual',
      type: 'other'
    }
  ]);

  // Configuración de disponibilidad
  let availabilitySettings = $state<AvailabilitySettingsData>({
    bufferTime: 15,
    maxDailyAppointments: 8,
    advanceBookingDays: 60,
    minAdvanceBooking: 24,
    autoConfirm: true,
    allowWeekends: false,
    sessionDuration: 50
  });

  // Estadísticas computadas
  let stats = $derived({
    activeDays: 5, // Hardcodeado para simplicidad
    totalWeeklyHours: 40, // Hardcodeado
    upcomingBlocks: specialBlocks.filter(block => 
      new Date(block.startDate) >= new Date()
    ).length,
    maxSlotsPerWeek: 32 // Hardcodeado
  });

  // Navegación entre tabs
  const tabs = [
    { id: 'schedule', label: 'Calendario Semanal', icon: Clock },
    { id: 'blocks', label: 'Bloqueos Especiales', icon: Calendar },
    { id: 'settings', label: 'Configuración', icon: Settings }
  ];

  // Funciones para el calendario
  function handleAppointmentClick(appointment: Appointment): void {
    alert(`Cita con ${appointment.clientName}\n${appointment.service}\n${appointment.startTime} - ${appointment.endTime}\nPrecio: ${appointment.price}€`);
  }

  function handleSlotClick(date: string, time: string): void {
    // Crear nueva cita
    alert(`Crear nueva cita para ${new Date(date).toLocaleDateString('es-ES')} a las ${time}`);
  }

  function handleBlockSlot(date: string, startTime: string, endTime: string): void {
    blockModalData = { date, startTime, endTime };
    showQuickBlockModal = true;
  }

  function handleSaveBlock(blockData: any): void {
    const newBlock: TimeBlock = {
      ...blockData,
      id: Date.now().toString()
    };
    calendarBlocks = [...calendarBlocks, newBlock];
  }

  // Funciones para bloqueos especiales
  function handleAddBlock(block: Block): void {
    specialBlocks = [...specialBlocks, block];
  }

  function handleEditBlock(updatedBlock: Block): void {
    specialBlocks = specialBlocks.map(block => 
      block.id === updatedBlock.id ? updatedBlock : block
    );
  }

  function handleDeleteBlock(blockId: string): void {
    specialBlocks = specialBlocks.filter(block => block.id !== blockId);
  }

  function handleSaveSettings(settings: AvailabilitySettingsData): void {
    availabilitySettings = settings;
    alert('Configuración guardada correctamente');
  }

  function handleQuickSetup(): void {
    // Configuración rápida: resetear bloqueos del calendario
    calendarBlocks = [
      {
        id: 'lunch',
        title: 'Almuerzo',
        startTime: '13:00',
        endTime: '14:00',
        date: '2025-01-29',
        type: 'personal',
        reason: 'Pausa para almorzar'
      }
    ];
    alert('Configuración rápida aplicada: Horario de almuerzo añadido');
  }
</script>

<svelte:head>
  <title>Disponibilidad - Dashboard PsyBooking</title>
</svelte:head>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Gestión de Disponibilidad</h1>
      <p class="text-gray-600">Configura tus horarios y gestiona tu calendario semanal</p>
    </div>
    <Button onclick={handleQuickSetup} variant="outline">
      <Clock class="mr-2 h-4 w-4" />
      Configuración Rápida
    </Button>
  </div>

  <!-- Stats Cards -->
  <div class="grid gap-4 md:grid-cols-4">
    <Card>
      <CardContent>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Días Activos</p>
            <p class="text-2xl font-bold text-blue-600">{stats.activeDays}/7</p>
          </div>
          <Calendar class="h-8 w-8 text-blue-600" />
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Horas Semanales</p>
            <p class="text-2xl font-bold text-green-600">{stats.totalWeeklyHours}h</p>
          </div>
          <Clock class="h-8 w-8 text-green-600" />
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Slots Semanales</p>
            <p class="text-2xl font-bold text-purple-600">{stats.maxSlotsPerWeek}</p>
          </div>
          <Users class="h-8 w-8 text-purple-600" />
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Bloqueos Próximos</p>
            <p class="text-2xl font-bold text-orange-600">{stats.upcomingBlocks}</p>
          </div>
          <AlertCircle class="h-8 w-8 text-orange-600" />
        </div>
      </CardContent>
    </Card>
  </div>

  <!-- Navigation Tabs -->
  <div class="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
    {#each tabs as tab}
      <button
        class="px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center space-x-2 {
          activeTab === tab.id 
            ? 'bg-white text-gray-900 shadow-sm' 
            : 'text-gray-600 hover:text-gray-900'
        }"
        onclick={() => activeTab = tab.id}
      >
        <!-- svelte-ignore svelte_component_deprecated -->
        <svelte:component this={tab.icon} class="w-4 h-4" />
        <span>{tab.label}</span>
      </button>
    {/each}
  </div>

  <!-- Tab Content -->
  <div class="space-y-6">
    {#if activeTab === 'schedule'}
      <!-- Calendario Semanal -->
      <WeekCalendar 
        appointments={calendarAppointments}
        blocks={calendarBlocks}
        onAppointmentClick={handleAppointmentClick}
        onSlotClick={handleSlotClick}
        onBlockSlot={handleBlockSlot}
      />
      
      <!-- Resumen de la semana -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <CheckCircle class="h-5 w-5 text-green-600" />
            Resumen de la Semana Actual
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center p-4 bg-blue-50 rounded-lg">
              <div class="text-2xl font-bold text-blue-600 mb-1">
                {calendarAppointments.filter(apt => apt.status === 'confirmed').length}
              </div>
              <div class="text-sm text-blue-800">Citas confirmadas</div>
            </div>
            
            <div class="text-center p-4 bg-green-50 rounded-lg">
              <div class="text-2xl font-bold text-green-600 mb-1">
                {calendarAppointments.reduce((sum, apt) => sum + apt.price, 0)}€
              </div>
              <div class="text-sm text-green-800">Ingresos programados</div>
            </div>
            
            <div class="text-center p-4 bg-purple-50 rounded-lg">
              <div class="text-2xl font-bold text-purple-600 mb-1">
                {calendarBlocks.length}
              </div>
              <div class="text-sm text-purple-800">Bloqueos activos</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
    {:else if activeTab === 'blocks'}
      <!-- Bloqueos Especiales -->
      <SpecialBlocks 
        bind:blocks={specialBlocks}
        bind:showModal={showBlockModal}
        onAddBlock={handleAddBlock}
        onEditBlock={handleEditBlock}
        onDeleteBlock={handleDeleteBlock}
      />
      
    {:else if activeTab === 'settings'}
      <!-- Configuración -->
      <AvailabilitySettings 
        bind:settings={availabilitySettings}
        onSave={handleSaveSettings}
      />
      
      <!-- Impacto de la configuración -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <TrendingUp class="h-5 w-5 text-blue-600" />
            Impacto de la Configuración
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center p-4 bg-blue-50 rounded-lg">
              <div class="text-2xl font-bold text-blue-600 mb-1">
                {Math.floor(stats.totalWeeklyHours * 60 / (availabilitySettings.sessionDuration + availabilitySettings.bufferTime))}
              </div>
              <div class="text-sm text-blue-800">Citas por semana</div>
            </div>
            
            <div class="text-center p-4 bg-green-50 rounded-lg">
              <div class="text-2xl font-bold text-green-600 mb-1">
                {availabilitySettings.maxDailyAppointments * stats.activeDays}
              </div>
              <div class="text-sm text-green-800">Límite semanal</div>
            </div>
            
            <div class="text-center p-4 bg-purple-50 rounded-lg">
              <div class="text-2xl font-bold text-purple-600 mb-1">
                {availabilitySettings.advanceBookingDays}
              </div>
              <div class="text-sm text-purple-800">Días de anticipación</div>
            </div>
          </div>
          
          <div class="mt-6 p-4 border-l-4 border-blue-500 bg-blue-50">
            <h4 class="font-medium text-blue-900 mb-2">Recomendaciones</h4>
            <ul class="text-sm text-blue-800 space-y-1">
              <li>• Con {availabilitySettings.bufferTime} minutos de descanso tendrás tiempo para notas y preparación</li>
              <li>• Un límite de {availabilitySettings.maxDailyAppointments} citas diarias evita el burnout</li>
              <li>• {availabilitySettings.minAdvanceBooking} horas de antelación te da flexibilidad para planificar</li>
              {#if availabilitySettings.autoConfirm}
                <li>• La confirmación automática reduce tu carga administrativa</li>
              {/if}
            </ul>
          </div>
        </CardContent>
      </Card>
    {/if}
  </div>

  <!-- Acciones globales -->
  <Card class="border-green-200 bg-green-50">
    <CardContent class="p-6">
      <div class="flex items-start justify-between">
        <div>
          <h3 class="font-medium text-green-900 mb-1">Calendario Configurado</h3>
          <p class="text-sm text-green-800">
            Tu calendario está listo. Los clientes pueden reservar citas y tú puedes gestionar tu tiempo desde aquí.
          </p>
        </div>
        <div class="flex items-center space-x-2">
          <CheckCircle class="h-5 w-5 text-green-600" />
          <span class="text-sm font-medium text-green-800">Activo</span>
        </div>
      </div>
    </CardContent>
  </Card>
</div>

<!-- Modal para bloquear slots rápidos -->
<QuickBlockModal
  bind:show={showQuickBlockModal}
  date={blockModalData.date}
  startTime={blockModalData.startTime}
  endTime={blockModalData.endTime}
  onSave={handleSaveBlock}
  onCancel={() => {}}
/>