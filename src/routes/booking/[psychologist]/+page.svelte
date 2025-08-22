<!-- src/routes/booking/[psychologist]/+page.svelte -->
<script lang="ts">
  import PublicLayout from '$lib/components/public/PublicLayout.svelte';
  import PsychologistProfile from '$lib/components/public/PsychologistProfile.svelte';
  import ServicesSection from '$lib/components/public/ServicesSection.svelte';
  import BookingSummary from '$lib/components/public/BookingSummary.svelte';
  import ProcessSteps from '$lib/components/public/ProcessSteps.svelte';
  import TrustElements from '$lib/components/public/TrustElements.svelte';
  import TestimonialsSection from '$lib/components/public/TestimonialsSection.svelte';
  import FAQSection from '$lib/components/public/FAQSection.svelte';
  import WeekCalendar from '$lib/components/dashboard/WeekCalendar.svelte';
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Calendar as CalendarIcon } from 'lucide-svelte';

  let { data } = $props();

  interface SelectedSlot {
    date: string;
    time: string;
    service: {
      name: string;
      duration: number;
      price: number;
    };
  }

  // ✅ Estados reactivos de Svelte 5
  let selectedSlot = $state<SelectedSlot | null>(null);
  let selectedService = $state('primera-consulta');

  // ✅ Servicios disponibles (deberían coincidir con ServicesSection)
  const services = [
    {
      id: "primera-consulta",
      name: "Primera consulta",
      duration: 45,
      price: 45,
    },
    {
      id: "terapia-individual",
      name: "Terapia individual",
      duration: 50,
      price: 60,
    },
    {
      id: "terapia-pareja",
      name: "Terapia de pareja",
      duration: 60,
      price: 75,
    },
  ];

  // ✅ Función para obtener el servicio actual
  let currentService = $derived(services.find(s => s.id === selectedService) || services[0]);

  // ✅ Datos del psicólogo (normalmente vendrían del servidor)
  const psychologistData = {
    appointments: data.appointments || [],
    blocks: data.blocks || []
  };

  // ✅ Funciones de manejo de eventos
  function handleServiceSelect(serviceId: string) {
    selectedService = serviceId;
    // Limpiar slot seleccionado cuando se cambia de servicio
    selectedSlot = null;
  }

  function handleSlotSelect(date: string, time: string) {
    if (!currentService) return;
    
    selectedSlot = {
      date,
      time,
      service: {
        name: currentService.name,
        duration: currentService.duration,
        price: currentService.price
      }
    };
  }

  function handleBookNow() {
    if (!selectedSlot) return;
    
    // En una implementación real, esto navegaría al proceso de pago/autenticación
    console.log('Iniciando proceso de reserva:', selectedSlot);
    
    // Por ahora, simular navegación al proceso de reserva
    alert(`Reservar: ${selectedSlot.service.name} el ${selectedSlot.date} a las ${selectedSlot.time}\nPrecio: ${selectedSlot.service.price}€`);
  }

  // ✅ Formatear fecha para el slot seleccionado
  function formatSlotDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  }
</script>

<svelte:head>
  <title>Reserva tu sesión - Dra. Carmen Rodríguez</title>
  <meta name="description" content="Reserva tu sesión de terapia psicológica online con la Dra. Carmen Rodríguez. Proceso seguro y confirmación inmediata." />
</svelte:head>

<PublicLayout>
  {#snippet children()}
    <div class="max-w-6xl mx-auto space-y-12">
      <!-- Perfil del psicólogo -->
      <PsychologistProfile />

      <!-- Servicios -->
      <ServicesSection 
        bind:selectedService 
        onServiceSelect={handleServiceSelect} 
      />

      <!-- Calendario y reserva -->
      <div class="grid lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <!-- ✅ Reemplazar BookingCalendar por nuestro WeekCalendar en modo público -->
          <Card class="border-blue-100 shadow-lg">
            <CardHeader>
              <CardTitle class="flex items-center gap-2 text-2xl">
                <CalendarIcon class="h-6 w-6 text-blue-600" />
                Selecciona fecha y hora
              </CardTitle>
              <p class="text-gray-600">
                Elige el horario que mejor te convenga para tu {currentService.name.toLowerCase()}
              </p>
            </CardHeader>
            <CardContent class="p-6">
              <WeekCalendar 
                appointments={psychologistData.appointments}
                blocks={psychologistData.blocks}
                publicMode={true}
                onSlotClick={handleSlotSelect}
                onAppointmentClick={() => {}}
                onBlockSlot={() => {}}
              />
              
              {#if selectedSlot}
                <div class="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p class="text-sm font-medium text-blue-900">
                    ✓ Seleccionado: {formatSlotDate(selectedSlot.date)} a las {selectedSlot.time}
                  </p>
                  <p class="text-xs text-blue-700 mt-1">
                    {selectedSlot.service.name} - {selectedSlot.service.duration} min - {selectedSlot.service.price}€
                  </p>
                </div>
              {/if}
            </CardContent>
          </Card>
        </div>
        
        <div>
          {#if selectedSlot}
            <BookingSummary 
              selectedSlot={selectedSlot} 
              onBookNow={handleBookNow}
            />
          {:else}
            <div class="space-y-6">
              <ProcessSteps />
              <TrustElements />
            </div>
          {/if}
        </div>
      </div>

      <!-- Testimonios -->
      <TestimonialsSection />

      <!-- FAQ -->
      <FAQSection />
    </div>
  {/snippet}
</PublicLayout>