<!-- src/lib/components/adashboard/BusinessForecasting.svelte -->
<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { Progress } from '$lib/components/ui/progress';
  import { Zap, TrendingUp, Target, AlertTriangle, CheckCircle } from 'lucide-svelte';

  interface MonthlyData {
    month: string;
    revenue: number;
    sessions: number;
    clients: number;
    newClients: number;
    avgSessionValue: number;
  }

  interface Projections {
    nextMonth: {
      revenue: number;
      sessions: number;
      confidence: number;
    };
    next3Months: {
      revenue: number;
      sessions: number;
      confidence: number;
    };
    nextYear: {
      revenue: number;
      sessions: number;
      confidence: number;
    };
  }

  let { 
    projections,
    monthlyData
  }: {
    projections: Projections;
    monthlyData: MonthlyData[];
  } = $props();

  // Escenarios de crecimiento
  const growthScenarios = [
    {
      name: 'Conservador',
      description: 'Crecimiento manteniendo tendencia actual',
      monthlyGrowth: 2,
      yearRevenue: 52400,
      probability: 85,
      factors: ['Mantener calidad actual', 'Sin cambios de precio', 'Crecimiento orgánico']
    },
    {
      name: 'Realista', 
      description: 'Crecimiento con mejoras incrementales',
      monthlyGrowth: 5,
      yearRevenue: 58400,
      probability: 65,
      factors: ['Subida precios 10%', 'Nuevos servicios', 'Marketing digital']
    },
    {
      name: 'Optimista',
      description: 'Crecimiento con expansión agresiva',
      monthlyGrowth: 10,
      yearRevenue: 72800,
      probability: 35,
      factors: ['Subida precios 20%', 'Horarios extendidos', 'Equipo adicional']
    }
  ];

  // Metas y objetivos
  const businessGoals = [
    {
      goal: 'Alcanzar €60,000 anuales',
      currentProgress: 47,
      timeframe: '8 meses restantes',
      onTrack: true,
      requiredMonthlyGrowth: 3.5,
      actions: ['Mantener ritmo actual', 'Optimizar conversión']
    },
    {
      goal: '100 clientes activos',
      currentProgress: 89,
      timeframe: '4 meses',
      onTrack: true,
      requiredMonthlyGrowth: 2.8,
      actions: ['Campaña referidos', 'Marketing local']
    },
    {
      goal: 'Retención >90%',
      currentProgress: 87,
      timeframe: '6 meses',
      onTrack: false,
      requiredMonthlyGrowth: 0.5,
      actions: ['Programa fidelización', 'Seguimiento post-sesión']
    },
    {
      goal: '€80/hora promedio',
      currentProgress: 92,
      timeframe: '3 meses',
      onTrack: true,
      requiredMonthlyGrowth: 2.7,
      actions: ['Revisar precios', 'Servicios premium']
    }
  ];

  // Factores de riesgo
  const riskFactors = [
    {
      risk: 'Competencia nueva',
      impact: 'medio',
      probability: 'media',
      mitigation: 'Diferenciación y fidelización',
      timeframe: '6-12 meses'
    },
    {
      risk: 'Cambios regulatorios',
      impact: 'bajo',
      probability: 'baja',
      mitigation: 'Mantenerse informado',
      timeframe: '12+ meses'
    },
    {
      risk: 'Recesión económica',
      impact: 'alto',
      probability: 'media',
      mitigation: 'Diversificar servicios y precios',
      timeframe: '3-6 meses'
    },
    {
      risk: 'Cambios en demanda',
      impact: 'medio',
      probability: 'alta',
      mitigation: 'Adaptabilidad y nuevos servicios',
      timeframe: '1-3 meses'
    }
  ];

  function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(amount);
  }

  function getConfidenceColor(confidence: number): string {
    if (confidence >= 80) return 'text-green-600';
    if (confidence >= 60) return 'text-yellow-600';
    return 'text-red-600';
  }

  function getRiskColor(level: string): string {
    const colors = {
      alto: 'bg-red-100 text-red-700 border-red-300',
      medio: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      bajo: 'bg-green-100 text-green-700 border-green-300'
    };
    return colors[level as keyof typeof colors] || colors.medio;
  }

  function getProbabilityColor(prob: string): string {
    const colors = {
      alta: 'bg-red-500',
      media: 'bg-yellow-500', 
      baja: 'bg-green-500'
    };
    return colors[prob as keyof typeof colors] || colors.media;
  }

  function getScenarioColor(probability: number): string {
    if (probability >= 70) return 'border-green-200 bg-green-50';
    if (probability >= 50) return 'border-blue-200 bg-blue-50';
    return 'border-yellow-200 bg-yellow-50';
  }
</script>

<div class="space-y-6">
  <!-- Proyecciones principales -->
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center gap-2 text-2xl">
        <Zap class="h-6 w-6" />
        Proyecciones de Negocio
      </CardTitle>
      <CardDescription>Predicciones basadas en tendencias actuales y machine learning</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="grid gap-4 md:grid-cols-3">
        <!-- Próximo mes -->
        <div class="p-4 border rounded-lg">
          <div class="flex items-center justify-between mb-3">
            <h4 class="font-medium text-gray-900">Próximo Mes</h4>
            <Badge class={getConfidenceColor(projections.nextMonth.confidence)}>
              {projections.nextMonth.confidence}% confianza
            </Badge>
          </div>
          <div class="space-y-2">
            <div>
              <div class="text-2xl font-bold text-green-600">{formatCurrency(projections.nextMonth.revenue)}</div>
              <div class="text-sm text-gray-600">Ingresos proyectados</div>
            </div>
            <div>
              <div class="text-lg font-semibold text-blue-600">{projections.nextMonth.sessions}</div>
              <div class="text-sm text-gray-600">Sesiones estimadas</div>
            </div>
          </div>
        </div>

        <!-- Próximos 3 meses -->
        <div class="p-4 border rounded-lg">
          <div class="flex items-center justify-between mb-3">
            <h4 class="font-medium text-gray-900">Próximos 3 Meses</h4>
            <Badge class={getConfidenceColor(projections.next3Months.confidence)}>
              {projections.next3Months.confidence}% confianza
            </Badge>
          </div>
          <div class="space-y-2">
            <div>
              <div class="text-2xl font-bold text-green-600">{formatCurrency(projections.next3Months.revenue)}</div>
              <div class="text-sm text-gray-600">Ingresos proyectados</div>
            </div>
            <div>
              <div class="text-lg font-semibold text-blue-600">{projections.next3Months.sessions}</div>
              <div class="text-sm text-gray-600">Sesiones estimadas</div>
            </div>
          </div>
        </div>

        <!-- Próximo año -->
        <div class="p-4 border rounded-lg">
          <div class="flex items-center justify-between mb-3">
            <h4 class="font-medium text-gray-900">Próximo Año</h4>
            <Badge class={getConfidenceColor(projections.nextYear.confidence)}>
              {projections.nextYear.confidence}% confianza
            </Badge>
          </div>
          <div class="space-y-2">
            <div>
              <div class="text-2xl font-bold text-green-600">{formatCurrency(projections.nextYear.revenue)}</div>
              <div class="text-sm text-gray-600">Ingresos proyectados</div>
            </div>
            <div>
              <div class="text-lg font-semibold text-blue-600">{projections.nextYear.sessions}</div>
              <div class="text-sm text-gray-600">Sesiones estimadas</div>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>

  <!-- Escenarios de crecimiento -->
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <TrendingUp class="h-5 w-5" />
        Escenarios de Crecimiento
      </CardTitle>
      <CardDescription>Diferentes proyecciones según estrategias de crecimiento</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="space-y-4">
        {#each growthScenarios as scenario}
          <div class="p-4 border rounded-lg {getScenarioColor(scenario.probability)}">
            <div class="flex items-start justify-between mb-3">
              <div>
                <h4 class="font-semibold text-gray-900">{scenario.name}</h4>
                <p class="text-sm text-gray-600">{scenario.description}</p>
              </div>
              <Badge variant="outline" class="bg-white">
                {scenario.probability}% probabilidad
              </Badge>
            </div>
            
            <div class="grid md:grid-cols-3 gap-4 mb-3">
              <div class="text-center">
                <div class="text-xl font-bold text-green-600">+{scenario.monthlyGrowth}%</div>
                <div class="text-xs text-gray-600">Crecimiento mensual</div>
              </div>
              <div class="text-center">
                <div class="text-xl font-bold text-blue-600">{formatCurrency(scenario.yearRevenue)}</div>
                <div class="text-xs text-gray-600">Ingresos anuales</div>
              </div>
              <div class="text-center">
                <div class="text-xl font-bold text-purple-600">{Math.round((scenario.yearRevenue - 28450) / 28450 * 100)}%</div>
                <div class="text-xs text-gray-600">vs actual</div>
              </div>
            </div>
            
            <div>
              <div class="text-sm font-medium text-gray-700 mb-2">Factores clave:</div>
              <div class="flex flex-wrap gap-2">
                {#each scenario.factors as factor}
                  <Badge variant="outline" class="text-xs bg-white">{factor}</Badge>
                {/each}
              </div>
            </div>
          </div>
        {/each}
      </div>
    </CardContent>
  </Card>

  <!-- Objetivos y metas -->
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <Target class="h-5 w-5" />
        Seguimiento de Objetivos
      </CardTitle>
      <CardDescription>Progreso hacia metas estratégicas del negocio</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="space-y-4">
        {#each businessGoals as goal}
          <div class="p-4 border rounded-lg">
            <div class="flex items-start justify-between mb-3">
              <div class="flex-1">
                <h4 class="font-medium text-gray-900">{goal.goal}</h4>
                <p class="text-sm text-gray-600">{goal.timeframe}</p>
              </div>
              <div class="flex items-center space-x-2">
                {#if goal.onTrack}
                  <CheckCircle class="h-5 w-5 text-green-600" />
                  <Badge class="bg-green-100 text-green-700">En camino</Badge>
                {:else}
                  <AlertTriangle class="h-5 w-5 text-yellow-600" />
                  <Badge class="bg-yellow-100 text-yellow-700">Atención</Badge>
                {/if}
              </div>
            </div>
            
            <div class="space-y-3">
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span>Progreso actual</span>
                  <span class="font-medium">{goal.currentProgress}%</span>
                </div>
                <Progress value={goal.currentProgress} class="h-2" />
              </div>
              
              <div class="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span class="text-gray-600">Crecimiento requerido:</span>
                  <span class="font-medium ml-2">{goal.requiredMonthlyGrowth}%/mes</span>
                </div>
                <div>
                  <span class="text-gray-600">Estado:</span>
                  <span class="font-medium ml-2 {goal.onTrack ? 'text-green-600' : 'text-yellow-600'}">
                    {goal.onTrack ? 'Alcanzable' : 'Requiere acción'}
                  </span>
                </div>
              </div>
              
              <div>
                <div class="text-sm font-medium text-gray-700 mb-1">Acciones recomendadas:</div>
                <div class="flex flex-wrap gap-2">
                  {#each goal.actions as action}
                    <Badge variant="outline" class="text-xs">{action}</Badge>
                  {/each}
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </CardContent>
  </Card>

  <!-- Análisis de riesgos -->
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <AlertTriangle class="h-5 w-5" />
        Análisis de Riesgos
      </CardTitle>
      <CardDescription>Factores que podrían impactar las proyecciones</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="space-y-4">
        {#each riskFactors as risk}
          <div class="p-4 border rounded-lg">
            <div class="flex items-start justify-between mb-3">
              <div>
                <h4 class="font-medium text-gray-900">{risk.risk}</h4>
                <p class="text-sm text-gray-600">Ventana: {risk.timeframe}</p>
              </div>
              <div class="flex items-center space-x-2">
                <Badge class={getRiskColor(risk.impact)}>
                  Impacto {risk.impact}
                </Badge>
              </div>
            </div>
            
            <div class="grid md:grid-cols-3 gap-4 mb-3">
              <div>
                <div class="text-sm text-gray-600 mb-1">Probabilidad</div>
                <div class="flex items-center space-x-2">
                  <div class="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      class="{getProbabilityColor(risk.probability)} h-2 rounded-full"
                      style="width: {risk.probability === 'alta' ? '80' : risk.probability === 'media' ? '50' : '20'}%"
                    ></div>
                  </div>
                  <span class="text-sm font-medium capitalize">{risk.probability}</span>
                </div>
              </div>
              
              <div class="md:col-span-2">
                <div class="text-sm text-gray-600 mb-1">Estrategia de mitigación</div>
                <p class="text-sm font-medium text-gray-900">{risk.mitigation}</p>
              </div>
            </div>
          </div>
        {/each}
      </div>
      
      <!-- Puntuación general de riesgo -->
      <div class="mt-6 p-4 bg-gray-50 rounded-lg">
        <div class="flex items-center justify-between mb-2">
          <span class="font-medium text-gray-900">Puntuación General de Riesgo</span>
          <span class="text-2xl font-bold text-yellow-600">Medio</span>
        </div>
        <Progress value={45} class="h-3 mb-2" />
        <p class="text-sm text-gray-600">
          Nivel de riesgo moderado. Mantén monitoreo regular y planes de contingencia actualizados.
        </p>
      </div>
    </CardContent>
  </Card>

  <!-- Recomendaciones estratégicas -->
  <Card>
    <CardHeader>
      <CardTitle>Plan de Acción Estratégico</CardTitle>
      <CardDescription>Recomendaciones basadas en el análisis predictivo</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <h4 class="font-medium text-gray-900 mb-3">Próximos 30 días</h4>
          <div class="space-y-2">
            <div class="p-3 bg-green-50 border border-green-200 rounded">
              <div class="text-sm font-medium text-green-900">Alta Prioridad</div>
              <div class="text-xs text-green-800">Optimizar horarios de alta demanda (16:00-18:00)</div>
            </div>
            <div class="p-3 bg-blue-50 border border-blue-200 rounded">
              <div class="text-sm font-medium text-blue-900">Media Prioridad</div>
              <div class="text-xs text-blue-800">Revisar precios de servicios menos populares</div>
            </div>
          </div>
        </div>

        <div>
          <h4 class="font-medium text-gray-900 mb-3">Próximos 90 días</h4>
          <div class="space-y-2">
            <div class="p-3 bg-purple-50 border border-purple-200 rounded">
              <div class="text-sm font-medium text-purple-900">Estratégico</div>
              <div class="text-xs text-purple-800">Desarrollar programa de fidelización para clientes VIP</div>
            </div>
            <div class="p-3 bg-yellow-50 border border-yellow-200 rounded">
              <div class="text-sm font-medium text-yellow-900">Preparación</div>
              <div class="text-xs text-yellow-800">Planificar estrategia para temporada baja (julio-agosto)</div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 p-4 border-l-4 border-blue-500 bg-blue-50">
        <h4 class="font-medium text-blue-900 mb-2">💡 Insight Clave</h4>
        <p class="text-sm text-blue-800">
          Basándose en las tendencias actuales, estás en camino de superar los objetivos anuales en un 12%. 
          Considera reinvertir en marketing digital y nuevos servicios para acelerar el crecimiento.
        </p>
      </div>
    </CardContent>
  </Card>
</div>