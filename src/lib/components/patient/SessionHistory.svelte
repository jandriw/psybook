<!-- src/lib/components/patient/SessionHistory.svelte -->
<script lang="ts">
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { History, Download, CheckCircle } from 'lucide-svelte';

  let { sessions = [] } = $props();

  function handleDownloadReceipt(sessionId: number) {
    alert(`Descargar recibo de sesión ${sessionId}`);
  }
</script>

<Card class="border-gray-100">
  <CardHeader>
    <CardTitle class="flex items-center gap-2 text-gray-800">
      <History class="w-5 h-5 text-gray-600" />
      Historial de sesiones
    </CardTitle>
  </CardHeader>
  <CardContent class="space-y-4">
    {#if sessions.length > 0}
      {#each sessions as session}
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border border-gray-100 rounded-lg space-y-3 sm:space-y-0">
          <div class="space-y-1">
            <div class="flex items-center space-x-2">
              <CheckCircle class="w-4 h-4 text-green-500" />
              <span class="font-medium text-gray-800">{session.date}</span>
              <Badge variant="outline" class="text-gray-600 border-gray-200">
                Completada
              </Badge>
            </div>
            <p class="text-sm text-gray-600">
              {session.sessionType} • {session.duration}
            </p>
            <p class="text-xs text-gray-500">con {session.psychologist}</p>
          </div>

          <div class="flex items-center space-x-2">
            {#if session.receiptAvailable}
              <Button 
                variant="outline" 
                size="sm" 
                class="bg-transparent"
                onclick={() => handleDownloadReceipt(session.id)}
              >
                <Download class="w-4 h-4 mr-2" />
                Descargar recibo
              </Button>
            {/if}
          </div>
        </div>
      {/each}
    {:else}
      <div class="text-center py-8 text-gray-500">
        <History class="w-12 h-12 mx-auto mb-4 text-gray-300" />
        <p>Aún no tienes sesiones completadas</p>
      </div>
    {/if}
  </CardContent>
</Card>