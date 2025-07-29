<!-- src/lib/components/dashboard/ServiceDetailsModal.svelte -->
<script lang="ts">
  import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '$lib/components/ui/dialog';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { Progress } from '$lib/components/ui/progress';
  import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
  import {
    Euro,
    Clock,
    Users,
    TrendingUp,
    TrendingDown,
    Calendar,
    Star,
    Target,
    BarChart3,
    Zap,
    Settings,
    X
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
    open = $bindable(false),
    service = null
  }: {
    open: boolean;
    service: Service | null;
  } = $props();

  // Datos adicionales simulados para el modal
  function getDetailedAnalytics(service: Service | null) {
    if (!service) return null;
    
    return {
      monthlyData: [
        { month: 'Oct', sessions: Math.round(service.sessions * 0.7), revenue: Math.round(service.revenue * 0.7) },
        { month: 'Nov', sessions: Math.round(service.sessions * 0.85), revenue: Math.round(service.revenue * 0.85) },
        { month: 'Dic', sessions: service.sessions, revenue: service.revenue },
        { month: 'Ene', sessions: Math.round(service.sessions * 1.15), revenue: Math.round(service.revenue * 1.15) }
      ],
      hourlyDistribution: [
        { hour: '09:00', bookings: 8 },
        { hour: '10:00', bookings: 12 },
        { hour: '11:00', bookings: 15 },
        { hour: '12:00', bookings: 10 },
        { hour: '15:00', bookings: 14 },
        { hour: '16:00', bookings: 18 },
        { hour: '17:00', bookings: 16 },
        { hour: '18:00', bookings: 11 }
      ],
      clientSegmentation: [
        { segment: 'Nuevos', count: Math.round(service.sessions * 0.3), percentage: 30 },
        { segment: 'Regulares', count: Math.round(service.sessions * 0.5), percentage: 50 },
        { segment: 'Frecuentes', count: Math.round(service.sessions * 0.2), percentage: 20 }
      ],
      performance: {
        conversionRate: service.conversionRate || 75,
        retentionRate: 85,
        avgRating: service.clientSatisfaction,
        noShowRate: 5,
        cancellationRate: 8
      }
    };
  }

  let analytics = $derived(getDetailedAnalytics(service));
  let maxHourlyBookings = $derived(
    analytics ? Math.max(...analytics.hourlyDistribution.map(h => h.bookings)) : 0
  );

  function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(amount);
  }

  function handleConfigureService(): void {
    open = false;
    window.location.href = '/dashboard/settings/services';
  }

  function handleOptimizeService(): void {
    if (!service) return;
    alert(`Optimizaciones sugeridas para ${service.name}:\n\n• Horarios pico: 16:00-17:00\n• Aumentar slots en horarios populares\n• Considerar promociones en horarios bajos\n• Mejorar descripción del servicio`);
  }
</script>

<Dialog bind:open>
  <DialogContent class="max-w-4xl max-h-[90vh] overflow-y-auto">
    {#if service && analytics}
      <DialogHeader>
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div 
              class="w-4 h-6 rounded-full" 
              style="background-color: {service.color};"
            ></div>
            <div>
              <DialogTitle class="text-2xl">{service.name}</DialogTitle>
              <DialogDescription>{service.description}</DialogDescription>
            </div>
          </div>
          <Button variant="ghost" size="icon" onclick={() => open = false}>
            <X class="h-4 w-4" />
          </Button>
        </div>
      </DialogHeader>

      <Tabs value="overview" class="mt-6">
        <TabsList class="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="trends">Tendencias</TabsTrigger>
          <TabsTrigger value="schedule">Horarios</TabsTrigger>
          <TabsTrigger value="clients">Clientes</TabsTrigger>
        </TabsList>

        <!-- Tab: Resumen -->
        <TabsContent value="overview" class="space-y-6">
          <!-- Métricas principales -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent class="p-4 text-center">
                <div class="text-2xl font-bold text-blue-600">{service.sessions}</div>
                <div class="text-sm text-gray-600">Sesiones</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent class="p-4 text-center">
                <div class="text-2xl font-bold text-green-600">{formatCurrency(service.revenue)}</div>
                <div class="text-sm text-gray-600">Ingresos</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent class="p-4 text-center">
                <div class="text-2xl font-bold text-purple-600">{service.occupancyRate}%</div>
                <div class="text-sm text-gray-600">Ocupación</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent class="p-4 text-center">
                <div class="text-2xl font-bold text-orange-600">{service.clientSatisfaction}</div>
                <div class="text-sm text-gray-600">Satisfacción</div>
              </CardContent>
            </Card>
          </div>

          <!-- KPIs de rendimiento -->
          <Card>
            <CardHeader>
              <CardTitle class="text-lg">Indicadores de Rendimiento</CardTitle>
            </CardHeader>
            <CardContent class="grid md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span>Tasa de Conversión</span>
                    <span class="font-medium">{analytics.performance.conversionRate}%</span>
                  </div>
                  <Progress value={analytics.performance.conversionRate} class="h-2" />
                </div>
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span>Retención de Clientes</span>
                    <span class="font-medium">{analytics.performance.retentionRate}%</span>
                  </div>
                  <Progress value={analytics.performance.retentionRate} class="h-2" />
                </div>
              </div>
              <div class="space-y-4">
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span>Tasa de No-Shows</span>
                    <span class="font-medium text-red-600">{analytics.performance.noShowRate}%</span>
                  </div>
                  <Progress value={analytics.performance.noShowRate} class="h-2" />
                </div>
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span>Cancelaciones</span>
                    <span class="font-medium text-yellow-600">{analytics.performance.cancellationRate}%</span>
                  </div>
                  <Progress value={analytics.performance.cancellationRate} class="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- Detalles del servicio -->
          <div class="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle class="text-lg flex items-center gap-2">
                  <Settings class="h-4 w-4" />
                  Configuración
                </CardTitle>
              </CardHeader>
              <CardContent class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600">Precio por sesión:</span>
                  <span class="font-medium">{formatCurrency(service.price)}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Duración:</span>
                  <span class="font-medium">{service.duration} minutos</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Ingresos por hora:</span>
                  <span class="font-medium text-green-600">
                    {formatCurrency(Math.round((service.revenue / service.sessions) / (service.duration / 60)))}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Sesiones por cliente:</span>
                  <span class="font-medium">{service.avgSessionsPerClient}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle class="text-lg flex items-center gap-2">
                  <Target class="h-4 w-4" />
                  Recomendaciones
                </CardTitle>
              </CardHeader>
              <CardContent class="space-y-3">
                {#if service.occupancyRate >= 85}
                  <div class="p-3 bg-green-50 border border-green-200 rounded">
                    <div class="text-sm font-medium text-green-900">Excelente demanda</div>
                    <div class="text-xs text-green-800">Considera aumentar precio o añadir más slots</div>
                  </div>
                {:else if service.occupancyRate < 60}
                  <div class="p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <div class="text-sm font-medium text-yellow-900">Baja ocupación</div>
                    <div class="text-xs text-yellow-800">Promocionar o revisar precio</div>
                  </div>
                {/if}
                
                <div class="p-3 bg-blue-50 border border-blue-200 rounded">
                  <div class="text-sm font-medium text-blue-900">Optimización horarios</div>
                  <div class="text-xs text-blue-800">Analizar patrones de reserva</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <!-- Tab: Tendencias -->
        <TabsContent value="trends" class="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle class="flex items-center gap-2">
                <TrendingUp class="h-4 w-4" />
                Evolución Mensual
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div class="space-y-4">
                <!-- Simple line chart representation -->
                <div class="h-32 bg-gray-50 rounded-lg p-4 flex items-end justify-between">
                  {#each analytics.monthlyData as month}
                    <div class="flex flex-col items-center">
                      <div 
                        class="w-8 bg-blue-500 rounded-t mb-2" 
                        style="height: {(month.sessions / Math.max(...analytics.monthlyData.map(m => m.sessions))) * 80}px;"
                      ></div>
                      <span class="text-xs text-gray-600">{month.month}</span>
                    </div>
                  {/each}
                </div>
                
                <div class="grid grid-cols-4 gap-4 text-center">
                  {#each analytics.monthlyData as month}
                    <div>
                      <div class="font-medium">{month.sessions}</div>
                      <div class="text-xs text-gray-600">sesiones</div>
                      <div class="text-sm text-green-600">{formatCurrency(month.revenue)}</div>
                    </div>
                  {/each}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <!-- Tab: Horarios -->
        <TabsContent value="schedule" class="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle class="flex items-center gap-2">
                <Clock class="h-4 w-4" />
                Distribución por Horarios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div class="space-y-3">
                {#each analytics.hourlyDistribution as slot}
                  <div class="flex items-center space-x-3">
                    <span class="text-sm font-mono w-12">{slot.hour}</span>
                    <div class="flex-1 bg-gray-200 rounded-full h-4">
                      <div 
                        class="bg-blue-500 h-4 rounded-full transition-all duration-300"
                        style="width: {(slot.bookings / maxHourlyBookings) * 100}%"
                      ></div>
                    </div>
                    <span class="text-sm font-medium w-8">{slot.bookings}</span>
                  </div>
                {/each}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <!-- Tab: Clientes -->
        <TabsContent value="clients" class="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle class="flex items-center gap-2">
                <Users class="h-4 w-4" />
                Segmentación de Clientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div class="space-y-4">
                {#each analytics.clientSegmentation as segment}
                  <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div class="font-medium">{segment.segment}</div>
                      <div class="text-sm text-gray-600">{segment.count} clientes</div>
                    </div>
                    <div class="text-right">
                      <div class="text-2xl font-bold text-blue-600">{segment.percentage}%</div>
                    </div>
                  </div>
                {/each}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <!-- Actions -->
      <div class="flex justify-end space-x-2 pt-4 border-t">
        <Button variant="outline" onclick={handleOptimizeService}>
          <Zap class="mr-2 h-4 w-4" />
          Optimizar
        </Button>
        <Button onclick={handleConfigureService} class="bg-blue-600 hover:bg-blue-700">
          <Settings class="mr-2 h-4 w-4" />
          Configurar Servicio
        </Button>
      </div>
    {:else}
      <div class="p-8 text-center">
        <BarChart3 class="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p class="text-gray-600">No hay datos disponibles para mostrar</p>
      </div>
    {/if}
  </DialogContent>
</Dialog>