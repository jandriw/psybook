<!-- src/lib/components/dashboard/WeekCalendar.svelte -->
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
    Ban,
    Lock
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
    publicMode = true,  // ✅ NUEVA PROP
    onAppointmentClick = () => {},
    onSlotClick = () => {},
    onBlockSlot = () => {}
  }: {
    appointments?: Appointment[];
    blocks?: TimeBlock[];
    publicMode?: boolean;  // ✅ MODO PÚBLICO
    onAppointmentClick?: (appointment: Appointment) => void;
    onSlotClick?: (date: string, time: string) => void;
    onBlockSlot?: (date: string, startTime: string, endTime: string) => void;
  } = $props();

  // Estado de la semana actual
  let currentWeek = $state(getStartOfWeek(new Date()));

  // Configuración del calendario
  const timeSlots = generateTimeSlots('08:00', '20:00', 30);
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

  // ✅ FUNCIONES DE NAVEGACIÓN CON RESTRICCIÓN PÚBLICA
  function getStartOfWeek(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  }

  function goToPreviousWeek(): void {
    // ✅ En modo público, no permitir ir hacia atrás
    if (publicMode) return;
    
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
    // ✅ En modo público, solo permitir ir a hoy si es presente/futuro
    const today = new Date();
    if (publicMode) {
      const currentWeekStart = getStartOfWeek(new Date());
      currentWeek = currentWeekStart;
    } else {
      currentWeek = getStartOfWeek(today);
    }
  }

  // ✅ VERIFICAR SI UNA FECHA ES PASADA (para modo público)
  function isPastDate(date: Date): boolean {
    if (!publicMode) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    return compareDate < today;
  }

  // ✅ VERIFICAR SI UN SLOT ES PASADO (incluye hora)
  function isPastSlot(date: Date, time: string): boolean {
    if (!publicMode) return false;
    const now = new Date();
    const slotDateTime = new Date(date);
    const [hours, minutes] = time.split(':').map(Number);
    slotDateTime.setHours(hours, minutes, 0, 0);
    return slotDateTime < now;
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

  // ✅ VERIFICAR DISPONIBILIDAD (considerando modo público)
  function isSlotAvailable(date: Date, time: string): boolean {
    // Si es modo público y el slot es pasado, no está disponible
    if (publicMode && isPastSlot(date, time)) return false;
    
    // Si hay cita o bloqueo, no está disponible
    return !getAppointmentAt(date, time) && !getBlockAt(date, time);
  }

  // ✅ OBTENER ESTADO DEL SLOT (para modo público)
  function getSlotStatus(date: Date, time: string): 'available' | 'occupied' | 'past' {
    if (publicMode && isPastSlot(date, time)) return 'past';
    
    const hasAppointment = getAppointmentAt(date, time);
    const hasBlock = getBlockAt(date, time);
    
    if (hasAppointment || hasBlock) return 'occupied';
    return 'available';
  }

  // ✅ COLORES PARA MODO PÚBLICO
  function getPublicSlotColor(status: 'available' | 'occupied' | 'past'): string {
    const colors = {
      available: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100',
      occupied: 'bg-gray-100 text-gray-600 border-gray-300',
      past: 'bg-gray-50 text-gray-400 border-gray-200'
    };
    return colors[status];
  }

  // Colores originales (modo privado)
  function getAppointmentColor(status: string): string {
    const colors: Record<string, string> = {
      confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      completed: 'bg-green-100 text-green-800 border-green-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status] || colors.confirmed;
  }

  function getBlockColor(type: string): string {
    const colors: Record<string, string> = {
      blocked: 'bg-gray-100 text-gray-800 border-gray-300',
      vacation: 'bg-purple-100 text-purple-800 border-purple-200',
      personal: 'bg-orange-100 text-orange-800 border-orange-200'
    };
    return colors[type] || colors.blocked;
  }

  // Calcular duración
  function getAppointmentDuration(appointment: Appointment): number {
    const start = parseTime(appointment.startTime);
    const end = parseTime(appointment.endTime);
    return Math.round((end - start) / (30 * 60000));
  }

  function getBlockDuration(block: TimeBlock): number {
    const start = parseTime(block.startTime);
    const end = parseTime(block.endTime);
    return Math.round((end - start) / (30 * 60000));
  }

  function isAppointmentStart(appointment: Appointment, time: string): boolean {
    return appointment.startTime === time;
  }

  function isBlockStart(block: TimeBlock, time: string): boolean {
    return block.startTime === time;
  }

  function formatDate(date: Date): string {
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short' 
    });
  }

  function isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  // ✅ MANEJAR CLICK EN SLOT (con lógica pública/privada)
  function handleSlotClick(date: Date, time: string): void {
    const slotStatus = getSlotStatus(date, time);
    
    if (publicMode) {
      // En modo público, solo permitir clicks en slots disponibles
      if (slotStatus === 'available') {
        const dateStr = date.toISOString().split('T')[0];
        onSlotClick(dateStr, time); // Para reservar cita
      } else if (slotStatus === 'occupied') {
        // No hacer nada o mostrar mensaje de "no disponible"
        return;
      }
    } else {
      // Modo privado (original)
      const appointment = getAppointmentAt(date, time);
      const block = getBlockAt(date, time);
      
      if (appointment) {
        onAppointmentClick(appointment);
      } else if (block) {
        alert(`Bloqueo: ${block.title}\n${block.reason || ''}`);
      } else {
        const dateStr = date.toISOString().split('T')[0];
        onSlotClick(dateStr, time);
      }
    }
  }

  function handleQuickBlock(date: Date, time: string): void {
    // Solo en modo privado
    if (publicMode) return;
    
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
        {#if publicMode}
          Disponibilidad
        {:else}
          Calendario Semanal
        {/if}
      </CardTitle>
      
      <!-- ✅ NAVEGACIÓN CON RESTRICCIONES PÚBLICAS -->
      <div class="flex items-center space-x-2">
        {#if !publicMode}
          <Button variant="outline" size="sm" onclick={goToPreviousWeek}>
            <ChevronLeft class="h-4 w-4" />
          </Button>
        {/if}
        
        <Button variant="outline" size="sm" onclick={goToToday}>
          {publicMode ? 'Esta semana' : 'Hoy'}
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
  
  <CardContent class="p-4">
    <!-- Header de días -->
    <div class="grid grid-cols-8 gap-1 mb-4">
      <div class="p-2 text-xs font-medium text-gray-600 bg-gray-50">Hora</div>
      {#each weekDays as day, index}
        <div class="p-2 text-xs font-medium text-center {
          isToday(day) ? 'bg-blue-50' : 
          publicMode && isPastDate(day) ? 'bg-gray-50' : 
          'bg-gray-50'
        }">
          <div>{daysOfWeek[index]}</div>
          <div class="font-semibold {
            isToday(day) ? 'text-blue-600' : 
            publicMode && isPastDate(day) ? 'text-gray-400' : 
            'text-gray-900'
          }">
            {formatDate(day)}
          </div>
        </div>
      {/each}
    </div>

    <!-- Grid del calendario con scroll -->
    <div class="max-h-96 overflow-y-auto border border-gray-200 rounded">
      <div class="space-y-0">
        {#each timeSlots as time}
          <div class="grid grid-cols-8 gap-0 border-b border-gray-100">
            <!-- Columna de tiempo -->
            <div class="p-2 text-xs text-gray-600 bg-gray-50 border-r border-gray-200 font-mono">
              {time}
            </div>
            
            <!-- Columnas de días -->
            {#each weekDays as day}
              {@const appointment = getAppointmentAt(day, time)}
              {@const block = getBlockAt(day, time)}
              {@const slotStatus = getSlotStatus(day, time)}
              
              <!-- svelte-ignore a11y_click_events_have_key_events -->
              <!-- svelte-ignore a11y_no_static_element_interactions -->
              <div 
                class="p-1 min-h-12 border-r border-gray-200 relative transition-colors {
                  publicMode ? 
                    (slotStatus === 'available' ? 'cursor-pointer hover:bg-green-50' : 'cursor-not-allowed') :
                    'cursor-pointer hover:bg-gray-50'
                } {isToday(day) && !publicMode ? 'bg-blue-25' : ''}"
                onclick={() => handleSlotClick(day, time)}
                oncontextmenu={(e) => {
                  e.preventDefault();
                  if (!publicMode && slotStatus === 'available') handleQuickBlock(day, time);
                }}
              >
                {#if publicMode}
                  <!-- ✅ MODO PÚBLICO: Mostrar solo estado de disponibilidad -->
                  {#if (appointment && isAppointmentStart(appointment, time)) || (block && isBlockStart(block, time))}
                    <div class="absolute inset-1 {getPublicSlotColor('occupied')} rounded p-1 text-xs border flex items-center justify-center">
                      <Lock class="h-3 w-3 mr-1" />
                      <span class="text-xs">Ocupado</span>
                    </div>
                  {:else if slotStatus === 'available'}
                    <div class="w-full h-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Plus class="h-3 w-3 text-green-600" />
                    </div>
                  {:else if slotStatus === 'past'}
                    <div class="w-full h-full flex items-center justify-center">
                      <span class="text-xs text-gray-400">—</span>
                    </div>
                  {/if}
                {:else}
                  <!-- ✅ MODO PRIVADO: Mostrar información completa (original) -->
                  {#if appointment && isAppointmentStart(appointment, time)}
                    <div 
                      class="absolute inset-1 {getAppointmentColor(appointment.status)} rounded p-1 text-xs border z-10"
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
                    <div 
                      class="absolute inset-1 {getBlockColor(block.type)} rounded p-1 text-xs border z-10"
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
                    
                  {:else if slotStatus === 'available'}
                    <div class="w-full h-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Plus class="h-3 w-3 text-gray-400" />
                    </div>
                  {/if}
                {/if}
              </div>
            {/each}
          </div>
        {/each}
      </div>
    </div>
  </CardContent>
</Card>

<!-- ✅ LEYENDA ADAPTADA AL MODO -->
{#if publicMode}
  <!-- Leyenda modo público -->
  <div class="mt-4 flex flex-wrap gap-4 text-xs">
    <div class="flex items-center space-x-2">
      <div class="w-3 h-3 bg-green-50 border border-green-200 rounded"></div>
      <span>Disponible</span>
    </div>
    <div class="flex items-center space-x-2">
      <div class="w-3 h-3 bg-gray-100 border border-gray-300 rounded"></div>
      <span>Ocupado</span>
    </div>
    <div class="flex items-center space-x-2">
      <div class="w-3 h-3 bg-gray-50 border border-gray-200 rounded"></div>
      <span>No disponible</span>
    </div>
  </div>
  
  <div class="mt-2 text-xs text-gray-500">
    Haz click en un horario disponible para reservar tu sesión
  </div>
{:else}
  <!-- Leyenda modo privado (original) -->
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
    <div class="flex items-center space-x-2">
      <div class="w-3 h-3 bg-gray-100 border border-gray-300 rounded"></div>
      <span>Bloqueado</span>
    </div>
    <div class="flex items-center space-x-2">
      <div class="w-3 h-3 bg-purple-100 border border-purple-200 rounded"></div>
      <span>Vacaciones</span>
    </div>
  </div>

  <div class="mt-2 text-xs text-gray-500">
    Click izquierdo: Ver/Crear cita • Click derecho: Bloquear slot • Navega entre semanas con las flechas
  </div>
{/if}