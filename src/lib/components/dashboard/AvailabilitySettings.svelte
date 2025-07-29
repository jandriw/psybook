<script>
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Switch } from '$lib/components/ui/switch';
  import { Settings, Save } from 'lucide-svelte';

  let { 
    settings = $bindable({
      bufferTime: 15,
      maxDailyAppointments: 8,
      advanceBookingDays: 60,
      minAdvanceBooking: 24,
      autoConfirm: true,
      allowWeekends: false,
      sessionDuration: 50
    }),
    onSave = () => {}
  } = $props();

  function handleSave() {
    onSave(settings);
  }
</script>

<Card>
  <CardHeader>
    <div class="flex items-center justify-between">
      <CardTitle class="flex items-center gap-2">
        <Settings class="h-5 w-5" />
        Configuración de Disponibilidad
      </CardTitle>
      <Button onclick={handleSave} class="bg-blue-600 hover:bg-blue-700">
        <Save class="mr-2 h-4 w-4" />
        Guardar
      </Button>
    </div>
  </CardHeader>
  <CardContent class="space-y-6">
    <!-- Configuración de sesiones -->
    <div class="space-y-4">
      <h4 class="font-medium text-gray-900">Configuración de Sesiones</h4>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label for="sessionDuration">Duración por defecto (minutos)</Label>
          <Input 
            id="sessionDuration"
            type="number"
            bind:value={settings.sessionDuration}
            min="15"
            max="180"
            step="15"
          />
        </div>
        
        <div>
          <Label for="bufferTime">Tiempo entre sesiones (minutos)</Label>
          <Input 
            id="bufferTime"
            type="number"
            bind:value={settings.bufferTime}
            min="0"
            max="60"
            step="5"
          />
        </div>
      </div>
    </div>

    <!-- Límites de reserva -->
    <div class="space-y-4">
      <h4 class="font-medium text-gray-900">Límites de Reserva</h4>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label for="maxDailyAppointments">Máximo citas por día</Label>
          <Input 
            id="maxDailyAppointments"
            type="number"
            bind:value={settings.maxDailyAppointments}
            min="1"
            max="20"
          />
        </div>
        
        <div>
          <Label for="advanceBookingDays">Ventana de reserva (días)</Label>
          <Input 
            id="advanceBookingDays"
            type="number"
            bind:value={settings.advanceBookingDays}
            min="1"
            max="365"
          />
        </div>
      </div>

      <div>
        <Label for="minAdvanceBooking">Mínimo aviso para reservar (horas)</Label>
        <Input 
          id="minAdvanceBooking"
          type="number"
          bind:value={settings.minAdvanceBooking}
          min="1"
          max="168"
        />
      </div>
    </div>

    <!-- Opciones adicionales -->
    <div class="space-y-4">
      <h4 class="font-medium text-gray-900">Opciones Adicionales</h4>
      
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <div>
            <Label>Confirmación automática</Label>
            <p class="text-sm text-gray-600">Las citas se confirman automáticamente al pagar</p>
          </div>
          <Switch bind:checked={settings.autoConfirm} />
        </div>

        <div class="flex items-center justify-between">
          <div>
            <Label>Permitir fines de semana</Label>
            <p class="text-sm text-gray-600">Los clientes pueden reservar sábados y domingos</p>
          </div>
          <Switch bind:checked={settings.allowWeekends} />
        </div>
      </div>
    </div>

    <!-- Vista previa -->
    <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <h4 class="font-medium text-blue-900 mb-2">Vista Previa de Configuración</h4>
      <div class="text-sm text-blue-800 space-y-1">
        <p>• Sesiones de {settings.sessionDuration} minutos con {settings.bufferTime} minutos de descanso</p>
        <p>• Máximo {settings.maxDailyAppointments} citas por día</p>
        <p>• Reservas con {settings.minAdvanceBooking}h de antelación mínima</p>
        <p>• Ventana de reserva: {settings.advanceBookingDays} días</p>
        <p>• Confirmación: {settings.autoConfirm ? 'Automática' : 'Manual'}</p>
      </div>
    </div>
  </CardContent>
</Card>