<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Plus, CheckCircle } from 'lucide-svelte';
  import ServiceCard from './ServiceCard.svelte';
  import ServicePreview from './ServicePreview.svelte';
  import ServiceTips from './ServiceTips.svelte';
  
  let { 
    onNext = () => {},
    onPrevious = () => {},
    initialServices = []
  } = $props();
  
  let services = $state([
    {
      id: "1",
      name: "Terapia individual",
      description: "Sesión estándar de terapia cognitivo-conductual",
      duration: 50,
      price: 60,
      icon: "user"
    },
    {
      id: "2",
      name: "Primera consulta",
      description: "Evaluación inicial y plan de tratamiento",
      duration: 45,
      price: 45,
      icon: "heart"
    },
    ...initialServices
  ]);
  
  let isAutoSaving = $state(false);
  let lastSaved = $state(null);
  
  // Auto-save effect
  $effect(() => {
    if (services.length > 0) {
      saveServices();
    }
  });
  
  function addService() {
    const newService = {
      id: Date.now().toString(),
      name: "",
      description: "",
      duration: 50,
      price: 60,
      icon: "user"
    };
    services = [...services, newService];
  }
  
  function addPredefinedService(serviceData: any) {
    const newService = {
      ...serviceData,
      id: Date.now().toString()
    };
    services = [...services, newService];
  }
  
  function updateService(id: any, field: any, value: any) {
    services = services.map(service => 
      service.id === id ? { ...service, [field]: value } : service
    );
  }
  
  function removeService(id: any) {
    services = services.filter(service => service.id !== id);
  }
  
  async function saveServices() {
    isAutoSaving = true;
    
    // Simulate auto-save
    setTimeout(() => {
      isAutoSaving = false;
      lastSaved = new Date();
    }, 1000);
  }
  
  let hasValidServices = $derived(services.some(s => s.name && s.price));
  let canContinue = $derived(services.every(s => !s.name || (s.name && s.price)));
</script>

<!-- Removed TooltipProvider wrapper -->
<div class="grid lg:grid-cols-3 gap-8">
  <!-- Main Content -->
  <div class="lg:col-span-2 space-y-6">
    <div>
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Configura tus servicios</h2>
      <p class="text-gray-600">
        Define los tipos de sesiones que ofreces. Tus clientes podrán elegir y reservar directamente desde tu
        página pública.
      </p>
    </div>

    <!-- Services List -->
    <div class="space-y-4">
      {#each services as service, index (service.id)}
        <ServiceCard
          {service}
          {index}
          canDelete={services.length > 1}
          onUpdate={updateService}
          onRemove={removeService}
        />
      {/each}

      <!-- Add Service Button -->
      <Button
        variant="outline"
        onclick={() => addService()}
        class="w-full border-dashed border-blue-300 text-blue-600 hover:bg-blue-50 bg-transparent"
      >
        <Plus class="w-4 h-4 mr-2" />
        Añadir otro servicio
      </Button>
    </div>

    <!-- Auto-save Status -->
    <div class="flex items-center justify-between text-sm text-gray-500">
      <div class="flex items-center gap-2">
        {#if isAutoSaving}
          <div class="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          Guardando cambios...
        {:else if lastSaved}
          <CheckCircle class="w-4 h-4 text-green-500" />
          Guardado automáticamente a las {lastSaved.toLocaleTimeString()}
        {/if}
      </div>
    </div>

    <!-- Navigation -->
    <div class="flex items-center justify-between pt-6 border-t">
      <Button variant="outline" onclick={() => onPrevious()} class="bg-transparent">
        Anterior
      </Button>

      <div class="flex gap-3">
        <Button variant="ghost" class="text-gray-600 bg-transparent">
          Saltar por ahora
        </Button>
        <Button
          onclick={() => onNext()}
          class="bg-blue-600 hover:bg-blue-700"
          disabled={!canContinue}
        >
          Guardar y continuar
        </Button>
      </div>
    </div>
  </div>

  <!-- Sidebar -->
  <div class="space-y-6">
    <ServicePreview {services} />
    <ServiceTips onAddService={addPredefinedService} />
  </div>
</div>