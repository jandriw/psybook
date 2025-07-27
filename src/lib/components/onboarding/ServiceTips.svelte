<script lang="ts">
  import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Alert, AlertDescription } from '$lib/components/ui/alert';
  import { HelpCircle } from 'lucide-svelte';
  
  let { onAddService } = $props();
  
  function addPredefinedService(type: 'couple' | 'followup') {
    const services = {
      couple: {
        name: "Terapia de pareja",
        description: "Sesión conjunta para parejas",
        duration: 60,
        price: 75,
        icon: "users"
      },
      followup: {
        name: "Sesión de seguimiento",
        description: "Revisión de progreso y ajustes",
        duration: 30,
        price: 40,
        icon: "heart"
      }
    } as const;
    
    onAddService(services[type]);
  }
</script>

<div class="space-y-6">
  <!-- Tips -->
  <Card class="border-blue-100">
    <CardHeader>
      <CardTitle class="text-blue-700">💡 Consejos útiles</CardTitle>
    </CardHeader>
    <CardContent class="space-y-4 text-sm">
      <div>
        <h4 class="font-medium mb-1">Precios recomendados</h4>
        <ul class="text-gray-600 space-y-1">
          <li>• Primera consulta: 40-50€</li>
          <li>• Terapia individual: 55-75€</li>
          <li>• Terapia de pareja: 70-90€</li>
        </ul>
      </div>

      <div>
        <h4 class="font-medium mb-1">Duraciones típicas</h4>
        <ul class="text-gray-600 space-y-1">
          <li>• Primera consulta: 45 min</li>
          <li>• Sesión individual: 50 min</li>
          <li>• Sesión de pareja: 60 min</li>
        </ul>
      </div>

      <Alert>
        <HelpCircle class="h-4 w-4" />
        <AlertDescription>
          <strong>Tip:</strong> Las primeras consultas suelen ser 10-15€ más baratas para atraer nuevos
          clientes.
        </AlertDescription>
      </Alert>
    </CardContent>
  </Card>

  <!-- Common Services -->
  <Card class="border-purple-100">
    <CardHeader>
      <CardTitle class="text-purple-700">Servicios populares</CardTitle>
      <CardDescription>Servicios que ofrecen otros psicólogos</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="space-y-2 text-sm">
        <Button
          variant="ghost"
          size="sm"
          class="w-full justify-start text-left h-auto p-2 bg-transparent"
          onclick={() => addPredefinedService('couple')}
        >
          <div>
            <div class="font-medium">Terapia de pareja</div>
            <div class="text-gray-500">60 min • 75€</div>
          </div>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          class="w-full justify-start text-left h-auto p-2 bg-transparent"
          onclick={() => addPredefinedService('followup')}
        >
          <div>
            <div class="font-medium">Sesión de seguimiento</div>
            <div class="text-gray-500">30 min • 40€</div>
          </div>
        </Button>
      </div>
    </CardContent>
  </Card>
</div>