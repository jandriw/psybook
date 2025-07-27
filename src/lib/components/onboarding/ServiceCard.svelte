<script lang="ts">
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Textarea } from '$lib/components/ui/textarea';
  import { Plus, Trash2, Clock, Euro, HelpCircle, User, Users, Heart } from 'lucide-svelte';
  
  let { 
    service, 
    index, 
    canDelete = true,
    onUpdate = () => {},
    onRemove = () => {}
  } = $props();
  
  function getServiceIcon(iconType: any) {
    switch (iconType) {
      case "user":
        return User;
      case "users":
        return Users;
      case "heart":
        return Heart;
      default:
        return User;
    }
  }
  
  function handleUpdate(field: string, value: string | number) {
    onUpdate(service.id, field, value);
  }
</script>

<Card class="border-blue-100">
  <CardHeader>
    <div class="flex items-center justify-between">
      <CardTitle class="flex items-center gap-2 text-2xl">
        <!-- svelte-ignore svelte_component_deprecated -->
        <svelte:component this={getServiceIcon(service.icon)} class="w-5 h-5" />
        Servicio {index + 1}
      </CardTitle>
      {#if canDelete}
        <Button
          variant="ghost"
          size="sm"
          onclick={() => onRemove(service.id)}
          class="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
        >
          <Trash2 class="w-4 h-4" />
        </Button>
      {/if}
    </div>
  </CardHeader>
  
  <CardContent class="space-y-4">
    <div class="grid md:grid-cols-2 gap-4">
      <div>
        <Label for="name-{service.id}" class="pb-2">
          Nombre del servicio *
          <button class="inline ml-1 text-gray-400" title="Ej: 'Terapia individual', 'Terapia de pareja', 'Primera consulta'">
            <HelpCircle class="w-4 h-4" />
          </button>
        </Label>
        <Input
          id="name-{service.id}"
          value={service.name}
          oninput={(e) => handleUpdate('name', (e.target as HTMLInputElement).value)}
          placeholder="Ej: Terapia individual"
          class="mt-1"
        />
      </div>

      <div>
        <Label for="price-{service.id}" class="pb-2">
          Precio (€) *
          <button class="inline ml-1 text-gray-400" title="Precio típico en España: 50-80€ sesión individual, 70-90€ pareja">
            <HelpCircle class="w-4 h-4" />
          </button>
        </Label>
        <div class="relative mt-1">
          <Euro class="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" style="left: 1rem;" />
          <Input
            id="price-{service.id}"
            type="number"
            value={service.price}
            oninput={(e) => handleUpdate('price', parseInt((e.target as HTMLInputElement).value) || 0)}
            placeholder="60"
            class="pl-12"
            style="padding-left: 2.5rem;"
            min="0"
          />
        </div>
      </div>
    </div>

    <div>
      <Label for="duration-{service.id}" class="pb-2">
        Duración (minutos) *
        <button class="inline ml-1 text-gray-400" title="Duración típica: 45-50 min individual, 60 min pareja">
          <HelpCircle class="w-4 h-4" />
        </button>
      </Label>
      <div class="relative mt-1">
        <Clock class="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" style="left: 1rem;" />
        <Input
          id="duration-{service.id}"
          type="number"
          value={service.duration}
          oninput={(e) => handleUpdate('duration', parseInt((e.target as HTMLInputElement).value) || 0)}
          placeholder="50"
          class="pl-12"
          style="padding-left: 2.5rem;"
          min="15"
          max="120"
        />
      </div>
    </div>

    <div>
      <Label for="description-{service.id}" class="pb-2">
        Descripción
        <button class="inline ml-1 text-gray-400" title="Describe brevemente qué incluye esta sesión">
          <HelpCircle class="w-4 h-4" />
        </button>
      </Label>
      <Textarea
        id="description-{service.id}"
        value={service.description}
        oninput={(e) => handleUpdate('description', (e.target as HTMLTextAreaElement).value)}
        placeholder="Ej: Sesión estándar de terapia cognitivo-conductual"
        class="mt-1"
        rows={2}
      />
    </div>
  </CardContent>
</Card>