<!-- src/lib/components/public/TestimonialsSection.svelte -->
<script lang="ts">
  import { Card, CardContent } from '$lib/components/ui/card';
  import { Star } from 'lucide-svelte';

  const testimonials = [
    {
      name: "Ana M.",
      text: "Excelente profesional, me ha ayudado muchísimo con mi ansiedad. Las sesiones online son muy cómodas.",
      rating: 5,
    },
    {
      name: "Carlos R.",
      text: "Proceso de reserva súper fácil y rápido. La doctora es muy empática y profesional.",
      rating: 5,
    },
    {
      name: "María L.",
      text: "Después de 6 meses de terapia, mi vida ha cambiado completamente. Totalmente recomendable.",
      rating: 5,
    },
  ];
</script>

<section class="space-y-6">
  <div class="text-center">
    <h2 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Lo que dicen mis pacientes</h2>
    <p class="text-gray-600">Testimonios reales de personas que han mejorado su bienestar</p>
  </div>

  <div class="grid md:grid-cols-3 gap-6">
    {#each testimonials as testimonial}
      <Card class="border-blue-100">
        <CardContent class="p-6">
          <div class="flex items-center mb-3">
            {#each Array(testimonial.rating) as _, i}
              <Star class="w-4 h-4 text-yellow-400 fill-current" />
            {/each}
          </div>
          <p class="text-gray-700 mb-4">"{testimonial.text}"</p>
          <p class="font-medium text-gray-900">- {testimonial.name}</p>
        </CardContent>
      </Card>
    {/each}
  </div>
</section>