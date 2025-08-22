<!-- src/lib/components/public/TrustElements.svelte -->
<script lang="ts">
  import { Card, CardContent } from '$lib/components/ui/card';
  import { Shield, Lock, Award, Clock } from 'lucide-svelte';

  const trustItems = [
    {
      icon: Shield,
      title: "Pagos 100% seguros",
      description: "Procesados por Stripe",
      color: "text-green-600"
    },
    {
      icon: Lock,
      title: "Datos protegidos",
      description: "Cumplimiento GDPR",
      color: "text-blue-600"
    },
    {
      icon: Award,
      title: "Psicóloga colegiada",
      description: "Col. M-15847",
      color: "text-purple-600"
    },
    {
      icon: Clock,
      title: "Confirmación inmediata",
      description: "Sin esperas",
      color: "text-orange-600"
    },
  ];
</script>

<Card class="border-green-100">
  <CardContent class="p-4 space-y-4">
    <h4 class="font-medium text-green-700 text-center">Tu tranquilidad es nuestra prioridad</h4>
    <div class="space-y-3">
      {#each trustItems as item}
        <div class="flex items-center space-x-3">
          <svelte:component this={item.icon} class="w-5 h-5 {item.color}" />
          <div>
            <p class="font-medium text-sm">{item.title}</p>
            <p class="text-xs text-gray-600">{item.description}</p>
          </div>
        </div>
      {/each}
    </div>
  </CardContent>
</Card>