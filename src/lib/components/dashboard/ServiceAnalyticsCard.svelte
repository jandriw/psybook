<!-- src/lib/components/dashboard/ServiceAnalyticsCard.svelte -->
<script lang="ts">
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { Progress } from '$lib/components/ui/progress';
  import {
    Euro,
    Clock,
    TrendingUp,
    TrendingDown,
    Minus,
    Users,
    Star,
    Settings,
    BarChart3,
    Target,
    Zap
  } from 'lucide-svelte';

  interface Service {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: number;
    active: boolean;
    color: string;
    sessions: number;
    revenue: number;
    occupancyRate: number;
    avgSessionsPerClient: number;
    conversionRate: number | null;
    monthlyTrend: string;
    trendType: 'positive' | 'negative' | 'neutral';
    weeklyBookings: number[];
    clientSatisfaction: number;
  }

  let { 
    service,
    onConfigure = () => {},
    onViewDetails = () => {},
    onOptimize = () => {},
    onPromote = () => {}
  }: {
    service: Service;
    onConfigure?: (service: Service) => void;
    onViewDetails?: (service: Service) => void;
    onOptimize?: (service: Service) => void;
    onPromote?: (service: Service) => void;
  } = $props();

  // Computadas
  let revenuePerHour = $derived(Math.round((service.revenue / service.sessions) / (service.duration / 60)));
  let occupancyColor = $derived(
    service.occupancyRate >= 80 ? 'text-green-600' : 
    service.occupancyRate >= 60 ? 'text-yellow-600' : 'text-red-600'
  );
  let trendIcon = $derived(
    service.trendType === 'positive' ? TrendingUp :
    service.trendType === 'negative' ? TrendingDown : Minus
  );
  let trendColor = $derived(
    service.trendType === 'positive' ? 'text-green-600' :
    service.trendType === 'negative' ? 'text-red-600' : 'text-gray-600'
  );

  function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(amount);
  }

  function getProgressColor(rate: number): string {
    if (rate >= 80) return 'bg-green-500';
    if (rate >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  }
</script>

<Card class="hover:shadow-md transition-shadow">
  <CardHeader class="pb-3">
    <div class="flex items-start justify-between">
      <div class="flex items-center space-x-3">
        <div 
          class="w-3 h-8 rounded-full" 
          style="background-color: {service.color};"
        ></div>
        <div>
          <CardTitle class="text-lg">{service.name}</CardTitle>
          <p class="text-sm text-gray-600">{service.description}</p>
        </div>
      </div>
      
      <div class="flex items-center space-x-1">
        {#if service.conversionRate}
          <Badge class="bg-blue-100 text-blue-700">
            {service.conversionRate}% conversión
          </Badge>
        {/if}
        <Badge variant="outline" class={service.active ? 'border-green-200 text-green-700' : 'border-gray-200'}>
          {service.active ? 'Activo' : 'Inactivo'}
        </Badge>
      </div>
    </div>
  </CardHeader>

  <CardContent class="space-y-4">
    <!-- Métricas principales -->
    <div class="grid grid-cols-2 gap-4">
      <div class="text-center p-3 bg-gray-50 rounded-lg">
        <div class="text-2xl font-bold text-gray-900">{service.sessions}</div>
        <div class="text-xs text-gray-600">Sesiones</div>
      </div>
      <div class="text-center p-3 bg-green-50 rounded-lg">
        <div class="text-2xl font-bold text-green-600">{formatCurrency(service.revenue)}</div>
        <div class="text-xs text-green-800">Ingresos</div>
      </div>
    </div>

    <!-- Ocupación -->
    <div class="space-y-2">
      <div class="flex items-center justify-between text-sm">
        <span class="text-gray-600">Ocupación</span>
        <span class={occupancyColor + ' font-medium'}>{service.occupancyRate}%</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div 
          class={`h-2 rounded-full transition-all duration-300 ${getProgressColor(service.occupancyRate)}`}
          style="width: {service.occupancyRate}%"
        ></div>
      </div>
    </div>

    <!-- Métricas detalladas -->
    <div class="grid grid-cols-2 gap-4 text-sm">
      <div class="flex items-center space-x-2">
        <Euro class="h-4 w-4 text-gray-400" />
        <div>
          <div class="font-medium">{service.price}€</div>
          <div class="text-xs text-gray-500">Por sesión</div>
        </div>
      </div>
      
      <div class="flex items-center space-x-2">
        <Clock class="h-4 w-4 text-gray-400" />
        <div>
          <div class="font-medium">{service.duration} min</div>
          <div class="text-xs text-gray-500">Duración</div>
        </div>
      </div>

      <div class="flex items-center space-x-2">
        <Users class="h-4 w-4 text-gray-400" />
        <div>
          <div class="font-medium">{service.avgSessionsPerClient}</div>
          <div class="text-xs text-gray-500">Sesiones/cliente</div>
        </div>
      </div>

      <div class="flex items-center space-x-2">
        <Star class="h-4 w-4 text-gray-400" />
        <div>
          <div class="font-medium">{service.clientSatisfaction}</div>
          <div class="text-xs text-gray-500">Satisfacción</div>
        </div>
      </div>
    </div>

    <!-- Tendencia mensual -->
    <div class="flex items-center justify-between p-2 bg-gray-50 rounded">
      <span class="text-sm text-gray-600">Tendencia mensual</span>
      <div class="flex items-center space-x-1">
        <!-- svelte-ignore svelte_component_deprecated -->
        <svelte:component this={trendIcon} class="h-4 w-4 {trendColor}" />
        <span class="text-sm font-medium {trendColor}">{service.monthlyTrend}</span>
      </div>
    </div>

    <!-- Métricas adicionales -->
    <div class="text-xs text-gray-500 space-y-1">
      <div class="flex justify-between">
        <span>Ingresos/hora:</span>
        <span class="font-medium">{revenuePerHour}€</span>
      </div>
      <div class="flex justify-between">
        <span>Reservas semanales:</span>
        <span class="font-medium">{service.weeklyBookings.reduce((a, b) => a + b, 0)}</span>
      </div>
    </div>

    <!-- Acciones -->
    <div class="grid grid-cols-2 gap-2 pt-2 border-t">
      <Button 
        variant="outline" 
        size="sm" 
        onclick={() => onViewDetails(service)}
        class="bg-transparent"
      >
        <BarChart3 class="mr-2 h-3 w-3" />
        Detalles
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        onclick={() => onConfigure(service)}
        class="bg-transparent"
      >
        <Settings class="mr-2 h-3 w-3" />
        Configurar
      </Button>
      
      {#if service.occupancyRate < 70}
        <Button 
          variant="outline" 
          size="sm" 
          onclick={() => onPromote(service)}
          class="bg-transparent text-blue-600 border-blue-200 hover:bg-blue-50 col-span-2"
        >
          <Zap class="mr-2 h-3 w-3" />
          Promocionar Servicio
        </Button>
      {:else if service.occupancyRate >= 90}
        <Button 
          variant="outline" 
          size="sm" 
          onclick={() => onOptimize(service)}
          class="bg-transparent text-green-600 border-green-200 hover:bg-green-50 col-span-2"
        >
          <Target class="mr-2 h-3 w-3" />
          Optimizar Capacidad
        </Button>
      {/if}
    </div>
  </CardContent>
</Card>