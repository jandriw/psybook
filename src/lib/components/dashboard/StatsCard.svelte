<script lang="ts">
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';

  let { 
    title, 
    value, 
    change, 
    changeType = 'positive',
    icon,
    valueColor = 'default'
  } = $props();

  // Función que devuelve la clase directamente (acepta cualquier string)
  function getValueClass(color: string): string {
    const classes: Record<string, string> = {
      default: 'text-gray-900',
      green: 'text-green-600',
      red: 'text-red-600',
      blue: 'text-blue-600'
    };
    return classes[color] || classes.default;
  }

  function getChangeClass(type: string): string {
    const classes: Record<string, string> = {
      positive: 'text-green-600',
      negative: 'text-red-600', 
      neutral: 'text-gray-600'
    };
    return classes[type] || classes.neutral;
  }
</script>

<Card>
  <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle class="text-sm font-medium">{title}</CardTitle>
    <!-- svelte-ignore svelte_component_deprecated -->
    <svelte:component this={icon} class="h-4 w-4 text-gray-500" />
  </CardHeader>
  <CardContent>
    <div class="text-2xl font-bold {getValueClass(valueColor)}">{value}</div>
    {#if change}
      <p class="text-xs text-gray-500">
        <span class={getChangeClass(changeType)}>{change}</span> vs mes anterior
      </p>
    {/if}
  </CardContent>
</Card>