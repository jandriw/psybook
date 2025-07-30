<!-- src/lib/components/analytics/ExportReports.svelte -->
<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { Download, FileText, BarChart3, Users, Euro, Calendar } from 'lucide-svelte';

  let { 
    onExport = () => {},
    selectedPeriod = 'year'
  }: {
    onExport: (type: string) => void;
    selectedPeriod: string;
  } = $props();

  const reportTypes = [
    {
      id: 'executive',
      name: 'Reporte Ejecutivo',
      description: 'Resumen completo del negocio para stakeholders',
      icon: BarChart3,
      pages: '8-12 páginas',
      includes: [
        'KPIs principales y tendencias',
        'Análisis financiero detallado',
        'Segmentación de clientes',
        'Proyecciones y recomendaciones'
      ],
      format: 'PDF',
      estimatedTime: '2 min'
    },
    {
      id: 'financial',
      name: 'Análisis Financiero',
      description: 'Desglose detallado de ingresos y métricas financieras',
      icon: Euro,
      pages: '6-8 páginas',
      includes: [
        'Evolución de ingresos mensual',
        'Análisis por servicios',
        'Costos e ROI',
        'Comparativas período anterior'
      ],
      format: 'PDF + Excel',
      estimatedTime: '3 min'
    },
    {
      id: 'clients',
      name: 'Informe de Clientes',
      description: 'Análisis completo de base de clientes y retención',
      icon: Users,
      pages: '5-7 páginas',
      includes: [
        'Segmentación y demografía',
        'Análisis de retención',
        'Valor de vida del cliente',
        'Patrones de comportamiento'
      ],
      format: 'PDF',
      estimatedTime: '2 min'
    },
    {
      id: 'operational',
      name: 'Reporte Operacional',
      description: 'Métricas operativas y eficiencia del negocio',
      icon: Calendar,
      pages: '4-6 páginas',
      includes: [
        'Utilización de horarios',
        'Productividad por día/hora',
        'Análisis de cancelaciones',
        'Optimización de recursos'
      ],
      format: 'PDF',
      estimatedTime: '2 min'
    },
    {
      id: 'custom',
      name: 'Reporte Personalizado',
      description: 'Selecciona métricas específicas según tus necesidades',
      icon: FileText,
      pages: 'Variable',
      includes: [
        'Métricas seleccionables',
        'Período personalizable',
        'Filtros avanzados',
        'Formato configurable'
      ],
      format: 'PDF/Excel/CSV',
      estimatedTime: '1-5 min'
    }
  ];

  const quickExports = [
    {
      name: 'Datos Brutos',
      description: 'Exportación CSV de todos los datos',
      format: 'CSV',
      icon: FileText
    },
    {
      name: 'Métricas KPI',
      description: 'Tabla de indicadores principales',
      format: 'Excel',
      icon: BarChart3
    },
    {
      name: 'Lista Clientes',
      description: 'Base de datos de clientes',
      format: 'CSV',
      icon: Users
    },
    {
      name: 'Resumen Financiero',
      description: 'Estado financiero básico',
      format: 'PDF',
      icon: Euro
    }
  ];

  function getPeriodLabel(period: string): string {
    const labels = {
      '3months': 'últimos 3 meses',
      '6months': 'últimos 6 meses', 
      'year': 'último año',
      'all': 'todos los datos'
    };
    return labels[period as keyof typeof labels] || 'período seleccionado';
  }

  function handleQuickExport(exportType: string) {
    alert(`Exportando ${exportType}:\n\n• Formato: ${quickExports.find(q => q.name === exportType)?.format}\n• Período: ${getPeriodLabel(selectedPeriod)}\n• Preparando descarga...`);
    onExport(exportType.toLowerCase().replace(' ', '_'));
  }

  function handleReportExport(reportId: string) {
    const report = reportTypes.find(r => r.id === reportId);
    alert(`Generando ${report?.name}:\n\n• ${report?.pages}\n• Formato: ${report?.format}\n• Tiempo estimado: ${report?.estimatedTime}\n• Se descargará automáticamente cuando esté listo`);
    onExport(reportId);
  }
</script>

<Card>
  <CardHeader>
    <CardTitle class="flex items-center gap-2 text-2xl">
      <Download class="h-5 w-5" />
      Exportar Reportes
    </CardTitle>
    <CardDescription>
      Genera reportes profesionales para stakeholders o análisis detallado
    </CardDescription>
  </CardHeader>
  <CardContent class="space-y-6">
    <!-- Quick exports -->
    <div>
      <h3 class="font-medium text-gray-900 mb-3">Exportaciones Rápidas</h3>
      <div class="grid md:grid-cols-4 gap-3">
        {#each quickExports as quick}
          <Button
            variant="outline"
            class="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent hover:bg-gray-50"
            onclick={() => handleQuickExport(quick.name)}
          >
            <!-- svelte-ignore svelte_component_deprecated -->
            <svelte:component this={quick.icon} class="h-6 w-6 text-gray-600" />
            <div class="text-center">
              <div class="text-sm font-medium">{quick.name}</div>
              <Badge variant="outline" class="mt-1 text-xs">{quick.format}</Badge>
            </div>
          </Button>
        {/each}
      </div>
    </div>

    <!-- Detailed reports -->
    <div>
      <h3 class="font-medium text-gray-900 mb-3">Reportes Detallados</h3>
      <div class="grid gap-4 md:grid-cols-2">
        {#each reportTypes as report}
          <div class="p-4 border rounded-lg hover:shadow-md transition-shadow">
            <div class="flex items-start justify-between mb-3">
              <div class="flex items-center space-x-3">
                <!-- svelte-ignore svelte_component_deprecated -->
                <svelte:component this={report.icon} class="h-8 w-8 text-blue-600" />
                <div>
                  <h4 class="font-medium text-gray-900">{report.name}</h4>
                  <p class="text-sm text-gray-600">{report.description}</p>
                </div>
              </div>
            </div>

            <div class="space-y-3 mb-4">
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span class="text-gray-600">Páginas:</span>
                  <span class="font-medium ml-1">{report.pages}</span>
                </div>
                <div>
                  <span class="text-gray-600">Formato:</span>
                  <span class="font-medium ml-1">{report.format}</span>
                </div>
              </div>

              <div>
                <div class="text-sm font-medium text-gray-700 mb-2">Incluye:</div>
                <div class="space-y-1">
                  {#each report.includes as include}
                    <div class="text-xs text-gray-600 flex items-center">
                      <span class="w-1 h-1 bg-blue-600 rounded-full mr-2"></span>
                      {include}
                    </div>
                  {/each}
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between pt-3 border-t">
              <div class="text-xs text-gray-500">
                ⏱️ {report.estimatedTime} • Período: {getPeriodLabel(selectedPeriod)}
              </div>
              <Button 
                size="sm" 
                onclick={() => handleReportExport(report.id)}
                class="bg-blue-600 hover:bg-blue-700"
              >
                <Download class="mr-2 h-3 w-3" />
                Generar
              </Button>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Information notice -->
    <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <h4 class="font-medium text-blue-900 mb-2">📋 Información sobre Reportes</h4>
      <div class="text-sm text-blue-800 space-y-1">
        <p>• Los reportes se generan automáticamente basándose en tus datos actuales</p>
        <p>• Todos los reportes incluyen gráficos, tablas y análisis profesional</p>
        <p>• Los datos están actualizados hasta la fecha actual</p>
        <p>• Los reportes en PDF son ideales para presentaciones y stakeholders</p>
        <p>• Los formatos Excel/CSV permiten análisis adicional en hojas de cálculo</p>
      </div>
    </div>

    <!-- Recent exports -->
    <div>
      <h3 class="font-medium text-gray-900 mb-3">Exportaciones Recientes</h3>
      <div class="space-y-2">
        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div class="flex items-center space-x-3">
            <FileText class="h-4 w-4 text-gray-600" />
            <div>
              <div class="text-sm font-medium">Reporte Ejecutivo - Enero 2025</div>
              <div class="text-xs text-gray-600">Generado hace 3 días • 12 páginas</div>
            </div>
          </div>
          <Button variant="outline" size="sm" class="bg-transparent">
            <Download class="h-3 w-3 mr-1" />
            Descargar
          </Button>
        </div>

        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div class="flex items-center space-x-3">
            <BarChart3 class="h-4 w-4 text-gray-600" />
            <div>
              <div class="text-sm font-medium">Análisis Financiero - Q4 2024</div>
              <div class="text-xs text-gray-600">Generado hace 1 semana • 8 páginas</div>
            </div>
          </div>
          <Button variant="outline" size="sm" class="bg-transparent">
            <Download class="h-3 w-3 mr-1" />
            Descargar
          </Button>
        </div>

        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div class="flex items-center space-x-3">
            <Users class="h-4 w-4 text-gray-600" />
            <div>
              <div class="text-sm font-medium">Base de Datos Clientes</div>
              <div class="text-xs text-gray-600">Generado hace 2 semanas • 89 registros</div>
            </div>
          </div>
          <Button variant="outline" size="sm" class="bg-transparent">
            <Download class="h-3 w-3 mr-1" />
            Descargar
          </Button>
        </div>
      </div>
    </div>
  </CardContent>
</Card>