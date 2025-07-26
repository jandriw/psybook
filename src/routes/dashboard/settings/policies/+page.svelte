<!-- src/routes/dashboard/settings/policies/+page.svelte -->
<script lang="ts">
  import SettingsHeader from '$lib/components/settings/SettingsHeader.svelte';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { Label } from '$lib/components/ui/label';
  import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group';
  import { Select, SelectContent, SelectItem, SelectTrigger } from '$lib/components/ui/select';
  import { Switch } from '$lib/components/ui/switch';
  import { Textarea } from '$lib/components/ui/textarea';
  import { Alert, AlertDescription } from '$lib/components/ui/alert';
  import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '$lib/components/ui/tooltip';
  import { 
    FileText, HelpCircle, Eye, AlertTriangle, 
    CheckCircle, Clock, RefreshCw 
  } from 'lucide-svelte';

  let { data } = $props();

  // Estados reactivos con Svelte 5 runes
  let selectedPolicy = $state(data.policies?.selectedPolicy || "moderate");
  let paymentTimeout = $state(data.policies?.paymentTimeout || "30");
  let rescheduleWindow = $state(data.policies?.rescheduleWindow || "24");
  let noShowPolicy = $state(data.policies?.noShowPolicy || "retain-full");
  let emergencyExceptions = $state(data.policies?.emergencyExceptions ?? true);
  let customMessage = $state(data.policies?.customMessage || "");
  let hasUnsavedChanges = $state(false);
  let isSaving = $state(false);
  let saveMessage = $state('');

  const policyTemplates = [
    {
      id: "strict",
      name: "Política Estricta",
      description: "Sin reembolso 24h antes",
      details: "Cancelación gratuita hasta 24h antes. Sin reembolso después.",
      impact: "Menor flexibilidad, mayor protección de ingresos",
      color: "red",
    },
    {
      id: "moderate",
      name: "Política Moderada",
      description: "50% reembolso hasta 24h antes",
      details: "Cancelación gratuita hasta 24h antes. 50% reembolso entre 2-24h. Sin reembolso después.",
      impact: "Balance entre flexibilidad y protección",
      color: "blue",
    },
    {
      id: "flexible",
      name: "Política Flexible",
      description: "Reembolso completo hasta 2h antes",
      details: "Cancelación gratuita hasta 2h antes. Sin reembolso después.",
      impact: "Máxima flexibilidad, menor protección",
      color: "green",
    },
  ];

  // Vista previa generada dinámicamente
  let previewText = $derived(() => {
    const policy = policyTemplates.find(p => p.id === selectedPolicy);
    if (!policy) return "";

    let text = policy.details;

    if (emergencyExceptions) {
      text += " Excepciones por emergencias médicas documentadas.";
    }

    if (customMessage) {
      text += ` ${customMessage}`;
    }

    return text;
  });

  // Estadísticas de impacto calculadas
  let impactStats = $derived(() => {
    type PolicyType = 'strict' | 'moderate' | 'flexible';
    
    const stats: Record<PolicyType, {
      cancellations: string;
      protection: { level: string; color: string };
      satisfaction: { level: string; color: string };
    }> = {
      strict: {
        cancellations: "5-8%",
        protection: { level: "Alta", color: "text-green-600 border-green-200" },
        satisfaction: { level: "Media", color: "text-orange-600 border-orange-200" }
      },
      moderate: {
        cancellations: "8-12%",
        protection: { level: "Media", color: "text-blue-600 border-blue-200" },
        satisfaction: { level: "Media", color: "text-blue-600 border-blue-200" }
      },
      flexible: {
        cancellations: "12-18%",
        protection: { level: "Baja", color: "text-orange-600 border-orange-200" },
        satisfaction: { level: "Alta", color: "text-green-600 border-green-200" }
      }
    };

    return stats[selectedPolicy as PolicyType] || stats.moderate;
  });

  // Detectar cambios para mostrar alerta
  $effect(() => {
    const originalData = data.policies || {};
    hasUnsavedChanges = 
      selectedPolicy !== originalData.selectedPolicy ||
      paymentTimeout !== originalData.paymentTimeout ||
      rescheduleWindow !== originalData.rescheduleWindow ||
      noShowPolicy !== originalData.noShowPolicy ||
      emergencyExceptions !== originalData.emergencyExceptions ||
      customMessage !== originalData.customMessage;
  });

  // Auto-save con debounce
  let saveTimeout: string | number | NodeJS.Timeout;
  $effect(() => {
    if (!hasUnsavedChanges) return;
    
    if (saveTimeout) clearTimeout(saveTimeout);
    
    saveTimeout = setTimeout(() => {
      handleSave();
    }, 3000); // Auto-save después de 3 segundos sin cambios
  });

  async function handleSave() {
    if (isSaving) return;
    
    isSaving = true;
    saveMessage = 'Guardando políticas...';

    try {
      const formData = new FormData();
      formData.append('selectedPolicy', selectedPolicy);
      formData.append('paymentTimeout', paymentTimeout);
      formData.append('rescheduleWindow', rescheduleWindow);
      formData.append('noShowPolicy', noShowPolicy);
      formData.append('emergencyExceptions', emergencyExceptions.toString());
      formData.append('customMessage', customMessage);

      const response = await fetch('?/updatePolicies', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        hasUnsavedChanges = false;
        saveMessage = 'Políticas guardadas ✓';
      } else {
        saveMessage = 'Error al guardar políticas';
      }
    } catch (error) {
      saveMessage = 'Error al guardar políticas';
      console.error('Error saving policies:', error);
    } finally {
      isSaving = false;
      setTimeout(() => saveMessage = '', 2000);
    }
  }

  function resetToDefaults() {
    selectedPolicy = "moderate";
    paymentTimeout = "30";
    rescheduleWindow = "24";
    noShowPolicy = "retain-full";
    emergencyExceptions = true;
    customMessage = "";
  }

  function handlePolicyChange(policyId: string) {
    selectedPolicy = policyId;
  }

  function handlePaymentTimeoutChange(value: string) {
    paymentTimeout = value;
  }

  function handleRescheduleWindowChange(value: string) {
    rescheduleWindow = value;
  }

  function handleNoShowPolicyChange(value: string) {
    noShowPolicy = value;
  }
</script>

<TooltipProvider>
  <div class="max-w-6xl mx-auto space-y-8">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <SettingsHeader 
        icon={FileText} 
        title="Políticas de Cancelación y Reembolsos"
        description="Define las condiciones de cancelación y reembolso para tus sesiones. Estas políticas se mostrarán claramente a tus clientes antes de realizar el pago."
      />
      
      {#if saveMessage}
        <div class="text-sm {isSaving ? 'text-gray-600' : saveMessage.includes('Error') ? 'text-red-600' : 'text-green-600'}">
          {saveMessage}
        </div>
      {/if}
    </div>

    {#if hasUnsavedChanges}
      <Alert>
        <AlertTriangle class="h-4 w-4" />
        <AlertDescription>
          Tienes cambios sin guardar. Los cambios en las políticas afectarán a las nuevas reservas, no a las existentes.
        </AlertDescription>
      </Alert>
    {/if}

    <div class="grid lg:grid-cols-3 gap-8">
      <!-- Configuración principal -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Plantillas de políticas -->
        <Card>
          <CardHeader>
            <CardTitle>
              <div class="text-2xl">Plantillas de Políticas</div>
            </CardTitle>
            <CardDescription>Selecciona una plantilla base y personalízala según tus necesidades</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup bind:value={selectedPolicy} class="">
              {#each policyTemplates as template (template.id)}
                <div class="flex items-start space-x-3">
                  <RadioGroupItem 
                    value={template.id} 
                    id={template.id} 
                    class="mt-1" 
                  />
                  <div class="flex-1">
                    <Label for={template.id} class="cursor-pointer">
                      <div class="flex items-center space-x-2 mb-1">
                        <span class="font-medium">{template.name}</span>
                        <Badge 
                          variant="outline" 
                          class="text-{template.color}-600 border-{template.color}-200"
                        >
                          {template.description}
                        </Badge>
                      </div>
                      <!-- <p class="text-sm text-gray-600 mb-1">{template.details}</p>
                      <p class="text-xs text-gray-500">{template.impact}</p> -->
                    </Label>
                  </div>
                </div>
                <div class="pl-7 -mt-3 mb-2.5">
                  <p class="text-sm text-gray-600 mb-1">{template.details}</p>
                  <p class="text-xs text-gray-500">{template.impact}</p>
                </div>
              {/each}
            </RadioGroup>
          </CardContent>
        </Card>

        <!-- Configuraciones avanzadas -->
        <Card>
          <CardHeader>
            <CardTitle>
              <div class="text-2xl">Configuraciones Avanzadas</div>
            </CardTitle>
            <CardDescription>Personaliza aspectos específicos de tus políticas</CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <div class="grid md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <div class="flex items-center space-x-2">
                  <Label for="payment-timeout">Tiempo límite para pago</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle class="w-4 h-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Tiempo que tiene el cliente para completar el pago después de reservar</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Select bind:value={paymentTimeout} type="single">
                  <SelectTrigger>
                    <span>{paymentTimeout} minutos</span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutos</SelectItem>
                    <SelectItem value="30">30 minutos</SelectItem>
                    <SelectItem value="45">45 minutos</SelectItem>
                    <SelectItem value="60">60 minutos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div class="space-y-2">
                <div class="flex items-center space-x-2">
                  <Label for="reschedule-window">Ventana de reprogramación</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle class="w-4 h-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Tiempo mínimo antes de la sesión para permitir reprogramación</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Select bind:value={rescheduleWindow} type="single">
                  <SelectTrigger>
                    <span>
                      {rescheduleWindow === '2' ? '2 horas antes' : 
                       rescheduleWindow === '24' ? '24 horas antes' : 
                       rescheduleWindow === '48' ? '48 horas antes' : 
                       rescheduleWindow === '168' ? '7 días antes' : 
                       `${rescheduleWindow} horas antes`}
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 horas antes</SelectItem>
                    <SelectItem value="24">24 horas antes</SelectItem>
                    <SelectItem value="48">48 horas antes</SelectItem>
                    <SelectItem value="168">7 días antes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div class="space-y-2">
              <div class="flex items-center space-x-2">
                <Label>Política para no-shows</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle class="w-4 h-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Qué hacer cuando un cliente no se presenta a la sesión</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <RadioGroup bind:value={noShowPolicy}>
                <div class="flex items-center space-x-2">
                  <RadioGroupItem value="retain-full" id="retain-full" />
                  <Label for="retain-full">Retener pago completo</Label>
                </div>
                <div class="flex items-center space-x-2">
                  <RadioGroupItem value="retain-partial" id="retain-partial" />
                  <Label for="retain-partial">Retener 50% del pago</Label>
                </div>
                <div class="flex items-center space-x-2">
                  <RadioGroupItem value="allow-reschedule" id="allow-reschedule" />
                  <Label for="allow-reschedule">Permitir reprogramación gratuita</Label>
                </div>
              </RadioGroup>
            </div>

            <div class="flex items-center justify-between">
              <div class="space-y-0.5">
                <Label>Excepciones por emergencias médicas</Label>
                <p class="text-sm text-gray-600">Permitir cancelaciones por emergencias documentadas</p>
              </div>
              <Switch bind:checked={emergencyExceptions} />
            </div>

            <div class="space-y-2">
              <Label for="custom-message">Mensaje personalizado (opcional)</Label>
              <Textarea
                id="custom-message"
                placeholder="Añade información adicional sobre tus políticas..."
                bind:value={customMessage}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Vista previa y estadísticas -->
      <div class="space-y-6">
        <!-- Vista previa -->
        <Card class="border-green-100">
          <CardHeader>
            <CardTitle class="flex items-center gap-2 text-green-700 text-2xl">
              <Eye class="w-5 h-5" />
              Vista Previa
            </CardTitle>
            <CardDescription>Así verán tus clientes las políticas en tu página pública</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="bg-white border rounded-lg p-4 space-y-3">
              <h4 class="font-medium text-gray-900">Política de Cancelación</h4>
              <p class="text-sm text-gray-700 leading-relaxed">{previewText()}</p>
              <div class="flex items-center space-x-2 text-xs text-gray-500">
                <Clock class="w-3 h-3" />
                <span>Tiempo para pagar: {paymentTimeout} minutos</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Estadísticas de impacto -->
        <Card class="border-blue-100">
          <CardHeader>
            <CardTitle class="text-blue-700 text-2xl">Impacto Estimado</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Cancelaciones esperadas</span>
                <span class="font-medium">{impactStats().cancellations}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Protección de ingresos</span>
                <Badge variant="outline" class={impactStats().protection.color}>
                  {impactStats().protection.level}
                </Badge>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Satisfacción cliente</span>
                <Badge variant="outline" class={impactStats().satisfaction.color}>
                  {impactStats().satisfaction.level}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Consejos -->
        <Card class="border-purple-100">
          <CardHeader>
            <CardTitle class="text-purple-700 text-2xl">💡 Consejos</CardTitle>
          </CardHeader>
          <CardContent class="space-y-3 text-sm">
            <p class="text-gray-600">
              <strong>Política Moderada</strong> es la más equilibrada para la mayoría de psicólogos.
            </p>
            <p class="text-gray-600">
              Las <strong>excepciones médicas</strong> mejoran la percepción de empatía profesional.
            </p>
            <p class="text-gray-600">
              Un <strong>tiempo de pago de 30 minutos</strong> reduce reservas no completadas.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Botones de acción -->
    <div class="flex items-center justify-between pt-6 border-t">
      <Button variant="outline" class="bg-transparent" onclick={resetToDefaults}>
        <RefreshCw class="w-4 h-4 mr-2" />
        Restaurar valores por defecto
      </Button>

      <div class="flex space-x-3">
        <Button variant="ghost" class="text-gray-600">
          Cancelar
        </Button>
        <Button onclick={handleSave} class="bg-blue-600 hover:bg-blue-700" disabled={isSaving}>
          <CheckCircle class="w-4 h-4 mr-2" />
          {isSaving ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </div>
    </div>
  </div>
</TooltipProvider>