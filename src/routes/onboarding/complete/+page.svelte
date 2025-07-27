<script>
  import { goto } from '$app/navigation';
  import OnboardingSteps from '$lib/components/onboarding/OnboardingSteps.svelte';
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { CheckCircle, ExternalLink, Copy, Share2 } from 'lucide-svelte';
  
  const steps = [
    { id: 1, title: "Perfil Básico", description: "Información personal y profesional" },
    { id: 2, title: "Configurar Servicios", description: "Define tus tipos de sesiones" },
    { id: 3, title: "Definir Horarios", description: "Establece tu disponibilidad" },
    { id: 4, title: "Plataforma de Video", description: "Conecta Zoom o Teams" },
    { id: 5, title: "Finalización", description: "Revisa y activa tu página" }
  ];
  
  let currentStep = $state(5);
  let completedSteps = $state([1, 2, 3, 4]);
  
  let publicUrl = $state("psybooking.com/dra-carmen-rodriguez");
  
  function copyUrl() {
    navigator.clipboard.writeText(`https://${publicUrl}`);
    // Show toast notification
  }
  
  function finishOnboarding() {
    goto('/dashboard');
  }
</script>

<div class="max-w-6xl mx-auto">
  <OnboardingSteps {steps} {currentStep} {completedSteps} />
  
  <div class="mt-8 text-center space-y-8">
    <!-- Success Message -->
    <div class="space-y-4">
      <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle class="w-12 h-12 text-green-600" />
      </div>
      
      <div>
        <h2 class="text-3xl font-bold text-gray-900 mb-2">¡Configuración completada!</h2>
        <p class="text-lg text-gray-600">
          Tu consulta online ya está lista. Los clientes pueden empezar a reservar sesiones.
        </p>
      </div>
    </div>

    <!-- Public URL -->
    <Card class="max-w-md mx-auto">
      <CardHeader>
        <CardTitle class="text-center text-2xl">Tu página pública</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
          <span class="text-sm text-gray-600 flex-1">{publicUrl}</span>
          <Button size="sm" variant="outline" onclick={() => copyUrl()} class="bg-transparent">
            <Copy class="w-4 h-4" />
          </Button>
        </div>
        
        <div class="flex space-x-2">
          <Button variant="outline" class="flex-1 bg-transparent">
            <ExternalLink class="w-4 h-4 mr-2" />
            Ver página
          </Button>
          <Button variant="outline" class="flex-1 bg-transparent">
            <Share2 class="w-4 h-4 mr-2" />
            Compartir
          </Button>
        </div>
      </CardContent>
    </Card>

    <!-- Summary -->
    <div class="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
      <Card>
        <CardContent class="p-6 text-center">
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <CheckCircle class="w-6 h-6 text-blue-600" />
          </div>
          <h3 class="font-semibold mb-2">Perfil creado</h3>
          <p class="text-sm text-gray-600">Tu información profesional está visible</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent class="p-6 text-center">
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <CheckCircle class="w-6 h-6 text-green-600" />
          </div>
          <h3 class="font-semibold mb-2">Servicios configurados</h3>
          <p class="text-sm text-gray-600">Los clientes pueden reservar y pagar</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent class="p-6 text-center">
          <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <CheckCircle class="w-6 h-6 text-purple-600" />
          </div>
          <h3 class="font-semibold mb-2">Todo automatizado</h3>
          <p class="text-sm text-gray-600">Reservas, pagos y recordatorios</p>
        </CardContent>
      </Card>
    </div>

    <!-- Action Buttons -->
    <div class="space-y-4">
      <Button 
        onclick={() => finishOnboarding()}
        size="lg"
        class="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8"
      >
        Ir al Dashboard
      </Button>
      
      <p class="text-sm text-gray-500">
        Podrás modificar cualquier configuración desde tu panel de control
      </p>
    </div>
  </div>
</div>