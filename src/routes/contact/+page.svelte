<!-- src/routes/contact/+page.svelte -->
<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Textarea } from '$lib/components/ui/textarea';
  import { Badge } from '$lib/components/ui/badge';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { Alert, AlertDescription } from '$lib/components/ui/alert';
  import {
    Brain,
    MessageCircle,
    Mail,
    Phone,
    Send,
    CheckCircle,
    Calendar,
    BookOpen,
    Headphones,
    HelpCircle,
    ArrowRight,
    MapPin,
    Clock,
    User,
    MessageSquare
  } from 'lucide-svelte';

  // Estados del formulario
  let isSubmitting = $state(false);
  let isSubmitted = $state(false);
  let formData = $state({
    name: '',
    email: '',
    phone: '',
    subject: '',
    company: '',
    message: '',
    privacy: false,
    newsletter: false
  });

  // Funciones del formulario
  async function handleSubmit(e: SubmitEvent): Promise<void> {
    e.preventDefault();
    isSubmitting = true;

    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 2000));

    isSubmitting = false;
    isSubmitted = true;
  }

  function resetForm(): void {
    isSubmitted = false;
    formData = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      company: '',
      message: '',
      privacy: false,
      newsletter: false
    };
  }

  // Datos para las secciones
  const channels = [
    {
      icon: MessageCircle,
      title: "Chat en Vivo",
      description: "Soporte inmediato para usuarios registrados",
      action: "Abrir chat",
      color: "green",
      available: true,
    },
    {
      icon: Calendar,
      title: "Videollamada",
      description: "Sesión personalizada de 30 minutos",
      action: "Reservar cita",
      color: "blue",
      available: true,
    },
    {
      icon: BookOpen,
      title: "Centro de Ayuda",
      description: "Guías, tutoriales y preguntas frecuentes",
      action: "Ver recursos",
      color: "purple",
      available: true,
    },
    {
      icon: Headphones,
      title: "Soporte Telefónico",
      description: "Atención personalizada por teléfono",
      action: "Llamar ahora",
      color: "orange",
      available: false,
    },
  ];

  const faqs = [
    {
      question: "¿Cuánto tiempo tarda la configuración inicial?",
      answer: "La configuración básica toma solo 5-10 minutos. Nuestro equipo te ayuda con la configuración avanzada si lo necesitas.",
    },
    {
      question: "¿Qué comisión cobra PsyBooking?",
      answer: "29€/mes + 5% por transacción exitosa. Solo pagas comisión cuando generas ingresos. Sin costes ocultos.",
    },
    {
      question: "¿Puedo cancelar mi suscripción en cualquier momento?",
      answer: "Sí, puedes cancelar cuando quieras sin penalizaciones. Tu página permanece activa hasta el final del período pagado.",
    },
    {
      question: "¿Es compatible con mi agenda actual?",
      answer: "Sí, nos integramos con Google Calendar, Outlook y la mayoría de sistemas de gestión de consultas.",
    },
    {
      question: "¿Qué pasa si tengo problemas técnicos?",
      answer: "Ofrecemos soporte técnico gratuito por chat, email y videollamada. Respuesta garantizada en menos de 2 horas.",
    },
    {
      question: "¿Los datos de mis pacientes están seguros?",
      answer: "Totalmente. Cumplimos GDPR, usamos cifrado extremo a extremo y servidores en Europa. Diseñado para profesionales sanitarios.",
    },
  ];

  function getChannelColorClass(color: string, type: 'bg' | 'text'): string {
    const colors: Record<string, Record<string, string>> = {
      green: { bg: 'bg-green-100', text: 'text-green-600' },
      blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600' }
    };
    return colors[color]?.[type] || colors.blue[type];
  }
</script>

<svelte:head>
  <title>Contacto - PsyBooking</title>
  <meta name="description" content="¿Tienes dudas sobre PsyBooking? Contacta con nuestro equipo de soporte. Respuesta garantizada en menos de 2 horas." />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
  <!-- Header -->
  <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-100">
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <a href="/" class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
            <Brain class="w-5 h-5 text-white" />
          </div>
          <span class="text-xl font-bold text-gray-800">PsyBooking</span>
        </a>

        <nav class="hidden md:flex items-center space-x-8">
          <a href="/#beneficios" class="text-gray-600 hover:text-blue-600 transition-colors">
            Beneficios
          </a>
          <a href="/#caracteristicas" class="text-gray-600 hover:text-blue-600 transition-colors">
            Características
          </a>
          <a href="/#precios" class="text-gray-600 hover:text-blue-600 transition-colors">
            Precios
          </a>
          <Button variant="outline" class="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent">
            Iniciar Sesión
          </Button>
          <Button class="bg-blue-600 hover:bg-blue-700 text-white">Prueba Gratuita</Button>
        </nav>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="space-y-16">
    <!-- Hero Section -->
    <section class="py-16 lg:py-24">
      <div class="container mx-auto px-4 text-center">
        <div class="max-w-3xl mx-auto space-y-8">
          <div class="space-y-4">
            <Badge class="bg-blue-100 text-blue-700 hover:bg-blue-100">💬 Estamos aquí para ayudarte</Badge>
            <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              ¿Tienes alguna{" "}
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                pregunta?
              </span>
            </h1>
            <p class="text-xl text-gray-600 leading-relaxed">
              Nuestro equipo está disponible para resolver todas tus dudas sobre PsyBooking. Desde configuración técnica
              hasta estrategias para hacer crecer tu consulta.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm text-gray-600">
            <div class="flex items-center space-x-2">
              <MessageCircle class="w-4 h-4 text-green-500" />
              <span>Respuesta en menos de 2 horas</span>
            </div>
            <div class="flex items-center space-x-2">
              <Mail class="w-4 h-4 text-blue-500" />
              <span>Soporte en español</span>
            </div>
            <div class="flex items-center space-x-2">
              <Phone class="w-4 h-4 text-purple-500" />
              <span>Lunes a viernes 9:00-18:00</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Form and Contact Info Section -->
    <div class="container mx-auto px-4">
      <div class="grid lg:grid-cols-3 gap-12">
        <!-- Contact Form -->
        <div class="lg:col-span-2">
          {#if isSubmitted}
            <Card class="border-green-200">
              <CardContent class="p-8 text-center">
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle class="w-8 h-8 text-green-600" />
                </div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">¡Mensaje enviado!</h3>
                <p class="text-gray-600 mb-4">
                  Hemos recibido tu consulta. Nuestro equipo te responderá en menos de 2 horas durante horario laboral.
                </p>
                <Button variant="outline" onclick={resetForm} class="bg-transparent">
                  Enviar otro mensaje
                </Button>
              </CardContent>
            </Card>
          {:else}
            <Card class="border-blue-100 shadow-lg">
              <CardHeader>
                <CardTitle class="text-2xl text-gray-900">Envíanos un mensaje</CardTitle>
                <CardDescription>Completa el formulario y nos pondremos en contacto contigo lo antes posible</CardDescription>
              </CardHeader>
              <CardContent>
                <form onsubmit={handleSubmit} class="space-y-6">
                  <div class="grid md:grid-cols-2 gap-4">
                    <div class="space-y-2">
                      <Label for="name">Nombre completo *</Label>
                      <Input id="name" bind:value={formData.name} placeholder="Tu nombre y apellidos" required />
                    </div>
                    <div class="space-y-2">
                      <Label for="email">Email *</Label>
                      <Input id="email" type="email" bind:value={formData.email} placeholder="tu@email.com" required />
                    </div>
                  </div>

                  <div class="grid md:grid-cols-2 gap-4">
                    <div class="space-y-2">
                      <Label for="phone">Teléfono</Label>
                      <Input id="phone" type="tel" bind:value={formData.phone} placeholder="+34 600 000 000" />
                    </div>
                    <div class="space-y-2">
                      <Label for="subject">Tipo de consulta *</Label>
                      <select 
                        id="subject"
                        bind:value={formData.subject}
                        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        required
                      >
                        <option value="">Selecciona una opción</option>
                        <option value="sales">Información comercial</option>
                        <option value="support">Soporte técnico</option>
                        <option value="billing">Facturación y pagos</option>
                        <option value="demo">Solicitar demo</option>
                        <option value="partnership">Colaboraciones</option>
                        <option value="other">Otros</option>
                      </select>
                    </div>
                  </div>

                  <div class="space-y-2">
                    <Label for="company">¿Eres psicólogo/a? (opcional)</Label>
                    <Input id="company" bind:value={formData.company} placeholder="Nombre de tu consulta o centro" />
                  </div>

                  <div class="space-y-2">
                    <Label for="message">Mensaje *</Label>
                    <Textarea id="message" bind:value={formData.message} placeholder="Cuéntanos en qué podemos ayudarte..." rows={5} required />
                  </div>

                  <div class="space-y-4">
                    <div class="flex items-start space-x-2">
                      <Checkbox id="privacy" bind:checked={formData.privacy} required />
                      <Label for="privacy" class="text-sm leading-relaxed">
                        Acepto la{" "}
                        <!-- svelte-ignore a11y_invalid_attribute -->
                        <a href="#" class="text-blue-600 hover:underline">
                          política de privacidad
                        </a>{" "}
                        y el tratamiento de mis datos personales *
                      </Label>
                    </div>

                    <div class="flex items-start space-x-2">
                      <Checkbox id="newsletter" bind:checked={formData.newsletter} />
                      <Label for="newsletter" class="text-sm leading-relaxed">
                        Quiero recibir información sobre nuevas funcionalidades y consejos para psicólogos
                      </Label>
                    </div>
                  </div>

                  <Alert>
                    <AlertDescription>
                      <strong>Tiempo de respuesta:</strong> Respondemos todas las consultas en menos de 2 horas durante horario
                      laboral (L-V 9:00-18:00). Para urgencias técnicas, usa el chat de soporte en tu dashboard.
                    </AlertDescription>
                  </Alert>

                  <Button type="submit" size="lg" class="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                    {#if isSubmitting}
                      <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Enviando mensaje...
                    {:else}
                      <Send class="w-4 h-4 mr-2" />
                      Enviar mensaje
                    {/if}
                  </Button>
                </form>
              </CardContent>
            </Card>
          {/if}
        </div>

        <!-- Contact Info Sidebar -->
        <div class="space-y-8">
          <!-- Contact Information -->
          <Card class="border-green-100">
            <CardHeader>
              <CardTitle class="text-green-700">Información de Contacto</CardTitle>
            </CardHeader>
            <CardContent class="space-y-6">
              <div class="space-y-4">
                <div class="flex items-start space-x-3">
                  <MapPin class="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p class="font-medium text-gray-900">Oficina Principal</p>
                    <p class="text-sm text-gray-600">
                      Calle Serrano 123, 4º B<br />
                      28006 Madrid, España
                    </p>
                  </div>
                </div>

                <div class="flex items-start space-x-3">
                  <Clock class="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p class="font-medium text-gray-900">Horario de Atención</p>
                    <div class="text-sm text-gray-600 space-y-1">
                      <p>Lunes a Viernes: 9:00 - 18:00</p>
                      <p>Sábados: 10:00 - 14:00</p>
                      <p>Domingos: Cerrado</p>
                    </div>
                  </div>
                </div>

                <div class="flex items-start space-x-3">
                  <Mail class="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <p class="font-medium text-gray-900">Email</p>
                    <p class="text-sm text-gray-600">hola@psybooking.com</p>
                  </div>
                </div>

                <div class="flex items-start space-x-3">
                  <Phone class="w-5 h-5 text-orange-600 mt-0.5" />
                  <div>
                    <p class="font-medium text-gray-900">Teléfono</p>
                    <p class="text-sm text-gray-600">+34 91 123 45 67</p>
                  </div>
                </div>
              </div>

              <div class="pt-4 border-t border-green-100">
                <div class="flex items-center space-x-2 mb-2">
                  <Badge class="bg-green-100 text-green-700">Respuesta rápida</Badge>
                </div>
                <p class="text-xs text-gray-600">
                  Nuestro equipo de soporte responde en menos de 2 horas durante horario laboral. Para emergencias técnicas,
                  usa el chat en vivo.
                </p>
              </div>
            </CardContent>
          </Card>

          <!-- Contact Channels -->
          <Card class="border-blue-100">
            <CardHeader>
              <CardTitle class="text-blue-700">Otros Canales de Contacto</CardTitle>
            </CardHeader>
            <CardContent class="space-y-4">
              {#each channels as channel}
                <div class="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 {getChannelColorClass(channel.color, 'bg')} rounded-lg flex items-center justify-center">
                      <!-- svelte-ignore svelte_component_deprecated -->
                      <svelte:component this={channel.icon} class="w-5 h-5 {getChannelColorClass(channel.color, 'text')}" />
                    </div>
                    <div>
                      <p class="font-medium text-gray-900">{channel.title}</p>
                      <p class="text-xs text-gray-600">{channel.description}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant={channel.available ? "outline" : "ghost"}
                    disabled={!channel.available}
                    class="bg-transparent"
                  >
                    {channel.action}
                  </Button>
                </div>
              {/each}

              <div class="pt-4 border-t border-blue-100">
                <p class="text-xs text-center text-gray-500">
                  ¿Prefieres WhatsApp? Escríbenos al{" "}
                  <a href="https://wa.me/34611234567" class="text-green-600 hover:underline font-medium">
                    +34 611 234 567
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>

    <!-- FAQ Section -->
    <section class="bg-white py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Preguntas Frecuentes</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Resolvemos las dudas más comunes sobre PsyBooking. Si no encuentras tu respuesta, no dudes en contactarnos
            directamente.
          </p>
        </div>

        <div class="max-w-4xl mx-auto">
          <div class="grid md:grid-cols-2 gap-6 mb-8">
            {#each faqs as faq}
              <Card class="border-gray-200 hover:border-blue-200 transition-colors">
                <CardHeader class="pb-3">
                  <CardTitle class="text-lg flex items-start gap-2">
                    <HelpCircle class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p class="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            {/each}
          </div>

          <div class="text-center">
            <Card class="border-blue-100 bg-blue-50">
              <CardContent class="p-6">
                <h3 class="font-semibold text-gray-900 mb-2">¿No encuentras tu respuesta?</h3>
                <p class="text-gray-600 mb-4">
                  Nuestro equipo de soporte está disponible para resolver cualquier duda específica sobre tu caso.
                </p>
                <div class="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button class="bg-blue-600 hover:bg-blue-700">
                    Contactar Soporte
                    <ArrowRight class="w-4 h-4 ml-2" />
                  </Button>
                  <Button variant="outline" class="bg-white">
                    Ver Centro de Ayuda
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer class="bg-gray-900 text-white py-12 mt-16">
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-4 gap-8">
        <div class="space-y-4">
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
              <Brain class="w-5 h-5 text-white" />
            </div>
            <span class="text-xl font-bold">PsyBooking</span>
          </div>
          <p class="text-gray-400">La plataforma que automatiza tu consulta privada de psicología.</p>
        </div>

        <div>
          <h3 class="font-semibold mb-4">Producto</h3>
          <div class="space-y-2 text-gray-400">
            <a href="/#caracteristicas" class="block hover:text-white transition-colors">
              Características
            </a>
            <a href="/#precios" class="block hover:text-white transition-colors">
              Precios
            </a>
            <a href="/contact" class="block hover:text-white transition-colors">
              Demo
            </a>
          </div>
        </div>

        <div>
          <h3 class="font-semibold mb-4">Soporte</h3>
          <div class="space-y-2 text-gray-400">
            <a href="/contact" class="block hover:text-white transition-colors">
              Centro de Ayuda
            </a>
            <a href="/contact" class="block hover:text-white transition-colors">
              Contacto
            </a>
            <a href="/contact" class="block hover:text-white transition-colors">
              Guías
            </a>
          </div>
        </div>

        <div>
          <h3 class="font-semibold mb-4">Legal</h3>
          <div class="space-y-2 text-gray-400">
            <!-- svelte-ignore a11y_invalid_attribute -->
            <a href="#" class="block hover:text-white transition-colors">
              Términos de Uso
            </a>
            <!-- svelte-ignore a11y_invalid_attribute -->
            <a href="#" class="block hover:text-white transition-colors">
              Política de Privacidad
            </a>
            <!-- svelte-ignore a11y_invalid_attribute -->
            <a href="#" class="block hover:text-white transition-colors">
              GDPR
            </a>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p class="text-gray-400">© 2025 PsyBooking. Todos los derechos reservados.</p>
        <p class="text-gray-400 text-sm">Hecho con ❤️ para psicólogos en España</p>
      </div>
    </div>
  </footer>
</div>