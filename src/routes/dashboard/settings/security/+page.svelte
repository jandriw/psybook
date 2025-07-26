<script lang="ts">
  import SettingsHeader from '$lib/components/settings/SettingsHeader.svelte';
  import SettingToggleAfter from '$lib/components/settings/SettingToggleAfter.svelte';
  import StatusCard from '$lib/components/settings/StatusCard.svelte';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { Shield, Smartphone, Monitor, Download } from 'lucide-svelte';

  let { data } = $props();

  let twoFactorEnabled = $state(false);
  let devices = $state([
    {
      id: 1,
      name: "MacBook Pro",
      location: "Madrid, España",
      lastActive: "Activo ahora",
      current: true,
      icon: Monitor
    },
    {
      id: 2,
      name: "iPhone 14",
      location: "Madrid, España", 
      lastActive: "Hace 2 días",
      current: false,
      icon: Smartphone
    }
  ]);

  async function revokeDevice(device: { id: any; name: any; location?: string; lastActive?: string; current?: boolean; icon?: typeof Monitor; }) {
    if (confirm(`¿Revocar acceso a ${device.name}?`)) {
      devices = devices.filter(d => d.id !== device.id);
    }
  }

  async function downloadData() {
    // Lógica para descargar datos GDPR
  }
</script>

<div class="max-w-4xl mx-auto space-y-8">
  <SettingsHeader 
    icon={Shield} 
    title="Seguridad y Privacidad"
    description="Protege tu cuenta y gestiona tu privacidad"
  />

  <Card>
    <CardHeader>
      <CardTitle class="text-2xl">Autenticación de Dos Factores</CardTitle>
      <CardDescription>Añade una capa extra de seguridad a tu cuenta</CardDescription>
    </CardHeader>
    <CardContent>
      <SettingToggleAfter
        bind:checked={twoFactorEnabled}
        title="Activar 2FA"
        description="Requerirá código del móvil para iniciar sesión"
      />
    </CardContent>
  </Card>

  <Card>
    <CardHeader>
      <CardTitle class="text-2xl">Dispositivos Conectados</CardTitle>
      <CardDescription>Revisa qué dispositivos tienen acceso a tu cuenta</CardDescription>
    </CardHeader>
    <CardContent class="space-y-4">
      {#each devices as device (device.id)}
        <StatusCard
          icon={device.icon}
          title={device.name}
          description={`${device.location} • ${device.lastActive}`}
          status={device.current ? "Actual" : null}
          statusType={device.current ? "verified" : "default"}
        >
          {#if !device.current}
            <Button 
              variant="outline" 
              size="sm" 
              class="text-red-600 bg-transparent"
              onclick={() => revokeDevice(device)}
            >
              Revocar
            </Button>
          {:else}
            <Badge class="bg-green-100 text-green-700">Actual</Badge>
          {/if}
        </StatusCard>
      {/each}
    </CardContent>
  </Card>

  <Card>
    <CardHeader>
      <CardTitle class="text-2xl">Datos Personales</CardTitle>
      <CardDescription>Gestiona tus datos según GDPR</CardDescription>
    </CardHeader>
    <CardContent class="space-y-4">
      <Button variant="outline" class="bg-transparent" onclick={downloadData}>
        <Download class="w-4 h-4 mr-2" />
        Descargar mis datos
      </Button>
      <p class="text-sm text-gray-600">
        Recibirás un archivo con toda tu información personal en un plazo de 30 días.
      </p>
    </CardContent>
  </Card>
</div>