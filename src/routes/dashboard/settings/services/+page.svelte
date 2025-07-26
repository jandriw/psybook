<!-- src/routes/dashboard/settings/services/+page.svelte -->
<script lang="ts">
  import SettingsHeader from '$lib/components/settings/SettingsHeader.svelte';
  import CrudListItem from '$lib/components/settings/CrudListItem.svelte';
  import { Card, CardContent } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '$lib/components/ui/dialog';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Textarea } from '$lib/components/ui/textarea';
  import { Stethoscope, Plus, Euro, Clock } from 'lucide-svelte';

  // ✅ DATOS HARDCODEADOS para testing UI
  let { data = {} } = $props();
  
  let services = $state([
    {
      id: 1,
      name: "Primera consulta",
      description: "Evaluación inicial y plan personalizado",
      duration: 45,
      price: 45,
      active: true,
    },
    {
      id: 2,
      name: "Terapia individual",
      description: "Sesión estándar personalizada",
      duration: 50,
      price: 60,
      active: true,
    },
    {
      id: 3,
      name: "Terapia de pareja",
      description: "Sesión conjunta para parejas",
      duration: 60,
      price: 75,
      active: true,
    },
    {
      id: 4,
      name: "Terapia familiar",
      description: "Sesión para toda la familia",
      duration: 90,
      price: 85,
      active: false,
    }
  ]);

  // Estados del modal
  let showModal = $state(false);
  let editingService = $state(null);
  let isSaving = $state(false);
  let saveMessage = $state('');

  // Datos del formulario del modal
  let formData = $state({
    name: '',
    description: '',
    duration: 50,
    price: 60,
    active: true
  });

  function openCreateModal() {
    editingService = null;
    formData = {
      name: '',
      description: '',
      duration: 50,
      price: 60,
      active: true
    };
    showModal = true;
  }

  function openEditModal(service: { name: any; description: any; duration: any; price: any; active: any; }) {
    editingService = service;
    formData = {
      name: service.name,
      description: service.description,
      duration: service.duration,
      price: service.price,
      active: service.active
    };
    showModal = true;
  }

  function closeModal() {
    showModal = false;
    editingService = null;
    formData = {
      name: '',
      description: '',
      duration: 50,
      price: 60,
      active: true
    };
  }

  async function handleSaveService() {
    if (!formData.name.trim()) {
      alert('El nombre del servicio es obligatorio');
      return;
    }

    if (formData.price <= 0) {
      alert('El precio debe ser mayor a 0');
      return;
    }

    if (formData.duration <= 0) {
      alert('La duración debe ser mayor a 0');
      return;
    }

    isSaving = true;
    saveMessage = editingService ? 'Actualizando servicio...' : 'Creando servicio...';

    // Simular guardado
    setTimeout(() => {
      if (editingService) {
        // Actualizar servicio existente
        const index = services.findIndex(s => s.id === editingService.id);
        if (index !== -1) {
          services[index] = {
            ...editingService,
            name: formData.name,
            description: formData.description,
            duration: formData.duration,
            price: formData.price,
            active: formData.active
          };
        }
        saveMessage = 'Servicio actualizado ✓';
      } else {
        // Crear nuevo servicio
        const newService = {
          id: Math.max(...services.map(s => s.id)) + 1,
          name: formData.name,
          description: formData.description,
          duration: formData.duration,
          price: formData.price,
          active: formData.active
        };
        services = [...services, newService];
        saveMessage = 'Servicio creado ✓';
      }

      isSaving = false;
      closeModal();
      
      setTimeout(() => saveMessage = '', 2000);
    }, 1000);

    /* ❌ BACKEND COMENTADO
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('duration', formData.duration.toString());
      formDataToSend.append('price', formData.price.toString());
      formDataToSend.append('active', formData.active.toString());
      
      if (editingService) {
        formDataToSend.append('serviceId', editingService.id.toString());
      }

      const action = editingService ? '?/updateService' : '?/createService';
      const response = await fetch(action, {
        method: 'POST',
        body: formDataToSend
      });

      if (response.ok) {
        // Recargar servicios o actualizar la lista
        closeModal();
        saveMessage = editingService ? 'Servicio actualizado ✓' : 'Servicio creado ✓';
      } else {
        saveMessage = 'Error al guardar servicio';
      }
    } catch (error) {
      saveMessage = 'Error al guardar servicio';
      console.error('Error saving service:', error);
    } finally {
      isSaving = false;
      setTimeout(() => saveMessage = '', 2000);
    }
    */
  }

  async function handleDeleteService(service: { name: any; id: number; }) {
    if (!confirm(`¿Estás seguro de eliminar "${service.name}"?`)) return;
    
    saveMessage = 'Eliminando servicio...';

    // Simular eliminación
    setTimeout(() => {
      services = services.filter(s => s.id !== service.id);
      saveMessage = 'Servicio eliminado ✓';
      setTimeout(() => saveMessage = '', 2000);
    }, 500);

    /* ❌ BACKEND COMENTADO
    try {
      const formData = new FormData();
      formData.append('serviceId', service.id.toString());

      const response = await fetch('?/deleteService', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        services = services.filter(s => s.id !== service.id);
        saveMessage = 'Servicio eliminado ✓';
      } else {
        saveMessage = 'Error al eliminar servicio';
      }
    } catch (error) {
      saveMessage = 'Error al eliminar servicio';
      console.error('Error deleting service:', error);
    } finally {
      setTimeout(() => saveMessage = '', 2000);
    }
    */
  }

  function toggleServiceStatus(service: { id: any; name?: string; description?: string; duration?: number; price?: number; active: any; }) {
    saveMessage = `${service.active ? 'Desactivando' : 'Activando'} servicio...`;
    
    // Simular toggle
    setTimeout(() => {
      const index = services.findIndex(s => s.id === service.id);
      if (index !== -1) {
        services[index] = { ...services[index], active: !services[index].active };
        saveMessage = `Servicio ${services[index].active ? 'activado' : 'desactivado'} ✓`;
        setTimeout(() => saveMessage = '', 2000);
      }
    }, 300);
  }

  // Validación en tiempo real
  let isFormValid = $derived(() => {
    return formData.name.trim().length > 0 && 
           formData.price > 0 && 
           formData.duration > 0;
  });
</script>

<div class="max-w-4xl mx-auto space-y-8">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <SettingsHeader 
      icon={Stethoscope} 
      title="Servicios y Precios"
      description="Gestiona los tipos de terapia que ofreces y sus tarifas"
    >
    </SettingsHeader>

    <Button 
      class="bg-blue-600 hover:bg-blue-700"
      onclick={openCreateModal}
    >
      <Plus class="w-4 h-4 mr-2" />
      Nuevo Servicio
    </Button>
    
    <!-- {#if saveMessage} COMENTADO DE MOMENTO
      <div class="text-sm {saveMessage.includes('Error') ? 'text-red-600' : 'text-green-600'}">
        {saveMessage}
      </div>
    {/if} -->
  </div>

  <!-- Lista de servicios -->
  <div class="space-y-4">
    {#if services.length === 0}
      <Card>
        <CardContent class="p-8 text-center">
          <Stethoscope class="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 class="text-lg font-semibold text-gray-900 mb-2">No tienes servicios configurados</h3>
          <p class="text-gray-600 mb-4">Crea tu primer servicio para empezar a recibir reservas</p>
          <Button onclick={openCreateModal} class="bg-blue-600 hover:bg-blue-700">
            <Plus class="w-4 h-4 mr-2" />
            Crear primer servicio
          </Button>
        </CardContent>
      </Card>
    {:else}
      {#each services as service (service.id)}
        <CrudListItem 
          item={service}
          onEdit={openEditModal}
          onDelete={handleDeleteService}
        >
          <div class="py-0">
            <div class="flex items-center space-x-3 mb-1">
              <h3 class="text-lg font-semibold">{service.name}</h3>
              <button 
                onclick={() => toggleServiceStatus(service)}
                class="transition-colors"
              >
                {#if service.active}
                  <Badge class="bg-green-100 text-green-700 hover:bg-green-200 cursor-pointer">
                    Activo
                  </Badge>
                {:else}
                  <Badge variant="outline" class="hover:bg-gray-100 cursor-pointer">
                    Inactivo
                  </Badge>
                {/if}
              </button>
            </div>
            
            <p class="text-gray-600 mb-2">{service.description}</p>
            
            <div class="flex items-center space-x-6">
              <div class="flex items-center space-x-1">
                <Clock class="w-4 h-4 text-gray-500" />
                <span class="text-sm text-gray-600">{service.duration} minutos</span>
              </div>
              <div class="flex items-center space-x-1">
                <Euro class="w-4 h-4 text-green-600" />
                <span class="text-sm font-semibold text-green-600">{service.price}€</span>
              </div>
            </div>
          </div>
        </CrudListItem>
      {/each}
    {/if}
  </div>
</div>

<!-- Modal para crear/editar servicio -->
<Dialog bind:open={showModal}>
  <DialogContent class="sm:max-w-md">
    <DialogHeader>
      <DialogTitle>
        {editingService ? 'Editar Servicio' : 'Nuevo Servicio'}
      </DialogTitle>
      <DialogDescription>
        {editingService ? 'Modifica los datos de tu servicio' : 'Crea un nuevo tipo de sesión para tus clientes'}
      </DialogDescription>
    </DialogHeader>
    
    <div class="space-y-4 py-4">
      <div>
        <Label for="service-name" class="pb-2">Nombre del servicio *</Label>
        <Input 
          id="service-name" 
          bind:value={formData.name} 
          placeholder="ej. Terapia individual"
          class={!formData.name.trim() ? 'border-red-300' : ''}
        />
        {#if !formData.name.trim()}
          <p class="text-xs text-red-600 mt-1">El nombre es obligatorio</p>
        {/if}
      </div>
      
      <div>
        <Label for="service-description" class="pb-2">Descripción</Label>
        <Textarea 
          id="service-description" 
          bind:value={formData.description} 
          placeholder="Describe este tipo de sesión para tus clientes..."
          rows={3}
        />
      </div>
      
      <div class="grid grid-cols-2 gap-4">
        <div>
          <Label for="service-duration" class="pb-2">Duración (minutos) *</Label>
          <Input 
            id="service-duration" 
            type="number" 
            bind:value={formData.duration} 
            min="15" 
            max="240" 
            step="15"
            class={formData.duration <= 0 ? 'border-red-300' : ''}
          />
          {#if formData.duration <= 0}
            <p class="text-xs text-red-600 mt-1">Duración debe ser mayor a 0</p>
          {/if}
        </div>
        
        <div>
          <Label for="service-price" class="pb-2">Precio (€) *</Label>
          <Input 
            id="service-price" 
            type="number" 
            bind:value={formData.price} 
            min="0" 
            step="5"
            class={formData.price <= 0 ? 'border-red-300' : ''}
          />
          {#if formData.price <= 0}
            <p class="text-xs text-red-600 mt-1">Precio debe ser mayor a 0</p>
          {/if}
        </div>
      </div>

      <div class="flex items-center space-x-2">
        <input 
          type="checkbox" 
          id="service-active"
          bind:checked={formData.active}
          class="rounded border-gray-300"
        />
        <Label for="service-active">Servicio activo (visible para clientes)</Label>
      </div>
    </div>
    
    <DialogFooter>
      <Button variant="outline" onclick={closeModal} disabled={isSaving}>
        Cancelar
      </Button>
      <Button 
        onclick={handleSaveService} 
        class="bg-blue-600 hover:bg-blue-700"
        disabled={!isFormValid || isSaving}
      >
        {#if isSaving}
          {editingService ? 'Actualizando...' : 'Creando...'}
        {:else}
          {editingService ? 'Guardar cambios' : 'Crear servicio'}
        {/if}
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>