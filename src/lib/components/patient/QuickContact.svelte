<!-- src/lib/components/patient/QuickContact.svelte -->
<script lang="ts">
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { MessageCircle, Mail, Clock } from 'lucide-svelte';

  let { psychologist } = $props();

  function handleWhatsApp() {
    if (psychologist?.phone) {
      const phone = psychologist.phone.replace(/\s/g, '');
      window.open(`https://wa.me/${phone}`, '_blank');
    }
  }

  function handleEmail() {
    if (psychologist?.email) {
      window.open(`mailto:${psychologist.email}`, '_blank');
    }
  }
</script>

<Card class="border-purple-100">
  <CardHeader>
    <CardTitle class="flex items-center gap-2 text-purple-700">
      <MessageCircle class="w-5 h-5" />
      Contacto rápido
    </CardTitle>
  </CardHeader>
  <CardContent class="space-y-4">
    <div class="space-y-3">
      <Button 
        variant="outline" 
        class="w-full justify-start bg-transparent" 
        size="sm"
        onclick={handleWhatsApp}
      >
        <MessageCircle class="w-4 h-4 mr-2 text-green-600" />
        WhatsApp para consultas
      </Button>

      <Button 
        variant="outline" 
        class="w-full justify-start bg-transparent" 
        size="sm"
        onclick={handleEmail}
      >
        <Mail class="w-4 h-4 mr-2 text-blue-600" />
        Enviar email
      </Button>
    </div>

    <div class="pt-4 border-t border-purple-100 space-y-2">
      <div class="flex items-center space-x-2 text-sm text-gray-600">
        <Clock class="w-4 h-4" />
        <span>Horario de contacto</span>
      </div>
      <p class="text-xs text-gray-500 ml-6">Lunes a viernes: 9:00 - 18:00</p>
      <p class="text-xs text-gray-500 ml-6">Respuesta en menos de 2 horas</p>
    </div>

    <div class="bg-purple-25 p-3 rounded-lg">
      <p class="text-xs text-purple-700 text-center">
        Para emergencias, contacta con el teléfono de crisis: <strong>024</strong>
      </p>
    </div>
  </CardContent>
</Card>