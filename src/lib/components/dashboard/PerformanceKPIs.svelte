<!-- src/lib/components/dashboard/PerformanceKPIs.svelte -->
<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { Progress } from '$lib/components/ui/progress';
  import { Target, TrendingUp, Zap, Settings } from 'lucide-svelte';

  interface KPIMetric {
    name: string;
    value: string;
    status: 'excellent' | 'good' | 'warning' | 'poor';
    target: string;
  }

  interface KPICategory {
    category: string;
    metrics: KPIMetric[];
  }

  let { 
    strategicKPIs,
    onOptimize = () => {},
    onSetTarget = () => {}
  }: {
    strategicKPIs: KPICategory[];
    onOptimize: (metric: string) => void;
    onSetTarget: (kpi: string) => void;
  } = $props();

  // ✅ Calcular métricas con $derived en lugar de {@const}
  let allMetrics = $derived(strategicKPIs.flatMap(cat => cat.metrics));
  
  let excellentCount = $derived(allMetrics.filter(m => m.status === 'excellent').length);
  let goodCount = $derived(allMetrics.filter(m => m.status === 'good').length);
  let warningCount = $derived(allMetrics.filter(m => m.status === 'warning').length);
  let poorCount = $derived(allMetrics.filter(m => m.status === 'poor').length);
  
  let totalScore = $derived(excellentCount * 4 + goodCount * 3 + warningCount * 2 + poorCount * 1);
  let maxScore = $derived(allMetrics.length * 4);
  let scorePercentage = $derived(Math.round((totalScore / maxScore) * 100));

  function getStatusConfig(status: string) {
    const configs = {
      excellent: {
        color: 'bg-green-100 text-green-700 border-green-300',
        icon: '🎯',
        description: 'Superando expectativas'
      },
      good: {
        color: 'bg-blue-100 text-blue-700 border-blue-300',
        icon: '👍',
        description: 'Dentro del objetivo'
      },
      warning: {
        color: 'bg-yellow-100 text-yellow-700 border-yellow-300',
        icon: '⚠️',
        description: 'Atención requerida'
      },
      poor: {
        color: 'bg-red-100 text-red-700 border-red-300',
        icon: '🚨',
        description: 'Necesita mejora urgente'
      }
    };
    return configs[status as keyof typeof configs] || configs.good;
  }

  function getCategoryIcon(category: string) {
    const icons = {
      'Crecimiento': TrendingUp,
      'Retención': Target,
      'Eficiencia': Zap
    };
    return icons[category as keyof typeof icons] || Target;
  }

  function getProgressValue(metric: KPIMetric): number {
    // Extraer números de las strings para calcular progreso
    const valueNum = parseFloat(metric.value.replace(/[^0-9.-]/g, ''));
    const targetNum = parseFloat(metric.target.replace(/[^0-9.-]/g, ''));
    
    if (isNaN(valueNum) || isNaN(targetNum) || targetNum === 0) return 75; // Default
    
    return Math.min((valueNum / targetNum) * 100, 100);
  }

  function getScoreMessage(percentage: number): string {
    if (percentage >= 90) return '🎉 Excelente rendimiento general. Tu negocio está en el top 10% del sector.';
    if (percentage >= 75) return '👍 Buen rendimiento. Algunas áreas de mejora identificadas.';
    if (percentage >= 60) return '⚠️ Rendimiento aceptable. Varias áreas necesitan atención.';
    return '🚨 Rendimiento bajo. Se requiere plan de mejora integral.';
  }

  function getScoreColor(percentage: number): string {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 75) return 'text-blue-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  }
</script>

<Card>
  <CardHeader>
    <CardTitle class="flex items-center gap-2 text-2xl">
      <Target class="h-6 w-6" />
      KPIs Estratégicos
    </CardTitle>
    <CardDescription>
      Indicadores clave de rendimiento del negocio
    </CardDescription>
  </CardHeader>
  <CardContent class="space-y-6">
    {#each strategicKPIs as category}
      {@const CategoryIcon = getCategoryIcon(category.category)}
      
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <!-- svelte-ignore svelte_component_deprecated -->
          <svelte:component this={CategoryIcon} class="h-5 w-5" />
          {category.category}
        </h3>
        
        <div class="grid gap-4 md:grid-cols-3">
          {#each category.metrics as metric}
            {@const statusConfig = getStatusConfig(metric.status)}
            {@const progressValue = getProgressValue(metric)}
            
            <div class="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div class="flex items-start justify-between mb-3">
                <div class="flex-1">
                  <h4 class="font-medium text-gray-900 text-sm">{metric.name}</h4>
                  <div class="text-2xl font-bold text-gray-900 mt-1">{metric.value}</div>
                </div>
                <Badge class={statusConfig.color + ' text-xs'}>
                  {statusConfig.icon}
                </Badge>
              </div>

              <!-- Progress vs Target -->
              <div class="space-y-2">
                <div class="flex justify-between text-xs text-gray-600">
                  <span>Objetivo: {metric.target}</span>
                  <span>{Math.round(progressValue)}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    class="h-2 rounded-full transition-all duration-500 {
                      metric.status === 'excellent' ? 'bg-green-500' :
                      metric.status === 'good' ? 'bg-blue-500' :
                      metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }"
                    style="width: {progressValue}%"
                  ></div>
                </div>
              </div>

              <!-- Status & Actions -->
              <div class="mt-3 flex items-center justify-between">
                <span class="text-xs text-gray-500">{statusConfig.description}</span>
                <div class="flex space-x-1">
                  <Button 
                    size="sm" 
                    variant="outline"
                    class="h-6 px-2 text-xs bg-transparent"
                    onclick={() => onSetTarget(metric.name)}
                  >
                    <Settings class="w-3 h-3 mr-1" />
                    Meta
                  </Button>
                  {#if metric.status === 'warning' || metric.status === 'poor'}
                    <Button 
                      size="sm" 
                      variant="outline"
                      class="h-6 px-2 text-xs bg-transparent text-blue-600"
                      onclick={() => onOptimize(metric.name)}
                    >
                      <Zap class="w-3 h-3 mr-1" />
                      Mejorar
                    </Button>
                  {/if}
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/each}

    <!-- Resumen general -->
    <div class="pt-6 border-t">
      <div class="grid md:grid-cols-4 gap-4">
        <div class="text-center p-3 bg-green-50 rounded-lg">
          <div class="text-2xl font-bold text-green-600">{excellentCount}</div>
          <div class="text-sm text-green-800">Excelentes</div>
        </div>
        
        <div class="text-center p-3 bg-blue-50 rounded-lg">
          <div class="text-2xl font-bold text-blue-600">{goodCount}</div>
          <div class="text-sm text-blue-800">Buenos</div>
        </div>
        
        <div class="text-center p-3 bg-yellow-50 rounded-lg">
          <div class="text-2xl font-bold text-yellow-600">{warningCount}</div>
          <div class="text-sm text-yellow-800">Atención</div>
        </div>
        
        <div class="text-center p-3 bg-red-50 rounded-lg">
          <div class="text-2xl font-bold text-red-600">{poorCount}</div>
          <div class="text-sm text-red-800">Críticos</div>
        </div>
      </div>

      <!-- Puntuación general -->
      <div class="mt-4 p-4 bg-gray-50 rounded-lg">
        <div class="flex items-center justify-between mb-2">
          <span class="font-medium text-gray-900">Puntuación General del Negocio</span>
          <span class="text-2xl font-bold {getScoreColor(scorePercentage)}">
            {scorePercentage}/100
          </span>
        </div>
        
        <Progress value={scorePercentage} class="h-3" />
        
        <p class="text-sm text-gray-600 mt-2">
          {getScoreMessage(scorePercentage)}
        </p>
      </div>
    </div>
  </CardContent>
</Card>