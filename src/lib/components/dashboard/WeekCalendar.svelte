<script lang="ts">
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { 
    ChevronLeft, 
    ChevronRight, 
    Calendar, 
    Plus, 
    Clock,
    User,
    Video,
    Ban
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

  let { 
    appointments = [],
    blocks = [],
    onAppointmentClick = () => {},
    onSlotClick = () => {},
    onBlockSlot = () => {}
  }: {
    appointments: Appointment[];
    blocks: TimeBlock[];
    onAppointmentClick: (appointment: Appointment) => void;
    onSlotClick: (date: string, time: string) => void;
    onBlockSlot: (date: string, startTime: string, endTime: string) => void;
  } = $props();

  // Estado de la semana actual
  let currentWeek = $state(getStartOfWeek(new Date()));

  // Configuración del calendario
  const timeSlots = generateTimeSlots('08:00', '20:00', 30); // 8:00 a 20:00 cada 30 min
  const daysOfWeek = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  // Obtener los días de la semana actual
  let weekDays = $derived(
    Array.from({ length: 7 }, (_, i) => {
      const date = new Date(currentWeek);
      date.setDate(date.getDate() + i);
      return date;
    })
  );

  // Obtener citas de la semana actual
  let weekAppointments = $derived(
    appointments.filter(apt => {
      const aptDate = new Date(apt.date);
      const weekStart = new Date(currentWeek);
      const weekEnd = new Date(currentWeek);
      weekEnd.setDate(weekEnd.getDate() + 6);
      return aptDate >= weekStart && aptDate <= weekEnd;
    })
  );

  // Obtener bloqueos de la semana actual
  let weekBlocks = $derived(
    blocks.filter(block => {
      const blockDate = new Date(block.date);
      const weekStart = new Date(currentWeek);
      const weekEnd = new Date(currentWeek);
      weekEnd.setDate(weekEnd.getDate() + 6);
      return blockDate >= weekStart && blockDate <= weekEnd;
    })
  );

  // Funciones de navegación
  function getStartOfWeek(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Lunes como primer día
    return new Date(d.setDate(diff));
  }

  function goToPreviousWeek(): void {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(newWeek.getDate() - 7);
    currentWeek = newWeek;
  }

  function goToNextWeek(): void {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(newWeek.getDate() + 7);
    currentWeek = newWeek;
  }

  function goToToday(): void {
    currentWeek = getStartOfWeek(new Date());
  }

  // Generar slots de tiempo
  function generateTimeSlots(start: string, end: string, intervalMinutes: number): string[] {
    const slots: string[] = [];
    const startTime = parseTime(start);
    const endTime = parseTime(end);
    
    for (let time = startTime; time < endTime; time += intervalMinutes * 60000) {
      slots.push(formatTime(new Date(time)));
    }
    
    return slots;
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

  // Obtener citas para un día y hora específica
  function getAppointmentAt(date: Date, time: string): Appointment | null {
    const dateStr = date.toISOString().split('T')[0];
    return weekAppointments.find(apt => 
      apt.date === dateStr && 
      apt.startTime <= time && 
      apt.endTime > time
    ) || null;
  }

  // Obtener bloqueo para un día y hora específica
  function getBlockAt(date: Date, time: string): TimeBlock | null {
    const dateStr = date.toISOString().split('T')[0];
    return weekBlocks.find(block => 
      block.date === dateStr && 
      block.startTime <= time && 
      block.endTime > time
    ) || null;
  }

  // Verificar si un slot está disponible
  function isSlotAvailable(date: Date, time: string): boolean {
    return !getAppointmentAt(date, time) && !getBlockAt(date, time);
  }

  // Obtener color del appointment según status
  function getAppointmentColor(status: string): string {
    const colors: Record<string, string> = {
      confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      completed: 'bg-green-100 text-green-800 border-green-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status] || colors.confirmed;
  }

  // Obtener color del bloqueo según tipo
  function getBlockColor(type: string): string {
    const colors: Record<string, string> = {
      blocked: 'bg-gray-100 text-gray-800 border-gray-300',
      vacation: 'bg-purple-100 text-purple-800 border-purple-200',
      personal: 'bg-orange-100 text-orange-800 border-orange-200'
    };
    return colors[type] || colors.blocked;
  }

  // Calcular duración de un appointment en slots
  function getAppointmentDuration(appointment: Appointment): number {
    const start = parseTime(appointment.startTime);
    const end = parseTime(appointment.endTime);
    return Math.round((end - start) / (30 * 60000)); // 30 min slots
  }

  // Calcular duración de un bloqueo en slots
  function getBlockDuration(block: TimeBlock): number {
    const start = parseTime(block.startTime);
    const end = parseTime(block.endTime);
    return Math.round((end - start) / (30 * 60000)); // 30 min slots
  }

  // Verificar si es el primer slot de un appointment
  function isAppointmentStart(appointment: Appointment, time: string): boolean {
    return appointment.startTime === time;
  }

  // Verificar si es el primer slot de un bloqueo
  function isBlockStart(block: TimeBlock, time: string): boolean {
    return block.startTime === time;
  }

  // Formatear fecha para mostrar
  function formatDate(date: Date): string {
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short' 
    });
  }

  // Verificar si es hoy
  function isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  // Manejar click en slot
  function handleSlotClick(date: Date, time: string): void {
    const appointment = getAppointmentAt(date, time);
    const block = getBlockAt(date, time);
    
    if (appointment) {
      onAppointmentClick(appointment);
    } else if (block) {
      // Mostrar info del bloqueo
      alert(`Bloqueo: ${block.title}\n${block.reason || ''}`);
    } else {
      // Slot libre - permitir crear cita o bloquear
      const dateStr = date.toISOString().split('T')[0];
      onSlotClick(dateStr, time);
    }
  }

  // Crear bloqueo rápido
  function handleQuickBlock(date: Date, time: string): void {
    const dateStr = date.toISOString().split('T')[0];
    const endTime = formatTime(new Date(parseTime(time) + 30 * 60000));
    onBlockSlot(dateStr, time, endTime);
  }
</script>

<Card class="w-full">
  <CardHeader>
    <div class="flex items-center justify-between">
      <CardTitle class="flex items-center gap-2 text-2xl">
        <Calendar class="h-5 w-5" />
        Calendario Semanal
      </CardTitle>
      
      <!-- Navegación de semanas -->
      <div class="flex items-center space-x-2">
        <Button variant="outline" size="sm" onclick={goToPreviousWeek}>
          <ChevronLeft class="h-4 w-4" />
        </Button>
        
        <Button variant="outline" size="sm" onclick={goToToday}>
          Hoy
        </Button>
        
        <Button variant="outline" size="sm" onclick={goToNextWeek}>
          <ChevronRight class="h-4 w-4" />
        </Button>
        
        <span class="text-sm font-medium ml-4">
          {weekDays[0].toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })} - 
          {weekDays[6].toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
        </span>
      </div>
    </div>
  </CardHeader>
  
  <CardContent class="p-0">
    <!-- Container principal del calendario -->
    <div class="calendar-wrapper">
      
      <!-- Header fijo del calendario CON ESPACIO RESERVADO PARA SCROLLBAR -->
      <div class="calendar-header-fixed">
        <!-- Columna de horas del header -->
        <div class="header-time-column">
          <div class="text-xs font-medium text-gray-600 text-center">Hora</div>
        </div>
        
        <!-- Columnas de días del header -->
        <div class="header-days-grid">
          {#each weekDays as day, index}
            <div class="header-day-cell {isToday(day) ? 'bg-blue-50' : 'bg-gray-50'}">
              <div class="text-xs font-medium text-gray-600">{daysOfWeek[index]}</div>
              <div class="text-sm font-semibold {isToday(day) ? 'text-blue-600' : 'text-gray-900'}">
                {formatDate(day)}
              </div>
            </div>
          {/each}
        </div>
        
        <!-- ESPACIO RESERVADO PARA SCROLLBAR (mismo ancho que el scrollbar) -->
        <div class="scrollbar-spacer"></div>
      </div>

      <!-- Container con scroll normal -->
      <div class="calendar-scroll-wrapper">
        <!-- Contenido scrollable -->
        <div class="calendar-content">
          {#each timeSlots as time}
            <div class="calendar-time-row">
              <!-- Columna de hora -->
              <div class="time-column-cell">
                <span class="text-xs text-gray-600 font-mono">{time}</span>
              </div>
              
              <!-- Grid de días -->
              <div class="days-grid">
                {#each weekDays as day, dayIndex}
                  {@const appointment = getAppointmentAt(day, time)}
                  {@const block = getBlockAt(day, time)}
                  {@const isAvailable = isSlotAvailable(day, time)}
                  
                  <!-- svelte-ignore a11y_click_events_have_key_events -->
                  <!-- svelte-ignore a11y_no_static_element_interactions -->
                  <div 
                    class="day-slot {isToday(day) ? 'bg-blue-25' : ''}"
                    onclick={() => handleSlotClick(day, time)}
                    oncontextmenu={(e) => {
                      e.preventDefault();
                      if (isAvailable) handleQuickBlock(day, time);
                    }}
                  >
                    {#if appointment && isAppointmentStart(appointment, time)}
                      <!-- Appointment Card -->
                      <div 
                        class="slot-card {getAppointmentColor(appointment.status)}"
                        style="height: {getAppointmentDuration(appointment) * 3}rem;"
                      >
                        <div class="font-medium truncate">{appointment.clientName}</div>
                        <div class="text-xs opacity-75 truncate">{appointment.service}</div>
                        <div class="flex items-center justify-between mt-1">
                          <span class="text-xs">{appointment.price}€</span>
                          {#if appointment.hasVideo}
                            <Video class="h-3 w-3" />
                          {/if}
                        </div>
                      </div>
                      
                    {:else if block && isBlockStart(block, time)}
                      <!-- Block Card -->
                      <div 
                        class="slot-card {getBlockColor(block.type)}"
                        style="height: {getBlockDuration(block) * 3}rem;"
                      >
                        <div class="font-medium truncate flex items-center">
                          <Ban class="h-3 w-3 mr-1" />
                          {block.title}
                        </div>
                        {#if block.reason}
                          <div class="text-xs opacity-75 truncate">{block.reason}</div>
                        {/if}
                      </div>
                      
                    {:else if isAvailable}
                      <!-- Slot libre -->
                      <div class="free-slot-indicator">
                        <Plus class="h-3 w-3 text-gray-400" />
                      </div>
                    {/if}
                  </div>
                {/each}
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </CardContent>
</Card>

<!-- Leyenda -->
<div class="mt-4 flex flex-wrap gap-4 text-xs">
  <div class="flex items-center space-x-2">
    <div class="w-3 h-3 bg-blue-100 border border-blue-200 rounded"></div>
    <span>Confirmada</span>
  </div>
  <div class="flex items-center space-x-2">
    <div class="w-3 h-3 bg-yellow-100 border border-yellow-200 rounded"></div>
    <span>Pendiente</span>
  </div>
  <div class="flex items-center space-x-2">
    <div class="w-3 h-3 bg-green-100 border border-green-200 rounded"></div>
    <span>Completada</span>
  </div>
  <div class="flex items-container space-x-2">
    <div class="w-3 h-3 bg-gray-100 border border-gray-300 rounded"></div>
    <span>Bloqueado</span>
  </div>
  <div class="flex items-center space-x-2">
    <div class="w-3 h-3 bg-purple-100 border border-purple-200 rounded"></div>
    <span>Vacaciones</span>
  </div>
</div>

<!-- Instrucciones -->
<div class="mt-2 text-xs text-gray-500">
  Click izquierdo: Ver/Crear cita • Click derecho: Bloquear slot • Navega entre semanas con las flechas
</div>

<style>
  /* SOLUCIÓN DEFINITIVA: Reservar espacio para scrollbar */
  .calendar-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  /* Header con espacio reservado para scrollbar */
  .calendar-header-fixed {
    position: sticky;
    top: 0;
    z-index: 30;
    background: white;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    width: 100%;
  }

  .header-time-column {
    width: 80px;
    flex-shrink: 0;
    border-right: 1px solid #e5e7eb;
    background-color: #f9fafb;
    padding: 8px 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header-days-grid {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }

  .header-day-cell {
    border-right: 1px solid #e5e7eb;
    padding: 8px 4px;
    text-align: center;
  }

  .header-day-cell:last-child {
    border-right: none;
  }

  /* CLAVE: Espaciador que ocupa exactamente el mismo espacio que el scrollbar */
  .scrollbar-spacer {
    width: 15px; /* Ancho típico de scrollbar en la mayoría de navegadores */
    flex-shrink: 0;
    background-color: #f9fafb; /* Mismo color que la columna de tiempo */
    border-left: 1px solid #e5e7eb;
  }

  /* Container de scroll NORMAL (sin trucos) */
  .calendar-scroll-wrapper {
    position: relative;
    max-height: 384px;
    overflow-y: auto; /* Scroll normal */
    overflow-x: hidden;
  }

  /* Filas del calendario */
  .calendar-time-row {
    display: flex;
    border-bottom: 1px solid #f3f4f6;
    min-height: 48px;
    width: 100%;
  }

  .time-column-cell {
    width: 80px; /* Exactamente igual al header */
    flex-shrink: 0;
    border-right: 1px solid #e5e7eb;
    background-color: #f9fafb;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .days-grid {
    flex: 1; /* Ocupa exactamente el mismo espacio que el header */
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }

  .day-slot {
    border-right: 1px solid #e5e7eb;
    padding: 4px;
    position: relative;
    cursor: pointer;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 48px;
  }

  .day-slot:last-child {
    border-right: none;
  }

  .day-slot:hover {
    background-color: #f9fafb;
  }

  /* Cards dentro de los slots */
  .slot-card {
    position: absolute;
    inset: 4px;
    border-radius: 6px;
    padding: 4px;
    font-size: 12px;
    border-width: 1px;
    z-index: 10;
  }

  .free-slot-indicator {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.2s;
  }

  .day-slot:hover .free-slot-indicator {
    opacity: 1;
  }

  /* Scrollbar personalizada (opcional para mejor apariencia) */
  .calendar-scroll-wrapper::-webkit-scrollbar {
    width: 17px; /* Mismo ancho que el espaciador */
  }

  .calendar-scroll-wrapper::-webkit-scrollbar-track {
    background: #f9fafb;
    border-left: 1px solid #e5e7eb;
  }

  .calendar-scroll-wrapper::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 8px;
    border: 3px solid #f9fafb;
  }

  .calendar-scroll-wrapper::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }

  /* Para Firefox */
  .calendar-scroll-wrapper {
    scrollbar-width: auto; /* Scrollbar normal */
    scrollbar-color: #cbd5e1 #f9fafb;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .header-time-column,
    .time-column-cell {
      width: 60px;
    }
    
    .scrollbar-spacer {
      width: 17px; /* Mantener el mismo ancho en móvil */
    }
    
    .header-time-column,
    .time-column-cell {
      font-size: 10px;
    }
  }

  /* Ajuste fino para diferentes navegadores */
  @supports (-webkit-appearance: none) {
    /* Chrome/Safari: scrollbar ya definido arriba */
  }

  @-moz-document url-prefix() {
    /* Firefox: podría necesitar ajuste del ancho del spacer */
    .scrollbar-spacer {
      width: 17px;
    }
  }
</style>