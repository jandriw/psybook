<script>
  import { goto } from '$app/navigation';
  import OnboardingSteps from '$lib/components/onboarding/OnboardingSteps.svelte';
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Textarea } from '$lib/components/ui/textarea';
  import { User, Camera } from 'lucide-svelte';
  
  let { data } = $props();
  
  const steps = [
    { id: 1, title: "Perfil Básico", description: "Información personal y profesional" },
    { id: 2, title: "Configurar Servicios", description: "Define tus tipos de sesiones" },
    { id: 3, title: "Definir Horarios", description: "Establece tu disponibilidad" },
    { id: 4, title: "Plataforma de Video", description: "Conecta Zoom o Teams" },
    { id: 5, title: "Finalización", description: "Revisa y activa tu página" }
  ];
  
  let currentStep = $state(1);
  let completedSteps = $state([]);
  
  let profile = $state({
    name: data.user?.name || '',
    collegeNumber: '',
    specialty: '',
    bio: '',
    photo: null
  });
  
  function handleNext() {
    goto('/onboarding/services');
  }
  
  function handleSkip() {
    goto('/onboarding/services');
  }
  
  let canContinue = $derived(profile.name && profile.collegeNumber);
</script>

<div class="max-w-6xl mx-auto">
  <OnboardingSteps {steps} {currentStep} {completedSteps} />
  
  <div class="mt-8 grid lg:grid-cols-3 gap-8">
    <!-- Main Content -->
    <div class="lg:col-span-2 space-y-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Completa tu perfil profesional</h2>
        <p class="text-gray-600">
          Esta información aparecerá en tu página pública y ayudará a generar confianza con tus futuros clientes.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2 text-2xl">
            <User class="w-5 h-5" />
            Información Básica
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <Label for="name" class="pb-2">Nombre completo *</Label>
              <Input
                id="name"
                bind:value={profile.name}
                placeholder="Ej: Dra. Carmen Rodríguez"
              />
            </div>
            
            <div>
              <Label for="college-number" class="pb-2">Número de colegiado *</Label>
              <Input
                id="college-number"
                bind:value={profile.collegeNumber}
                placeholder="Ej: M-15847"
              />
            </div>
          </div>
          
          <div>
            <Label for="specialty" class="pb-2">Especialidad principal</Label>
            <Input
              id="specialty"
              bind:value={profile.specialty}
              placeholder="Ej: Terapia Cognitivo-Conductual"
            />
          </div>
          
          <div>
            <Label for="bio" class="pb-2">Descripción profesional</Label>
            <Textarea
              id="bio"
              bind:value={profile.bio}
              placeholder="Describe brevemente tu experiencia y enfoque terapéutico..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2 text-2xl">
            <Camera class="w-5 h-5" />
            Foto de Perfil
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="flex items-center space-x-4">
            <div class="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
              <User class="w-8 h-8 text-gray-400" />
            </div>
            <div>
              <Button variant="outline" class="bg-transparent">
                Subir foto
              </Button>
              <p class="text-sm text-gray-500 mt-1">
                Recomendado: foto profesional en formato cuadrado
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Navigation -->
      <div class="flex items-center justify-between pt-6 border-t">
        <div></div>

        <div class="flex gap-3">
          <Button variant="ghost" onclick={() => handleSkip()} class="text-gray-600 bg-transparent">
            Saltar por ahora
          </Button>
          <Button
            onclick={() => handleNext()}
            class="bg-blue-600 hover:bg-blue-700"
            disabled={!canContinue}
          >
            Guardar y continuar
          </Button>
        </div>
      </div>
    </div>

    <!-- Sidebar Tips -->
    <div class="space-y-6">
      <Card class="border-blue-100">
        <CardHeader>
          <CardTitle class="text-blue-700">💡 Consejos para tu perfil</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <div>
            <h4 class="font-medium mb-1">Número de colegiado</h4>
            <p class="text-gray-600">
              Es obligatorio y genera confianza. Los clientes pueden verificar tu registro.
            </p>
          </div>

          <div>
            <h4 class="font-medium mb-1">Foto profesional</h4>
            <p class="text-gray-600">
              Los psicólogos con foto reciben 3x más reservas. Usa una imagen clara y profesional.
            </p>
          </div>

          <div>
            <h4 class="font-medium mb-1">Descripción</h4>
            <p class="text-gray-600">
              Menciona tu experiencia, enfoque terapéutico y qué problemas tratas más frecuentemente.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</div>