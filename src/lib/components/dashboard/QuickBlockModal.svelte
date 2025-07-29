<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Textarea } from '$lib/components/ui/textarea';

  let { 
    show = $bindable(false),
    date = '',
    startTime = '',
    endTime = '',
    onSave = () => {},
    onCancel = () => {}
  }: {
    show: boolean;
    date: string;
    startTime: string;
    endTime: string;
    onSave: (data: any) => void;
    onCancel: () => void;
  } = $props();

  let formData = $state({
    title: '',
    type: 'blocked',
    reason: '',
    startTime: startTime,
    endTime: endTime
  });

  // Resetear form cuando se abre
  $effect(() => {
    if (show) {
      formData = {
        title: '',
        type: 'blocked',
        reason: '',
        startTime: startTime,
        endTime: endTime
      };
    }
  });

  function handleSave(): void {
    if (!formData.title.trim()) return;
    
    onSave({
      ...formData,
      date,
      id: Date.now().toString()
    });
    
    show = false;
  }

  function handleCancel(): void {
    show = false;
    onCancel();
  }

  // Predefinidos rápidos
  function setQuickBlock(type: string, title: string): void {
    formData.type = type;
    formData.title = title;
    
    if (type === 'vacation') {
      // Bloquear día completo
      formData.startTime = '00:00';
      formData.endTime = '23:59';
    }
  }
</script>

{#if show}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onclick={handleCancel}>
    <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4" onclick={(e) => e.stopPropagation()}>
      <h3 class="text-lg font-semibold mb-4">Bloquear Tiempo</h3>
      
      <!-- Botones rápidos -->
      <div class="flex gap-2 mb-4">
        <Button 
          variant="outline" 
          size="sm"
          onclick={() => setQuickBlock('blocked', 'Tiempo personal')}
        >
          Personal
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onclick={() => setQuickBlock('vacation', 'Día libre')}
        >
          Día libre
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onclick={() => setQuickBlock('blocked', 'Pausa almuerzo')}
        >
          Almuerzo
        </Button>
      </div>
      
      <div class="space-y-4">
        <div>
          <Label for="title">Título del bloqueo</Label>
          <Input 
            id="title"
            bind:value={formData.title}
            placeholder="ej. Tiempo personal, Almuerzo..."
          />
        </div>

        <div>
          <Label for="type">Tipo</Label>
          <select 
            id="type"
            bind:value={formData.type}
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="blocked">Bloqueado</option>
            <option value="personal">Personal</option>
            <option value="vacation">Vacaciones</option>
          </select>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <Label for="startTime">Hora inicio</Label>
            <Input 
              id="startTime"
              type="time"
              bind:value={formData.startTime}
            />
          </div>
          <div>
            <Label for="endTime">Hora fin</Label>
            <Input 
              id="endTime"
              type="time"
              bind:value={formData.endTime}
            />
          </div>
        </div>

        <div>
          <Label for="reason">Motivo (opcional)</Label>
          <Textarea 
            id="reason"
            bind:value={formData.reason}
            placeholder="Descripción del bloqueo..."
            rows={2}
          />
        </div>
      </div>

      <div class="flex justify-end space-x-2 mt-6">
        <Button variant="outline" onclick={handleCancel}>
          Cancelar
        </Button>
        <Button onclick={handleSave} class="bg-blue-600 hover:bg-blue-700">
          Bloquear
        </Button>
      </div>
    </div>
  </div>
{/if}