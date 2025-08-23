<!-- src/routes/legal/gdpr/+page.svelte -->
<script>
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Textarea } from '$lib/components/ui/textarea';
  import { Label } from '$lib/components/ui/label';
  import { 
    Shield, 
    Download, 
    Edit, 
    Trash2, 
    Eye, 
    RefreshCw,
    Mail,
    AlertCircle,
    CheckCircle,
    User
  } from 'lucide-svelte';
  
  let requestForm = $state({
    type: 'access',
    email: '',
    description: '',
    verification: ''
  });
  
  let showSuccessMessage = $state(false);
  
  function submitRequest() {
    // En real, esto se enviaría al servidor
    showSuccessMessage = true;
    setTimeout(() => {
      showSuccessMessage = false;
    }, 5000);
  }
  
  const requestTypes = [
    { value: 'access', label: 'Acceso a mis datos', icon: Eye },
    { value: 'rectification', label: 'Corregir datos inexactos', icon: Edit },
    { value: 'erasure', label: 'Eliminar mis datos', icon: Trash2 },
    { value: 'portability', label: 'Exportar mis datos', icon: Download },
    { value: 'restriction', label: 'Restringir procesamiento', icon: RefreshCw },
    { value: 'objection', label: 'Oponerme al tratamiento', icon: AlertCircle }
  ];
</script>

<svelte:head>
  <title>Información GDPR - PsyBooking</title>
  <meta name="description" content="Información sobre el GDPR en PsyBooking. Ejercita tus derechos de protección de datos." />
</svelte:head>

<div class="space-y-8">
  <!-- Header -->
  <div class="text-center">
    <div class="flex items-center justify-center mb-4">
      <Shield class="w-12 h-12 text-blue-600" />
    </div>
    <h1 class="text-4xl font-bold text-gray-900 mb-4">Información GDPR</h1>
    <p class="text-lg text-gray-600 max-w-2xl mx-auto">
      El Reglamento General de Protección de Datos (GDPR) te otorga derechos específicos 
      sobre tus datos personales. Aquí puedes ejercitarlos fácilmente.
    </p>
  </div>

  <!-- Contenido -->
  <div class="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>Tus Derechos bajo el GDPR</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="grid md:grid-cols-2 gap-4">
          {#each requestTypes as type}
            <div class="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div class="flex items-center space-x-3 mb-2">
                <!-- svelte-ignore svelte_component_deprecated -->
                <svelte:component this={type.icon} class="w-5 h-5 text-blue-600" />
                <h4 class="font-semibold text-gray-900">{type.label}</h4>
              </div>
              <p class="text-sm text-gray-600">
                {#if type.value === 'access'}
                  Obtener una copia de todos los datos personales que tenemos sobre ti.
                {:else if type.value === 'rectification'}
                  Corregir información incorrecta o desactualizada en tu perfil.
                {:else if type.value === 'erasure'}
                  Solicitar la eliminación completa de tus datos personales.
                {:else if type.value === 'portability'}
                  Descargar tus datos en un formato estructurado y portátil.
                {:else if type.value === 'restriction'}
                  Limitar cómo procesamos tus datos en circunstancias específicas.
                {:else if type.value === 'objection'}
                  Oponerte al procesamiento de tus datos para ciertos fines.
                {/if}
              </p>
            </div>
          {/each}
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Base Legal para el Tratamiento</CardTitle>
      </CardHeader>
      <CardContent class="prose prose-gray max-w-none">
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <h4 class="text-green-600 mb-2">✓ Consentimiento</h4>
            <ul class="text-sm text-gray-600 space-y-1">
              <li>• Comunicaciones de marketing</li>
              <li>• Cookies no esenciales</li>
              <li>• Datos sensibles de salud</li>
              <li>• Compartir con terceros opcionales</li>
            </ul>
          </div>
          
          <div>
            <h4 class="text-blue-600 mb-2">⚖️ Ejecución del Contrato</h4>
            <ul class="text-sm text-gray-600 space-y-1">
              <li>• Prestación del servicio</li>
              <li>• Procesamiento de pagos</li>
              <li>• Gestión de citas</li>
              <li>• Soporte técnico</li>
            </ul>
          </div>
          
          <div>
            <h4 class="text-purple-600 mb-2">⚖️ Interés Legítimo</h4>
            <ul class="text-sm text-gray-600 space-y-1">
              <li>• Seguridad de la plataforma</li>
              <li>• Prevención de fraude</li>
              <li>• Mejoras del producto</li>
              <li>• Analytics anonimizados</li>
            </ul>
          </div>
          
          <div>
            <h4 class="text-red-600 mb-2">⚖️ Obligación Legal</h4>
            <ul class="text-sm text-gray-600 space-y-1">
              <li>• Conservación de datos fiscales</li>
              <li>• Cumplimiento normativa sanitaria</li>
              <li>• Requisitos de auditoría</li>
              <li>• Órdenes judiciales</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Datos que Procesamos</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="space-y-4">
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 class="font-semibold text-blue-900 mb-2">👤 Datos de Identificación</h4>
            <p class="text-sm text-blue-800">
              Nombre, apellidos, email, teléfono, dirección IP, datos de navegación
            </p>
          </div>
          
          <div class="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 class="font-semibold text-green-900 mb-2">💼 Datos Profesionales</h4>
            <p class="text-sm text-green-800">
              Número de colegiado, especialidad, formación, datos bancarios (solo psicólogos)
            </p>
          </div>
          
          <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 class="font-semibold text-purple-900 mb-2">📊 Datos de Uso</h4>
            <p class="text-sm text-purple-800">
              Historial de sesiones, preferencias, configuración, logs de actividad
            </p>
          </div>
          
          <div class="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 class="font-semibold text-red-900 mb-2">🏥 Datos de Salud (Categoría Especial)</h4>
            <p class="text-sm text-red-800">
              Solo con consentimiento explícito: información relacionada con servicios psicológicos
            </p>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Formulario para Ejercitar Derechos -->
    <Card class="border-blue-200 bg-blue-50">
      <CardHeader>
        <CardTitle class="flex items-center gap-2 text-blue-900">
          <User class="w-5 h-5" />
          Ejercitar tus Derechos GDPR
        </CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        {#if showSuccessMessage}
          <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <div class="flex items-center space-x-2">
              <CheckCircle class="w-5 h-5 text-green-600" />
              <p class="text-green-800 font-medium">Solicitud enviada correctamente</p>
            </div>
            <p class="text-green-700 text-sm mt-1">
              Procesaremos tu solicitud en un plazo máximo de 30 días. 
              Te contactaremos al email proporcionado.
            </p>
          </div>
        {/if}
        
        <div class="space-y-4">
          <div>
            <Label for="request-type">Tipo de Solicitud</Label>
            <select 
              id="request-type"
              bind:value={requestForm.type}
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              {#each requestTypes as type}
                <option value={type.value}>{type.label}</option>
              {/each}
            </select>
          </div>

          <div>
            <Label for="email">Email de Contacto</Label>
            <Input 
              id="email"
              type="email"
              bind:value={requestForm.email}
              placeholder="tu.email@ejemplo.com"
            />
          </div>

          <div>
            <Label for="description">Descripción de la Solicitud</Label>
            <Textarea 
              id="description"
              bind:value={requestForm.description}
              placeholder="Describe específicamente qué datos o acciones solicitas..."
              rows={4}
            />
          </div>

          <div>
            <Label for="verification">Código de Verificación (opcional)</Label>
            <Input 
              id="verification"
              bind:value={requestForm.verification}
              placeholder="Introduce un código si tienes cuenta activa"
            />
            <p class="text-xs text-gray-600 mt-1">
              Para acelerar el proceso, introduce tu ID de usuario o un código de verificación
            </p>
          </div>

          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div class="flex items-start space-x-2">
              <AlertCircle class="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <p class="text-yellow-800 font-medium text-sm">Verificación de Identidad</p>
                <p class="text-yellow-700 text-xs mt-1">
                  Para proteger tu privacidad, podríamos solicitar documentación adicional 
                  para verificar tu identidad antes de procesar la solicitud.
                </p>
              </div>
            </div>
          </div>

          <Button onclick={submitRequest} class="w-full bg-blue-600 hover:bg-blue-700">
            <Mail class="mr-2 h-4 w-4" />
            Enviar Solicitud
          </Button>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Contacto del Delegado de Protección de Datos</CardTitle>
      </CardHeader>
      <CardContent class="prose prose-gray max-w-none">
        <div class="bg-gray-50 border rounded-lg p-4">
          <div class="space-y-2">
            <div class="flex items-center space-x-2">
              <Mail class="w-4 h-4 text-gray-600" />
              <span><strong>Email:</strong> dpo@psybooking.com</span>
            </div>
            <div class="flex items-center space-x-2">
              <User class="w-4 h-4 text-gray-600" />
              <span><strong>Nombre:</strong> María José García Ruiz</span>
            </div>
            <div class="flex items-center space-x-2">
              <Shield class="w-4 h-4 text-gray-600" />
              <span><strong>Certificación:</strong> CIPP/E, CIPM</span>
            </div>
          </div>
          
          <p class="text-sm text-gray-600 mt-4">
            Nuestro DPO está disponible para resolver cualquier duda sobre 
            el tratamiento de datos personales y tus derechos bajo el GDPR.
          </p>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Autoridad de Control</CardTitle>
      </CardHeader>
      <CardContent class="prose prose-gray max-w-none">
        <p>
          Si no estás satisfecho con cómo hemos manejado tus datos o tu solicitud, 
          tienes derecho a presentar una reclamación ante:
        </p>
        
        <div class="bg-gray-50 border rounded-lg p-4 mt-4">
          <h4 class="font-semibold mb-2">Agencia Española de Protección de Datos (AEPD)</h4>
          <ul class="text-sm text-gray-600 space-y-1">
            <li><strong>Web:</strong> www.aepd.es</li>
            <li><strong>Teléfono:</strong> 901 100 099</li>
            <li><strong>Sede:</strong> C/ Jorge Juan, 6, 28001 Madrid</li>
            <li><strong>Procedimiento:</strong> Sede electrónica AEPD</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  </div>
</div>