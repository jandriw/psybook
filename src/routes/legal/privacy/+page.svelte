<!-- src/routes/legal/privacy/+page.svelte -->
<script>
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Shield, Mail, Phone } from 'lucide-svelte';
</script>

<svelte:head>
  <title>Política de Privacidad - PsyBooking</title>
  <meta name="description" content="Política de privacidad de PsyBooking. Conoce cómo protegemos y tratamos tus datos personales." />
</svelte:head>

<div class="space-y-8">
  <!-- Header -->
  <div class="text-center">
    <div class="flex items-center justify-center mb-4">
      <Shield class="w-12 h-12 text-blue-600" />
    </div>
    <h1 class="text-4xl font-bold text-gray-900 mb-4">Política de Privacidad</h1>
    <p class="text-lg text-gray-600 max-w-2xl mx-auto">
      En PsyBooking protegemos tus datos personales y respetamos tu privacidad. 
      Esta política explica cómo recopilamos, usamos y protegemos tu información.
    </p>
    <p class="text-sm text-gray-500 mt-4">Última actualización: 15 de enero de 2025</p>
  </div>

  <!-- Contenido -->
  <div class="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>1. Información que Recopilamos</CardTitle>
      </CardHeader>
      <CardContent class="prose prose-gray max-w-none">
        <h4>Datos de Registro y Perfil</h4>
        <ul>
          <li><strong>Psicólogos:</strong> Nombre, email, teléfono, número de colegiado, especialidad, datos bancarios</li>
          <li><strong>Clientes:</strong> Nombre, email, teléfono, datos de pago</li>
        </ul>

        <h4>Datos de Uso</h4>
        <ul>
          <li>Información de sesiones y citas</li>
          <li>Historial de pagos y transacciones</li>
          <li>Comunicaciones a través de la plataforma</li>
          <li>Datos técnicos (IP, navegador, dispositivo)</li>
        </ul>

        <h4>Datos Sensibles</h4>
        <p>
          Como plataforma de servicios psicológicos, podemos procesar datos de categoría especial 
          relacionados con la salud mental, siempre con su consentimiento explícito.
        </p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>2. Cómo Utilizamos su Información</CardTitle>
      </CardHeader>
      <CardContent class="prose prose-gray max-w-none">
        <ul>
          <li><strong>Prestación del servicio:</strong> Gestión de citas, procesamiento de pagos, comunicaciones</li>
          <li><strong>Mejora del servicio:</strong> Analytics, desarrollo de nuevas funcionalidades</li>
          <li><strong>Cumplimiento legal:</strong> Obligaciones fiscales, normativa sanitaria</li>
          <li><strong>Comunicación:</strong> Notificaciones de servicio, soporte técnico</li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>3. Base Legal del Tratamiento</CardTitle>
      </CardHeader>
      <CardContent class="prose prose-gray max-w-none">
        <ul>
          <li><strong>Consentimiento:</strong> Para datos sensibles de salud mental</li>
          <li><strong>Ejecución del contrato:</strong> Para la prestación del servicio</li>
          <li><strong>Interés legítimo:</strong> Para mejoras del servicio y comunicaciones comerciales</li>
          <li><strong>Obligación legal:</strong> Para cumplimiento normativo</li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>4. Compartir Información</CardTitle>
      </CardHeader>
      <CardContent class="prose prose-gray max-w-none">
        <p><strong>NO vendemos ni compartimos sus datos personales con terceros para marketing.</strong></p>
        
        <h4>Compartimos información únicamente con:</h4>
        <ul>
          <li><strong>Proveedores de servicios:</strong> Stripe (pagos), Twilio (comunicaciones), Supabase (hosting)</li>
          <li><strong>Autoridades competentes:</strong> Cuando sea requerido por ley</li>
          <li><strong>Entre usuarios:</strong> Solo información necesaria para las citas (nombre, horario)</li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>5. Seguridad y Protección</CardTitle>
      </CardHeader>
      <CardContent class="prose prose-gray max-w-none">
        <ul>
          <li><strong>Cifrado:</strong> Todas las comunicaciones usan HTTPS/TLS</li>
          <li><strong>Acceso limitado:</strong> Solo personal autorizado accede a los datos</li>
          <li><strong>Copias de seguridad:</strong> Respaldos seguros y cifrados</li>
          <li><strong>Monitorización:</strong> Detección de accesos no autorizados</li>
          <li><strong>Cumplimiento:</strong> Certificaciones ISO 27001 y auditorías regulares</li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>6. Sus Derechos</CardTitle>
      </CardHeader>
      <CardContent class="prose prose-gray max-w-none">
        <p>Bajo el GDPR, usted tiene derecho a:</p>
        <ul>
          <li><strong>Acceso:</strong> Conocer qué datos tenemos sobre usted</li>
          <li><strong>Rectificación:</strong> Corregir datos inexactos</li>
          <li><strong>Supresión:</strong> Solicitar la eliminación de sus datos</li>
          <li><strong>Portabilidad:</strong> Obtener una copia de sus datos</li>
          <li><strong>Oposición:</strong> Oponerse al tratamiento</li>
          <li><strong>Limitación:</strong> Restringir el procesamiento</li>
        </ul>
        
        <p>Para ejercer estos derechos, contacte con nosotros en: <strong>privacy@psybooking.com</strong></p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>7. Retención de Datos</CardTitle>
      </CardHeader>
      <CardContent class="prose prose-gray max-w-none">
        <ul>
          <li><strong>Cuentas activas:</strong> Mientras use el servicio</li>
          <li><strong>Datos de sesiones:</strong> 6 años (normativa sanitaria)</li>
          <li><strong>Datos fiscales:</strong> 4 años (obligación legal)</li>
          <li><strong>Logs técnicos:</strong> 12 meses</li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>8. Transferencias Internacionales</CardTitle>
      </CardHeader>
      <CardContent class="prose prose-gray max-w-none">
        <p>
          Algunos de nuestros proveedores están ubicados fuera de la UE. 
          En estos casos, garantizamos un nivel adecuado de protección mediante:
        </p>
        <ul>
          <li>Cláusulas contractuales tipo de la Comisión Europea</li>
          <li>Decisiones de adecuación</li>
          <li>Certificaciones Privacy Shield cuando aplicable</li>
        </ul>
      </CardContent>
    </Card>
  </div>

  <!-- Contacto -->
  <Card class="border-blue-200 bg-blue-50">
    <CardContent class="p-6">
      <h3 class="font-semibold text-blue-900 mb-4">Contacto para Temas de Privacidad</h3>
      <div class="space-y-2 text-blue-800">
        <div class="flex items-center space-x-2">
          <Mail class="w-4 h-4" />
          <span>privacy@psybooking.com</span>
        </div>
        <div class="flex items-center space-x-2">
          <Phone class="w-4 h-4" />
          <span>+34 900 123 456</span>
        </div>
        <p class="text-sm">Delegado de Protección de Datos: dpo@psybooking.com</p>
      </div>
    </CardContent>
  </Card>
</div>