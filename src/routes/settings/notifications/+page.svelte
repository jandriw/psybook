<!-- src/routes/dashboard/settings/notifications/+page.svelte -->
<script lang="ts">
  import SettingsHeader from '$lib/components/settings/SettingsHeader.svelte';
  import SettingToggleAfter from '$lib/components/settings/SettingToggleAfter.svelte';
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Bell } from 'lucide-svelte';

  let { data } = $props();

  // Estados reactivos con Svelte 5 runes
  let emailSettings = $state({
    newBookings: data.notifications?.email?.newBookings ?? true,
    cancellations: data.notifications?.email?.cancellations ?? true,
    dailySummary: data.notifications?.email?.dailySummary ?? true
  });

  let whatsappSettings = $state({
    sessionReminders: data.notifications?.whatsapp?.sessionReminders ?? true,
    urgentAlerts: data.notifications?.whatsapp?.urgentAlerts ?? true
  });

  // Estado de guardado
  let isSaving = $state(false);
  let saveMessage = $state('');

  let saveTimeout: string | number | NodeJS.Timeout;
  $effect(() => {
    // Limpiar timeout anterior
    if (saveTimeout) clearTimeout(saveTimeout);
    
    // Crear nuevo timeout para debounce
    saveTimeout = setTimeout(() => {
      saveSettings();
    }, 1000);
  });

  async function saveSettings() {
    if (isSaving) return;
    
    isSaving = true;
    saveMessage = 'Guardando...';

    try {
      const formData = new FormData();
      formData.append('emailNewBookings', emailSettings.newBookings.toString());
      formData.append('emailCancellations', emailSettings.cancellations.toString());
      formData.append('emailDailySummary', emailSettings.dailySummary.toString());
      formData.append('whatsappReminders', whatsappSettings.sessionReminders.toString());
      formData.append('whatsappAlerts', whatsappSettings.urgentAlerts.toString());

      const response = await fetch('?/updateNotifications', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        saveMessage = 'Guardado ✓';
      } else {
        saveMessage = 'Error al guardar';
      }
    } catch (error) {
      saveMessage = 'Error al guardar';
      console.error('Error saving notifications:', error);
    } finally {
      isSaving = false;
      
      // Limpiar mensaje después de 2 segundos
      setTimeout(() => {
        saveMessage = '';
      }, 2000);
    }
  }
</script>

<div class="max-w-4xl mx-auto space-y-8">
  <div class="flex items-center justify-between">
    <SettingsHeader 
      icon={Bell} 
      title="Notificaciones"
      description="Configura cómo y cuándo quieres recibir notificaciones"
    />
    
    {#if saveMessage}
      <div class="text-sm {isSaving ? 'text-gray-600' : saveMessage.includes('Error') ? 'text-red-600' : 'text-green-600'}">
        {saveMessage}
      </div>
    {/if}
  </div>

  <Card>
    <CardHeader>
      <CardTitle class="text-2xl">Notificaciones por Email</CardTitle>
    </CardHeader>
    <CardContent class="space-y-4">
      <SettingToggleAfter
        bind:checked={emailSettings.newBookings}
        title="Nuevas reservas"
        description="Recibir email cuando un cliente reserve una sesión"
      />
      <SettingToggleAfter
        bind:checked={emailSettings.cancellations}
        title="Cancelaciones"
        description="Notificar cuando un cliente cancele una cita"
      />
      <SettingToggleAfter
        bind:checked={emailSettings.dailySummary}
        title="Resumen diario"
        description="Resumen de citas del día siguiente"
      />
    </CardContent>
  </Card>

  <Card>
    <CardHeader>
      <CardTitle class="text-2xl">Notificaciones WhatsApp</CardTitle>
    </CardHeader>
    <CardContent class="space-y-4">
      <SettingToggleAfter
        bind:checked={whatsappSettings.sessionReminders}
        title="Recordatorios de sesión"
        description="Recordatorio 2 horas antes de cada sesión"
      />
      <SettingToggleAfter
        bind:checked={whatsappSettings.urgentAlerts}
        title="Alertas urgentes"
        description="Cancelaciones de último momento"
      />
    </CardContent>
  </Card>
</div>