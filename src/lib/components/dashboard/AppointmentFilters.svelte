<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Calendar, Search, Filter } from 'lucide-svelte';

  let { 
    searchTerm = $bindable(''),
    selectedStatus = $bindable('all'),
    selectedDate = $bindable(''),
    onClearFilters = () => {}
  } = $props();

  const statusOptions = [
    { value: 'all', label: 'Todos los estados' },
    { value: 'confirmed', label: 'Confirmadas' },
    { value: 'pending', label: 'Pendientes' },
    { value: 'completed', label: 'Completadas' },
    { value: 'cancelled', label: 'Canceladas' },
    { value: 'no_show', label: 'No asistieron' }
  ];

  function handleClearFilters() {
    searchTerm = '';
    selectedStatus = 'all';
    selectedDate = '';
    onClearFilters();
  }
</script>

<div class="flex flex-col md:flex-row gap-4 p-4 bg-white border rounded-lg">
  <!-- Búsqueda -->
  <div class="relative flex-1">
    <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
    <Input
      bind:value={searchTerm}
      placeholder="Buscar por cliente..."
      class="pl-10"
    />
  </div>

  <!-- Filtro por estado (versión simplificada) -->
  <div class="md:w-48">
    <select 
      bind:value={selectedStatus}
      class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {#each statusOptions as option}
        <option value={option.value}>{option.label}</option>
      {/each}
    </select>
  </div>

  <!-- Filtro por fecha -->
  <div class="md:w-40">
    <div class="relative">
      <Calendar class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        type="date"
        bind:value={selectedDate}
        class="pl-10"
      />
    </div>
  </div>

  <!-- Limpiar filtros -->
  <Button variant="outline" onclick={handleClearFilters}>
    <Filter class="mr-2 h-4 w-4" />
    Limpiar
  </Button>
</div>