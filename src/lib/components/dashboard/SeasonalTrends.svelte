<!-- src/lib/components/dashboard/SeasonalTrends.svelte -->
<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Calendar, TrendingUp, TrendingDown, AlertCircle } from 'lucide-svelte';

  interface MonthlyData {
    month: string;
    revenue: number;
    sessions: number;
    clients: number;
    newClients: number;
    avgSessionValue: number;
  }

  let { monthlyData }: { monthlyData: MonthlyData[] } = $props();

  // Análisis estacional por meses
  const seasonalPatterns = [
    { 
      month: 'Enero',
      type: 'high',
      description: 'Pico post-navideño',
      reason: 'Nuevos propósitos y resoluciones',
      trend: '+28%',
      recommendations: ['Promocionar packs anuales', 'Campañas de "nuevo año, nueva vida"']
    },
    { 
      month: 'Febrero',
      type: 'high',
      description: 'Continuación fuerte',
      reason: 'Consolidación de hábitos nuevos',
      trend: '+18%',
      recommendations: ['Mantener disponibilidad alta', 'Programas de seguimiento']
    },
    { 
      month: 'Marzo',
      type: 'medium',
      description: 'Estabilización',
      reason: 'Normalización de demanda',
      trend: '+8%',
      recommendations: ['Preparar campaña primaveral', 'Evaluar servicios grupales']
    },
    { 
      month: 'Abril',
      type: 'medium',
      description: 'Demanda estable',
      reason: 'Llegada de la primavera',
      trend: '+6%',
      recommendations: ['Promociones de renovación', 'Servicios al aire libre']
    },
    { 
      month: 'Mayo',
      type: 'medium',
      description: 'Pre-verano',
      reason: 'Preparación para vacaciones',
      trend: '+12%',
      recommendations: ['Sesiones intensivas', 'Preparación para pausas veraniegas']
    },
    { 
      month: 'Junio',
      type: 'medium',
      description: 'Fin de curso',
      reason: 'Estrés de exámenes y cambios',
      trend: '+15%',
      recommendations: ['Servicios para estudiantes', 'Terapia familiar']
    },
    { 
      month: 'Julio',
      type: 'low',
      description: 'Caída veraniega',
      reason: 'Vacaciones y viajes',
      trend: '-22%',
      recommendations: ['Sesiones online flexibles', 'Reducir horarios']
    },
    { 
      month: 'Agosto',
      type: 'low',
      description: 'Mínimo anual',
      reason: 'Pico de vacaciones',
      trend: '-35%',
      recommendations: ['Vacaciones propias', 'Formación y actualización']
    },
    { 
      month: 'Septiembre',
      type: 'high',
      description: 'Vuelta al cole',
      reason: 'Retorno a rutinas',
      trend: '+32%',
      recommendations: ['Campaña "back to routine"', 'Servicios familiares']
    },
    { 
      month: 'Octubre',
      type: 'high',
      description: 'Pico otoñal',
      reason: 'Depresión estacional incipiente',
      trend: '+25%',
      recommendations: ['Servicios de luminoterapia', 'Prevención SAD']
    },
    { 
      month: 'Noviembre',
      type: 'medium',
      description: 'Pre-navideño',
      reason: 'Estrés de fin de año',
      trend: '+10%',
      recommendations: ['Gestión del estrés', 'Preparación fiestas']
    },
    { 
      month: 'Diciembre',
      type: 'low',
      description: 'Caída navideña',
      reason: 'Fiestas familiares y viajes',
      trend: '-18%',
      recommendations: ['Horarios reducidos', 'Servicios de urgencia']
    }
  ];

  // Identificar patrones en los datos reales
  let realPatterns = $derived(() => {
    const patterns = monthlyData.map((data, index) => {
      const prevMonth = monthlyData[index - 1];
      let change = 0;
      
      if (prevMonth) {
        change = ((data.revenue - prevMonth.revenue) / prevMonth.revenue) * 100;
      }
      
      return {
        month: data.month,
        revenue: data.revenue,
        change: change,
        sessions: data.sessions,
        type: change > 15 ? 'high' : change < -10 ? 'low' : 'medium'
      };
    });
    
    return patterns;
  });

  // Análisis de días de la semana (datos simulados)
  const weeklyPatterns = [
    { day: 'Lunes', sessions: 85, preference: 'Baja', reason: 'Inicio de semana difícil' },
    { day: 'Martes', sessions: 95, preference: 'Media', reason: 'Aumento gradual' },
    { day: 'Miércoles', sessions: 120, preference: 'Alta', reason: 'Mitad de semana ideal' },
    { day: 'Jueves', sessions: 110, preference: 'Alta', reason: 'Mantiene momentum' },
    { day: 'Viernes', sessions: 75, preference: 'Media', reason: 'Preparación fin semana' },
    { day: 'Sábado', sessions: 45, preference: 'Baja', reason: 'Fin de semana' },
    { day: 'Domingo', sessions: 25, preference: 'Muy Baja', reason: 'Día familiar' }
  ];

  // Análisis de horarios (datos simulados)
  const hourlyPatterns = [
    { hour: '09:00', bookings: 65, demand: 'Media' },
    { hour: '10:00', bookings: 85, demand: 'Alta' },
    { hour: '11:00', bookings: 95, demand: 'Muy Alta' },
    { hour: '12:00', bookings: 70, demand: 'Media' },
    { hour: '15:00', bookings: 80, demand: 'Alta' },
    { hour: '16:00', bookings: 100, demand: 'Muy Alta' },
    { hour: '17:00', bookings: 110, demand: 'Pico' },
    { hour: '18:00', bookings: 90, demand: 'Alta' },
    { hour: '19:00', bookings: 60, demand: 'Media' }
  ];

  function getTypeColor(type: string): string {
    const colors = {
      high: 'bg-green-100 text-green-700 border-green-300',
      medium: 'bg-blue-100 text-blue-700 border-blue-300',
      low: 'bg-red-100 text-red-700 border-red-300'
    };
    return colors[type as keyof typeof colors] || colors.medium;
  }

  function getTypeIcon(type: string) {
    const icons = {
      high: TrendingUp,
      medium: Calendar,
      low: TrendingDown
    };
    return icons[type as keyof typeof icons] || Calendar;
  }

  function getDemandColor(demand: string): string {
    const colors = {
      'Muy Alta': 'bg-green-500',
      'Pico': 'bg-green-600',
      'Alta': 'bg-blue-500',
      'Media': 'bg-yellow-500',
      'Baja': 'bg-orange-500',
      'Muy Baja': 'bg-red-500'
    };
    return colors[demand as keyof typeof colors] || 'bg-gray-500';
  }

  function getBarHeight(value: number, max: number): number {
    return Math.max((value / max) * 100, 5);
  }

  let maxWeeklyValue = $derived(Math.max(...weeklyPatterns.map(p => p.sessions)));
  let maxHourlyValue = $derived(Math.max(...hourlyPatterns.map(p => p.bookings)));
</script>

<div class="space-y-6">
  <!-- Análisis estacional por meses -->
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <Calendar class="h-5 w-5" />
        Patrones Estacionales
      </CardTitle>
      <CardDescription>Tendencias históricas y comportamiento por temporadas</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {#each seasonalPatterns as pattern}
          {@const TypeIcon = getTypeIcon(pattern.type)}
          
          <div class="p-4 border rounded-lg hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between mb-2">
              <h4 class="font-medium text-gray-900">{pattern.month}</h4>
              <div class="flex items-center space-x-2">
                <Badge class={getTypeColor(pattern.type)}>
                  <!-- svelte-ignore svelte_component_deprecated -->
                  <svelte:component this={TypeIcon} class="w-3 h-3 mr-1" />
                  {pattern.trend}
                </Badge>
              </div>
            </div>
            
            <p class="text-sm font-medium text-gray-700 mb-1">{pattern.description}</p>
            <p class="text-xs text-gray-600 mb-3">{pattern.reason}</p>
            
            <div class="space-y-1">
              <div class="text-xs font-medium text-gray-700">Recomendaciones:</div>
              {#each pattern.recommendations as rec}
                <div class="text-xs text-blue-600">• {rec}</div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </CardContent>
  </Card>

  <!-- Comparación datos reales vs histórico -->
  <Card>
    <CardHeader>
      <CardTitle>Comparación: Real vs Histórico</CardTitle>
      <CardDescription>Cómo se comportan tus datos vs patrones típicos</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="space-y-4">
        {#each realPatterns() as real}
          {@const historical = seasonalPatterns.find(p => p.month.startsWith(real.month.split(' ')[0]))}
          
          <div class="flex items-center justify-between p-3 border rounded-lg">
            <div class="flex items-center space-x-4">
              <span class="font-medium min-w-20">{real.month}</span>
              <div class="flex items-center space-x-2">
                <span class="text-sm text-gray-600">Real:</span>
                <Badge class={real.change > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                  {real.change > 0 ? '+' : ''}{real.change.toFixed(1)}%
                </Badge>
              </div>
            </div>
            
            <div class="flex items-center space-x-4">
              <div class="flex items-center space-x-2">
                <span class="text-sm text-gray-600">Histórico:</span>
                <span class="text-sm font-medium">{historical?.trend || 'N/A'}</span>
              </div>
              {#if historical}
                <Badge variant="outline" class={
                  Math.abs(real.change - parseFloat(historical.trend.replace('%', ''))) < 5 ? 
                  'border-green-200 text-green-700' : 'border-yellow-200 text-yellow-700'
                }>
                  {Math.abs(real.change - parseFloat(historical.trend.replace('%', ''))) < 5 ? 'Esperado' : 'Atípico'}
                </Badge>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </CardContent>
  </Card>

  <!-- Patrones semanales -->
  <Card>
    <CardHeader>
      <CardTitle>Patrones por Día de la Semana</CardTitle>
      <CardDescription>Distribución de demanda semanal</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="space-y-4">
        <!-- Gráfico de barras semanal -->
        <div class="h-32 bg-gray-50 rounded-lg p-4 flex items-end justify-between space-x-2">
          {#each weeklyPatterns as day}
            <div class="flex-1 flex flex-col items-center">
              <div 
                class="w-full bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600 mb-2"
                style="height: {getBarHeight(day.sessions, maxWeeklyValue)}%"
                title="{day.day}: {day.sessions} sesiones"
              ></div>
              <span class="text-xs text-gray-600 transform -rotate-45">{day.day.slice(0, 3)}</span>
            </div>
          {/each}
        </div>

        <!-- Detalles por día -->
        <div class="grid md:grid-cols-2 gap-4">
          {#each weeklyPatterns as day}
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div>
                <span class="font-medium">{day.day}</span>
                <span class="text-sm text-gray-600 ml-2">{day.sessions} sesiones</span>
              </div>
              <div class="text-right">
                <Badge class={getDemandColor(day.preference) + ' text-white text-xs'}>
                  {day.preference}
                </Badge>
                <div class="text-xs text-gray-500 mt-1">{day.reason}</div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </CardContent>
  </Card>

  <!-- Patrones horarios -->
  <Card>
    <CardHeader>
      <CardTitle>Distribución Horaria</CardTitle>
      <CardDescription>Demanda por franjas horarias</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="space-y-4">
        <!-- Gráfico horario -->
        <div class="h-32 bg-gray-50 rounded-lg p-4 flex items-end justify-between space-x-1">
          {#each hourlyPatterns as hour}
            <div class="flex-1 flex flex-col items-center">
              <div 
                class="w-full {getDemandColor(hour.demand)} rounded-t transition-all duration-300 mb-2"
                style="height: {getBarHeight(hour.bookings, maxHourlyValue)}%"
                title="{hour.hour}: {hour.bookings} reservas ({hour.demand})"
              ></div>
              <span class="text-xs text-gray-600 transform -rotate-45">{hour.hour}</span>
            </div>
          {/each}
        </div>

        <!-- Insights horarios -->
        <div class="grid md:grid-cols-3 gap-4">
          <div class="p-3 bg-green-50 rounded-lg text-center">
            <div class="text-lg font-bold text-green-600">17:00</div>
            <div class="text-sm text-green-800">Hora pico</div>
          </div>
          <div class="p-3 bg-blue-50 rounded-lg text-center">
            <div class="text-lg font-bold text-blue-600">10:00-11:00</div>
            <div class="text-sm text-blue-800">Mejor franja mañana</div>
          </div>
          <div class="p-3 bg-yellow-50 rounded-lg text-center">
            <div class="text-lg font-bold text-yellow-600">15:00-18:00</div>
            <div class="text-sm text-yellow-800">Franja óptima</div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>

  <!-- Recomendaciones estratégicas -->
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <AlertCircle class="h-5 w-5" />
        Recomendaciones Estratégicas
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <h4 class="font-medium text-gray-900 mb-3">Optimización Estacional</h4>
          <div class="space-y-2">
            <div class="p-3 bg-blue-50 border border-blue-200 rounded">
              <div class="text-sm font-medium text-blue-900">Diciembre-Enero</div>
              <div class="text-xs text-blue-800">Planifica vacaciones en diciembre, maximiza enero.</div>
            </div>
            <div class="p-3 bg-green-50 border border-green-200 rounded">
              <div class="text-sm font-medium text-green-900">Julio-Agosto</div>
              <div class="text-xs text-green-800">Ofrece sesiones online, horarios flexibles.</div>
            </div>
            <div class="p-3 bg-purple-50 border border-purple-200 rounded">
              <div class="text-sm font-medium text-purple-900">Septiembre</div>
              <div class="text-xs text-purple-800">Campaña "vuelta al cole" para toda la familia.</div>
            </div>
          </div>
        </div>

        <div>
          <h4 class="font-medium text-gray-900 mb-3">Optimización Semanal</h4>
          <div class="space-y-2">
            <div class="p-3 bg-yellow-50 border border-yellow-200 rounded">
              <div class="text-sm font-medium text-yellow-900">Lunes-Martes</div>
              <div class="text-xs text-yellow-800">Promociona con descuentos especiales.</div>
            </div>
            <div class="p-3 bg-green-50 border border-green-200 rounded">
              <div class="text-sm font-medium text-green-900">Miércoles-Jueves</div>
              <div class="text-xs text-green-800">Días pico, mantén precios normales.</div>
            </div>
            <div class="p-3 bg-orange-50 border border-orange-200 rounded">
              <div class="text-sm font-medium text-orange-900">Fin de Semana</div>
              <div class="text-xs text-orange-800">Reserva para casos urgentes o servicios premium.</div>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</div>