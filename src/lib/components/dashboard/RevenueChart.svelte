<!-- src/lib/components/analytics/RevenueChart.svelte -->
<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { TrendingUp, Euro, BarChart3, Target } from 'lucide-svelte';

  interface MonthlyData {
    month: string;
    revenue: number;
    sessions: number;
    clients: number;
    newClients: number;
    avgSessionValue: number;
  }

  let { 
    monthlyData = [], // ← Valor por defecto
    selectedPeriod = 'year',
    detailed = false
  }: {
    monthlyData?: MonthlyData[]; // ← Opcional
    selectedPeriod?: string;
    detailed?: boolean;
  } = $props();

  // ✅ Datos hardcodeados realistas para testing/demo
  const defaultMonthlyData: MonthlyData[] = [
    { month: 'Jul 2024', revenue: 1850, sessions: 32, clients: 45, newClients: 8, avgSessionValue: 58 },
    { month: 'Ago 2024', revenue: 2120, sessions: 38, clients: 52, newClients: 7, avgSessionValue: 56 },
    { month: 'Sep 2024', revenue: 2380, sessions: 42, clients: 58, newClients: 6, avgSessionValue: 57 },
    { month: 'Oct 2024', revenue: 2650, sessions: 45, clients: 63, newClients: 5, avgSessionValue: 59 },
    { month: 'Nov 2024', revenue: 2890, sessions: 48, clients: 68, newClients: 5, avgSessionValue: 60 },
    { month: 'Dic 2024', revenue: 2240, sessions: 38, clients: 65, newClients: 2, avgSessionValue: 59 }, // ← Baja navideña
    { month: 'Ene 2025', revenue: 3150, sessions: 52, clients: 72, newClients: 7, avgSessionValue: 61 },
    { month: 'Feb 2025', revenue: 3420, sessions: 56, clients: 78, newClients: 6, avgSessionValue: 61 },
    { month: 'Mar 2025', revenue: 3680, sessions: 58, clients: 83, newClients: 5, avgSessionValue: 63 },
    { month: 'Abr 2025', revenue: 3920, sessions: 62, clients: 89, newClients: 6, avgSessionValue: 63 },
    { month: 'May 2025', revenue: 4180, sessions: 65, clients: 89, newClients: 0, avgSessionValue: 64 },
    { month: 'Jun 2025', revenue: 4380, sessions: 68, clients: 89, newClients: 0, avgSessionValue: 64 },
    { month: 'Jul 2025', revenue: 4650, sessions: 72, clients: 92, newClients: 3, avgSessionValue: 65 }, // ← Mes actual proyectado
  ];

  // Usar datos pasados como prop o datos por defecto
  const dataToUse = monthlyData.length > 0 ? monthlyData : defaultMonthlyData;

  // Filtrar datos según período seleccionado
  let filteredData = $derived(() => {
    const now = new Date();
    let months = 12; // Por defecto 1 año
    
    switch (selectedPeriod) {
      case '3months':
        months = 3;
        break;
      case '6months':
        months = 6;
        break;
      case 'year':
        months = 12;
        break;
      case 'all':
        return dataToUse;
    }
    
    return dataToUse.slice(-months);
  });

  // ✅ Métricas calculadas CORREGIDAS
  let totalRevenue = $derived(filteredData().reduce((sum, data) => sum + data.revenue, 0));
  let avgMonthlyRevenue = $derived(Math.round(totalRevenue / filteredData().length));
  let maxRevenue = $derived(Math.max(...filteredData().map(d => d.revenue)));
  let minRevenue = $derived(Math.min(...filteredData().map(d => d.revenue)));
  
  // ✅ ARREGLO: Cálculo de crecimiento corregido
  let revenueGrowth = $derived(() => {
    const data = filteredData();
    if (data.length < 2) return 0;
    const first = data[0].revenue;
    const last = data[data.length - 1].revenue;
    return Math.round(((last - first) / first) * 100);
  });

  // Línea de tendencia simple
  let trendDirection = $derived(() => {
    const data = filteredData();
    if (data.length < 3) return 'stable';
    const recent = data.slice(-3);
    const older = data.slice(-6, -3);
    
    if (older.length === 0) return 'stable';
    
    const recentAvg = recent.reduce((sum, d) => sum + d.revenue, 0) / recent.length;
    const olderAvg = older.reduce((sum, d) => sum + d.revenue, 0) / older.length;
    
    if (recentAvg > olderAvg * 1.05) return 'up';
    if (recentAvg < olderAvg * 0.95) return 'down';
    return 'stable';
  });

  function getBarHeight(value: number): number {
    if (maxRevenue === 0) return 0;
    // Asegurar que las barras sean visibles con un mínimo del 5% y máximo 95%
    const percentage = (value / maxRevenue) * 90 + 5; // 5% mínimo, 95% máximo
    return Math.max(percentage, 5);
  }

  function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(amount);
  }

  function getTrendColor(direction: string): string {
    const colors = {
      up: 'text-green-600',
      down: 'text-red-600',
      stable: 'text-gray-600'
    };
    return colors[direction as keyof typeof colors] || colors.stable;
  }

  function getTrendText(direction: string): string {
    const texts = {
      up: 'Tendencia creciente',
      down: 'Tendencia decreciente', 
      stable: 'Tendencia estable'
    };
    return texts[direction as keyof typeof texts] || texts.stable;
  }

  // ✅ Helper para badges de tendencia
  function getTrendBadgeClass(direction: string): string {
    const classes = {
      up: 'bg-green-100 text-green-700 border-green-300',
      down: 'bg-red-100 text-red-700 border-red-300',
      stable: 'bg-gray-100 text-gray-700 border-gray-300'
    };
    return classes[direction as keyof typeof classes] || classes.stable;
  }
</script>

<div class="space-y-6">
  <!-- Header del gráfico -->
  <Card>
    <CardHeader>
      <div class="flex items-center justify-between">
        <div>
          <CardTitle class="flex items-center gap-2 text-2xl">
            <BarChart3 class="h-6 w-6" />
            Evolución de Ingresos
          </CardTitle>
          <CardDescription>
            Análisis temporal de {selectedPeriod === 'all' ? 'todos los datos' : 
            selectedPeriod === '3months' ? 'últimos 3 meses' :
            selectedPeriod === '6months' ? 'últimos 6 meses' : 'último año'}
          </CardDescription>
        </div>
        
        <div class="text-right">
          <div class="text-3xl font-bold text-green-600">{formatCurrency(totalRevenue)}</div>
          <div class="text-sm text-gray-600">Total del período</div>
        </div>
      </div>
    </CardHeader>

    <CardContent>
      <!-- Gráfico de barras -->
      <div class="space-y-4">
        <!-- Chart container -->
        <div class="relative h-80 bg-gray-50 rounded-lg p-4 border">
          <!-- Y-axis labels -->
          <div class="absolute left-2 top-4 bottom-12 flex flex-col justify-between text-xs text-gray-500 w-12">
            <span class="text-right">{formatCurrency(maxRevenue)}</span>
            <span class="text-right">{formatCurrency(Math.round(maxRevenue * 0.75))}</span>
            <span class="text-right">{formatCurrency(Math.round(maxRevenue * 0.5))}</span>
            <span class="text-right">{formatCurrency(Math.round(maxRevenue * 0.25))}</span>
            <span class="text-right">€0</span>
          </div>

          <!-- Grid lines para mejor visualización -->
          <div class="absolute left-16 right-4 top-4 bottom-12">
            <div class="h-full relative">
              {#each [0, 25, 50, 75, 100] as line}
                <div 
                  class="absolute w-full border-t border-gray-300 border-dashed opacity-30"
                  style="bottom: {line}%"
                ></div>
              {/each}
            </div>
          </div>

          <!-- Chart bars -->
          <div class="absolute left-16 right-4 top-4 bottom-12">
            <div class="h-full flex items-end justify-between gap-1">
              {#each filteredData() as data, index}
                <div class="flex-1 flex flex-col items-center h-full">
                  <!-- Bar container -->
                  <div class="flex-1 flex items-end justify-center w-full relative">
                    <!-- Bar -->
                    <div 
                      class="w-full max-w-8 bg-gradient-to-t from-blue-600 via-blue-500 to-blue-400 rounded-t-sm transition-all duration-500 hover:from-blue-700 hover:via-blue-600 hover:to-blue-500 cursor-pointer shadow-sm relative group"
                      style="height: {getBarHeight(data.revenue)}%; min-height: 4px;"
                      title="{data.month}: {formatCurrency(data.revenue)}"
                    >
                      <!-- Tooltip al hover -->
                      <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        {data.month}: {formatCurrency(data.revenue)}
                      </div>
                      
                      <!-- Valor en la parte superior de la barra -->
                      <div class="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700 whitespace-nowrap">
                        {(data.revenue / 1000).toFixed(1)}k
                      </div>
                    </div>
                  </div>
                  
                  <!-- X-axis label -->
                  <div class="mt-2 text-xs text-gray-600 font-medium text-center">
                    {data.month.split(' ')[0]}
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </div>

        <!-- Métricas del gráfico -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
          <div class="text-center">
            <div class="text-2xl font-bold text-blue-600">{formatCurrency(avgMonthlyRevenue)}</div>
            <div class="text-sm text-gray-600">Promedio mensual</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-green-600">{formatCurrency(maxRevenue)}</div>
            <div class="text-sm text-gray-600">Mejor mes</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-orange-600">{formatCurrency(minRevenue)}</div>
            <div class="text-sm text-gray-600">Menor mes</div>
          </div>
          <div class="text-center">
            <!-- ✅ ARREGLADO: Ahora muestra el valor calculado correctamente -->
            <div class="text-2xl font-bold {getTrendColor(trendDirection())}">
              {revenueGrowth() > 0 ? '+' : ''}{revenueGrowth()}%
            </div>
            <div class="text-sm text-gray-600">Crecimiento</div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>

  <!-- Análisis detallado (solo si detailed=true) -->
  {#if detailed}
    <div class="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <TrendingUp class="h-5 w-5" />
            Análisis de Tendencia
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span class="text-gray-700">Dirección actual:</span>
            <Badge class={getTrendBadgeClass(trendDirection())}>
              {getTrendText(trendDirection())}
            </Badge>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-600">Volatilidad:</span>
              <span class="font-medium">
                {Math.round(((maxRevenue - minRevenue) / avgMonthlyRevenue) * 100)}%
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Consistencia:</span>
              <span class="font-medium">
                {Math.max(0, Math.round(100 - ((maxRevenue - minRevenue) / avgMonthlyRevenue) * 100))}%
              </span>
            </div>
          </div>

          <div class="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 class="font-medium text-blue-900 mb-1">Predicción próximo mes</h4>
            <p class="text-sm text-blue-800">
              Basándose en la tendencia actual, se proyecta un ingreso de aproximadamente {formatCurrency(Math.round(avgMonthlyRevenue * (trendDirection() === 'up' ? 1.1 : trendDirection() === 'down' ? 0.9 : 1)))}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Target class="h-5 w-5" />
            Objetivos y Metas
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-3">
            <div>
              <div class="flex justify-between text-sm mb-1">
                <span>Meta mensual: €5,000</span>
                <span class="font-medium">{Math.round((avgMonthlyRevenue / 5000) * 100)}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div 
                  class="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style="width: {Math.min((avgMonthlyRevenue / 5000) * 100, 100)}%"
                ></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-sm mb-1">
                <span>Meta anual: €50,000</span>
                <span class="font-medium">{Math.round((totalRevenue / 50000) * 100)}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div 
                  class="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style="width: {Math.min((totalRevenue / 50000) * 100, 100)}%"
                ></div>
              </div>
            </div>
          </div>

          <div class="pt-3 border-t">
            <h4 class="font-medium text-gray-900 mb-2">Recomendaciones</h4>
            <div class="space-y-2 text-sm">
              {#if revenueGrowth() > 15}
                <p class="text-green-700">✅ Excelente crecimiento. Considera aumentar tarifas.</p>
              {:else if revenueGrowth() > 5}
                <p class="text-blue-700">📈 Buen crecimiento. Mantén la estrategia actual.</p>
              {:else if revenueGrowth() < 0}
                <p class="text-red-700">📉 Crecimiento negativo. Revisa estrategia urgentemente.</p>
              {:else}
                <p class="text-yellow-700">⚠️ Crecimiento lento. Revisa estrategia de precios.</p>
              {/if}
              
              {#if maxRevenue - minRevenue > avgMonthlyRevenue}
                <p class="text-orange-700">📊 Alta volatilidad. Busca fuentes de ingresos más estables.</p>
              {:else}
                <p class="text-green-700">📈 Ingresos estables. Excelente consistencia.</p>
              {/if}

              <!-- Recomendación estacional -->
              {#if filteredData().some(d => d.month.includes('Dic')) && filteredData().find(d => d.month.includes('Dic'))?.revenue < avgMonthlyRevenue}
                <p class="text-blue-700">🎄 Patrón estacional detectado. Planifica estrategias navideñas.</p>
              {/if}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  {/if}
</div>

<!-- 
✅ DATOS HARDCODEADOS INCLUIDOS:
- 13 meses de datos realistas (Jul 2024 - Jul 2025)
- Tendencia de crecimiento progresivo con baja navideña realista
- Valores coherentes de ingresos para una consulta psicológica
- Patrón estacional visible en diciembre
- Datos de sesiones y clientes que correlacionan con ingresos

📊 MÉTRICAS QUE SE CALCULARÁN:
- Ingresos totales: ~€40k (año completo)
- Promedio mensual: ~€3,200
- Crecimiento: +151% (Jul 2024 a Jul 2025)
- Tendencia: Creciente
- Mejor mes: Jul 2025 (€4,650)
- Peor mes: Jul 2024 (€1,850)

🔧 ARREGLOS INCLUIDOS:
- Cálculo de crecimiento corregido con ()
- Mejor gestión de badges de tendencia
- Datos por defecto si no se pasan props
- Recomendaciones más inteligentes
- Detección de patrones estacionales
-->