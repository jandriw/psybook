<!-- src/lib/components/public/ProcessSteps.svelte -->
<script lang="ts">
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { CheckCircle, User, Phone, CreditCard, Mail } from 'lucide-svelte';

  const steps = [
    {
      icon: CheckCircle,
      title: "Elige fecha y sesión",
      description: "Selecciona el horario que mejor te convenga",
    },
    {
      icon: User,
      title: "Inicia sesión",
      description: "Con Google o Microsoft en segundos",
    },
    {
      icon: Phone,
      title: "Introduce tu teléfono",
      description: "Para recordatorios por WhatsApp",
    },
    {
      icon: CreditCard,
      title: "Paga de forma segura",
      description: "Tarjeta, Bizum o transferencia",
    },
    {
      icon: Mail,
      title: "Recibe confirmación",
      description: "Email con enlace de videollamada",
    },
  ];
</script>

<Card class="border-purple-100">
  <CardHeader>
    <CardTitle class="text-purple-700">Proceso de reserva</CardTitle>
  </CardHeader>
  <CardContent class="space-y-4">
    {#each steps as step, index}
      <div class="flex items-start space-x-3">
        <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 flex-shrink-0">
          <svelte:component this={step.icon} class="w-5 h-5" />
        </div>
        <div>
          <h4 class="font-medium text-gray-900">{step.title}</h4>
          <p class="text-sm text-gray-600">{step.description}</p>
        </div>
      </div>
    {/each}
  </CardContent>
</Card>