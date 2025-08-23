<!--src/routes/patient/+layout.svelte-->
<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { Button } from '$lib/components/ui/button';
  import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from '$lib/components/ui/dropdown-menu';
  import {
    Brain,
    User,
    Calendar,
    LogOut,
    Shield,
    Lock
  } from 'lucide-svelte';

  let { data, children } = $props();
  
  // Usuario actual (viene del server)
  const user = data?.user || {
    name: 'Mario López',
    initials: 'ML',
    avatar: null
  };

  function getInitials(name: string): string {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  async function handleLogout() {
    await goto('/auth/logout');
  }

  function navigateToAppointments() {
    goto('/patient/appointments');
  }

  function navigateToProfile() {
    goto('/patient/profile');
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-25 via-white to-green-25">
  <!-- Header -->
  <header class="bg-white/90 backdrop-blur-md border-b border-blue-50 sticky top-0 z-50">
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <a href="/patient" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-gradient-to-r from-blue-400 to-green-400 rounded-lg flex items-center justify-center">
              <Brain class="w-5 h-5 text-white" />
            </div>
            <span class="text-xl font-bold text-gray-700">PsyBooking</span>
          </a>
          <div class="hidden md:block text-gray-400">|</div>
          <h1 class="hidden md:block text-lg text-gray-600">Mi área personal</h1>
        </div>

        <div class="flex items-center space-x-4">
          <div class="hidden md:flex items-center space-x-2 text-sm text-gray-500">
            <Shield class="w-4 h-4 text-green-500" />
            <span>Datos protegidos</span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              {#snippet child({ props })}
                <Button {...props} variant="ghost" class="flex items-center space-x-2 bg-transparent">
                  <Avatar class="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback class="bg-blue-100 text-blue-600">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span class="hidden sm:inline text-gray-700">Hola, {user.name.split(' ')[0]}</span>
                </Button>
              {/snippet}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="w-48">
              <DropdownMenuItem onclick={navigateToAppointments}>
                <Calendar class="mr-2 h-4 w-4" />
                Mis Citas
              </DropdownMenuItem>
              <DropdownMenuItem onclick={navigateToProfile}>
                <User class="mr-2 h-4 w-4" />
                Mi Perfil
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onclick={handleLogout} class="text-gray-600">
                <LogOut class="mr-2 h-4 w-4" />
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="container mx-auto px-4 py-8">
    {@render children()}
  </main>

  <!-- Footer -->
  <footer class="bg-gray-25 border-t border-gray-100 py-6">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div class="flex items-center space-x-4 text-sm text-gray-500">
          <div class="flex items-center space-x-1">
            <Lock class="w-4 h-4 text-green-500" />
            <span>Comunicación encriptada</span>
          </div>
          <div class="hidden md:block">•</div>
          <span class="hidden md:inline">Soporte: lunes a viernes 9:00-18:00</span>
        </div>
        <div class="text-sm text-gray-400">© 2025 PsyBooking • Tu bienestar es nuestra prioridad</div>
      </div>
    </div>
  </footer>
</div>