<script lang="ts">
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Calendar, ExternalLink, Settings, BarChart3 } from 'lucide-svelte';

  const actions = [
    {
      title: "Bloquear Horario",
      icon: Calendar,
      action: () => alert('Bloquear horario')
    },
    {
      title: "Ver Mi Página Pública", 
      icon: ExternalLink,
      action: () => alert('Ver página pública')
    },
    {
      title: "Configurar Servicios",
      icon: Settings, 
      action: () => alert('Configurar servicios')
    },
    {
      title: "Generar Reporte Mensual",
      icon: BarChart3,
      action: () => alert('Generar reporte')
    },
  ];
</script>

<Card>
  <CardHeader>
    <CardTitle class="text-2xl">Acciones Rápidas</CardTitle>
  </CardHeader>
  <CardContent class="space-y-3">
    {#each actions as action}
      <Button 
        class="w-full justify-start" 
        variant="outline"
        onclick={action.action}
      >
        <svelte:component this={action.icon} class="mr-2 h-4 w-4" />
        {action.title}
      </Button>
    {/each}
  </CardContent>
</Card>