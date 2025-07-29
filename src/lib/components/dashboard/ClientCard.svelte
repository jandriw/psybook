<script lang="ts">
  import { Card, CardContent } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
  import ClientStatusBadge from './ClientStatusBadge.svelte';
  import {
    User,
    Mail,
    Phone,
    Calendar,
    MessageSquare,
    FileText,
    Eye,
    Edit,
    MoreHorizontal
  } from 'lucide-svelte';

  let { 
    client,
    onViewProfile = () => {},
    onEditClient = () => {},
    onCallClient = () => {},
    onMessageClient = () => {},
    onViewNotes = () => {}
  } = $props();

  function getInitials(name: string): string {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  function formatLastSession(date: string): string {
    const sessionDate = new Date(date);
    const now = new Date();
    const diffTime = now.getTime() - sessionDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
    return `Hace ${Math.floor(diffDays / 30)} meses`;
  }
</script>

<Card class="hover:shadow-md transition-shadow">
  <CardContent class="px-6">
    <div class="flex items-start justify-between">
      <!-- Info principal -->
      <div class="flex items-start space-x-4 flex-1">
        <!-- Avatar -->
        <Avatar class="h-12 w-12">
          <AvatarImage src={client.avatar} alt={client.name} />
          <AvatarFallback class="bg-blue-100 text-blue-600">
            {getInitials(client.name)}
          </AvatarFallback>
        </Avatar>

        <!-- Datos del cliente -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center space-x-2 mb-2">
            <h3 class="text-lg font-semibold text-gray-900 truncate">
              {client.name}
            </h3>
            <ClientStatusBadge status={client.status} />
          </div>

          <!-- Información de contacto -->
          <div class="space-y-1 text-sm text-gray-600">
            <div class="flex items-center space-x-2">
              <Mail class="h-3 w-3" />
              <span class="truncate">{client.email}</span>
            </div>
            <div class="flex items-center space-x-2">
              <Phone class="h-3 w-3" />
              <span>{client.phone}</span>
            </div>
          </div>

          <!-- Estadísticas -->
          <div class="flex items-center space-x-4 mt-3 text-xs text-gray-500">
            <span class="flex items-center space-x-1">
              <Calendar class="h-3 w-3" />
              <span>{client.totalSessions} sesiones</span>
            </span>
            {#if client.lastSession}
              <span>
                Última: {formatLastSession(client.lastSession)}
              </span>
            {/if}
            <span>
              Cliente desde {new Date(client.createdAt).toLocaleDateString('es-ES', { 
                month: 'short', 
                year: 'numeric' 
              })}
            </span>
          </div>

          <!-- Notas rápidas -->
          {#if client.quickNotes}
            <div class="mt-2">
              <p class="text-sm text-gray-700 line-clamp-2">{client.quickNotes}</p>
            </div>
          {/if}
        </div>
      </div>

      <!-- Acciones -->
      <div class="flex items-center space-x-2 ml-4">
        <!-- Llamar -->
        <Button
          variant="outline"
          size="sm"
          onclick={() => onCallClient(client.phone)}
          title="Llamar"
        >
          <Phone class="h-4 w-4" />
        </Button>

        <!-- WhatsApp -->
        <Button
          variant="outline"
          size="sm"
          onclick={() => onMessageClient(client.phone)}
          title="WhatsApp"
        >
          <MessageSquare class="h-4 w-4" />
        </Button>

        <!-- Ver notas -->
        <Button
          variant="outline"
          size="sm"
          onclick={() => onViewNotes(client.id)}
          title="Ver notas"
        >
          <FileText class="h-4 w-4" />
        </Button>

        <!-- Ver perfil -->
        <Button
          variant="outline"
          size="sm"
          onclick={() => onViewProfile(client.id)}
          title="Ver perfil completo"
        >
          <Eye class="h-4 w-4" />
        </Button>
      </div>
    </div>
  </CardContent>
</Card>