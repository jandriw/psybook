<script>
  import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '$lib/components/ui/dialog';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Textarea } from '$lib/components/ui/textarea';
  
  let { 
    open = $bindable(),
    service = null, // null for create, object for edit
    onSave = () => {},
    onClose = () => {}
  } = $props();
  
  let formData = $state({
    name: service?.name || '',
    description: service?.description || '',
    duration: service?.duration || 50,
    price: service?.price || 60
  });
  
  function handleSave() {
    onSave(formData);
    handleClose();
  }
  
  function handleClose() {
    open = false;
    onClose();
  }
</script>

<Dialog bind:open>
  <DialogContent class="sm:max-w-md">
    <DialogHeader>
      <DialogTitle>
        {service ? 'Editar Servicio' : 'Nuevo Servicio'}
      </DialogTitle>
      <DialogDescription>
        {service ? 'Modifica los datos de tu servicio' : 'Crea un nuevo tipo de sesión'}
      </DialogDescription>
    </DialogHeader>
    
    <div class="space-y-4 py-4">
      <div>
        <Label for="name">Nombre del servicio</Label>
        <Input id="name" bind:value={formData.name} placeholder="ej. Terapia individual" />
      </div>
      
      <div>
        <Label for="description">Descripción</Label>
        <Textarea 
          id="description" 
          bind:value={formData.description} 
          placeholder="Describe brevemente este tipo de sesión..."
          rows={3}
        />
      </div>
      
      <div class="grid grid-cols-2 gap-4">
        <div>
          <Label for="duration">Duración (minutos)</Label>
          <Input 
            id="duration" 
            type="number" 
            bind:value={formData.duration} 
            min="15" 
            max="180" 
            step="15"
          />
        </div>
        
        <div>
          <Label for="price">Precio (€)</Label>
          <Input 
            id="price" 
            type="number" 
            bind:value={formData.price} 
            min="0" 
            step="5"
          />
        </div>
      </div>
    </div>
    
    <DialogFooter>
      <Button variant="outline" onclick={handleClose}>Cancelar</Button>
      <Button onclick={handleSave} class="bg-blue-600 hover:bg-blue-700">
        {service ? 'Guardar cambios' : 'Crear servicio'}
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>