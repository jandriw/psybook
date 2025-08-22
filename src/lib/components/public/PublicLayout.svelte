<!-- src/lib/components/public/PublicLayout.svelte -->
<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Brain, Shield, MessageCircle } from 'lucide-svelte';

  let { children } = $props();

  function handleWhatsAppClick() {
    // En una implementación real, esto abriría WhatsApp
    window.open('https://wa.me/34666123456', '_blank');
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
  <!-- Header -->
  <header class="bg-white/90 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
            <Brain class="w-5 h-5 text-white" />
          </div>
          <span class="text-xl font-bold text-gray-800">PsyBooking</span>
        </div>

        <div class="flex items-center space-x-4">
          <div class="hidden md:flex items-center space-x-2 text-sm text-gray-600">
            <Shield class="w-4 h-4 text-green-600" />
            <span>Pagos seguros • GDPR</span>
          </div>
          <Button size="sm" variant="outline" class="bg-transparent" onclick={handleWhatsAppClick}>
            <MessageCircle class="w-4 h-4 mr-2" />
            WhatsApp
          </Button>
        </div>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="container mx-auto px-4 py-8">
    {@render children()}
  </main>

  <!-- Footer -->
  <footer class="bg-gray-50 border-t border-gray-200 py-8">
    <div class="container mx-auto px-4">
      <div class="text-center space-y-4">
        <div class="flex items-center justify-center space-x-6 text-sm text-gray-600">
          <a href="/legal/privacy" class="hover:text-blue-600">
            Política de Privacidad
          </a>
          <a href="/legal/terms" class="hover:text-blue-600">
            Términos de Uso
          </a>
          <a href="/legal/cancellations" class="hover:text-blue-600">
            Cancelaciones
          </a>
        </div>
        <p class="text-sm text-gray-500">
          © 2024 Dra. Carmen Rodríguez • Psicóloga Sanitaria Col. M-15847 • Consulta online segura
        </p>
      </div>
    </div>
  </footer>
</div>