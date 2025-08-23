<!-- src/lib/components/patient/HelpfulReminders.svelte -->
<script lang="ts">
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Lightbulb, Video, Volume2, MapPin, Clock } from 'lucide-svelte';

  const reminders = [
    {
      icon: Video,
      iconClass: "text-blue-600",
      text: "Tu sesión será por Zoom, recibirás el enlace por email 2 horas antes"
    },
    {
      icon: MapPin,
      iconClass: "text-green-600",
      text: "Recuerda estar en un lugar privado y silencioso"
    },
    {
      icon: Volume2,
      iconClass: "text-purple-600",
      text: "Prueba tu micrófono y cámara antes de la sesión"
    },
    {
      icon: Clock,
      iconClass: "text-orange-600",
      text: "Puedes unirte 15 minutos antes de la hora programada"
    }
  ];

  function handleGuideClick() {
    alert('Abrir guía de preparación para videollamadas');
  }
</script>

<Card class="border-blue-100">
  <CardHeader>
    <CardTitle class="flex items-center gap-2 text-blue-700">
      <Lightbulb class="w-5 h-5" />
      Recordatorios útiles
    </CardTitle>
  </CardHeader>
  <CardContent class="space-y-4">
    {#each reminders as reminder}
      <div class="flex items-start space-x-3">
        <div class="flex-shrink-0 mt-0.5">
          <!-- svelte-ignore svelte_component_deprecated -->
          <svelte:component this={reminder.icon} class="w-4 h-4 {reminder.iconClass}" />
        </div>
        <p class="text-sm text-gray-600 leading-relaxed">{reminder.text}</p>
      </div>
    {/each}

    <div class="pt-4 border-t border-blue-100">
      <p class="text-xs text-center text-blue-600">
        ¿Primera vez? Revisa nuestra
        <button class="underline hover:no-underline" onclick={handleGuideClick}>
          guía de preparación para videollamadas
        </button>
      </p>
    </div>
  </CardContent>
</Card>