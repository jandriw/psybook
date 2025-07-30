<!-- src/lib/components/analytics/ClientAnalytics.svelte -->
<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Progress } from '$lib/components/ui/progress';
  import { Badge } from '$lib/components/ui/badge';
  import { Users, UserPlus, Heart, TrendingUp } from 'lucide-svelte';

  interface MonthlyData {
    month: string;
    revenue: number;
    sessions: number;
    clients: number;
    newClients: number;
    avgSessionValue: number;
  }

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

  let { 
    monthlyData,
    businessMetrics
  }: {
    monthlyData: MonthlyData[];
    businessMetrics: BusinessMetrics;
  } = $props();

  // Análisis de segmentación de clientes
  const clientSegments = [
    { 
      name: 'VIP (€500+ gastados)',
      count: 12,
      percentage: 13,
      revenue: 8450,
      avgSessions: 18,
      color: 'bg-purple-500'
    },
    { 
      name: 'Regulares (€200-500)',
      count: 28,
      percentage: 31,
      revenue: 12800,
      avgSessions: 8,
      color: 'bg-blue-500'
    },
    { 
      name: 'Ocasionales (€100-200)',
      count: 35,
      percentage: 39,
      revenue: 6200,
      avgSessions: 4,
      color: 'bg-green-500'
    },
    { 
      name: 'Nuevos (<€100)',
      count: 14,
      percentage: 16,
      revenue: 1000,
      avgSessions: 2,
      color: 'bg-yellow-500'
    }
  ];

  // Análisis de retención por cohortes (simplificado)
  const retentionCohorts = [
    { month: 'Ene 2025', newClients: 7, month1: 86, month2: 71, month3: 57 },
    { month: 'Feb 2025', newClients: 6, month1: 83, month2: 67, month3: null },
    { month: 'Mar 2025', newClients: 5, month1: 80, month2: null, month3: null },
    { month: 'Abr 2025', newClients: 6, month1: null, month2: null, month3: null }
  ];

  // Métricas derivadas
  let totalClientRevenue = $derived(clientSegments.reduce((sum, seg) => sum + seg.revenue, 0));
  let avgClientValue = $derived(Math.round(totalClientRevenue / businessMetrics.totalClients));
  let newClientRate = $derived(Math.round((businessMetrics.newClients / businessMetrics.totalClients) * 100));

  function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(amount);
  }

  function getRetentionColor(rate: number | null): string {
    if (rate === null) return 'bg-gray-200';
    if (rate >= 80) return 'bg-green-500';
    if (rate >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  }
</script>

<div class="space-y-6">
  <!-- Métricas principales de clientes -->
  <div class="grid gap-4 md:grid-cols-4">
    <Card>
      <CardContent class="p-4 text-center">
        <Users class="mx-auto h-8 w-8 text-blue-600 mb-2" />
        <div class="text-2xl font-bold">{businessMetrics.totalClients}</div>
        <div class="text-sm text-gray-600">Clientes Totales</div>
      </CardContent>
    </Card>

    <Card>
      <CardContent class="p-4 text-center">
        <UserPlus class="mx-auto h-8 w-8 text-green-600 mb-2" />
        <div class="text-2xl font-bold">{businessMetrics.newClients}</div>
        <div class="text-sm text-gray-600">Nuevos este Mes</div>
      </CardContent>
    </Card>

    <Card>
      <CardContent class="p-4 text-center">
        <Heart class="mx-auto h-8 w-8 text-red-600 mb-2" />
        <div class="text-2xl font-bold">{businessMetrics.clientRetention}%</div>
        <div class="text-sm text-gray-600">Retención</div>
      </CardContent>
    </Card>

    <Card>
      <CardContent class="p-4 text-center">
        <TrendingUp class="mx-auto h-8 w-8 text-purple-600 mb-2" />
        <div class="text-2xl font-bold">{formatCurrency(avgClientValue)}</div>
        <div class="text-sm text-gray-600">Valor Promedio</div>
      </CardContent>
    </Card>
  </div>

  <!-- Segmentación de clientes -->
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <Users class="h-5 w-5" />
        Segmentación de Clientes
      </CardTitle>
      <CardDescription>Análisis por valor y comportamiento</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="space-y-4">
        {#each clientSegments as segment}
          <div class="flex items-center justify-between p-4 border rounded-lg">
            <div class="flex items-center space-x-4">
              <div class="w-4 h-4 rounded-full {segment.color}"></div>
              <div>
                <h4 class="font-medium text-gray-900">{segment.name}</h4>
                <p class="text-sm text-gray-600">{segment.count} clientes • {segment.avgSessions} sesiones promedio</p>
              </div>
            </div>
            
            <div class="text-right">
              <div class="font-bold text-green-600">{formatCurrency(segment.revenue)}</div>
              <div class="text-sm text-gray-600">{segment.percentage}% del total</div>
            </div>
          </div>
        {/each}
      </div>

      <!-- Distribución visual -->
      <div class="mt-6">
        <h4 class="font-medium text-gray-900 mb-3">Distribución por Ingresos</h4>
        <div class="flex rounded-lg overflow-hidden h-8">
          {#each clientSegments as segment}
            <div 
              class="{segment.color}"
              style="width: {(segment.revenue / totalClientRevenue) * 100}%"
              title="{segment.name}: {formatCurrency(segment.revenue)}"
            ></div>
          {/each}
        </div>
        <div class="flex justify-between mt-2 text-xs text-gray-600">
          <span>VIP: {Math.round((clientSegments[0].revenue / totalClientRevenue) * 100)}%</span>
          <span>Regulares: {Math.round((clientSegments[1].revenue / totalClientRevenue) * 100)}%</span>
          <span>Ocasionales: {Math.round((clientSegments[2].revenue / totalClientRevenue) * 100)}%</span>
          <span>Nuevos: {Math.round((clientSegments[3].revenue / totalClientRevenue) * 100)}%</span>
        </div>
      </div>
    </CardContent>
  </Card>

  <!-- Análisis de retención -->
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <Heart class="h-5 w-5" />
        Análisis de Retención por Cohortes
      </CardTitle>
      <CardDescription>Porcentaje de clientes que continúan mes a mes</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b">
              <th class="text-left py-2">Cohorte</th>
              <th class="text-center py-2">Nuevos</th>
              <th class="text-center py-2">Mes 1</th>
              <th class="text-center py-2">Mes 2</th>
              <th class="text-center py-2">Mes 3</th>
            </tr>
          </thead>
          <tbody>
            {#each retentionCohorts as cohort}
              <tr class="border-b">
                <td class="py-3 font-medium">{cohort.month}</td>
                <td class="text-center">{cohort.newClients}</td>
                <td class="text-center">
                  {#if cohort.month1 !== null}
                    <div class="inline-flex items-center space-x-2">
                      <div class="w-12 h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          class="{getRetentionColor(cohort.month1)} h-full transition-all duration-300"
                          style="width: {cohort.month1}%"
                        ></div>
                      </div>
                      <span class="text-xs">{cohort.month1}%</span>
                    </div>
                  {:else}
                    <span class="text-gray-400">-</span>
                  {/if}
                </td>
                <td class="text-center">
                  {#if cohort.month2 !== null}
                    <div class="inline-flex items-center space-x-2">
                      <div class="w-12 h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          class="{getRetentionColor(cohort.month2)} h-full transition-all duration-300"
                          style="width: {cohort.month2}%"
                        ></div>
                      </div>
                      <span class="text-xs">{cohort.month2}%</span>
                    </div>
                  {:else}
                    <span class="text-gray-400">-</span>
                  {/if}
                </td>
                <td class="text-center">
                  {#if cohort.month3 !== null}
                    <div class="inline-flex items-center space-x-2">
                      <div class="w-12 h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          class="{getRetentionColor(cohort.month3)} h-full transition-all duration-300"
                          style="width: {cohort.month3}%"
                        ></div>
                      </div>
                      <span class="text-xs">{cohort.month3}%</span>
                    </div>
                  {:else}
                    <span class="text-gray-400">-</span>
                  {/if}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      <div class="mt-4 grid md:grid-cols-3 gap-4">
        <div class="p-3 bg-green-50 rounded-lg text-center">
          <div class="text-2xl font-bold text-green-600">74%</div>
          <div class="text-sm text-green-800">Retención promedio 3 meses</div>
        </div>
        <div class="p-3 bg-blue-50 rounded-lg text-center">
          <div class="text-2xl font-bold text-blue-600">€1,240</div>
          <div class="text-sm text-blue-800">Valor de vida cliente</div>
        </div>
        <div class="p-3 bg-purple-50 rounded-lg text-center">
          <div class="text-2xl font-bold text-purple-600">5.1</div>
          <div class="text-sm text-purple-800">Sesiones promedio/cliente</div>
        </div>
      </div>
    </CardContent>
  </Card>

  <!-- Insights de clientes -->
  <Card>
    <CardHeader>
      <CardTitle>Insights de Clientes</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="grid md:grid-cols-2 gap-4">
        <div class="space-y-3">
          <h4 class="font-medium text-gray-900">Oportunidades</h4>
          <div class="space-y-2">
            <div class="p-3 bg-blue-50 border border-blue-200 rounded">
              <div class="text-sm font-medium text-blue-900">Clientes VIP</div>
              <div class="text-xs text-blue-800">13% de clientes generan 30% de ingresos. Considera programa de fidelización.</div>
            </div>
            <div class="p-3 bg-yellow-50 border border-yellow-200 rounded">
              <div class="text-sm font-medium text-yellow-900">Nuevos Clientes</div>
              <div class="text-xs text-yellow-800">16% son nuevos. Enfócate en conversión a clientes regulares.</div>
            </div>
          </div>
        </div>

        <div class="space-y-3">
          <h4 class="font-medium text-gray-900">Recomendaciones</h4>
          <div class="space-y-2">
            <div class="p-3 bg-green-50 border border-green-200 rounded">
              <div class="text-sm font-medium text-green-900">Alta Retención</div>
              <div class="text-xs text-green-800">87% de retención excelente. Mantén la calidad del servicio.</div>
            </div>
            <div class="p-3 bg-purple-50 border border-purple-200 rounded">
              <div class="text-sm font-medium text-purple-900">Valor por Cliente</div>
              <div class="text-xs text-purple-800">€319 promedio por cliente. Considera packs de sesiones.</div>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</div>