<script lang="ts">
  import { Switch } from '$lib/components/ui/switch';
  import { Label } from '$lib/components/ui/label';
  
  interface Props {
    checked: boolean;
    title: string;
    description?: string; // ✅ Opcional con ?
    disabled?: boolean;
    id?: string;
  }
  
  let { 
    checked = $bindable(), 
    title, 
    description,
    disabled = false,
    id = crypto.randomUUID()
  }: Props = $props();
</script>

<div class="flex items-center justify-between gap-1.5">
  <Switch {id} bind:checked {disabled} />
  <div class="space-y-0.5">
    <Label for={id}>{title}</Label>
    {#if description}
      <p class="text-sm text-gray-600">{description}</p>
    {/if}
  </div>
</div>