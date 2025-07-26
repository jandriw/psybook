<script>
  let { 
    startTime = $bindable(),
    endTime = $bindable(),
    disabled = false,
    label = ""
  } = $props();
</script>

<div class="flex items-center space-x-2">
  {#if label}
    <span class="text-sm text-gray-600 w-20">{label}</span>
  {/if}
  <span class="text-sm text-gray-600">de</span>
  <input 
    type="time" 
    bind:value={startTime}
    {disabled}
    class="border rounded px-2 py-1 text-sm disabled:bg-gray-100" 
  />
  <span class="text-sm text-gray-600">a</span>
  <input 
    type="time" 
    bind:value={endTime}
    {disabled}
    class="border rounded px-2 py-1 text-sm disabled:bg-gray-100" 
  />
</div>