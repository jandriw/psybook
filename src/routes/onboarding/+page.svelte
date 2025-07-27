<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  
  onMount(() => {
    // Redirect to first step
    goto('/onboarding/profile', { replaceState: true });
  });
</script>

<!-- Fallback mientras redirige -->
<div class="flex items-center justify-center min-h-[400px]">
  <div class="text-center">
    <div class="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
    <p class="text-gray-600">Iniciando configuración...</p>
  </div>
</div>