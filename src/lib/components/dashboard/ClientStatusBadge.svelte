<script lang="ts">
  import { Badge } from '$lib/components/ui/badge';

  let { status } = $props();

  function getStatusConfig(status: string) {
    const configs: Record<string, { label: string; class: string }> = {
      active: { 
        label: 'Activo', 
        class: 'bg-green-100 text-green-700 border-green-200' 
      },
      inactive: { 
        label: 'Inactivo', 
        class: 'bg-gray-100 text-gray-700 border-gray-200' 
      },
      new: { 
        label: 'Nuevo', 
        class: 'bg-blue-100 text-blue-700 border-blue-200' 
      },
      archived: { 
        label: 'Archivado', 
        class: 'bg-red-100 text-red-700 border-red-200' 
      }
    };
    return configs[status] || configs.active;
  }

  let statusConfig = $derived(getStatusConfig(status));
</script>

<Badge class={statusConfig.class}>
  {statusConfig.label}
</Badge>