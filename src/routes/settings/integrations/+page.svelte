<script lang="ts">
  import SettingsHeader from '$lib/components/settings/SettingsHeader.svelte';
  import StatusCardIntegration from '$lib/components/settings/StatusCardIntegration.svelte';
  import { Button } from '$lib/components/ui/button';
  import { Zap, Video, Calendar, RefreshCw } from 'lucide-svelte';

  let { data } = $props();

  let integrations = $state([
    {
      id: "zoom",
      name: "Zoom",
      description: "Videollamadas automáticas",
      icon: Video,
      connected: true,
      status: "Funcionando correctamente",
    },
    {
      id: "teams",
      name: "Microsoft Teams",
      description: "Alternativa a Zoom",
      icon: Video,
      connected: false,
      status: "No configurado",
    },
    {
      id: "google-calendar",
      name: "Google Calendar",
      description: "Sincronización de citas",
      icon: Calendar,
      connected: true,
      status: "Sincronizado",
    },
    {
      id: "google-meet",
      name: "Google Meet",
      description: "Videollamadas con Google",
      icon: Video,
      connected: false,
      status: "No configurado",
    },
  ]);

  async function handleConnect(integration: any) {
    // Lógica para conectar integración
    integration.connected = true;
    integration.status = "Conectando...";
  }

  async function handleDisconnect(integration: any) {
    // Lógica para desconectar
    integration.connected = false;
    integration.status = "No configurado";
  }

  async function handleReconnect(integration: any) {
    // Lógica para reconectar
    integration.status = "Reconectando...";
  }
</script>

<div class="max-w-4xl mx-auto space-y-8">
  <SettingsHeader 
    icon={Zap} 
    title="Integraciones"
    description="Conecta PsyBooking con tus herramientas favoritas"
  />

  <div class="grid md:grid-cols-2 gap-6">
    {#each integrations as integration (integration.id)}
      <StatusCardIntegration
        icon={integration.icon}
        title={integration.name}
        description={integration.description}
        status={integration.connected ? "Conectado" : "Desconectado"}
        statusType={integration.connected ? "connected" : "disconnected"}
      >
        <div class="flex space-x-2">
          {#if integration.connected}
            <Button 
              variant="outline" 
              size="sm" 
              class="bg-transparent"
              onclick={() => handleReconnect(integration)}
            >
              <RefreshCw class="w-4 h-4 mr-2" />
              Reconectar
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              class="text-red-600 bg-transparent"
              onclick={() => handleDisconnect(integration)}
            >
              Desconectar
            </Button>
          {:else}
            <Button 
              size="sm" 
              class="bg-blue-600 hover:bg-blue-700"
              onclick={() => handleConnect(integration)}
            >
              Conectar
            </Button>
          {/if}
        </div>
      </StatusCardIntegration>
    {/each}
  </div>
</div>