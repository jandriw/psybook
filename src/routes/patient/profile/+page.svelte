<!-- src/routes/patient/profile/+page.svelte -->
<script lang="ts">
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
  import { User, Mail, Phone, ArrowLeft, Save } from 'lucide-svelte';
  import { goto } from '$app/navigation';

  let { data } = $props();

  let profileData = $state({
    name: data.user?.name || '',
    email: data.user?.email || '',
    phone: data.user?.phone || '',
    avatar: data.user?.avatar || null
  });

  function goBack() {
    goto('/patient');
  }

  function handleSave() {
    // Aquí iría la lógica para guardar el perfil
    alert('Perfil guardado correctamente');
  }

  function getInitials(name: string): string {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
</script>

<svelte:head>
  <title>Mi Perfil - PsyBooking</title>
</svelte:head>

<div class="max-w-2xl mx-auto space-y-6">
  <!-- Header -->
  <div class="flex items-center space-x-4">
    <Button variant="ghost" onclick={goBack} class="bg-transparent">
      <ArrowLeft class="w-4 h-4 mr-2" />
      Volver
    </Button>
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Mi Perfil</h1>
      <p class="text-gray-600">Gestiona tu información personal</p>
    </div>
  </div>

  <!-- Perfil -->
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <User class="w-5 h-5" />
        Información Personal
      </CardTitle>
    </CardHeader>
    <CardContent class="space-y-6">
      <!-- Avatar -->
      <div class="flex items-center space-x-4">
        <Avatar class="h-20 w-20">
          <AvatarImage src={profileData.avatar} alt={profileData.name} />
          <AvatarFallback class="bg-blue-100 text-blue-600 text-xl">
            {getInitials(profileData.name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 class="font-medium text-gray-900">{profileData.name}</h3>
          <p class="text-sm text-gray-600">Cliente desde enero 2025</p>
          <Button variant="outline" size="sm" class="mt-2 bg-transparent">
            Cambiar foto
          </Button>
        </div>
      </div>

      <!-- Campos del formulario -->
      <div class="space-y-4">
        <div>
          <Label for="name">Nombre completo</Label>
          <Input 
            id="name" 
            bind:value={profileData.name}
            placeholder="Tu nombre completo" 
          />
        </div>

        <div>
          <Label for="email">Email</Label>
          <Input 
            id="email" 
            type="email"
            bind:value={profileData.email}
            placeholder="tu@email.com" 
          />
        </div>

        <div>
          <Label for="phone">Teléfono</Label>
          <Input 
            id="phone" 
            type="tel"
            bind:value={profileData.phone}
            placeholder="+34 666 123 456" 
          />
        </div>
      </div>

      <!-- Botones -->
      <div class="flex justify-end space-x-3">
        <Button variant="outline" onclick={goBack}>
          Cancelar
        </Button>
        <Button onclick={handleSave} class="bg-blue-600 hover:bg-blue-700">
          <Save class="w-4 h-4 mr-2" />
          Guardar Cambios
        </Button>
      </div>
    </CardContent>
  </Card>

  <!-- Información adicional -->
  <Card>
    <CardHeader>
      <CardTitle>Privacidad y Seguridad</CardTitle>
    </CardHeader>
    <CardContent class="space-y-4">
      <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
        <div class="flex items-center space-x-2">
          <div class="w-2 h-2 bg-green-500 rounded-full"></div>
          <span class="text-sm font-medium text-green-800">Cuenta verificada</span>
        </div>
        <p class="text-xs text-green-700 mt-1">
          Tu información está protegida y encriptada según GDPR
        </p>
      </div>

      <div class="text-xs text-gray-500 space-y-1">
        <p>• Tus datos médicos están protegidos por el secreto profesional</p>
        <p>• Solo tu psicólogo asignado tiene acceso a tu información clínica</p>
        <p>• Puedes solicitar la eliminación de tus datos en cualquier momento</p>
      </div>
    </CardContent>
  </Card>
</div>