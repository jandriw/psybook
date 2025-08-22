<!-- src/lib/components/public/ServicesSection.svelte -->
<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { Clock, Euro, User, Users, Heart, CheckCircle } from 'lucide-svelte';
  import { cn } from '$lib/utils';

  interface Service {
    id: string;
    name: string;
    description: string;
    duration: number;
    price: number;
    icon: any;
    popular?: boolean;
    features: string[];
  }

  let { 
    selectedService = $bindable('primera-consulta'),
    onServiceSelect = (serviceId: string) => {}
  }: {
    selectedService: string;
    onServiceSelect: (serviceId: string) => void;
  } = $props();

  const services: Service[] = [
    {
      id: "primera-consulta",
      name: "Primera consulta",
      description: "Evaluación inicial y plan personalizado",
      duration: 45,
      price: 45,
      icon: Heart,
      popular: true,
      features: ["Evaluación completa", "Plan de tratamiento", "Orientación inicial", "Sin compromiso"],
    },
    {
      id: "terapia-individual",
      name: "Terapia individual",
      description: "Sesión estándar personalizada",
      duration: 50,
      price: 60,
      icon: User,
      features: [
        "Terapia cognitivo-conductual",
        "Técnicas prácticas",
        "Seguimiento personalizado",
        "Materiales incluidos",
      ],
    },
    {
      id: "terapia-pareja",
      name: "Terapia de pareja",
      description: "Sesión conjunta para parejas",
      duration: 60,
      price: 75,
      icon: Users,
      features: ["Sesión conjunta", "Comunicación efectiva", "Resolución de conflictos", "Ejercicios prácticos"],
    },
  ];

  function handleServiceSelect(serviceId: string) {
    selectedService = serviceId;
    onServiceSelect(serviceId);
  }

  // Función para obtener el servicio seleccionado
  let currentService = $derived(services.find(s => s.id === selectedService) || services[0]);
</script>

<section class="space-y-6">
  <div class="text-center">
    <h2 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Servicios disponibles</h2>
    <p class="text-gray-600">Elige el tipo de sesión que mejor se adapte a tus necesidades</p>
  </div>

  <div class="grid md:grid-cols-3 gap-6">
    {#each services as service}
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <Card
        class={cn(
          "cursor-pointer transition-all duration-200 hover:shadow-lg",
          selectedService === service.id
            ? "border-blue-500 shadow-lg ring-2 ring-blue-200"
            : "border-gray-200 hover:border-blue-300",
        )}
        onclick={() => handleServiceSelect(service.id)}
      >
        <CardHeader class="pb-4">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                <!-- svelte-ignore svelte_component_deprecated -->
                <svelte:component this={service.icon} class="w-6 h-6" />
              </div>
              {#if service.popular}
                <Badge class="bg-green-100 text-green-700">Más popular</Badge>
              {/if}
            </div>
          </div>
          <CardTitle class="text-xl">{service.name}</CardTitle>
          <CardDescription class="text-gray-600">{service.description}</CardDescription>
        </CardHeader>

        <CardContent class="space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="flex items-center space-x-1 text-gray-600">
                <Clock class="w-4 h-4" />
                <span class="text-sm">{service.duration} min</span>
              </div>
              <div class="flex items-center space-x-1 text-green-600 font-semibold">
                <Euro class="w-4 h-4" />
                <span>{service.price}€</span>
              </div>
            </div>
          </div>

          <div class="space-y-2">
            {#each service.features as feature}
              <div class="flex items-center space-x-2">
                <CheckCircle class="w-4 h-4 text-green-500 flex-shrink-0" />
                <span class="text-sm text-gray-600">{feature}</span>
              </div>
            {/each}
          </div>

          <Button
            class={cn(
              "w-full",
              selectedService === service.id
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200",
            )}
          >
            {selectedService === service.id ? "Seleccionado" : "Seleccionar"}
          </Button>
        </CardContent>
      </Card>
    {/each}
  </div>
</section>