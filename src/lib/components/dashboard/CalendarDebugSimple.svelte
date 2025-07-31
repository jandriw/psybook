<!-- DEBUG: WeekCalendar Simple -->
<script lang="ts">
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Calendar } from 'lucide-svelte';

  interface Appointment {
    id: string;
    clientName: string;
    service: string;
    startTime: string;
    endTime: string;
    date: string;
    status: string;
    price: number;
    hasVideo: boolean;
  }

  let { 
    appointments = [],
    blocks = []
  } = $props();

  // ✅ DATOS HARDCODEADOS ULTRA SIMPLES
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  
  const testAppointments: Appointment[] = [
    {
      id: 'test-1',
      clientName: 'María García',
      service: 'Terapia individual',
      startTime: '09:00',
      endTime: '09:50',
      date: todayStr,
      status: 'confirmed',
      price: 60,
      hasVideo: true
    },
    {
      id: 'test-2',
      clientName: 'Carlos Ruiz',
      service: 'Primera consulta',
      startTime: '10:30',
      endTime: '11:15',
      date: todayStr,
      status: 'pending',
      price: 45,
      hasVideo: true
    },
    {
      id: 'test-3',
      clientName: 'Ana Sánchez',
      service: 'Terapia de pareja',
      startTime: '16:00',
      endTime: '17:00',
      date: todayStr,
      status: 'confirmed',
      price: 75,
      hasVideo: false
    }
  ];

  // Usar datos de prueba si no hay appointments
  const dataToUse = appointments.length > 0 ? appointments : testAppointments;

  // Funciones básicas
  function getStartOfWeek(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  }

  function generateTimeSlots(): string[] {
    const slots = [];
    for (let hour = 8; hour <= 19; hour++) {
      for (let min = 0; min < 60; min += 30) {
        const timeStr = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
        slots.push(timeStr);
      }
    }
    return slots;
  }

  function parseTime(timeStr: string): number {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date.getTime();
  }

  const currentWeek = getStartOfWeek(new Date());
  const timeSlots = generateTimeSlots();
  const daysOfWeek = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(currentWeek);
    date.setDate(date.getDate() + i);
    return date;
  });

  // Función para obtener cita en un slot específico
  function getAppointmentAt(date: Date, time: string): Appointment | null {
    const dateStr = date.toISOString().split('T')[0];
    const appointment = dataToUse.find(apt => {
      if (apt.date !== dateStr) return false;
      const aptStartTime = parseTime(apt.startTime);
      const aptEndTime = parseTime(apt.endTime);
      const slotTime = parseTime(time);
      return slotTime >= aptStartTime && slotTime < aptEndTime;
    });
    return appointment || null;
  }

  function isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  function formatDate(date: Date): string {
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short' 
    });
  }

  function getAppointmentColor(status: string): string {
    const colors = {
      confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      completed: 'bg-green-100 text-green-800 border-green-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status as keyof typeof colors] || colors.confirmed;
  }

  // Debug logs
  console.log('🔍 DEBUG Calendar Simple:');
  console.log('Test appointments:', testAppointments);
  console.log('Data to use:', dataToUse);
  console.log('Today string:', todayStr);
  console.log('Week days:', weekDays.map(d => d.toISOString().split('T')[0]));
</script>

<div class="space-y-4">
  <!-- Info de debug -->
  <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
    <h3 class="font-bold text-yellow-800">🔍 DEBUG INFO</h3>
    <p class="text-sm text-yellow-700">
      • Citas de prueba: {dataToUse.length}<br>
      • Fecha de hoy: {todayStr}<br>
      • Semana actual: {weekDays[0].toISOString().split('T')[0]} - {weekDays[6].toISOString().split('T')[0]}
    </p>
  </div>

  <!-- Lista de citas (para verificar que los datos están) -->
  <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
    <h3 class="font-bold text-blue-800">📋 CITAS DE PRUEBA</h3>
    {#each dataToUse as apt}
      <div class="text-sm text-blue-700">
        • {apt.date} {apt.startTime}-{apt.endTime}: {apt.clientName} ({apt.service}) - €{apt.price}
      </div>
    {/each}
  </div>

  <!-- Calendario simplificado -->
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <Calendar class="h-5 w-5" />
        Calendar Debug - Versión Simple
      </CardTitle>
    </CardHeader>
    <CardContent>
      <!-- Header de días -->
      <div class="grid grid-cols-8 gap-1 mb-4">
        <div class="p-2 text-xs font-medium text-gray-600">Hora</div>
        {#each weekDays as day, index}
          <div class="p-2 text-xs font-medium text-center {isToday(day) ? 'bg-blue-50' : 'bg-gray-50'}">
            <div>{daysOfWeek[index]}</div>
            <div class="font-semibold {isToday(day) ? 'text-blue-600' : 'text-gray-900'}">
              {formatDate(day)}
            </div>
          </div>
        {/each}
      </div>

      <!-- Grid del calendario -->
      <div class="space-y-1">
        {#each timeSlots.slice(0, 24) as time}
          <div class="grid grid-cols-8 gap-1">
            <!-- Columna de tiempo -->
            <div class="p-2 text-xs text-gray-600 bg-gray-50">
              {time}
            </div>
            
            <!-- Columnas de días -->
            {#each weekDays as day}
              {@const appointment = getAppointmentAt(day, time)}
              <div class="p-2 min-h-12 border border-gray-200 {isToday(day) ? 'bg-blue-25' : ''} relative">
                {#if appointment}
                  <!-- Mostrar cita -->
                  <div class="absolute inset-1 {getAppointmentColor(appointment.status)} rounded p-1 text-xs">
                    <div class="font-medium truncate">{appointment.clientName}</div>
                    <div class="text-xs opacity-75 truncate">{appointment.service}</div>
                    <div class="text-xs">€{appointment.price}</div>
                  </div>
                {:else}
                  <!-- Slot vacío -->
                  <div class="text-gray-300 text-center text-xs">+</div>
                {/if}
              </div>
            {/each}
          </div>
        {/each}
      </div>
    </CardContent>
  </Card>

  <!-- Test manual -->
  <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
    <h3 class="font-bold text-green-800">🧪 TEST MANUAL</h3>
    <p class="text-sm text-green-700 mb-2">Buscar cita para hoy a las 09:00:</p>
    
    <!-- ✅ Solución: Mover {@const} dentro de un bloque #if -->
    {#if true}
      {@const testAppointment = getAppointmentAt(new Date(), '09:00')}
      {#if testAppointment}
        <div class="text-green-700 font-medium">
          ✅ ENCONTRADA: {testAppointment.clientName} - {testAppointment.service}
        </div>
      {:else}
        <div class="text-red-700 font-medium">
          ❌ NO ENCONTRADA - Problema en la lógica
        </div>
      {/if}
    {/if}
  </div>
</div>