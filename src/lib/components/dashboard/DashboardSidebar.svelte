<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from '$lib/components/ui/dropdown-menu';
  import {
    Calendar,
    Users,
    Clock,
    Settings,
    BarChart3,
    Stethoscope,
    LayoutDashboard,
    Brain,
    LogOut,
    User,
    Bell,
    X
  } from 'lucide-svelte';

  let { 
  open = $bindable(), 
  user = {
    name: 'Usuario',
    specialty: 'Psicólogo',
    avatar: null,
    initials: 'U'
  }
} = $props();

  // Navegación
  const navigationItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Citas",
      url: "/dashboard/appointments",
      icon: Calendar,
    },
    {
      title: "Clientes", 
      url: "/dashboard/clients",
      icon: Users,
    },
    {
      title: "Horarios",
      url: "/dashboard/availability", 
      icon: Clock,
    },
    {
      title: "Servicios",
      url: "/dashboard/services",
      icon: Stethoscope,
    },
    {
      title: "Reportes",
      url: "/dashboard/analytics",
      icon: BarChart3,
    },
    {
      title: "Configuración",
      url: "/settings",
      icon: Settings,
    },
  ];

  // Determinar item activo (Svelte 5 reactive)
  let activeUrl = $derived($page.url.pathname);
  
  function isActive(url: string): boolean {
    if (url === '/dashboard') {
      return activeUrl === '/dashboard';
    }
    return activeUrl.startsWith(url);
  }

  function navigateTo(url: string) {
    goto(url);
    open = false; // Cerrar en mobile
  }

  async function handleLogout() {
    await goto('/auth/logout');
  }
</script>

<!-- Overlay para mobile -->
{#if open}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div 
    class="fixed inset-0 bg-black/50 z-40 lg:hidden" 
    onclick={() => open = false}
  ></div>
{/if}

<!-- Sidebar -->
<aside 
  class="fixed lg:static inset-y-0 left-0 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-50 {
    open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
  }"
>
  <!-- Header -->
  <div class="flex items-center justify-between p-4 border-b border-gray-200">
    <div class="flex items-center gap-2">
      <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-green-500">
        <Brain class="h-4 w-4 text-white" />
      </div>
      <div class="grid flex-1 text-left text-sm leading-tight">
        <span class="truncate font-semibold">PsyBooking</span>
        <span class="truncate text-xs text-gray-500">Dashboard</span>
      </div>
    </div>
    
    <!-- Close button para mobile -->
    <Button 
      variant="ghost" 
      size="icon" 
      class="lg:hidden"
      onclick={() => open = false}
    >
      <X class="h-4 w-4" />
    </Button>
  </div>

  <!-- Navigation -->
  <nav class="flex-1 p-4">
    <div class="space-y-2">
      <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
        Navegación Principal
      </p>
      {#each navigationItems as item}
        <Button
          variant="ghost"
          class="w-full justify-start h-10 {
            isActive(item.url) 
              ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500' 
              : 'text-gray-700 hover:bg-gray-50'
          }"
          onclick={() => navigateTo(item.url)}
        >
          <!-- svelte-ignore svelte_component_deprecated -->
          <svelte:component this={item.icon} class="mr-3 h-4 w-4" />
          {item.title}
        </Button>
      {/each}
    </div>
  </nav>

  <!-- User Menu -->
  <div class="p-4 border-t border-gray-200">
    <DropdownMenu>
      <DropdownMenuTrigger>
        {#snippet child({ props })}
          <Button
            {...props}
            variant="ghost"
            class="w-full justify-start p-2 h-auto"
          >
          <Avatar class="h-8 w-8 rounded-lg">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback class="rounded-lg bg-blue-100 text-blue-600">
              {user.initials}
            </AvatarFallback>
          </Avatar>
          <div class="ml-3 grid flex-1 text-left text-sm leading-tight">
            <span class="truncate font-semibold">{user.name}</span>
            <span class="truncate text-xs text-gray-500">{user.specialty}</span>
                      </div>
          </Button>
        {/snippet}
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-56" align="end" side="top">
        <DropdownMenuItem onclick={() => navigateTo('/dashboard/settings/profile')}>
          <User class="mr-2 h-4 w-4" />
          Mi Perfil
        </DropdownMenuItem>
        <DropdownMenuItem onclick={() => navigateTo('/dashboard/settings')}>
          <Settings class="mr-2 h-4 w-4" />
          Configuración
        </DropdownMenuItem>
        <DropdownMenuItem onclick={() => navigateTo('/dashboard/settings/notifications')}>
          <Bell class="mr-2 h-4 w-4" />
          Notificaciones
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onclick={handleLogout}>
          <LogOut class="mr-2 h-4 w-4" />
          Cerrar Sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</aside>