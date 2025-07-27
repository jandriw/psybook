<script>
  import { page } from '$app/stores';
  import { Button } from '$lib/components/ui/button';
  import { Brain, ArrowLeft } from 'lucide-svelte';
  
  let { children } = $props();
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
  <!-- Header -->
  <header class="border-b border-blue-100 bg-white/80 backdrop-blur-md">
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <a href="/dashboard" class="flex items-center space-x-2">
            <Button variant="ghost" size="sm" class="bg-transparent">
              <ArrowLeft class="w-4 h-4 mr-2" />
              Volver al Dashboard
            </Button>
          </a>
        </div>
        
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
            <Brain class="w-5 h-5 text-white" />
          </div>
          <span class="text-xl font-bold text-gray-800">PsyBooking</span>
        </div>
        
        <div class="text-sm text-gray-600">
          ¿Necesitas ayuda?
          <a href="#" class="text-blue-600 hover:underline ml-1">
            Contactar soporte
          </a>
        </div>
      </div>
    </div>
  </header>
  
  <!-- Main Content -->
  <main class="container mx-auto px-4 py-8">
    {@render children()}
  </main>
</div>