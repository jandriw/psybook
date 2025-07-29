<script lang="ts">
  import { Badge } from '$lib/components/ui/badge';

  let { status } = $props();

  function getStatusConfig(status: string) {
    const configs: Record<string, { label: string; class: string }> = {
      confirmed: { 
        label: 'Confirmada', 
        class: 'bg-green-100 text-green-700 border-green-200' 
      },
      pending: { 
        label: 'Pendiente', 
        class: 'bg-yellow-100 text-yellow-700 border-yellow-200' 
      },
      cancelled: { 
        label: 'Cancelada', 
        class: 'bg-red-100 text-red-700 border-red-200' 
      },
      completed: { 
        label: 'Completada', 
        class: 'bg-blue-100 text-blue-700 border-blue-200' 
      },
      no_show: { 
        label: 'No asistió', 
        class: 'bg-gray-100 text-gray-700 border-gray-200' 
      }
    };
    return configs[status] || configs.pending;
  }

  // ✅ Svelte 5 syntax  
  let statusConfig = $derived(getStatusConfig(status));
</script>

<Badge class={statusConfig.class}>
  {statusConfig.label}
</Badge>