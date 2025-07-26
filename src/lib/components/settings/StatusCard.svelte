<script lang="ts">
  import { Badge } from '$lib/components/ui/badge';
  
  // Definir los tipos explícitamente
  type StatusType = 'connected' | 'disconnected' | 'verified' | 'default';
  
  interface Props {
    icon?: any;
    title: string;
    description?: string;
    status?: string;
    statusType?: StatusType;
    children?: any;
  }
  
  let { 
    icon, 
    title, 
    description, 
    status,
    statusType = 'default',
    children 
  }: Props = $props();
  
  // Usar Record para tipado seguro
  const statusClasses: Record<StatusType, string> = {
    connected: 'bg-green-100 text-green-700',
    disconnected: 'border-gray-200 text-gray-600',
    verified: 'bg-green-100 text-green-700',
    default: 'border-gray-200 text-gray-600'
  };
</script>

<div class="flex items-center justify-between p-4 border rounded-lg">
  <div class="flex items-center space-x-3">
    {#if icon}
      <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
        <!-- svelte-ignore svelte_component_deprecated -->
        <svelte:component this={icon} class="w-5 h-5 text-blue-600" />
      </div>
    {/if}
    <div>
      <p class="font-medium">{title}</p>
      {#if description}
        <p class="text-sm text-gray-600">{description}</p>
      {/if}
    </div>
  </div>
  
  <div class="flex items-center space-x-3">
    {#if status}
      <Badge 
        variant={statusType === 'connected' || statusType === 'verified' ? 'default' : 'outline'}
        class={statusClasses[statusType]}
      >
        {status}
      </Badge>
    {/if}
    
    {#if children}
      {@render children()}
    {/if}
  </div>
</div>