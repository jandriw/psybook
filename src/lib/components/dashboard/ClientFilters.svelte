<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Search, Filter, Users } from 'lucide-svelte';

  let { 
    searchTerm = $bindable(''),
    selectedStatus = $bindable('all'),
    sortBy = $bindable('name'),
    onClearFilters = () => {}
  } = $props();

  const statusOptions = [
    { value: 'all', label: 'Todos los clientes' },
    { value: 'active', label: 'Activos' },
    { value: 'inactive', label: 'Inactivos' },
    { value: 'new', label: 'Nuevos' },
    { value: 'archived', label: 'Archivados' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Nombre A-Z' },
    { value: 'name_desc', label: 'Nombre Z-A' },
    { value: 'recent', label: 'Más recientes' },
    { value: 'sessions', label: 'Más sesiones' },
    { value: 'last_session', label: 'Última sesión' }
  ];

  function handleClearFilters() {
    searchTerm = '';
    selectedStatus = 'all';
    sortBy = 'name';
    onClearFilters();
  }
</script>

<div class="flex flex-col md:flex-row gap-4 p-4 bg-white border rounded-lg">
  <!-- Búsqueda -->
  <div class="relative flex-1">
    <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
    <Input
      bind:value={searchTerm}
      placeholder="Buscar por nombre o email..."
      class="pl-10"
    />
  </div>

  <!-- Filtro por estado -->
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

  <!-- Ordenar por -->
  <div class="md:w-48">
    <select 
      bind:value={sortBy}
      class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {#each sortOptions as option}
        <option value={option.value}>{option.label}</option>
      {/each}
    </select>
  </div>

  <!-- Limpiar filtros -->
  <Button variant="outline" onclick={handleClearFilters}>
    <Filter class="mr-2 h-4 w-4" />
    Limpiar
  </Button>
</div>