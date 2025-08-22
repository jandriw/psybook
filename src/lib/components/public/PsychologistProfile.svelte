<!-- src/lib/components/public/PsychologistProfile.svelte -->
<script lang="ts">
  import { Card, CardContent } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Star, Languages, Video, Award, Clock } from 'lucide-svelte';

  let { 
    psychologist = {
      name: "Dra. Carmen Rodríguez",
      title: "Psicóloga Sanitaria Col. M-15847",
      specialty: "Especialista en Ansiedad y Estrés",
      description: "8 años de experiencia ayudando a profesionales a gestionar el estrés laboral y la ansiedad. Especializada en Terapia Cognitivo-Conductual con enfoque práctico y orientado a resultados. Mi objetivo es proporcionarte herramientas efectivas para mejorar tu bienestar emocional.",
      avatar: "/placeholder.svg?height=128&width=128",
      rating: 5,
      reviewCount: 47,
      specialties: ["Ansiedad", "Estrés", "Depresión"],
      languages: ["Español", "Inglés"],
      platform: "Zoom (enlace automático)",
      responseTime: "Confirmación inmediata"
    }
  } = $props();
</script>

<Card class="border-blue-100 shadow-lg">
  <CardContent class="p-8">
    <div class="grid md:grid-cols-3 gap-8 items-start">
      <!-- Foto y info básica -->
      <div class="text-center md:text-left">
        <div class="w-32 h-32 mx-auto md:mx-0 rounded-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center mb-4">
          <img
            src={psychologist.avatar}
            alt={psychologist.name}
            class="w-28 h-28 rounded-full object-cover"
          />
        </div>
        <div class="flex items-center justify-center md:justify-start mb-2">
          {#each Array(psychologist.rating) as _, i}
            <Star class="w-4 h-4 text-yellow-400 fill-current" />
          {/each}
          <span class="ml-2 text-sm text-gray-600">({psychologist.reviewCount} reseñas)</span>
        </div>
        <div class="flex flex-wrap gap-2 justify-center md:justify-start">
          <Badge class="bg-blue-100 text-blue-700">Verificada</Badge>
          <Badge class="bg-green-100 text-green-700">Online</Badge>
        </div>
      </div>

      <!-- Información principal -->
      <div class="md:col-span-2 space-y-4">
        <div>
          <h1 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{psychologist.name}</h1>
          <p class="text-lg text-blue-600 font-medium mb-1">{psychologist.title}</p>
          <p class="text-gray-600">{psychologist.specialty}</p>
        </div>

        <p class="text-gray-700 leading-relaxed">
          {psychologist.description}
        </p>

        <!-- Detalles profesionales -->
        <div class="grid sm:grid-cols-2 gap-4 pt-4">
          <div class="flex items-center space-x-3">
            <Award class="w-5 h-5 text-blue-600" />
            <div>
              <p class="font-medium text-gray-900">Especialidades</p>
              <p class="text-sm text-gray-600">{psychologist.specialties.join(', ')}</p>
            </div>
          </div>

          <div class="flex items-center space-x-3">
            <Languages class="w-5 h-5 text-green-600" />
            <div>
              <p class="font-medium text-gray-900">Idiomas</p>
              <p class="text-sm text-gray-600">{psychologist.languages.join(', ')}</p>
            </div>
          </div>

          <div class="flex items-center space-x-3">
            <Video class="w-5 h-5 text-purple-600" />
            <div>
              <p class="font-medium text-gray-900">Plataforma</p>
              <p class="text-sm text-gray-600">{psychologist.platform}</p>
            </div>
          </div>

          <div class="flex items-center space-x-3">
            <Clock class="w-5 h-5 text-orange-600" />
            <div>
              <p class="font-medium text-gray-900">Respuesta</p>
              <p class="text-sm text-gray-600">{psychologist.responseTime}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </CardContent>
</Card>