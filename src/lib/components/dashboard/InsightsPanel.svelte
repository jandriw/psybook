<!-- src/lib/components/dashboard/InsightsPanel.svelte -->
<script lang="ts">
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { 
    Lightbulb, 
    TrendingUp, 
    AlertTriangle, 
    Info, 
    CheckCircle,
    ArrowRight,
    Target,
    Zap
  } from 'lucide-svelte';

  interface Insight {
    type: 'success' | 'warning' | 'info' | 'tip';
    title: string;
    message: string;
    action: string;
  }

  let { insights }: { insights: Insight[] } = $props();

  type InsightType = 'success' | 'warning' | 'info' | 'tip';

  function getInsightIcon(type: InsightType) {
    const icons = {
      success: CheckCircle,
      warning: AlertTriangle,
      info: Info,
      tip: Lightbulb
    } as const;
    return icons[type] || Info;
  }

  function getInsightStyles(type: InsightType) {
    const styles = {
      success: {
        container: 'bg-green-50 border-green-200',
        icon: 'text-green-600',
        title: 'text-green-900',
        message: 'text-green-800',
        badge: 'bg-green-100 text-green-700 border-green-300'
      },
      warning: {
        container: 'bg-yellow-50 border-yellow-200',
        icon: 'text-yellow-600',
        title: 'text-yellow-900',
        message: 'text-yellow-800',
        badge: 'bg-yellow-100 text-yellow-700 border-yellow-300'
      },
      info: {
        container: 'bg-blue-50 border-blue-200',
        icon: 'text-blue-600',
        title: 'text-blue-900',
        message: 'text-blue-800',
        badge: 'bg-blue-100 text-blue-700 border-blue-300'
      },
      tip: {
        container: 'bg-purple-50 border-purple-200',
        icon: 'text-purple-600',
        title: 'text-purple-900',
        message: 'text-purple-800',
        badge: 'bg-purple-100 text-purple-700 border-purple-300'
      }
    } as const;
    return styles[type] || styles.info;
  }

  function handleInsightAction(insight: Insight) {
    // Aquí implementarías las acciones específicas
    switch (insight.action) {
      case 'Mantener calidad':
        alert('Sugerencias para mantener calidad:\n\n• Continuar con el protocolo actual\n• Solicitar feedback regular\n• Monitorear satisfacción del cliente');
        break;
      case 'Optimizar precio':
        alert('Estrategias de optimización:\n\n• Analizar precios de competencia\n• Considerar promociones temporales\n• Evaluar packs o descuentos\n• Revisar valor percibido');
        break;
      case 'Aumentar slots':
        alert('Recomendaciones para más slots:\n\n• Revisar horarios de mayor demanda\n• Considerar ampliar horario\n• Optimizar duración de sesiones\n• Evaluar lista de espera');
        break;
      case 'Continuar estrategia':
        alert('Plan para mantener crecimiento:\n\n• Mantener calidad actual\n• Expandir marketing efectivo\n• Fidelizar clientes actuales\n• Considerar nuevos servicios');
        break;
      default:
        alert(`Acción: ${insight.action}`);
    }
  }
</script>

<Card>
  <CardHeader>
    <CardTitle class="flex items-center gap-2">
      <Lightbulb class="h-5 w-5 text-yellow-500" />
      Insights Automáticos
    </CardTitle>
  </CardHeader>
  <CardContent class="space-y-4">
    {#if insights.length === 0}
      <div class="text-center py-8">
        <Lightbulb class="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">Sin insights disponibles</h3>
        <p class="text-gray-600">Los insights se generarán automáticamente basándose en tu actividad.</p>
      </div>
    {:else}
      {#each insights as insight, index}
        {@const icon = getInsightIcon(insight.type as InsightType)}
        {@const styles = getInsightStyles(insight.type as InsightType)}
        
        <div class="border rounded-lg p-4 {styles.container}">
          <div class="flex items-start space-x-3">
            <!-- Icon -->
            <div class="flex-shrink-0">
              <!-- svelte-ignore svelte_component_deprecated -->
              <svelte:component this={icon} class="h-5 w-5 {styles.icon}" />
            </div>
            
            <!-- Content -->
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <h4 class="font-medium {styles.title}">{insight.title}</h4>
                  <p class="text-sm {styles.message} mt-1">{insight.message}</p>
                </div>
                
                <!-- Action Badge -->
                <Badge variant="outline" class="{styles.badge} ml-2">
                  {insight.action}
                </Badge>
              </div>
              
              <!-- Action Button -->
              <div class="mt-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  class="bg-transparent {styles.icon} border-current hover:bg-white/50"
                  onclick={() => handleInsightAction(insight)}
                >
                  <Target class="mr-2 h-3 w-3" />
                  Aplicar Sugerencia
                  <ArrowRight class="ml-2 h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      {/each}
    {/if}

    <!-- Summary of insights -->
    {#if insights.length > 0}
      <div class="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <Zap class="h-4 w-4 text-blue-600" />
            <span class="text-sm font-medium text-gray-900">
              {insights.length} insights disponibles
            </span>
          </div>
          
          <!-- Breakdown by type -->
          <div class="flex items-center space-x-2">
            {#each ['success', 'warning', 'info'] as insightType}
              {@const count = insights.filter(i => i.type === insightType).length}
              {#if count > 0}
                <Badge class="bg-{insightType === 'success' ? 'green' : insightType === 'warning' ? 'yellow' : 'blue'}-100 text-{insightType === 'success' ? 'green' : insightType === 'warning' ? 'yellow' : 'blue'}-700 text-xs">
                  {count} {insightType === 'success' ? 'éxitos' : insightType === 'warning' ? 'oportunidades' : 'info'}
                </Badge>
              {/if}
            {/each}
          </div>
        </div>
      </div>
    {/if}
  </CardContent>
</Card>