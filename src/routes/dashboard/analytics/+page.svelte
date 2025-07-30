<!-- src/routes/dashboard/analytics/+page.svelte -->
<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
  import StatsCard from '$lib/components/dashboard/StatsCard.svelte';
  import RevenueChart from '$lib/components/dashboard/RevenueChart.svelte';
  import ClientAnalytics from '$lib/components/dashboard/ClientAnalytics.svelte';
  import SeasonalTrends from '$lib/components/dashboard/SeasonalTrends.svelte';
  import BusinessForecasting from '$lib/components/dashboard/BusinessForecasting.svelte';
  import PerformanceKPIs from '$lib/components/dashboard/PerformanceKPIs.svelte';
  import ExportReports from '$lib/components/dashboard/ExportReports.svelte';
  import {
    BarChart3,
    TrendingUp,
    Users,
    Euro,
    Calendar,
    Target,
    Download,
    Filter,
    Zap,
    Award,
    Clock,
    Brain
  } from 'lucide-svelte';

  interface BusinessMetrics {
    totalRevenue: number;
    monthlyGrowth: number;
    clientRetention: number;
    avgSessionValue: number;
    totalClients: number;
    newClients: number;
    totalSessions: number;
    hoursWorked: number;
    revenuePerHour: number;
    conversionRate: number;
  }

  interface MonthlyData {
    month: string;
    revenue: number;
    sessions: number;
    clients: number;
    newClients: number;
    avgSessionValue: number;
  }

  let { data } = $props();

  // Estado de filtros
  let selectedPeriod = $state('year');
  let selectedMetric = $state('revenue');
  let activeTab = $state('overview');

  const periods = [
    { id: '3months', label: '3 Meses' },
    { id: '6months', label: '6 Meses' },
    { id: 'year', label: '1 Año' },
    { id: 'all', label: 'Todo el tiempo' }
  ];

  // Datos simulados para análisis estratégico
  const businessMetrics: BusinessMetrics = {
    totalRevenue: 28450,
    monthlyGrowth: 15.2,
    clientRetention: 87,
    avgSessionValue: 62,
    totalClients: 89,
    newClients: 12,
    totalSessions: 458,
    hoursWorked: 382,
    revenuePerHour: 74,
    conversionRate: 82
  };

  const monthlyData: MonthlyData[] = [
    { month: 'Jul 2024', revenue: 1850, sessions: 32, clients: 45, newClients: 8, avgSessionValue: 58 },
    { month: 'Ago 2024', revenue: 2120, sessions: 38, clients: 52, newClients: 7, avgSessionValue: 56 },
    { month: 'Sep 2024', revenue: 2380, sessions: 42, clients: 58, newClients: 6, avgSessionValue: 57 },
    { month: 'Oct 2024', revenue: 2650, sessions: 45, clients: 63, newClients: 5, avgSessionValue: 59 },
    { month: 'Nov 2024', revenue: 2890, sessions: 48, clients: 68, newClients: 5, avgSessionValue: 60 },
    { month: 'Dic 2024', revenue: 2240, sessions: 38, clients: 65, newClients: 2, avgSessionValue: 59 },
    { month: 'Ene 2025', revenue: 3150, sessions: 52, clients: 72, newClients: 7, avgSessionValue: 61 },
    { month: 'Feb 2025', revenue: 3420, sessions: 56, clients: 78, newClients: 6, avgSessionValue: 61 },
    { month: 'Mar 2025', revenue: 3680, sessions: 58, clients: 83, newClients: 5, avgSessionValue: 63 },
    { month: 'Abr 2025', revenue: 3920, sessions: 62, clients: 89, newClients: 6, avgSessionValue: 63 },
    { month: 'May 2025', revenue: 4180, sessions: 65, clients: 89, newClients: 0, avgSessionValue: 64 },
    { month: 'Jun 2025', revenue: 4380, sessions: 68, clients: 89, newClients: 0, avgSessionValue: 64 }
  ];

  // ✅ KPIs estratégicos - CORREGIDO con 'as const'
  const strategicKPIs = [
    {
      category: 'Crecimiento',
      metrics: [
        { name: 'Crecimiento mensual', value: '+15.2%', status: 'excellent' as const, target: '10%' },
        { name: 'Nuevos clientes/mes', value: '5.8', status: 'good' as const, target: '5' },
        { name: 'Expansión de ingresos', value: '+24%', status: 'excellent' as const, target: '15%' }
      ]
    },
    {
      category: 'Retención',
      metrics: [
        { name: 'Tasa de retención', value: '87%', status: 'excellent' as const, target: '80%' },
        { name: 'Valor de vida cliente', value: '€1,240', status: 'good' as const, target: '€1,000' },
        { name: 'Frecuencia sesiones', value: '5.1/mes', status: 'good' as const, target: '4/mes' }
      ]
    },
    {
      category: 'Eficiencia',
      metrics: [
        { name: 'Ingresos por hora', value: '€74', status: 'excellent' as const, target: '€65' },
        { name: 'Utilización tiempo', value: '89%', status: 'excellent' as const, target: '80%' },
        { name: 'Conversión consultas', value: '82%', status: 'excellent' as const, target: '75%' }
      ]
    }
  ];

  // Insights estratégicos
  const strategicInsights = [
    {
      type: 'growth',
      priority: 'high',
      title: 'Crecimiento Acelerado',
      description: 'Tus ingresos han crecido 54% en los últimos 6 meses, superando objetivos.',
      impact: 'Alto',
      recommendation: 'Considera expandir horarios o aumentar tarifas',
      action: 'Planificar expansión'
    },
    {
      type: 'seasonal',
      priority: 'medium',
      title: 'Patrón Estacional Detectado',
      description: 'Diciembre muestra caída del 22% histórica. Planifica estrategias.',
      impact: 'Medio',
      recommendation: 'Crear promociones navideñas o servicios especiales',
      action: 'Preparar campaña'
    },
    {
      type: 'retention',
      priority: 'high',
      title: 'Excelente Retención',
      description: 'Tu retención del 87% está en el top 10% del sector.',
      impact: 'Alto',
      recommendation: 'Mantener calidad y considerar programas de fidelización',
      action: 'Mantener estrategia'
    },
    {
      type: 'efficiency',
      priority: 'medium',
      title: 'Optimización de Horarios',
      description: 'Martes y miércoles tienen 15% menos ocupación que otros días.',
      impact: 'Medio',
      recommendation: 'Promocionar estos días o reservar para tareas administrativas',
      action: 'Ajustar oferta'
    }
  ];

  // Proyecciones futuras
  const projections = {
    nextMonth: {
      revenue: 4650,
      sessions: 72,
      confidence: 85
    },
    next3Months: {
      revenue: 14200,
      sessions: 218,
      confidence: 78
    },
    nextYear: {
      revenue: 58400,
      sessions: 892,
      confidence: 65
    }
  };

  // Funciones
  function handleExportReport(type: string) {
    alert(`Exportando reporte ${type}:\n\n• Formato: PDF\n• Datos: ${selectedPeriod}\n• Métricas: Completas\n• Se descargará en unos segundos...`);
  }

  function handleOptimizeMetric(metric: string) {
    alert(`Optimizando ${metric}:\n\n• Análisis de tendencias\n• Recomendaciones personalizadas\n• Plan de acción\n• Seguimiento automático`);
  }

  function handleSetTarget(kpi: string) {
    alert(`Configurar objetivo para ${kpi}:\n\n• Valor actual analizado\n• Benchmark del sector\n• Meta recomendada\n• Timeline de seguimiento`);
  }

  function getStatusColor(status: string) {
    const colors = {
      excellent: 'bg-green-100 text-green-700 border-green-300',
      good: 'bg-blue-100 text-blue-700 border-blue-300',
      warning: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      poor: 'bg-red-100 text-red-700 border-red-300'
    };
    return colors[status as keyof typeof colors] || colors.good;
  }

  function getPriorityColor(priority: string) {
    const colors = {
      high: 'bg-red-100 text-red-700',
      medium: 'bg-yellow-100 text-yellow-700',
      low: 'bg-green-100 text-green-700'
    };
    return colors[priority as keyof typeof colors] || colors.medium;
  }
</script>

<svelte:head>
  <title>Analytics - Dashboard PsyBooking</title>
</svelte:head>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Analytics Estratégico</h1>
      <p class="text-gray-600">Análisis profundo del rendimiento de tu negocio</p>
    </div>
    <div class="flex items-center space-x-2">
      <!-- Filtro de período -->
      <div class="flex items-center space-x-1 bg-gray-100 p-1 rounded-lg">
        {#each periods as period}
          <button
            class="px-3 py-1 text-sm font-medium rounded-md transition-colors {
              selectedPeriod === period.id 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }"
            onclick={() => selectedPeriod = period.id}
          >
            {period.label}
          </button>
        {/each}
      </div>
      
      <Button variant="outline" onclick={() => handleExportReport('completo')}>
        <Download class="mr-2 h-4 w-4" />
        Exportar
      </Button>
    </div>
  </div>

  <!-- KPIs Principales -->
  <div class="grid gap-4 md:grid-cols-5">
    <StatsCard 
      title="Ingresos Totales"
      value={`€${businessMetrics.totalRevenue.toLocaleString()}`}
      change={`+${businessMetrics.monthlyGrowth}%`}
      changeType="positive"
      icon={Euro}
      valueColor="green"
    />
    <StatsCard 
      title="Crecimiento Mensual"
      value={`${businessMetrics.monthlyGrowth}%`}
      change="vs mes anterior"
      changeType="positive"
      icon={TrendingUp}
      valueColor="green"
    />
    <StatsCard 
      title="Total Clientes"
      value={businessMetrics.totalClients}
      change={`+${businessMetrics.newClients} este mes`}
      changeType="positive"
      icon={Users}
      valueColor="blue"
    />
    <StatsCard 
      title="Retención"
      value={`${businessMetrics.clientRetention}%`}
      change="Excelente"
      changeType="positive"
      icon={Award}
      valueColor="green"
    />
    <StatsCard 
      title="€/Hora"
      value={`€${businessMetrics.revenuePerHour}`}
      change={`${businessMetrics.hoursWorked}h trabajadas`}
      changeType="neutral"
      icon={Clock}
      valueColor="purple"
    />
  </div>

  <!-- Tabs de Analytics -->
  <Tabs bind:value={activeTab}>
    <TabsList class="grid w-full grid-cols-5">
      <TabsTrigger value="overview">Resumen</TabsTrigger>
      <TabsTrigger value="revenue">Ingresos</TabsTrigger>
      <TabsTrigger value="clients">Clientes</TabsTrigger>
      <TabsTrigger value="trends">Tendencias</TabsTrigger>
      <TabsTrigger value="forecasting">Proyecciones</TabsTrigger>
    </TabsList>

    <!-- Tab: Resumen General -->
    <TabsContent value="overview" class="space-y-6">
      <!-- Revenue Chart -->
      <RevenueChart {monthlyData} {selectedPeriod} />

      <!-- Strategic KPIs -->
      <PerformanceKPIs {strategicKPIs} onOptimize={handleOptimizeMetric} onSetTarget={handleSetTarget} />

      <!-- Insights Estratégicos -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2 text-2xl">
            <Brain class="h-5 w-5" />
            Insights Estratégicos
          </CardTitle>
          <CardDescription>Análisis automático del rendimiento de tu negocio</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          {#each strategicInsights as insight}
            <div class="p-4 border rounded-lg">
              <div class="flex items-start justify-between mb-3">
                <div class="flex items-center space-x-3">
                  <Badge class={getPriorityColor(insight.priority)}>
                    {insight.priority === 'high' ? 'Alta' : insight.priority === 'medium' ? 'Media' : 'Baja'} Prioridad
                  </Badge>
                  <span class="text-sm text-gray-600">Impacto: {insight.impact}</span>
                </div>
                <Button size="sm" variant="outline" onclick={() => handleOptimizeMetric(insight.title)}>
                  <Zap class="mr-2 h-3 w-3" />
                  Actuar
                </Button>
              </div>
              
              <h4 class="font-semibold text-gray-900 mb-2">{insight.title}</h4>
              <p class="text-gray-700 text-sm mb-2">{insight.description}</p>
              <p class="text-blue-700 text-sm font-medium">💡 {insight.recommendation}</p>
            </div>
          {/each}
        </CardContent>
      </Card>
    </TabsContent>

    <!-- Tab: Análisis de Ingresos -->
    <TabsContent value="revenue" class="space-y-6">
      <RevenueChart {monthlyData} {selectedPeriod} detailed={true} />
      
      <div class="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Desglose de Ingresos</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div class="flex justify-between items-center p-3 bg-blue-50 rounded">
                <span>Terapia Individual (68%)</span>
                <span class="font-bold">€19,346</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-green-50 rounded">
                <span>Terapia de Pareja (22%)</span>
                <span class="font-bold">€6,259</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-yellow-50 rounded">
                <span>Primeras Consultas (10%)</span>
                <span class="font-bold">€2,845</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Métricas de Ingresos</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="flex justify-between">
              <span class="text-gray-600">Ingreso promedio/cliente:</span>
              <span class="font-bold">€319</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Valor de vida cliente:</span>
              <span class="font-bold">€1,240</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Ticket medio por sesión:</span>
              <span class="font-bold">€62</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Crecimiento YoY:</span>
              <span class="font-bold text-green-600">+127%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </TabsContent>

    <!-- Tab: Análisis de Clientes -->
    <TabsContent value="clients" class="space-y-6">
      <ClientAnalytics {monthlyData} {businessMetrics} />
    </TabsContent>

    <!-- Tab: Tendencias Estacionales -->
    <TabsContent value="trends" class="space-y-6">
      <SeasonalTrends {monthlyData} />
    </TabsContent>

    <!-- Tab: Proyecciones -->
    <TabsContent value="forecasting" class="space-y-6">
      <BusinessForecasting {projections} {monthlyData} />
    </TabsContent>
  </Tabs>

  <!-- Export Reports -->
  <ExportReports onExport={handleExportReport} {selectedPeriod} />
</div>