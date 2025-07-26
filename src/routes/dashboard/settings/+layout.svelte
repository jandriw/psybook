<!-- src/routes/dashboard/settings/+layout.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { Button } from '$lib/components/ui/button';
  import { 
    Brain, ArrowLeft, User, Stethoscope, Clock, 
    FileText, Bell, CreditCard, Zap, Shield 
  } from 'lucide-svelte';
  
  let { data, children } = $props();
  
  // Sección activa usando runes de Svelte 5
  let activeSection = $derived($page.route.id?.split('/').pop() || 'policies');
  
  const sections = [
    {
      id: "profile",
      label: "Mi Perfil", 
      icon: User,
      description: "Información personal",
    },
    {
      id: "services",
      label: "Servicios y Precios",
      icon: Stethoscope, 
      description: "Tipos de terapia y tarifas",
    },
    {
      id: "schedule",
      label: "Horarios",
      icon: Clock,
      description: "Disponibilidad y bloqueos",
    },
    {
      id: "policies", 
      label: "Políticas",
      icon: FileText,
      description: "Cancelaciones y reembolsos",
    },
    {
      id: "notifications",
      label: "Notificaciones", 
      icon: Bell,
      description: "Alertas y recordatorios",
    },
    {
      id: "payments",
      label: "Pagos y Facturación",
      icon: CreditCard,
      description: "Cuenta bancaria y fiscalidad", 
    },
    {
      id: "integrations",
      label: "Integraciones",
      icon: Zap,
      description: "Zoom, Teams, Calendar",
    },
    {
      id: "security", 
      label: "Seguridad",
      icon: Shield,
      description: "2FA y privacidad",
    },
  ];

  function navigateToSection(sectionId: string) {
    goto(`/dashboard/settings/${sectionId}`);
  }
</script>

<div class="min-h-screen bg-gray-50">
  <!-- Header -->
  <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div class="px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <a href="/dashboard" class="flex items-center space-x-2">
            <Button variant="ghost" size="sm" class="bg-transparent">
              <ArrowLeft class="w-4 h-4 mr-2" />
              Volver al Dashboard
            </Button>
          </a>
        </div>

        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
            <Brain class="w-5 h-5 text-white" />
          </div>
          <div>
            <span class="text-lg font-bold text-gray-800">Configuración</span>
            <p class="text-sm text-gray-600">Gestiona tu consulta online</p>
          </div>
        </div>

        <div class="text-sm text-gray-600">{data.user?.name || 'Usuario'}</div>
      </div>
    </div>
  </header>

  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <div class="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 pt-20 overflow-y-auto">
      <div class="p-4">
        <h2 class="text-sm font-semibold text-gray-900 mb-4">Configuración</h2>
        <nav class="space-y-2">
          {#each sections as section (section.id)}
            <Button
              variant="ghost"
              class="w-full justify-start h-auto p-3 text-left bg-transparent {
                activeSection === section.id
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500'
                  : 'text-gray-700 hover:bg-gray-50'
              }"
              onclick={() => navigateToSection(section.id)}
            >
              <!-- svelte-ignore svelte_component_deprecated -->
              <svelte:component this={section.icon} class="w-5 h-5 mr-3 flex-shrink-0" />
              <div>
                <div class="font-medium">{section.label}</div>
                <div class="text-xs text-gray-500 mt-0.5">{section.description}</div>
              </div>
            </Button>
          {/each}
        </nav>
      </div>
    </div>
    
    <!-- Main Content -->
    <div class="flex-1 lg:ml-64">
      <div class="p-8">
        {@render children()}
      </div>
    </div>
  </div>
</div>