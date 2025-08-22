<!-- src/lib/components/public/FAQSection.svelte -->
<script lang="ts">
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { HelpCircle } from 'lucide-svelte';

  const faqs = [
    {
      question: "¿Qué necesito para la videollamada?",
      answer:
        "Solo necesitas un dispositivo con cámara y micrófono (móvil, tablet o ordenador) y conexión a internet. Te enviaremos el enlace de Zoom por email.",
    },
    {
      question: "¿Puedo cancelar si surge algo?",
      answer:
        "Sí, puedes cancelar gratuitamente hasta 24 horas antes de la sesión. Las cancelaciones tardías tienen 50% de reembolso.",
    },
    {
      question: "¿Es seguro el pago online?",
      answer:
        "Completamente seguro. Utilizamos Stripe, la plataforma de pagos más segura del mundo. Tus datos están protegidos con cifrado bancario.",
    },
    {
      question: "¿Qué pasa si tengo problemas técnicos?",
      answer:
        "Te ayudamos antes y durante la sesión. Puedes contactarme por WhatsApp si tienes cualquier problema técnico.",
    },
    {
      question: "¿Las sesiones online son igual de efectivas?",
      answer:
        "Sí, múltiples estudios demuestran que la terapia online es igual de efectiva que la presencial para la mayoría de casos.",
    },
    {
      question: "¿Puedo cambiar la fecha de mi cita?",
      answer:
        "Sí, puedes reprogramar tu cita hasta 24 horas antes sin coste adicional desde tu área personal.",
    },
  ];
</script>

<section class="space-y-6">
  <div class="text-center">
    <h2 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
      Preguntas frecuentes
    </h2>
    <p class="text-gray-600">Resolvemos tus dudas más comunes</p>
  </div>
  
  <div class="grid md:grid-cols-2 gap-6">
    {#each faqs as faq, index}
      <Card class="border-gray-200">
        <CardHeader class="pb-3">
          <CardTitle class="text-lg flex items-start gap-2">
            <HelpCircle class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            {faq.question}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p class="text-gray-600">{faq.answer}</p>
        </CardContent>
      </Card>
    {/each}
  </div>
</section>