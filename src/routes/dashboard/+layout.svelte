<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import DashboardSidebar from '$lib/components/dashboard/DashboardSidebar.svelte';
  import DashboardHeader from '$lib/components/dashboard/DashboardHeader.svelte';

  let { data, children } = $props();
  
  // Estado para sidebar mobile
  let sidebarOpen = $state(false);
</script>

<!-- Fondo con degradado sutil como la landing -->
<div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
  <div class="flex h-screen">
    <!-- Sidebar -->
    <DashboardSidebar bind:open={sidebarOpen} user={data?.user || {
      name: 'Usuario',
      specialty: 'Psicólogo', 
      avatar: null,
      initials: 'U'
    }} />
    
    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Header -->
      <DashboardHeader bind:sidebarOpen user={data.user} />
      
      <!-- Page Content -->
      <main class="flex-1 overflow-y-auto">
        <div class="p-6">
          {@render children()}
        </div>
      </main>
    </div>
  </div>
</div>