<script lang="ts">
  interface Props {
    icon: any;
    title: string;
    description: string;
    children?: any; // ✅ Opcional con ?
  }
  
  let { icon, title, description, children }: Props = $props();
</script>

<div class="flex items-center justify-between">
  <div>
    <div class="flex items-center space-x-2 mb-2">
      <!-- svelte-ignore svelte_component_deprecated -->
      <svelte:component this={icon} class="w-6 h-6 text-blue-600" />
      <h1 class="text-2xl font-bold text-gray-900">{title}</h1>
    </div>
    <p class="text-gray-600">{description}</p>
  </div>
  
  {#if children}
    <div>
      {@render children()}
    </div>
  {/if}
</div>
