<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Eye } from 'lucide-svelte';
  
  let { services } = $props();
  
  let validServices = $derived(services.filter((s: { name: any; }) => s.name));
</script>

<Card class="border-green-100">
  <CardHeader>
    <CardTitle class="flex items-center gap-2 text-green-700">
      <Eye class="w-5 h-5" />
      Vista previa
    </CardTitle>
    <CardDescription>
      Así verán tus servicios los clientes en tu página pública
    </CardDescription>
  </CardHeader>
  <CardContent class="space-y-3">
    {#each validServices as service (service.id)}
      <div class="p-3 border rounded-lg bg-white">
        <div class="flex items-center justify-between mb-2">
          <h4 class="font-medium">{service.name}</h4>
          <Badge variant="outline" class="text-green-600 border-green-200">
            {service.price}€
          </Badge>
        </div>
        {#if service.description}
          <p class="text-sm text-gray-600 mb-2">{service.description}</p>
        {/if}
        <p class="text-xs text-gray-500">{service.duration} minutos</p>
      </div>
    {/each}
  </CardContent>
</Card>