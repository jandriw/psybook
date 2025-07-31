<!-- svelte-ignore state_referenced_locally -->
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

  // ✅ FUNCIONES AUXILIARES
  function getStartOfWeek(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  }

  function parseTime(timeStr: string): number {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date.getTime();
  }

  function formatTime(date: Date): string {
    return date.toTimeString().slice(0, 5);
  }

  // ✅ FUNCIÓN PARA GENERAR CITAS INTELIGENTES
  function generateSmartAppointments(): Appointment[] {
    const appointments: Appointment[] = [];
    const today = new Date();
    const currentWeekStart = getStartOfWeek(today);
    
    const clientNames = [
      'María García López', 'Carlos Ruiz Martín', 'Ana Sánchez Pérez',
      'Luis Fernández Gómez', 'Carmen Rodríguez Vila', 'Miguel Torres Ruiz',
      'Laura Martínez Santos', 'Pablo Jiménez Moreno', 'Isabel López García',
      'David Herrera Blanco', 'Cristina Vega Rubio', 'Alejandro Díaz Cruz',
      'Patricia Morales Ortiz', 'Roberto Castillo Ramos', 'Elena Guerrero Soto'
    ];

    const services = [
      { name: 'Terapia individual', price: 60, duration: 50 },
      { name: 'Primera consulta', price: 45, duration: 45 },
      { name: 'Terapia de pareja', price: 75, duration: 60 },
      { name: 'Seguimiento', price: 50, duration: 30 },
      { name: 'Sesión intensiva', price: 90, duration: 90 }
    ];

    // Generar para 3 semanas (pasada, actual, siguiente)
    for (let weekOffset = -1; weekOffset <= 1; weekOffset++) {
      const weekStart = new Date(currentWeekStart);
      weekStart.setDate(weekStart.getDate() + (weekOffset * 7));

      const appointmentsThisWeek = Math.floor(Math.random() * 5) + 8; // 8-12 citas
      
      for (let i = 0; i < appointmentsThisWeek; i++) {
        const dayOffset = Math.random() < 0.8 ? 
          Math.floor(Math.random() * 5) : // 80% lunes-viernes
          Math.floor(Math.random() * 7);   // 20% cualquier día

        const appointmentDate = new Date(weekStart);
        appointmentDate.setDate(appointmentDate.getDate() + dayOffset);
        
        const possibleHours = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00'];
        const startTime = possibleHours[Math.floor(Math.random() * possibleHours.length)];
        
        const service = services[Math.floor(Math.random() * services.length)];
        const startMinutes = parseTime(startTime);
        const endTime = formatTime(new Date(startMinutes + service.duration * 60000));

        let status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
        if (weekOffset === -1) {
          status = Math.random() < 0.85 ? 'completed' : 'cancelled';
        } else if (weekOffset === 0) {
          if (appointmentDate < today) {
            status = Math.random() < 0.9 ? 'completed' : 'cancelled';
          } else {
            status = Math.random() < 0.9 ? 'confirmed' : 'pending';
          }
        } else {
          status = Math.random() < 0.7 ? 'confirmed' : 'pending';
        }

        appointments.push({
          id: `smart-${weekOffset}-${i}`,
          clientName: clientNames[Math.floor(Math.random() * clientNames.length)],
          service: service.name,
          startTime,
          endTime,
          date: appointmentDate.toISOString().split('T')[0],
          status,
          price: service.price,
          hasVideo: Math.random() < 0.8
        });
      }
    }

    return appointments;
  }

  // ✅ FUNCIÓN PARA GENERAR BLOQUEOS INTELIGENTES
  function generateSmartBlocks(): TimeBlock[] {
    const blocks: TimeBlock[] = [];
    const currentWeekStart = getStartOfWeek(new Date());

    for (let weekOffset = -1; weekOffset <= 1; weekOffset++) {
      const weekStart = new Date(currentWeekStart);
      weekStart.setDate(weekStart.getDate() + (weekOffset * 7));

      const blockTemplates = [
        { title: 'Almuerzo', time: '13:00-14:00', type: 'personal', reason: 'Pausa para almorzar', frequency: 0.6 },
        { title: 'Formación continua', time: '12:00-13:00', type: 'personal', reason: 'Curso online', frequency: 0.2 },
        { title: 'Administración', time: '18:00-19:00', type: 'blocked', reason: 'Tareas administrativas', frequency: 0.3 },
        { title: 'Tiempo personal', time: '16:00-17:00', type: 'personal', reason: 'Descanso personal', frequency: 0.1 },
        { title: 'Reunión', time: '11:00-12:00', type: 'blocked', reason: 'Reunión con supervisor', frequency: 0.15 }
      ];

      blockTemplates.forEach((template, index) => {
        if (Math.random() < template.frequency) {
          const dayOffset = Math.floor(Math.random() * 5);
          const blockDate = new Date(weekStart);
          blockDate.setDate(blockDate.getDate() + dayOffset);
          
          const [startTime, endTime] = template.time.split('-');

          blocks.push({
            id: `block-${weekOffset}-${index}`,
            title: template.title,
            startTime,
            endTime,
            date: blockDate.toISOString().split('T')[0],
            type: template.type as 'blocked' | 'vacation' | 'personal',
            reason: template.reason
          });
        }
      });
    }

    return blocks;
  }

  // ✅ DATOS FIJOS GARANTIZADOS
  const today = new Date();
  const monday = getStartOfWeek(today);
  const tuesday = new Date(monday); tuesday.setDate(tuesday.getDate() + 1);
  const wednesday = new Date(monday); wednesday.setDate(wednesday.getDate() + 2);
  const thursday = new Date(monday); thursday.setDate(thursday.getDate() + 3);
  const friday = new Date(monday); friday.setDate(friday.getDate() + 4);

  const fixedAppointments: Appointment[] = [
    {
      id: 'fixed-1',
      clientName: 'María García López',
      service: 'Terapia individual',
      startTime: '09:00',
      endTime: '09:50',
      date: monday.toISOString().split('T')[0],
      status: 'confirmed',
      price: 60,
      hasVideo: true
    },
    {
      id: 'fixed-2',
      clientName: 'Carlos Ruiz Martín',
      service: 'Primera consulta',
      startTime: '10:30',
      endTime: '11:15',
      date: monday.toISOString().split('T')[0],
      status: 'confirmed',
      price: 45,
      hasVideo: true
    },
    {
      id: 'fixed-3',
      clientName: 'Ana Sánchez Pérez',
      service: 'Terapia de pareja',
      startTime: '16:00',
      endTime: '17:00',
      date: tuesday.toISOString().split('T')[0],
      status: 'pending',
      price: 75,
      hasVideo: true
    },
    {
      id: 'fixed-4',
      clientName: 'Luis Fernández Gómez',
      service: 'Seguimiento',
      startTime: '11:00',
      endTime: '11:30',
      date: wednesday.toISOString().split('T')[0],
      status: 'confirmed',
      price: 50,
      hasVideo: false
    },
    {
      id: 'fixed-5',
      clientName: 'Carmen Rodríguez Vila',
      service: 'Terapia individual',
      startTime: '15:30',
      endTime: '16:20',
      date: thursday.toISOString().split('T')[0],
      status: 'confirmed',
      price: 60,
      hasVideo: true
    },
    {
      id: 'fixed-6',
      clientName: 'Miguel Torres Ruiz',
      service: 'Sesión intensiva',
      startTime: '09:30',
      endTime: '11:00',
      date: friday.toISOString().split('T')[0],
      status: 'confirmed',
      price: 90,
      hasVideo: true
    }
  ];

  const fixedBlocks: TimeBlock[] = [
    {
      id: 'block-1',
      title: 'Almuerzo',
      startTime: '13:00',
      endTime: '14:00',
      date: tuesday.toISOString().split('T')[0],
      type: 'personal',
      reason: 'Pausa para almorzar'
    },
    {
      id: 'block-2',
      title: 'Administración',
      startTime: '18:00',
      endTime: '19:00',
      date: wednesday.toISOString().split('T')[0],
      type: 'blocked',
      reason: 'Tareas administrativas'
    },
    {
      id: 'block-3',
      title: 'Formación continua',
      startTime: '12:00',
      endTime: '13:00',
      date: friday.toISOString().split('T')[0],
      type: 'personal',
      reason: 'Curso online de actualización'
    }
  ];

// ✅ GENERAR DATOS ADICIONALES
  const generatedAppointments = generateSmartAppointments();
  const generatedBlocks = generateSmartBlocks();

  // ✅ COMBINAR DATOS EN CONSTANTES FINALES
  const initialAppointments = [...fixedAppointments, ...generatedAppointments];
  const initialBlocks = [...fixedBlocks, ...generatedBlocks];

  // ✅ ESTADOS REACTIVOS (DEFINIR PRIMERO)
  let calendarAppointments = $state<Appointment[]>(initialAppointments);
  let calendarBlocks = $state<TimeBlock[]>(initialBlocks);

  // Estados de la página
  let activeTab = $state('schedule');
  let showBlockModal = $state(false);
  let showQuickBlockModal = $state(false);
  let blockModalData = $state({
    date: '',
    startTime: '',
    endTime: ''
  });

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

  // ✅ ESTADÍSTICAS COMPUTADAS (DESPUÉS DE DEFINIR TODOS LOS ESTADOS)
  let stats = $derived({
    activeDays: 5,
    totalWeeklyHours: 40,
    upcomingBlocks: specialBlocks.filter(block => 
      new Date(block.startDate) >= new Date()
    ).length,
    maxSlotsPerWeek: 32
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
    const newLunchBlock: TimeBlock = {
      id: 'lunch-' + Date.now(),
      title: 'Almuerzo',
      startTime: '13:00',
      endTime: '14:00',
      date: new Date().toISOString().split('T')[0],
      type: 'personal',
      reason: 'Pausa para almorzar'
    };
    calendarBlocks = [...calendarBlocks, newLunchBlock];
    alert('Configuración rápida aplicada: Horario de almuerzo añadido');
  }

  // ✅ DEBUG LOG
  console.log('📅 Availability Page Debug:');
  console.log('Total appointments:', calendarAppointments.length);
  console.log('Total blocks:', calendarBlocks.length);
  console.log('Fixed appointments for this week:', fixedAppointments.length);
  console.log('Generated appointments:', generatedAppointments.length);
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
      <!-- ✅ USAR EL NUEVO COMPONENTE LIMPIO -->
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