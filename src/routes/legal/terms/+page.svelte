<!-- src/routes/legal/terms/+page.svelte -->
<script>
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { FileText, AlertTriangle, CheckCircle } from 'lucide-svelte';
</script>

<svelte:head>
  <title>Términos de Uso - PsyBooking</title>
  <meta name="description" content="Términos y condiciones de uso de PsyBooking. Conoce tus derechos y obligaciones al usar nuestra plataforma." />
</svelte:head>

<div class="space-y-8">
  <!-- Header -->
  <div class="text-center">
    <div class="flex items-center justify-center mb-4">
      <FileText class="w-12 h-12 text-blue-600" />
    </div>
    <h1 class="text-4xl font-bold text-gray-900 mb-4">Términos de Uso</h1>
    <p class="text-lg text-gray-600 max-w-2xl mx-auto">
      Estos términos rigen el uso de PsyBooking. Al usar nuestro servicio, 
      aceptas estas condiciones.
    </p>
    <p class="text-sm text-gray-500 mt-4">Última actualización: 15 de enero de 2025</p>
  </div>

  <!-- Contenido -->
  <div class="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>1. Descripción del Servicio</CardTitle>
      </CardHeader>
      <CardContent class="prose prose-gray max-w-none">
        <p>
          PsyBooking es una plataforma SaaS que permite a psicólogos colegiados 
          gestionar su consulta privada online, incluyendo:
        </p>
        <ul>
          <li>Creación de perfil público profesional</li>
          <li>Sistema automatizado de reservas y pagos</li>
          <li>Gestión de calendario y disponibilidad</li>
          <li>Comunicación con clientes</li>
          <li>Herramientas de gestión administrativa</li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>2. Elegibilidad y Registro</CardTitle>
      </CardHeader>
      <CardContent class="prose prose-gray max-w-none">
        <h4>Para Psicólogos:</h4>
        <ul>
          <li>Título oficial en Psicología</li>
          <li>Colegiación activa en Colegio Profesional</li>
          <li>Cumplimiento normativa sanitaria vigente</li>
          <li>Mayoría de edad</li>
        </ul>

        <h4>Para Clientes:</h4>
        <ul>
          <li>Mayoría de edad o autorización parental</li>
          <li>Información veraz en el registro</li>
          <li>Método de pago válido</li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>3. Planes y Facturación</CardTitle>
      </CardHeader>
      <CardContent class="prose prose-gray max-w-none">
        <h4>Estructura de Precios:</h4>
        <ul>
          <li><strong>Plan Básico:</strong> 29€/mes + 5% comisión por transacción</li>
          <li><strong>Plan Pro:</strong> 49€/mes + 3% comisión por transacción</li>
        </ul>

        <h4>Condiciones de Pago:</h4>
        <ul>
          <li>Facturación mensual anticipada</li>
          <li>Comisiones deducidas automáticamente</li>
          <li>Cambios de plan con efecto inmediato</li>
          <li>Sin permanencia mínima</li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>4. Responsabilidades del Psicólogo</CardTitle>
      </CardHeader>
      <CardContent class="prose prose-gray max-w-none">
        <ul>
          <li><strong>Profesionalidad:</strong> Cumplir código deontológico</li>
          <li><strong>Información veraz:</strong> Datos profesionales actualizados</li>
          <li><strong>Disponibilidad:</strong> Mantener calendario actualizado</li>
          <li><strong>Calidad:</strong> Prestar servicios con estándares profesionales</li>
          <li><strong>Privacidad:</strong> Proteger confidencialidad del cliente</li>
          <li><strong>Comunicación:</strong> Responder en plazos razonables</li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>5. Responsabilidades del Cliente</CardTitle>
      </CardHeader>
      <CardContent class="prose prose-gray max-w-none">
        <ul>
          <li><strong>Pago puntual:</strong> Abonar servicios según se establezca</li>
          <li><strong>Asistencia:</strong> Acudir a citas confirmadas</li>
          <li><strong>Información veraz:</strong> Proporcionar datos correctos</li>
          <li><strong>Respeto:</strong> Trato profesional con el psicólogo</li>
          <li><strong>Cancelaciones:</strong> Avisar según política establecida</li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>6. Políticas de Cancelación y Reembolsos</CardTitle>
      </CardHeader>
      <CardContent class="prose prose-gray max-w-none">
        <h4>Cancelación por el Cliente:</h4>
        <ul>
          <li><strong>+24h anticipación:</strong> Reembolso del 100%</li>
          <li><strong>12-24h anticipación:</strong> Reembolso del 50%</li>
          <li><strong>-12h anticipación:</strong> Sin reembolso</li>
          <li><strong>No-show:</strong> Cobro completo</li>
        </ul>

        <h4>Cancelación por el Psicólogo:</h4>
        <ul>
          <li>Reembolso automático del 100%</li>
          <li>Asistencia para reagendar</li>
          <li>Compensación en casos de cancelación reiterada</li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>7. Propiedad Intelectual</CardTitle>
      </CardHeader>
      <CardContent class="prose prose-gray max-w-none">
        <ul>
          <li><strong>Plataforma PsyBooking:</strong> Nuestra propiedad exclusiva</li>
          <li><strong>Contenido del psicólogo:</strong> Propiedad del profesional</li>
          <li><strong>Licencia de uso:</strong> Otorgada para funcionamiento del servicio</li>
          <li><strong>Marcas registradas:</strong> Respeto mutuo de derechos</li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>8. Limitación de Responsabilidad</CardTitle>
      </CardHeader>
      <CardContent class="prose prose-gray max-w-none">
        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <div class="flex items-center space-x-2 mb-2">
            <AlertTriangle class="w-5 h-5 text-yellow-600" />
            <h4 class="font-semibold text-yellow-800">Importante</h4>
          </div>
          <p class="text-yellow-800 text-sm">
            PsyBooking es una plataforma tecnológica. No somos responsables 
            del contenido o calidad de los servicios psicológicos prestados.
          </p>
        </div>

        <ul>
          <li><strong>Servicios profesionales:</strong> Responsabilidad exclusiva del psicólogo</li>
          <li><strong>Relación terapéutica:</strong> Entre psicólogo y cliente</li>
          <li><strong>Fallos técnicos:</strong> Limitados a reembolso de tarifas</li>
          <li><strong>Fuerza mayor:</strong> Exención de responsabilidad</li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>9. Terminación del Servicio</CardTitle>
      </CardHeader>
      <CardContent class="prose prose-gray max-w-none">
        <h4>Por parte del usuario:</h4>
        <ul>
          <li>Cancelación inmediata desde panel de usuario</li>
          <li>Finalización al terminar período de facturación</li>
          <li>Exportación de datos disponible 30 días</li>
        </ul>

        <h4>Por parte de PsyBooking:</h4>
        <ul>
          <li>Incumplimiento reiterado de términos</li>
          <li>Actividades ilegales o no éticas</li>
          <li>Impago de tarifas por más de 30 días</li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>10. Ley Aplicable y Jurisdicción</CardTitle>
      </CardHeader>
      <CardContent class="prose prose-gray max-w-none">
        <ul>
          <li><strong>Ley aplicable:</strong> Legislación española</li>
          <li><strong>Jurisdicción:</strong> Tribunales de Madrid</li>
          <li><strong>Normativa específica:</strong> GDPR, Ley de Servicios Digitales</li>
          <li><strong>Mediación:</strong> Preferente antes de procedimientos judiciales</li>
        </ul>
      </CardContent>
    </Card>
  </div>

  <!-- Aceptación -->
  <Card class="border-green-200 bg-green-50">
    <CardContent class="p-6">
      <div class="flex items-center space-x-2 mb-2">
        <CheckCircle class="w-5 h-5 text-green-600" />
        <h3 class="font-semibold text-green-900">Aceptación de Términos</h3>
      </div>
      <p class="text-green-800 text-sm">
        Al usar PsyBooking, confirmas que has leído, entendido y aceptas 
        estos términos de uso en su totalidad.
      </p>
    </CardContent>
  </Card>
</div>