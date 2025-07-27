<script lang="ts">
  import { goto } from '$app/navigation';
  import OnboardingSteps from '$lib/components/onboarding/OnboardingSteps.svelte';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { Alert, AlertDescription } from '$lib/components/ui/alert';
  import { Video, CheckCircle, ExternalLink, Settings, Info } from 'lucide-svelte';
  
  const steps = [
    { id: 1, title: "Perfil Básico", description: "Información personal y profesional" },
    { id: 2, title: "Configurar Servicios", description: "Define tus tipos de sesiones" },
    { id: 3, title: "Definir Horarios", description: "Establece tu disponibilidad" },
    { id: 4, title: "Plataforma de Video", description: "Conecta Zoom o Teams" },
    { id: 5, title: "Finalización", description: "Revisa y activa tu página" }
  ];
  
  let currentStep = $state(4);
  let completedSteps = $state([1, 2, 3]);
  
  let platforms = $state([
    {
      id: "zoom",
      name: "Zoom",
      description: "La plataforma más popular para terapia online",
      icon: Video,
      connected: false,
      recommended: true,
      features: ["Salas de espera", "Grabación", "Chat privado", "Máxima calidad"]
    },
    {
      id: "teams",
      name: "Microsoft Teams",
      description: "Integración perfecta con Office 365",
      icon: Video,
      connected: false,
      recommended: false,
      features: ["Seguridad empresarial", "Calendario integrado", "OneDrive", "Fácil acceso"]
    },
    {
      id: "meet",
      name: "Google Meet",
      description: "Simple y accesible para todos los clientes",
      icon: Video,
      connected: false,
      recommended: false,
      features: ["Sin instalación", "Calendario Google", "Fácil uso", "Gratuito"]
    }
  ]);
  
  let selectedPlatform = $state("zoom");
  
  function handleConnect(platformId: string) {
    platforms = platforms.map(p => 
      p.id === platformId 
        ? { ...p, connected: true }
        : { ...p, connected: false }
    );
    selectedPlatform = platformId;
  }
  
  function handleNext() {
    goto('/onboarding/complete');
  }
  
  function handlePrevious() {
    goto('/onboarding/schedule');
  }
  
  let hasConnectedPlatform = $derived(platforms.some(p => p.connected));
</script>

<div class="max-w-6xl mx-auto">
  <OnboardingSteps {steps} {currentStep} {completedSteps} />
  
  <div class="mt-8 grid lg:grid-cols-3 gap-8">
    <!-- Main Content -->
    <div class="lg:col-span-2 space-y-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Conecta tu plataforma de videollamadas</h2>
        <p class="text-gray-600">
          Elige la plataforma que usarás para tus sesiones. Los enlaces se generarán automáticamente para cada cita.
        </p>
      </div>

      <!-- Platform Selection -->
      <div class="space-y-4">
        {#each platforms as platform (platform.id)}
          <Card class="border-2 {platform.connected ? 'border-green-200 bg-green-50' : platform.id === selectedPlatform ? 'border-blue-200' : 'border-gray-200'}">
            <CardHeader>
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="w-12 h-12 bg-white rounded-lg border flex items-center justify-center">
                    <!-- svelte-ignore svelte_component_deprecated -->
                    <svelte:component this={platform.icon} class="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div class="flex items-center space-x-2">
                      <CardTitle class="text-lg">{platform.name}</CardTitle>
                      {#if platform.recommended}
                        <Badge class="bg-blue-100 text-blue-700">Recomendado</Badge>
                      {/if}
                      {#if platform.connected}
                        <Badge class="bg-green-100 text-green-700">
                          <CheckCircle class="w-3 h-3 mr-1" />
                          Conectado
                        </Badge>
                      {/if}
                    </div>
                    <CardDescription>{platform.description}</CardDescription>
                  </div>
                </div>
                
                <div class="flex space-x-2">
                  {#if platform.connected}
                    <Button variant="outline" size="sm" class="bg-transparent">
                      <Settings class="w-4 h-4 mr-2" />
                      Configurar
                    </Button>
                    <Button variant="outline" size="sm" class="text-red-600 bg-transparent">
                      Desconectar
                    </Button>
                  {:else}
                    <Button 
                      size="sm" 
                      class="bg-blue-600 hover:bg-blue-700"
                      onclick={() => handleConnect(platform.id)}
                    >
                      <ExternalLink class="w-4 h-4 mr-2" />
                      Conectar
                    </Button>
                  {/if}
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                {#each platform.features as feature}
                  <div class="flex items-center space-x-1 text-sm text-gray-600">
                    <CheckCircle class="w-3 h-3 text-green-500" />
                    <span>{feature}</span>
                  </div>
                {/each}
              </div>
            </CardContent>
          </Card>
        {/each}
      </div>

      <!-- Info Alert -->
      <Alert>
        <Info class="h-4 w-4" />
        <AlertDescription>
          <strong>¿No tienes cuenta?</strong> No te preocupes, te ayudaremos a crear una cuenta gratuita 
          en la plataforma que elijas. Zoom Pro cuesta €13.99/mes, Teams viene incluido con Office 365, 
          y Google Meet es gratuito.
        </AlertDescription>
      </Alert>

      <!-- Navigation -->
      <div class="flex items-center justify-between pt-6 border-t">
        <Button variant="outline" onclick={() => handlePrevious()} class="bg-transparent">
          Anterior
        </Button>

        <div class="flex gap-3">
          <Button variant="ghost" class="text-gray-600 bg-transparent">
            Configurar después
          </Button>
          <Button
            onclick={() => handleNext()}
            class="bg-blue-600 hover:bg-blue-700"
            disabled={!hasConnectedPlatform}
          >
            {hasConnectedPlatform ? 'Continuar' : 'Selecciona una plataforma'}
          </Button>
        </div>
      </div>
    </div>

    <!-- Sidebar -->
    <div class="space-y-6">
      <!-- Recommendation -->
      <Card class="border-blue-100">
        <CardHeader>
          <CardTitle class="text-blue-700">💡 Nuestra recomendación</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <div>
            <h4 class="font-medium mb-2">¿Por qué Zoom?</h4>
            <ul class="text-gray-600 space-y-1">
              <li>• Mejor calidad de video y audio</li>
              <li>• Salas de espera para privacidad</li>
              <li>• Familiar para la mayoría de clientes</li>
              <li>• Grabación para notas (opcional)</li>
            </ul>
          </div>
          
          <div>
            <h4 class="font-medium mb-2">Configuración automática</h4>
            <p class="text-gray-600">
              Una vez conectado, creamos automáticamente los enlaces de videollamada 
              para cada sesión. Tus clientes recibirán el enlace por email y WhatsApp.
            </p>
          </div>
        </CardContent>
      </Card>

      <!-- Technical Requirements -->
      <Card class="border-gray-100">
        <CardHeader>
          <CardTitle class="text-gray-700">⚙️ Requisitos técnicos</CardTitle>
        </CardHeader>
        <CardContent class="space-y-3 text-sm">
          <div>
            <h4 class="font-medium">Para ti:</h4>
            <ul class="text-gray-600 space-y-1">
              <li>• Cuenta de la plataforma elegida</li>
              <li>• Conexión estable a internet</li>
              <li>• Cámara y micrófono</li>
            </ul>
          </div>
          
          <div>
            <h4 class="font-medium">Para tus clientes:</h4>
            <ul class="text-gray-600 space-y-1">
              <li>• Solo necesitan el enlace</li>
              <li>• No requieren cuenta</li>
              <li>• Funciona en móvil y ordenador</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</div>