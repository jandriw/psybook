<!-- src/lib/components/dashboard/ServicesPerformanceChart.svelte -->
<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Button } from '$lib/components/ui/button';
  import { BarChart3, TrendingUp, Calendar } from 'lucide-svelte';

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

  let { services }: { services: Service[] } = $props();

  // Estado para período seleccionado
  type PeriodType = 'week' | 'month' | 'quarter';
  let selectedPeriod = $state<PeriodType>('week');

  const periods: { id: PeriodType; label: string }[] = [
    { id: 'week', label: '7 días' },
    { id: 'month', label: '30 días' },
    { id: 'quarter', label: '3 meses' }
  ];

  // Datos simulados para diferentes períodos
  const chartData: Record<PeriodType, { labels: string[]; datasets: Array<{ name: string; color: string; data: number[] }> }> = {
    week: {
      labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
      datasets: services.map(service => ({
        name: service.name,
        color: service.color,
        data: service.weeklyBookings
      }))
    },
    month: {
      labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
      datasets: services.map(service => ({
        name: service.name,
        color: service.color,
        data: [
          Math.round(service.sessions * 0.2),
          Math.round(service.sessions * 0.3),
          Math.round(service.sessions * 0.25),
          Math.round(service.sessions * 0.25)
        ]
      }))
    },
    quarter: {
      labels: ['Mes 1', 'Mes 2', 'Mes 3'],
      datasets: services.map(service => ({
        name: service.name,
        color: service.color,
        data: [
          Math.round(service.sessions * 0.3),
          Math.round(service.sessions * 0.4),
          Math.round(service.sessions * 0.3)
        ]
      }))
    }
  };

  // Datos del período seleccionado
  let currentData = $derived(chartData[selectedPeriod]);
  let maxValue = $derived(
    Math.max(...currentData.datasets.flatMap(d => d.data))
  );

  // Análisis de tendencias
  let insights = $derived([
    {
      service: 'Terapia Individual',
      trend: 'Picos en miércoles y jueves',
      recommendation: 'Considera más slots estos días'
    },
    {
      service: 'Primera Consulta', 
      trend: 'Crecimiento constante',
      recommendation: 'Mantener disponibilidad alta'
    },
    {
      service: 'Terapia de Pareja',
      trend: 'Baja en inicio de semana',
      recommendation: 'Promocionar lunes y martes'
    }
  ]);

  function getBarHeight(value: number): number {
    return Math.max((value / maxValue) * 100, 2); // Mínimo 2% para visibilidad
  }
</script>

<Card>
  <CardHeader>
    <div class="flex items-center justify-between">
      <div>
        <CardTitle class="flex items-center gap-2 text-2xl">
          <BarChart3 class="h-5 w-5" />
          Evolución de Servicios
        </CardTitle>
        <CardDescription>
          Distribución temporal de sesiones por tipo de servicio
        </CardDescription>
      </div>
      
      <!-- Selector de período -->
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
    </div>
  </CardHeader>

  <CardContent class="space-y-6">
    <!-- Gráfico de barras agrupadas -->
    <div class="space-y-4">
      <!-- Leyenda -->
      <div class="flex flex-wrap items-center gap-4">
        {#each currentData.datasets as dataset}
          <div class="flex items-center space-x-2">
            <div 
              class="w-3 h-3 rounded-full" 
              style="background-color: {dataset.color};"
            ></div>
            <span class="text-sm text-gray-600">{dataset.name}</span>
          </div>
        {/each}
      </div>

      <!-- Chart Container -->
      <div class="relative h-64 bg-gray-50 rounded-lg p-4">
        <!-- Y-axis labels -->
        <div class="absolute left-0 top-4 bottom-8 flex flex-col justify-between text-xs text-gray-500">
          <span>{maxValue}</span>
          <span>{Math.round(maxValue * 0.75)}</span>
          <span>{Math.round(maxValue * 0.5)}</span>
          <span>{Math.round(maxValue * 0.25)}</span>
          <span>0</span>
        </div>

        <!-- Chart area -->
        <div class="ml-8 h-full flex items-end justify-between space-x-2">
          {#each currentData.labels as label, labelIndex}
            <div class="flex-1 flex flex-col items-center">
              <!-- Grouped bars -->
              <div class="w-full flex items-end justify-center space-x-1 mb-2" style="height: 200px;">
                {#each currentData.datasets as dataset, datasetIndex}
                  <div 
                    class="flex-1 max-w-6 rounded-t transition-all duration-300 hover:opacity-80"
                    style="
                      background-color: {dataset.color}; 
                      height: {getBarHeight(dataset.data[labelIndex])}%;
                    "
                    title="{dataset.name}: {dataset.data[labelIndex]} sesiones"
                  ></div>
                {/each}
              </div>
              
              <!-- X-axis label -->
              <span class="text-xs text-gray-600 font-medium">{label}</span>
            </div>
          {/each}
        </div>
      </div>
    </div>

    <!-- Insights y tendencias -->
    <div class="grid md:grid-cols-2 gap-4">
      <div class="space-y-3">
        <h4 class="font-medium text-gray-900 flex items-center gap-2">
          <TrendingUp class="h-4 w-4" />
          Patrones Identificados
        </h4>
        <div class="space-y-2">
          {#each insights as insight}
            <div class="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div class="font-medium text-blue-900 text-sm">{insight.service}</div>
              <div class="text-xs text-blue-800 mt-1">{insight.trend}</div>
              <div class="text-xs text-blue-700 mt-2 font-medium">{insight.recommendation}</div>
            </div>
          {/each}
        </div>
      </div>

      <div class="space-y-3">
        <h4 class="font-medium text-gray-900 flex items-center gap-2">
          <Calendar class="h-4 w-4" />
          Resumen del Período
        </h4>
        <div class="space-y-2">
          <div class="p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div class="font-medium text-gray-900">Total Sesiones</div>
                <div class="text-2xl font-bold text-blue-600">
                  {currentData.datasets.reduce((sum, dataset) => 
                    sum + dataset.data.reduce((a, b) => a + b, 0), 0
                  )}
                </div>
              </div>
              <div>
                <div class="font-medium text-gray-900">Servicio Top</div>
                <div class="text-sm font-bold text-green-600">
                  {currentData.datasets.reduce((max, dataset) => 
                    dataset.data.reduce((a, b) => a + b, 0) > 
                    max.data.reduce((a, b) => a + b, 0) ? dataset : max
                  ).name}
                </div>
              </div>
            </div>
          </div>

          <!-- Distribución porcentual -->
          <div class="space-y-2">
            {#each currentData.datasets as dataset}
              {@const total = currentData.datasets.reduce((sum, d) => sum + d.data.reduce((a, b) => a + b, 0), 0)}
              {@const serviceTotal = dataset.data.reduce((a, b) => a + b, 0)}
              {@const percentage = Math.round((serviceTotal / total) * 100)}
              
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600">{dataset.name}</span>
                <div class="flex items-center space-x-2">
                  <div class="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      class="h-2 rounded-full transition-all duration-300"
                      style="width: {percentage}%; background-color: {dataset.color};"
                    ></div>
                  </div>
                  <span class="font-medium w-8 text-right">{percentage}%</span>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>

    <!-- Acciones sugeridas -->
    <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <h4 class="font-medium text-yellow-900 mb-2">Oportunidades de Optimización</h4>
      <div class="grid md:grid-cols-3 gap-3">
        <Button variant="outline" size="sm" class="bg-transparent border-yellow-300 text-yellow-700 hover:bg-yellow-100">
          <TrendingUp class="mr-2 h-3 w-3" />
          Aumentar slots populares
        </Button>
        <Button variant="outline" size="sm" class="bg-transparent border-yellow-300 text-yellow-700 hover:bg-yellow-100">
          <Calendar class="mr-2 h-3 w-3" />
          Promocionar días bajos
        </Button>
        <Button variant="outline" size="sm" class="bg-transparent border-yellow-300 text-yellow-700 hover:bg-yellow-100">
          <BarChart3 class="mr-2 h-3 w-3" />
          Analizar competencia
        </Button>
      </div>
    </div>
  </CardContent>
</Card>