<script>
  import { Switch } from '$lib/components/ui/switch';
  import { Label } from '$lib/components/ui/label';
  
  let { 
    checked = $bindable(), 
    title, 
    description,
    disabled = false 
  } = $props();
</script>

<div class="flex items-center justify-between">
  <div>
    <Label>{title}</Label>
    {#if description}
      <p class="text-sm text-gray-600">{description}</p>
    {/if}
  </div>
  <Switch bind:checked {disabled} />
</div>