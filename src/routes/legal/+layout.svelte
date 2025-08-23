<!-- src/routes/legal/+layout.svelte -->
<script>
  import { Button } from '$lib/components/ui/button';
  import { ArrowLeft, Brain } from 'lucide-svelte';
  
  let { children } = $props();
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
  <!-- Header -->
  <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div class="max-w-4xl mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <a href="/" class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
            <Brain class="w-5 h-5 text-white" />
          </div>
          <span class="text-xl font-bold text-gray-800">PsyBooking</span>
        </a>
        
        <a href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft class="w-4 h-4 mr-2" />
            Volver al Inicio
          </Button>
        </a>
      </div>
    </div>
  </header>

  <!-- Content -->
  <main class="max-w-4xl mx-auto px-6 py-12">
    {@render children()}
  </main>

  <!-- Footer -->
  <footer class="bg-white border-t border-gray-200 mt-16">
    <div class="max-w-4xl mx-auto px-6 py-8">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div class="flex items-center space-x-2">
          <div class="w-6 h-6 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
            <Brain class="w-4 h-4 text-white" />
          </div>
          <span class="text-sm text-gray-600">© 2025 PsyBooking. Todos los derechos reservados.</span>
        </div>
        
        <nav class="flex space-x-4">
          <a href="/legal/privacy" class="text-sm text-gray-600 hover:text-blue-600">Privacidad</a>
          <a href="/legal/terms" class="text-sm text-gray-600 hover:text-blue-600">Términos</a>
          <a href="/legal/cookies" class="text-sm text-gray-600 hover:text-blue-600">Cookies</a>
          <a href="/legal/gdpr" class="text-sm text-gray-600 hover:text-blue-600">GDPR</a>
        </nav>
      </div>
    </div>
  </footer>
</div>