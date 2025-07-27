<script lang="ts">
  let { notification } = $props();
</script>

<div class="flex items-start space-x-3">
  <!-- svelte-ignore svelte_component_deprecated -->
  <svelte:component this={notification.icon} class="h-4 w-4 mt-0.5 {notification.color}" />
  <div class="flex-1 space-y-1">
    <p class="text-sm">{notification.message}</p>
    <p class="text-xs text-gray-500">{notification.time}</p>
  </div>
</div>