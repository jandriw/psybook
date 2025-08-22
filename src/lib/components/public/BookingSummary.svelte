<!-- src/lib/components/public/BookingSummary.svelte -->
<script lang="ts">
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Separator } from '$lib/components/ui/separator';
  import { Alert, AlertDescription } from '$lib/components/ui/alert';
  import { Calendar, Clock, Euro, Shield, AlertCircle, ArrowRight } from 'lucide-svelte';

  interface SelectedSlot {
    date: string;
    time: string;
    service: {
      name: string;
      duration: number;
      price: number;
    };
  }

  let { 
    selectedSlot,
    onBookNow = () => {}
  }: {
    selectedSlot: SelectedSlot;
    onBookNow?: () => void;
  } = $props();

  function handleBookNow() {
    onBookNow();
    // En una implementación real, esto navegaría al proceso de pago
    console.log('Iniciar proceso de reserva:', selectedSlot);
  }

  // Formatear fecha para mostrar
  function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
</script>

<div class="space-y-6">
  <Card class="border-blue-200 shadow-lg">
    <CardHeader>
      <CardTitle class="text-green-700">Resumen de tu reserva</CardTitle>
    </CardHeader>
    <CardContent class="space-y-4">
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-gray-600">Servicio:</span>
          <span class="font-medium">{selectedSlot.service.name}</span>
        </div>

        <div class="flex items-center justify-between">
          <span class="text-gray-600">Fecha:</span>
          <div class="flex items-center space-x-1">
            <Calendar class="w-4 h-4 text-blue-600" />
            <span class="font-medium">{formatDate(selectedSlot.date)}</span>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <span class="text-gray-600">Hora:</span>
          <div class="flex items-center space-x-1">
            <Clock class="w-4 h-4 text-blue-600" />
            <span class="font-medium">{selectedSlot.time}</span>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <span class="text-gray-600">Duración:</span>
          <span class="font-medium">{selectedSlot.service.duration} minutos</span>
        </div>
      </div>

      <Separator />

      <div class="flex items-center justify-between text-lg font-semibold">
        <span>Total:</span>
        <div class="flex items-center space-x-1 text-green-600">
          <Euro class="w-5 h-5" />
          <span>{selectedSlot.service.price}€</span>
        </div>
      </div>

      <Button size="lg" class="w-full bg-blue-600 hover:bg-blue-700 text-white" onclick={handleBookNow}>
        Reservar mi sesión ahora
        <ArrowRight class="w-4 h-4 ml-2" />
      </Button>

      <div class="flex items-center justify-center space-x-2 text-sm text-gray-600">
        <Shield class="w-4 h-4 text-green-600" />
        <span>Pago 100% seguro con Stripe</span>
      </div>
    </CardContent>
  </Card>

  <!-- Políticas de cancelación -->
  <Alert>
    <AlertCircle class="h-4 w-4" />
    <AlertDescription>
      <strong>Política de cancelación:</strong> Cancelación gratuita hasta 24 horas antes. Cancelaciones tardías
      tienen 50% de reembolso.
    </AlertDescription>
  </Alert>

  <!-- Información adicional -->
  <Card class="border-green-100">
    <CardContent class="p-4 space-y-3">
      <h4 class="font-medium text-green-700">¿Qué incluye tu sesión?</h4>
      <ul class="text-sm text-gray-600 space-y-1">
        <li>• Enlace de Zoom enviado automáticamente</li>
        <li>• Recordatorio 24h antes por WhatsApp</li>
        <li>• Materiales y ejercicios incluidos</li>
        <li>• Seguimiento personalizado</li>
      </ul>
    </CardContent>
  </Card>
</div>