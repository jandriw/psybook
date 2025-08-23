<!-- src/lib/components/patient/NextSession.svelte -->
<script lang="ts">
  import { Card, CardContent } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { Clock, Video, User, MapPin } from 'lucide-svelte';

  let { nextSession } = $props();

  let canJoinSoon = $derived(nextSession?.minutesUntil <= 15);

  function handleJoinVideo() {
    if (nextSession?.videoLink) {
      window.open(nextSession.videoLink, '_blank');
    }
  }
</script>

{#if nextSession}
  <Card class="border-blue-100 bg-gradient-to-r from-blue-25 to-green-25 shadow-lg">
    <CardContent class="p-8">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
        <!-- Información de la sesión -->
        <div class="space-y-4">
          <div class="flex items-center space-x-2">
            <Badge class="bg-blue-100 text-blue-700 border-blue-200">Tu próxima sesión</Badge>
            {#if canJoinSoon}
              <Badge class="bg-green-100 text-green-700 border-green-200">¡Ya puedes unirte!</Badge>
            {/if}
          </div>

          <div>
            <h2 class="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
              {nextSession.date} a las {nextSession.time}
            </h2>
            <p class="text-gray-600 mb-4">{nextSession.fullDate}</p>
          </div>

          <div class="grid sm:grid-cols-2 gap-4">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User class="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p class="font-medium text-gray-800">{nextSession.psychologist}</p>
                <p class="text-sm text-gray-600">Psicóloga Sanitaria</p>
              </div>
            </div>

            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Clock class="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p class="font-medium text-gray-800">{nextSession.sessionType}</p>
                <p class="text-sm text-gray-600">{nextSession.duration}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Botón de unirse -->
        <div class="flex flex-col items-center lg:items-end space-y-4">
          <Button
            size="lg"
            class="px-8 py-4 text-lg {canJoinSoon
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-gray-100 text-gray-500 cursor-not-allowed'}"
            disabled={!canJoinSoon}
            onclick={handleJoinVideo}
          >
            <Video class="w-5 h-5 mr-2" />
            {canJoinSoon ? "Unirse a videollamada" : "Disponible 15 min antes"}
          </Button>

          <div class="text-center lg:text-right">
            <p class="text-sm text-gray-600">
              {#if canJoinSoon}
                Tu sesión está lista
              {:else}
                Faltan
                <span class="font-medium">
                  {Math.floor(nextSession.minutesUntil / 60)}h {nextSession.minutesUntil % 60}m
                </span>
              {/if}
            </p>
            <div class="flex items-center justify-center lg:justify-end space-x-1 text-xs text-gray-500 mt-1">
              <MapPin class="w-3 h-3" />
              <span>Videollamada por Zoom</span>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
{/if}