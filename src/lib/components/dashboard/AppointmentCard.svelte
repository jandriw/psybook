<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { Video, FileText } from 'lucide-svelte';

  let { appointment } = $props();

  function handleVideoCall() {
    // Abrir videollamada
    alert(`Videollamada con ${appointment.client}`);
  }

  function handleNotes() {
    // Abrir notas
    alert(`Notas de ${appointment.client}`);
  }
</script>

<div class="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
  <div class="flex items-center space-x-4">
    <div class="text-sm font-mono font-medium text-blue-600 min-w-[50px]">
      {appointment.time}
    </div>
    <div>
      <p class="font-medium">{appointment.client}</p>
      <p class="text-sm text-gray-600">{appointment.type}</p>
    </div>
  </div>
  
  <div class="flex items-center space-x-2">
    <Badge variant="outline" class="text-green-600 border-green-200">
      {appointment.price}€
    </Badge>
    <div class="flex space-x-1">
      <Button size="sm" variant="outline" onclick={handleVideoCall}>
        <Video class="h-4 w-4" />
      </Button>
      <Button size="sm" variant="outline" onclick={handleNotes}>
        <FileText class="h-4 w-4" />
      </Button>
    </div>
  </div>
</div>