<!-- src/routes/legal/cookies/+page.svelte -->
<script>
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Cookie, Settings, Shield, BarChart } from 'lucide-svelte';
  
  let cookiePreferences = $state({
    necessary: true, // Always true, non-toggleable
    analytics: false,
    marketing: false,
    functional: false
  });
  
  function savePreferences() {
    // En real, esto se conectaría con tu sistema de cookies
    localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences));
    alert('Preferencias guardadas correctamente');
  }
  
  function acceptAll() {
    cookiePreferences = {
      necessary: true,
      analytics: true, 
      marketing: true,
      functional: true
    };
    savePreferences();
  }
  
  function rejectAll() {
    cookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    };
    savePreferences();
  }
</script>

<svelte:head>
  <title>Política de Cookies - PsyBooking</title>
  <meta name="description" content="Política de cookies de PsyBooking. Información sobre el uso de cookies y cómo gestionar tus preferencias." />
</svelte:head>

<div class="space-y-8">
  <!-- Header -->
  <div class="text-center">
    <div class="flex items-center justify-center mb-4">
      <Cookie class="w-12 h-12 text-blue-600" />
    </div>
    <h1 class="text-4xl font-bold text-gray-900 mb-4">Política de Cookies</h1>
    <p class="text-lg text-gray-600 max-w-2xl mx-auto">
      Información sobre cómo PsyBooking utiliza cookies y tecnologías similares 
      para mejorar tu experiencia en nuestra plataforma.
    </p>
    <p class="text-sm text-gray-500 mt-4">Última actualización: 15 de enero de 2025</p>
  </div>

  <!-- Contenido -->
  <div class="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>¿Qué son las Cookies?</CardTitle>
      </CardHeader>
      <CardContent class="prose prose-gray max-w-none">
        <p>
          Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo 
          cuando visitas un sitio web. Nos ayudan a recordar tus preferencias y mejorar 
          tu experiencia de navegación.
        </p>
        
        <p>
          También utilizamos tecnologías similares como localStorage, sessionStorage 
          y píxeles de seguimiento para los mismos propósitos.
        </p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Tipos de Cookies que Utilizamos</CardTitle>
      </CardHeader>
      <CardContent class="space-y-6">
        <!-- Cookies Necesarias -->
        <div class="border rounded-lg p-4 bg-gray-50">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center space-x-2">
              <Shield class="w-5 h-5 text-green-600" />
              <h4 class="font-semibold text-gray-900">Cookies Necesarias</h4>
            </div>
            <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Siempre activas</span>
          </div>
          <p class="text-sm text-gray-600 mb-3">
            Esenciales para el funcionamiento básico del sitio web. No se pueden desactivar.
          </p>
          <ul class="text-sm text-gray-600 space-y-1">
            <li>• <strong>Autenticación:</strong> Mantener sesión iniciada</li>
            <li>• <strong>Seguridad:</strong> Protección CSRF y validación</li>
            <li>• <strong>Funcionalidad:</strong> Preferencias de idioma y región</li>
            <li>• <strong>Carrito:</strong> Proceso de reserva y pago</li>
          </ul>
        </div>

        <!-- Cookies Analíticas -->
        <div class="border rounded-lg p-4">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center space-x-2">
              <BarChart class="w-5 h-5 text-blue-600" />
              <h4 class="font-semibold text-gray-900">Cookies Analíticas</h4>
            </div>
            <label class="flex items-center space-x-2">
              <input 
                type="checkbox" 
                bind:checked={cookiePreferences.analytics}
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span class="text-sm text-gray-600">Permitir</span>
            </label>
          </div>
          <p class="text-sm text-gray-600 mb-3">
            Nos ayudan a entender cómo los usuarios interactúan con nuestro sitio.
          </p>
          <ul class="text-sm text-gray-600 space-y-1">
            <li>• <strong>PostHog:</strong> Analytics de comportamiento de usuarios</li>
            <li>• <strong>Métricas de rendimiento:</strong> Velocidad de carga</li>
            <li>• <strong>Patrones de uso:</strong> Páginas más visitadas</li>
          </ul>
        </div>

        <!-- Cookies Funcionales -->
        <div class="border rounded-lg p-4">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center space-x-2">
              <Settings class="w-5 h-5 text-purple-600" />
              <h4 class="font-semibold text-gray-900">Cookies Funcionales</h4>
            </div>
            <label class="flex items-center space-x-2">
              <input 
                type="checkbox" 
                bind:checked={cookiePreferences.functional}
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span class="text-sm text-gray-600">Permitir</span>
            </label>
          </div>
          <p class="text-sm text-gray-600 mb-3">
            Mejoran la funcionalidad y personalización del sitio web.
          </p>
          <ul class="text-sm text-gray-600 space-y-1">
            <li>• <strong>Preferencias de interfaz:</strong> Tema oscuro/claro</li>
            <li>• <strong>Configuración de calendario:</strong> Vista preferida</li>
            <li>• <strong>Notificaciones:</strong> Recordatorios personalizados</li>
            <li>• <strong>Chat de soporte:</strong> Historial de conversaciones</li>
          </ul>
        </div>

        <!-- Cookies de Marketing -->
        <div class="border rounded-lg p-4">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center space-x-2">
              <BarChart class="w-5 h-5 text-orange-600" />
              <h4 class="font-semibold text-gray-900">Cookies de Marketing</h4>
            </div>
            <label class="flex items-center space-x-2">
              <input 
                type="checkbox" 
                bind:checked={cookiePreferences.marketing}
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span class="text-sm text-gray-600">Permitir</span>
            </label>
          </div>
          <p class="text-sm text-gray-600 mb-3">
            Para mostrar publicidad relevante y medir la efectividad de campañas.
          </p>
          <ul class="text-sm text-gray-600 space-y-1">
            <li>• <strong>Google Ads:</strong> Seguimiento de conversiones</li>
            <li>• <strong>Facebook Pixel:</strong> Publicidad personalizada</li>
            <li>• <strong>Retargeting:</strong> Anuncios basados en visitas previas</li>
            <li>• <strong>Afiliación:</strong> Seguimiento de referencias</li>
          </ul>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Cookies de Terceros</CardTitle>
      </CardHeader>
      <CardContent class="prose prose-gray max-w-none">
        <p>Algunos servicios que utilizamos establecen sus propias cookies:</p>
        
        <div class="grid md:grid-cols-2 gap-4 mt-4">
          <div class="border rounded-lg p-4">
            <h4 class="font-semibold mb-2">Stripe (Pagos)</h4>
            <p class="text-sm text-gray-600">
              Cookies necesarias para procesar pagos de forma segura. 
              Son esenciales para el funcionamiento del servicio.
            </p>
          </div>
          
          <div class="border rounded-lg p-4">
            <h4 class="font-semibold mb-2">Zoom/Teams (Video)</h4>
            <p class="text-sm text-gray-600">
              Cookies para la funcionalidad de videollamadas. 
              Solo se activan al usar estas integraciones.
            </p>
          </div>
          
          <div class="border rounded-lg p-4">
            <h4 class="font-semibold mb-2">Google reCAPTCHA</h4>
            <p class="text-sm text-gray-600">
              Para proteger formularios contra spam y bots. 
              Necesarias para la seguridad del sitio.
            </p>
          </div>
          
          <div class="border rounded-lg p-4">
            <h4 class="font-semibold mb-2">Twilio (Comunicaciones)</h4>
            <p class="text-sm text-gray-600">
              Para el envío de SMS y WhatsApp. Solo se usan 
              cuando el psicólogo activa estas notificaciones.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Duración de las Cookies</CardTitle>
      </CardHeader>
      <CardContent class="prose prose-gray max-w-none">
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <h4>Cookies de Sesión</h4>
            <p class="text-sm text-gray-600">
              Se eliminan automáticamente cuando cierras el navegador. 
              Incluyen autenticación y datos temporales.
            </p>
          </div>
          
          <div>
            <h4>Cookies Persistentes</h4>
            <p class="text-sm text-gray-600">
              Permanecen en tu dispositivo durante un período determinado:
            </p>
            <ul class="text-sm text-gray-600 mt-2">
              <li>• Preferencias de usuario: 1 año</li>
              <li>• Analytics: 2 años</li>
              <li>• Marketing: 90 días</li>
              <li>• Funcionales: 6 meses</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Cómo Gestionar las Cookies</CardTitle>
      </CardHeader>
      <CardContent class="prose prose-gray max-w-none">
        <h4>Desde PsyBooking:</h4>
        <p>Usa el panel de preferencias de abajo para activar/desactivar categorías de cookies.</p>
        
        <h4>Desde tu Navegador:</h4>
        <ul>
          <li><strong>Chrome:</strong> Configuración > Privacidad y seguridad > Cookies</li>
          <li><strong>Firefox:</strong> Opciones > Privacidad y seguridad > Cookies</li>
          <li><strong>Safari:</strong> Preferencias > Privacidad > Cookies</li>
          <li><strong>Edge:</strong> Configuración > Cookies y permisos del sitio</li>
        </ul>
        
        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
          <p class="text-yellow-800 text-sm">
            <strong>Nota:</strong> Desactivar cookies puede afectar la funcionalidad 
            del sitio web y tu experiencia de usuario.
          </p>
        </div>
      </CardContent>
    </Card>
  </div>

  <!-- Panel de Preferencias -->
  <Card class="border-blue-200 bg-blue-50">
    <CardHeader>
      <CardTitle class="flex items-center gap-2 text-blue-900">
        <Settings class="w-5 h-5" />
        Gestionar Preferencias de Cookies
      </CardTitle>
    </CardHeader>
    <CardContent class="space-y-4">
      <p class="text-blue-800 text-sm">
        Puedes cambiar tus preferencias de cookies en cualquier momento:
      </p>
      
      <div class="flex flex-wrap gap-3">
        <Button onclick={acceptAll} class="bg-blue-600 hover:bg-blue-700">
          Aceptar Todas
        </Button>
        <Button onclick={rejectAll} variant="outline" class="border-blue-300 text-blue-700">
          Rechazar Opcionales
        </Button>
        <Button onclick={savePreferences} variant="outline" class="border-blue-300 text-blue-700">
          Guardar Preferencias
        </Button>
      </div>
    </CardContent>
  </Card>
</div>