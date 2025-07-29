<script lang="ts">
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Textarea } from '$lib/components/ui/textarea';
  import { Badge } from '$lib/components/ui/badge';
  import { Calendar, Plus, Trash2, Edit } from 'lucide-svelte';

  interface Block {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    reason: string;
    type: string;
  }

  let { 
    blocks = $bindable([]),
    showModal = $bindable(false),
    onAddBlock = () => {},
    onEditBlock = () => {},
    onDeleteBlock = () => {}
  }: {
    blocks: Block[];
    showModal: boolean;
    onAddBlock: (block: Block) => void;
    onEditBlock: (block: Block) => void;
    onDeleteBlock: (id: string) => void;
  } = $props();

  let editingBlock = $state<Block | null>(null);
  let formData = $state({
    title: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    reason: '',
    type: 'vacation'
  });

  const blockTypes: Record<string, { label: string; color: string }> = {
    vacation: { label: 'Vacaciones', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    personal: { label: 'Personal', color: 'bg-green-100 text-green-700 border-green-200' },
    medical: { label: 'Médico', color: 'bg-red-100 text-red-700 border-red-200' },
    other: { label: 'Otro', color: 'bg-gray-100 text-gray-700 border-gray-200' }
  };

  function openCreateModal(): void {
    editingBlock = null;
    formData = {
      title: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      reason: '',
      type: 'vacation'
    };
    showModal = true;
  }

  function openEditModal(block: Block): void {
    editingBlock = block;
    formData = { ...block };
    showModal = true;
  }

  function handleSave(): void {
    const blockData: Block = {
      ...formData,
      id: editingBlock?.id || Date.now().toString()
    };

    if (editingBlock) {
      onEditBlock(blockData);
    } else {
      onAddBlock(blockData);
    }

    showModal = false;
    editingBlock = null;
  }

  function handleDelete(blockId: string): void {
    if (confirm('¿Estás seguro de eliminar este bloqueo?')) {
      onDeleteBlock(blockId);
    }
  }

  function formatDateRange(startDate: string, endDate: string, startTime: string, endTime: string): string {
    const start = new Date(startDate).toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short' 
    });
    const end = new Date(endDate).toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short' 
    });
    
    if (startTime && endTime) {
      return `${start} - ${end}, ${startTime}-${endTime}`;
    }
    return `${start} - ${end}`;
  }
</script>

<Card>
  <CardHeader>
    <div class="flex items-center justify-between">
      <CardTitle class="flex items-center gap-2">
        <Calendar class="h-5 w-5" />
        Bloqueos Especiales
      </CardTitle>
      <Button onclick={openCreateModal} class="bg-blue-600 hover:bg-blue-700">
        <Plus class="mr-2 h-4 w-4" />
        Nuevo Bloqueo
      </Button>
    </div>
  </CardHeader>
  <CardContent>
    {#if blocks.length === 0}
      <div class="text-center py-8">
        <Calendar class="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">No hay bloqueos programados</h3>
        <p class="text-gray-600 mb-4">Añade vacaciones, citas médicas u otros bloqueos de tiempo.</p>
        <Button onclick={openCreateModal} variant="outline">Crear Primer Bloqueo</Button>
      </div>
    {:else}
      <div class="space-y-3">
        {#each blocks as block}
          <div class="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
            <div class="flex-1">
              <div class="flex items-center space-x-2 mb-1">
                <h4 class="font-medium text-gray-900">{block.title}</h4>
                <Badge class={blockTypes[block.type]?.color || blockTypes.other.color}>
                  {blockTypes[block.type]?.label || blockTypes.other.label}
                </Badge>
              </div>
              <p class="text-sm text-gray-600 mb-1">
                {formatDateRange(block.startDate, block.endDate, block.startTime, block.endTime)}
              </p>
              {#if block.reason}
                <p class="text-sm text-gray-500">{block.reason}</p>
              {/if}
            </div>
            <div class="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onclick={() => openEditModal(block)}
              >
                <Edit class="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                class="text-red-600 border-red-200 hover:bg-red-50"
                onclick={() => handleDelete(block.id)}
              >
                <Trash2 class="h-4 w-4" />
              </Button>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </CardContent>
</Card>

<!-- Modal -->
{#if showModal}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onclick={() => showModal = false}>
    <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4" onclick={(e) => e.stopPropagation()}>
      <h3 class="text-lg font-semibold mb-4">
        {editingBlock ? 'Editar Bloqueo' : 'Nuevo Bloqueo'}
      </h3>
      
      <div class="space-y-4">
        <div>
          <Label for="title">Título</Label>
          <Input 
            id="title"
            bind:value={formData.title} 
            placeholder="ej. Vacaciones de verano"
          />
        </div>

        <div>
          <Label for="type">Tipo</Label>
          <select 
            id="type"
            bind:value={formData.type}
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            {#each Object.entries(blockTypes) as [key, type]}
              <option value={key}>{type.label}</option>
            {/each}
          </select>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <Label for="startDate">Fecha inicio</Label>
            <Input 
              id="startDate"
              type="date"
              bind:value={formData.startDate}
            />
          </div>
          <div>
            <Label for="endDate">Fecha fin</Label>
            <Input 
              id="endDate"
              type="date"
              bind:value={formData.endDate}
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <Label for="startTime">Hora inicio (opcional)</Label>
            <Input 
              id="startTime"
              type="time"
              bind:value={formData.startTime}
            />
          </div>
          <div>
            <Label for="endTime">Hora fin (opcional)</Label>
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
            rows={3}
          />
        </div>
      </div>

      <div class="flex justify-end space-x-2 mt-6">
        <Button variant="outline" onclick={() => showModal = false}>
          Cancelar
        </Button>
        <Button onclick={handleSave} class="bg-blue-600 hover:bg-blue-700">
          {editingBlock ? 'Guardar Cambios' : 'Crear Bloqueo'}
        </Button>
      </div>
    </div>
  </div>
{/if}