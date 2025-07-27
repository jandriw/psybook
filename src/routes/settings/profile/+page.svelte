<!-- src/routes/dashboard/settings/profile/+page.svelte -->
<script lang="ts">
  import SettingsHeader from '$lib/components/settings/SettingsHeader.svelte';
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Textarea } from '$lib/components/ui/textarea';
  import { Badge } from '$lib/components/ui/badge';
  import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '$lib/components/ui/dialog';
  import { User, Camera, Award, Plus, X } from 'lucide-svelte';

  let { data } = $props();

  // Estados del formulario
  let profileData = $state({
    name: data.profile?.name || "Carmen Rodríguez Martín",
    title: data.profile?.title || "Dra.",
    description: data.profile?.description || "8 años de experiencia ayudando a profesionales a gestionar el estrés laboral y la ansiedad. Especializada en Terapia Cognitivo-Conductual con enfoque práctico y orientado a resultados.",
    collegeNumber: data.profile?.collegeNumber || "M-15847",
    experience: data.profile?.experience || 8,
    photo: data.profile?.photo || null
  });

  let specialties = $state(data.profile?.specialties || [
    { id: 1, name: "Ansiedad" },
    { id: 2, name: "Estrés" },
    { id: 3, name: "Depresión" }
  ]);

  let languages = $state(data.profile?.languages || [
    { id: 1, name: "Español" },
    { id: 2, name: "Inglés" }
  ]);

  let verificationStatus = $state({
    college: true,
    identity: true,
    bankAccount: true
  });

  // Estados de UI
  let isSaving = $state(false);
  let saveMessage = $state('');
  let showSpecialtyModal = $state(false);
  let showLanguageModal = $state(false);
  let newSpecialty = $state('');
  let newLanguage = $state('');
  let photoUploading = $state(false);

  // File input reference
  let fileInput: HTMLInputElement;

  // Auto-save con debounce
  let saveTimeout: string | number | NodeJS.Timeout;
  $effect(() => {
    if (saveTimeout) clearTimeout(saveTimeout);
    
    saveTimeout = setTimeout(() => {
      saveProfile();
    }, 2000);
  });

  async function saveProfile() {
    if (isSaving) return;
    
    isSaving = true;
    saveMessage = 'Guardando perfil...';

    try {
      const formData = new FormData();
      formData.append('name', profileData.name);
      formData.append('title', profileData.title);
      formData.append('description', profileData.description);
      formData.append('collegeNumber', profileData.collegeNumber);
      formData.append('experience', profileData.experience.toString());
      formData.append('specialties', JSON.stringify(specialties));
      formData.append('languages', JSON.stringify(languages));

      const response = await fetch('?/updateProfile', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        saveMessage = 'Perfil guardado ✓';
      } else {
        saveMessage = 'Error al guardar perfil';
      }
    } catch (error) {
      saveMessage = 'Error al guardar perfil';
      console.error('Error saving profile:', error);
    } finally {
      isSaving = false;
      setTimeout(() => saveMessage = '', 2000);
    }
  }

  async function handlePhotoUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;
    
    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona una imagen válida');
      return;
    }

    // Validar tamaño (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      alert('La imagen debe ser menor a 2MB');
      return;
    }

    photoUploading = true;

    try {
      const formData = new FormData();
      formData.append('photo', file);

      const response = await fetch('?/uploadPhoto', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        profileData.photo = result.photoUrl;
        saveMessage = 'Foto actualizada ✓';
      } else {
        alert('Error al subir la foto');
      }
    } catch (error) {
      alert('Error al subir la foto');
      console.error('Error uploading photo:', error);
    } finally {
      photoUploading = false;
      setTimeout(() => saveMessage = '', 2000);
    }
  }

  function triggerPhotoUpload() {
    fileInput?.click();
  }

  function addSpecialty() {
    if (!newSpecialty.trim()) return;
    
    const specialty = {
      id: Date.now(),
      name: newSpecialty.trim()
    };
    
    specialties = [...specialties, specialty];
    newSpecialty = '';
    showSpecialtyModal = false;
  }

  function removeSpecialty(specialtyId: any) {
    specialties = specialties.filter((s: { id: any; }) => s.id !== specialtyId);
  }

  function addLanguage() {
    if (!newLanguage.trim()) return;
    
    const language = {
      id: Date.now(),
      name: newLanguage.trim()
    };
    
    languages = [...languages, language];
    newLanguage = '';
    showLanguageModal = false;
  }

  function removeLanguage(languageId: any) {
    languages = languages.filter((l: { id: any; }) => l.id !== languageId);
  }
</script>

<div class="max-w-4xl mx-auto space-y-8">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <SettingsHeader 
      icon={User} 
      title="Mi Perfil Profesional"
      description="Gestiona tu información personal y profesional visible para los clientes"
    />
    
    {#if saveMessage}
      <div class="text-sm {isSaving ? 'text-gray-600' : saveMessage.includes('Error') ? 'text-red-600' : 'text-green-600'}">
        {saveMessage}
      </div>
    {/if}
  </div>

  <div class="grid lg:grid-cols-3 gap-8">
    <!-- Formulario principal -->
    <div class="lg:col-span-2 space-y-6">
      <!-- Información básica -->
      <Card>
        <CardHeader>
          <CardTitle>
            <div class="text-2xl">Información Básica</div>
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="grid md:grid-cols-2 gap-4">
            <div class="grid gap-2">
              <Label for="name">Nombre completo</Label>
              <Input 
                id="name" 
                bind:value={profileData.name}
                placeholder="Tu nombre completo"
              />
            </div>
            <div class="grid gap-2">
              <Label for="title">Título profesional</Label>
              <Input 
                id="title" 
                bind:value={profileData.title}
                placeholder="Dr., Dra., etc."
              />
            </div>
          </div>

          <div class="grid gap-2">
            <Label for="description">Descripción profesional</Label>
            <Textarea
              id="description"
              bind:value={profileData.description}
              rows={4}
              placeholder="Describe tu experiencia, enfoque terapéutico y especialidades..."
            />
          </div>

          <div class="grid md:grid-cols-2 gap-4">
            <div class="grid gap-2">
              <Label for="college-number">Número de colegiado</Label>
              <Input 
                id="college-number" 
                bind:value={profileData.collegeNumber}
                placeholder="Ej: M-15847"
              />
            </div>
            <div class="grid gap-2">
              <Label for="experience">Años de experiencia</Label>
              <Input 
                id="experience" 
                type="number" 
                bind:value={profileData.experience}
                min="0"
                max="50"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Especialidades e Idiomas -->
      <Card>
        <CardHeader>
          <CardTitle>
            <div class="text-2xl">Especialidades e Idiomas</div>
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <!-- Especialidades -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <Label>Especialidades</Label>
            </div>
            <div class="flex flex-wrap gap-2">
              {#each specialties as specialty (specialty.id)}
                <Badge 
                  variant="outline" 
                  class="relative group hover:bg-red-50"
                >
                  {specialty.name}
                  <button
                    class="ml-2 opacity-20 group-hover:opacity-100 transition-opacity"
                    onclick={() => removeSpecialty(specialty.id)}
                  >
                    <X class="w-3 h-3" />
                  </button>
                </Badge>
              {/each}
              <Button 
                variant="ghost" 
                size="sm" 
                class="text-blue-600 bg-transparent"
                onclick={() => showSpecialtyModal = true}
              >
                <Plus class="w-4 h-4 mr-1" />
                Añadir
              </Button>
            </div>
          </div>

          <!-- Idiomas -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <Label>Idiomas</Label>
            </div>
            <div class="flex flex-wrap gap-2">
              {#each languages as language (language.id)}
                <Badge 
                  variant="outline"
                  class="relative group hover:bg-red-50"
                >
                  {language.name}
                  <button
                    class="ml-2 opacity-10 group-hover:opacity-100 transition-opacity"
                    onclick={() => removeLanguage(language.id)}
                  >
                    <X class="w-3 h-3" />
                  </button>
                </Badge>
              {/each}
              <Button 
                variant="ghost" 
                size="sm" 
                class="text-blue-600 bg-transparent"
                onclick={() => showLanguageModal = true}
              >
                <Plus class="w-4 h-4 mr-1" />
                Añadir
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Sidebar -->
    <div class="space-y-6">
      <!-- Foto de perfil -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Camera class="w-5 h-5" />
            <div class="text-2xl">Foto de Perfil</div>
          </CardTitle>
        </CardHeader>
        <CardContent class="text-center space-y-4">
          <div class="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center overflow-hidden">
            {#if profileData.photo}
              <img
                src={profileData.photo}
                alt="Foto de perfil"
                class="w-full h-full object-cover"
              />
            {:else}
              <User class="w-16 h-16 text-gray-400" />
            {/if}
          </div>
          
          <Button 
            variant="outline" 
            class="bg-transparent"
            onclick={triggerPhotoUpload}
            disabled={photoUploading}
          >
            {photoUploading ? 'Subiendo...' : 'Cambiar foto'}
          </Button>
          
          <p class="text-xs text-gray-500">JPG o PNG, máximo 2MB</p>
          
          <!-- Input oculto para file upload -->
          <input
            bind:this={fileInput}
            type="file"
            accept="image/*"
            class="hidden"
            onchange={handlePhotoUpload}
          />
        </CardContent>
      </Card>

      <!-- Estado de verificación -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Award class="w-5 h-5" />
            <div class="text-2xl">Verificación</div>
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-sm">Colegio Profesional</span>
            <Badge class={verificationStatus.college ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}>
              {verificationStatus.college ? "Verificado" : "Pendiente"}
            </Badge>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm">Identidad</span>
            <Badge class={verificationStatus.identity ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}>
              {verificationStatus.identity ? "Verificado" : "Pendiente"}
            </Badge>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm">Cuenta bancaria</span>
            <Badge class={verificationStatus.bankAccount ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}>
              {verificationStatus.bankAccount ? "Verificado" : "Pendiente"}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</div>

<!-- Modal para añadir especialidad -->
<Dialog bind:open={showSpecialtyModal}>
  <DialogContent class="sm:max-w-md">
    <DialogHeader>
      <DialogTitle>Añadir Especialidad</DialogTitle>
      <DialogDescription>
        Añade una nueva especialidad a tu perfil profesional
      </DialogDescription>
    </DialogHeader>
    
    <div class="py-4">
      <Label for="specialty" class="pb-2">Especialidad</Label>
      <Input 
        id="specialty"
        bind:value={newSpecialty}
        placeholder="Ej: Terapia de pareja"
        onkeydown={(e) => e.key === 'Enter' && addSpecialty()}
      />
    </div>
    
    <DialogFooter>
      <Button variant="outline" onclick={() => showSpecialtyModal = false}>
        Cancelar
      </Button>
      <Button onclick={addSpecialty} class="bg-blue-600 hover:bg-blue-700">
        Añadir
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

<!-- Modal para añadir idioma -->
<Dialog bind:open={showLanguageModal}>
  <DialogContent class="sm:max-w-md">
    <DialogHeader>
      <DialogTitle>Añadir Idioma</DialogTitle>
      <DialogDescription>
        Añade un nuevo idioma que dominas
      </DialogDescription>
    </DialogHeader>
    
    <div class="py-4">
      <Label for="language" class="pb-2">Idioma</Label>
      <Input 
        id="language"
        bind:value={newLanguage}
        placeholder="Ej: Francés"
        onkeydown={(e) => e.key === 'Enter' && addLanguage()}
      />
    </div>
    
    <DialogFooter>
      <Button variant="outline" onclick={() => showLanguageModal = false}>
        Cancelar
      </Button>
      <Button onclick={addLanguage} class="bg-blue-600 hover:bg-blue-700">
        Añadir
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>