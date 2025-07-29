<!-- src/routes/dashboard/services/+page.svelte -->
<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { Progress } from '$lib/components/ui/progress';
  import StatsCard from '$lib/components/dashboard/StatsCard.svelte';
  import ServiceAnalyticsCard from '$lib/components/dashboard/ServiceAnalyticsCard.svelte';
  import ServicesPerformanceChart from '$lib/components/dashboard/ServicesPerformanceChart.svelte';
  import InsightsPanel from '$lib/components/dashboard/InsightsPanel.svelte';
  import ServiceDetailsModal from '$lib/components/dashboard/ServiceDetailsModal.svelte';
  import {
    Stethoscope,
    TrendingUp,
    Euro,
    Clock,
    Users,
    Settings,
    BarChart3,
    Target,
    Award,
    Plus,
    ExternalLink
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

  interface Insight {
    type: 'success' | 'warning' | 'info' | 'tip';
    title: string;
    message: string;
    action: string;
  }

  let { data } = $props();

  // Estado para modal de detalles
  let showDetailsModal = $state(false);
  let selectedService = $state<Service | null>(null);

  // Datos hardcodeados para desarrollo
  const services: Service[] = [
    {
      id: '1',
      name: 'Terapia Individual',
      description: 'Sesión estándar personalizada',
      price: 60,
      duration: 50,
      active: true,
      color: '#3b82f6',
      sessions: 42,
      revenue: 2520,
      occupancyRate: 85,
      avgSessionsPerClient: 8.4,
      conversionRate: null,
      monthlyTrend: '+12%',
      trendType: 'positive',
      weeklyBookings: [5, 7, 6, 8, 9, 7, 6],
      clientSatisfaction: 4.8
    },
    {
      id: '2',
      name: 'Terapia de Pareja',
      description: 'Sesión conjunta para parejas',
      price: 75,
      duration: 60,
      active: true,
      color: '#10b981',
      sessions: 18,
      revenue: 1350,
      occupancyRate: 60,
      avgSessionsPerClient: 6.0,
      conversionRate: null,
      monthlyTrend: '-8%',
      trendType: 'negative',
      weeklyBookings: [2, 3, 2, 3, 4, 2, 2],
      clientSatisfaction: 4.6
    },
    {
      id: '3',
      name: 'Primera Consulta',
      description: 'Evaluación inicial y plan personalizado',
      price: 45,
      duration: 45,
      active: true,
      color: '#f59e0b',
      sessions: 25,
      revenue: 1125,
      occupancyRate: 100, // Siempre se llenan
      avgSessionsPerClient: 1.0,
      conversionRate: 80, // 80% pasan a terapia regular
      monthlyTrend: '+25%',
      trendType: 'positive',
      weeklyBookings: [3, 4, 3, 5, 6, 4, 3],
      clientSatisfaction: 4.9
    },
    {
      id: '4',
      name: 'Sesión de Seguimiento',
      description: 'Seguimiento post-tratamiento',
      price: 50,
      duration: 30,
      active: true,
      color: '#8b5cf6',
      sessions: 12,
      revenue: 600,
      occupancyRate: 40,
      avgSessionsPerClient: 2.4,
      conversionRate: null,
      monthlyTrend: '+5%',
      trendType: 'neutral',
      weeklyBookings: [1, 2, 1, 2, 3, 2, 1],
      clientSatisfaction: 4.7
    }
  ];

  // Estadísticas globales computadas
  let totalServices = $derived(services.filter(s => s.active).length);
  let totalSessions = $derived(services.reduce((sum, s) => sum + s.sessions, 0));
  let totalRevenue = $derived(services.reduce((sum, s) => sum + s.revenue, 0));
  let avgPrice = $derived(Math.round(totalRevenue / totalSessions));
  let topService = $derived(
    services.reduce((top, service) => 
      service.revenue > top.revenue ? service : top
    )
  );

  // Insights automáticos
  let insights = $derived<Insight[]>([
    {
      type: 'success',
      title: 'Servicio Estrella',
      message: `${topService.name} genera el ${Math.round((topService.revenue / totalRevenue) * 100)}% de tus ingresos`,
      action: 'Mantener calidad'
    },
    {
      type: 'warning', 
      title: 'Oportunidad de Mejora',
      message: 'Terapia de Pareja tiene baja ocupación (60%). Considera promoción especial',
      action: 'Optimizar precio'
    },
    {
      type: 'info',
      title: 'Conversión Excelente',
      message: '80% de primeras consultas se convierten en terapia regular',
      action: 'Aumentar slots'
    },
    {
      type: 'success',
      title: 'Tendencia Positiva',
      message: 'Crecimiento general del 12% en servicios principales',
      action: 'Continuar estrategia'
    }
  ]);

  // Funciones
  function handleConfigureServices() {
    window.location.href = '/settings/services';
  }

  function handleNewService() {
    window.location.href = '/settings/services';
  }

  function showServiceDetails(service: Service) {
    selectedService = service;
    showDetailsModal = true;
  }

  function handleOptimizeService(service: Service) {
    alert(`Optimizando ${service.name}:\n\n• Considera ajustar precio\n• Revisar horarios disponibles\n• Promocionar en redes sociales`);
  }

  function handlePromoteService(service: Service) {
    alert(`Ideas para promocionar ${service.name}:\n\n• Descuento primera sesión\n• Pack de sesiones\n• Promoción en redes sociales\n• Referidos de clientes actuales`);
  }
</script>

<svelte:head>
  <title>Servicios - Dashboard PsyBooking</title>
</svelte:head>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Análisis de Servicios</h1>
      <p class="text-gray-600">Rendimiento operacional de tus tipos de terapia</p>
    </div>
    <div class="flex items-center space-x-2">
      <Button variant="outline" onclick={handleConfigureServices}>
        <Settings class="mr-2 h-4 w-4" />
        Configurar Servicios
      </Button>
      <Button class="bg-blue-600 hover:bg-blue-700" onclick={handleNewService}>
        <Plus class="mr-2 h-4 w-4" />
        Nuevo Servicio
      </Button>
    </div>
  </div>

  <!-- Stats Cards -->
  <div class="grid gap-4 md:grid-cols-4">
    <StatsCard 
      title="Servicios Activos"
      value={totalServices}
      change=null
      icon={Stethoscope}
      valueColor="blue"
    />
    <StatsCard 
      title="Servicio Top"
      value={topService.name}
      change={`${Math.round((topService.revenue / totalRevenue) * 100)}% ingresos`}
      changeType="positive"
      icon={Award}
      valueColor="green"
    />
    <StatsCard 
      title="Precio Promedio"
      value={`${avgPrice}€`}
      change="Por sesión"
      changeType="neutral"
      icon={Euro}
      valueColor="green"
    />
    <StatsCard 
      title="Ingresos Servicios"
      value={`${totalRevenue.toLocaleString()}€`}
      change="+15% vs mes anterior"
      changeType="positive"
      icon={TrendingUp}
      valueColor="green"
    />
  </div>

  <!-- Performance Chart -->
  <ServicesPerformanceChart {services} />

  <!-- Services Analytics Cards -->
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-semibold text-gray-900">Rendimiento por Servicio</h2>
      <div class="text-sm text-gray-600">
        Total: {totalSessions} sesiones • {totalRevenue.toLocaleString()}€ facturados
      </div>
    </div>

    <div class="grid gap-4 lg:grid-cols-2">
      {#each services as service}
        <ServiceAnalyticsCard 
          {service}
          onConfigure={(s) => handleConfigureServices()}
          onViewDetails={(s) => showServiceDetails(s)}
          onOptimize={(s) => handleOptimizeService(s)}
          onPromote={(s) => handlePromoteService(s)}
        />
      {/each}
    </div>
  </div>

  <!-- Insights Panel -->
  <InsightsPanel {insights} />

  <!-- Quick Actions -->
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center gap-2 text-2xl">
        <Target class="h-5 w-5" />
        Acciones Recomendadas
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div class="grid gap-4 md:grid-cols-2">
        <div class="space-y-3">
          <h4 class="font-medium text-gray-900">Optimizaciones Inmediatas</h4>
          <div class="space-y-2">
            <Button variant="outline" class="w-full justify-start" onclick={() => handlePromoteService(services[1])}>
              <TrendingUp class="mr-2 h-4 w-4" />
              Promocionar Terapia de Pareja
            </Button>
            <Button variant="outline" class="w-full justify-start" onclick={() => showServiceDetails(services[0])}>
              <BarChart3 class="mr-2 h-4 w-4" />
              Analizar Terapia Individual
            </Button>
            <Button variant="outline" class="w-full justify-start" onclick={() => handleOptimizeService(services[2])}>
              <Users class="mr-2 h-4 w-4" />
              Más Slots Primera Consulta
            </Button>
          </div>
        </div>
        
        <div class="space-y-3">
          <h4 class="font-medium text-gray-900">Configuración</h4>
          <div class="space-y-2">
            <Button variant="outline" class="w-full justify-start" onclick={handleConfigureServices}>
              <Settings class="mr-2 h-4 w-4" />
              Ajustar Precios y Servicios
            </Button>
            <Button variant="outline" class="w-full justify-start" onclick={handleNewService}>
              <Plus class="mr-2 h-4 w-4" />
              Crear Nuevo Servicio
            </Button>
            <Button variant="outline" class="w-full justify-start" onclick={() => window.location.href = '/dashboard/availability'}>
              <Clock class="mr-2 h-4 w-4" />
              Gestionar Horarios
            </Button>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>

  <!-- Performance Summary -->
  <Card class="border-green-200 bg-green-50">
    <CardContent class="p-6">
      <div class="flex items-start justify-between">
        <div>
          <h3 class="font-medium text-green-900 mb-2">Resumen del Rendimiento</h3>
          <div class="space-y-1 text-sm text-green-800">
            <p>• <strong>{totalSessions} sesiones</strong> realizadas este mes (+18% vs anterior)</p>
            <p>• <strong>{totalRevenue.toLocaleString()}€ facturados</strong> con servicios (+15% vs anterior)</p>
            <p>• <strong>{topService.name}</strong> es tu servicio más exitoso</p>
            <p>• <strong>Prima Consulta</strong> tiene excelente conversión (80%)</p>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <TrendingUp class="h-5 w-5 text-green-600" />
          <span class="text-sm font-medium text-green-800">Crecimiento Sostenido</span>
        </div>
      </div>
    </CardContent>
  </Card>
</div>

<!-- Modal de Detalles -->
<ServiceDetailsModal 
  bind:open={showDetailsModal}
  service={selectedService}
/>