<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Card, CardContent } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import {
    Calendar,
    CreditCard,
    Video,
    MessageSquare,
    Shield,
    Clock,
    TrendingUp,
    Users,
    CheckCircle,
    Star,
    Menu,
    Play,
    ArrowRight,
    Heart,
    Brain,
    Zap,
  } from 'lucide-svelte';

  // Estado reactivo para mobile menu
  let showMobileMenu = $state(false);

  // Funciones de navegación
  function scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    showMobileMenu = false;
  }

  function handleStartTrial() {
    alert('Funcionalidad de registro próximamente');
  }

  function handleWatchDemo() {
    alert('Demo próximamente');
  }

  function handleLogin() {
    alert('Login próximamente');
  }
</script>

<svelte:head>
  <title>PsyBooking - Automatiza tu consulta psicológica privada</title>
  <meta name="description" content="La plataforma que permite a psicólogos independientes automatizar completamente su consulta online. Reservas, pagos y gestión en piloto automático." />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
  <!-- Header -->
  <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-100">
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
            <Brain class="w-5 h-5 text-white" />
          </div>
          <span class="text-xl font-bold text-gray-800">PsyBooking</span>
        </div>

        <nav class="hidden md:flex items-center space-x-8">
          <button 
            type="button"
            class="text-gray-600 hover:text-blue-600 transition-colors"
            onclick={() => scrollToSection('beneficios')}
          >
            Beneficios
          </button>
          <button 
            type="button"
            class="text-gray-600 hover:text-blue-600 transition-colors"
            onclick={() => scrollToSection('caracteristicas')}
          >
            Características
          </button>
          <button 
            type="button"
            class="text-gray-600 hover:text-blue-600 transition-colors"
            onclick={() => scrollToSection('testimonios')}
          >
            Testimonios
          </button>
          <button 
            type="button"
            class="text-gray-600 hover:text-blue-600 transition-colors"
            onclick={() => scrollToSection('precios')}
          >
            Precios
          </button>
          <Button 
            variant="outline" 
            class="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
            onclick={handleLogin}
          >
            Iniciar Sesión
          </Button>
          <Button 
            class="bg-blue-600 hover:bg-blue-700 text-white"
            onclick={handleStartTrial}
          >
            Prueba Gratuita
          </Button>
        </nav>

        <Button 
          variant="ghost" 
          size="icon" 
          class="md:hidden"
          onclick={() => showMobileMenu = !showMobileMenu}
        >
          <Menu class="w-5 h-5" />
        </Button>
      </div>

      <!-- Mobile Menu -->
      {#if showMobileMenu}
        <nav class="md:hidden mt-4 pb-4 border-t border-blue-100 pt-4">
          <div class="flex flex-col space-y-4">
            <button 
              type="button"
              class="text-left text-gray-600 hover:text-blue-600 transition-colors"
              onclick={() => scrollToSection('beneficios')}
            >
              Beneficios
            </button>
            <button 
              type="button"
              class="text-left text-gray-600 hover:text-blue-600 transition-colors"
              onclick={() => scrollToSection('caracteristicas')}
            >
              Características
            </button>
            <button 
              type="button"
              class="text-left text-gray-600 hover:text-blue-600 transition-colors"
              onclick={() => scrollToSection('testimonios')}
            >
              Testimonios
            </button>
            <button 
              type="button"
              class="text-left text-gray-600 hover:text-blue-600 transition-colors"
              onclick={() => scrollToSection('precios')}
            >
              Precios
            </button>
            <div class="flex flex-col space-y-2 pt-2">
              <Button 
                variant="outline" 
                class="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
                onclick={handleLogin}
              >
                Iniciar Sesión
              </Button>
              <Button 
                class="bg-blue-600 hover:bg-blue-700 text-white"
                onclick={handleStartTrial}
              >
                Prueba Gratuita
              </Button>
            </div>
          </div>
        </nav>
      {/if}
    </div>
  </header>

  <!-- Hero Section -->
  <section class="py-20 lg:py-32">
    <div class="container mx-auto px-4">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div class="space-y-8">
          <div class="space-y-4">
            <Badge class="bg-green-100 text-green-700 hover:bg-green-100">
              ✨ Automatiza tu consulta privada
            </Badge>
            <h1 class="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Dedícate a{" "}
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                ayudar personas
              </span>
              , nosotros nos encargamos del resto
            </h1>
            <p class="text-xl text-gray-600 leading-relaxed">
              La plataforma que permite a psicólogos independientes automatizar completamente su consulta online.
              Reservas, pagos y gestión en piloto automático.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
              onclick={handleStartTrial}
            >
              Empezar prueba gratuita 14 días
              <ArrowRight class="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              class="border-gray-300 px-8 py-4 text-lg bg-transparent"
              onclick={handleWatchDemo}
            >
              <Play class="mr-2 w-5 h-5" />
              Ver demo de 2 minutos
            </Button>
          </div>

          <div class="flex items-center space-x-8 text-sm text-gray-500">
            <div class="flex items-center space-x-2">
              <CheckCircle class="w-4 h-4 text-green-500" />
              <span>Sin permanencia</span>
            </div>
            <div class="flex items-center space-x-2">
              <CheckCircle class="w-4 h-4 text-green-500" />
              <span>Configuración en 5 minutos</span>
            </div>
            <div class="flex items-center space-x-2">
              <CheckCircle class="w-4 h-4 text-green-500" />
              <span>Soporte en español</span>
            </div>
          </div>
        </div>

        <div class="relative">
          <div class="relative z-10 bg-white rounded-2xl shadow-2xl p-8 border border-blue-100">
            <div class="space-y-6">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-800">Tu página pública</h3>
                <Badge class="bg-green-100 text-green-700">En línea</Badge>
              </div>

              <div class="space-y-4">
                <div class="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Calendar class="w-5 h-5 text-blue-600" />
                  <div>
                    <p class="font-medium text-gray-800">Terapia Individual</p>
                    <p class="text-sm text-gray-600">60€ • 50 min</p>
                  </div>
                </div>

                <div class="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <Users class="w-5 h-5 text-green-600" />
                  <div>
                    <p class="font-medium text-gray-800">Terapia de Pareja</p>
                    <p class="text-sm text-gray-600">75€ • 60 min</p>
                  </div>
                </div>

                <div class="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <Heart class="w-5 h-5 text-purple-600" />
                  <div>
                    <p class="font-medium text-gray-800">Primera Consulta</p>
                    <p class="text-sm text-gray-600">45€ • 45 min</p>
                  </div>
                </div>
              </div>

              <Button class="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Reservar Cita
              </Button>
            </div>
          </div>

          <div class="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-r from-blue-400 to-green-400 rounded-full opacity-20 blur-3xl"></div>
          <div class="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-20 blur-3xl"></div>
        </div>
      </div>
    </div>
  </section>

  <!-- Beneficios -->
  <section id="beneficios" class="py-20 bg-white">
    <div class="container mx-auto px-4">
      <div class="text-center space-y-4 mb-16">
        <h2 class="text-3xl lg:text-4xl font-bold text-gray-900">Resultados que transforman tu práctica</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Más de 500 psicólogos ya han automatizado su consulta y recuperado su tiempo
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <Card class="border-blue-100 hover:shadow-lg transition-shadow">
          <CardContent class="p-8 text-center">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock class="w-8 h-8 text-blue-600" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">10-15 horas</h3>
            <p class="text-gray-600 mb-4">semanales ahorradas en gestión administrativa</p>
            <p class="text-sm text-gray-500">Elimina llamadas, WhatsApps y gestión manual de citas</p>
          </CardContent>
        </Card>

        <Card class="border-green-100 hover:shadow-lg transition-shadow">
          <CardContent class="p-8 text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <TrendingUp class="w-8 h-8 text-green-600" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">40% menos</h3>
            <p class="text-gray-600 mb-4">de no-shows gracias al pago adelantado</p>
            <p class="text-sm text-gray-500">Los pacientes se comprometen más cuando ya han pagado</p>
          </CardContent>
        </Card>

        <Card class="border-purple-100 hover:shadow-lg transition-shadow">
          <CardContent class="p-8 text-center">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap class="w-8 h-8 text-purple-600" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">+25%</h3>
            <p class="text-gray-600 mb-4">de incremento en ingresos mensuales</p>
            <p class="text-sm text-gray-500">Más citas, menos cancelaciones, imagen más profesional</p>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>

  <!-- Características -->
  <section id="caracteristicas" class="py-20 bg-gradient-to-br from-blue-50 to-green-50">
    <div class="container mx-auto px-4">
      <div class="text-center space-y-4 mb-16">
        <h2 class="text-3xl lg:text-4xl font-bold text-gray-900">Todo lo que necesitas en una plataforma</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Diseñada específicamente para psicólogos independientes en España
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card class="bg-white border-blue-100 hover:shadow-lg transition-shadow">
          <CardContent class="p-6">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Calendar class="w-6 h-6 text-blue-600" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Calendario Público Automático</h3>
            <p class="text-gray-600">
              Tus pacientes reservan directamente en tu disponibilidad real, sin intermediarios ni confusiones.
            </p>
          </CardContent>
        </Card>

        <Card class="bg-white border-green-100 hover:shadow-lg transition-shadow">
          <CardContent class="p-6">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <CreditCard class="w-6 h-6 text-green-600" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Pagos Seguros con Stripe</h3>
            <p class="text-gray-600">
              Cobra automáticamente al reservar. Tarjeta, Bizum, transferencia. El dinero llega directo a tu cuenta.
            </p>
          </CardContent>
        </Card>

        <Card class="bg-white border-purple-100 hover:shadow-lg transition-shadow">
          <CardContent class="p-6">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Video class="w-6 h-6 text-purple-600" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Integración Zoom y Teams</h3>
            <p class="text-gray-600">
              Enlaces de videollamada generados automáticamente. Tus pacientes reciben todo lo necesario por email.
            </p>
          </CardContent>
        </Card>

        <Card class="bg-white border-orange-100 hover:shadow-lg transition-shadow">
          <CardContent class="p-6">
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <MessageSquare class="w-6 h-6 text-orange-600" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Notificaciones WhatsApp</h3>
            <p class="text-gray-600">
              Recordatorios automáticos 24h antes. Reduce no-shows sin que tengas que recordar nada.
            </p>
          </CardContent>
        </Card>

        <Card class="bg-white border-red-100 hover:shadow-lg transition-shadow">
          <CardContent class="p-6">
            <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <Shield class="w-6 h-6 text-red-600" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Cumplimiento GDPR</h3>
            <p class="text-gray-600">
              Protección total de datos médicos sensibles. Servidores en Europa, cifrado extremo a extremo.
            </p>
          </CardContent>
        </Card>

        <Card class="bg-white border-teal-100 hover:shadow-lg transition-shadow">
          <CardContent class="p-6">
            <div class="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
              <Users class="w-6 h-6 text-teal-600" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Dashboard Centralizado</h3>
            <p class="text-gray-600">
              Gestiona pacientes, citas, ingresos y estadísticas desde un solo lugar. Simple y potente.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>

  <!-- Testimonios -->
  <section id="testimonios" class="py-20 bg-white">
    <div class="container mx-auto px-4">
      <div class="text-center space-y-4 mb-16">
        <h2 class="text-3xl lg:text-4xl font-bold text-gray-900">Lo que dicen nuestros psicólogos</h2>
        <p class="text-xl text-gray-600">Historias reales de profesionales que han transformado su práctica</p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card class="border-blue-100">
          <CardContent class="p-6">
            <div class="flex items-center mb-4">
              {#each Array(5) as _, i}
                <Star class="w-4 h-4 text-yellow-400 fill-current" />
              {/each}
            </div>
            <p class="text-gray-600 mb-4">
              "Antes perdía 2 horas diarias gestionando citas por WhatsApp. Ahora todo es automático y puedo dedicar
              ese tiempo a mis pacientes. Mis ingresos han subido un 30%."
            </p>
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span class="text-blue-600 font-semibold">MC</span>
              </div>
              <div>
                <p class="font-semibold text-gray-900">María Carmen López</p>
                <p class="text-sm text-gray-500">Psicóloga Clínica, Madrid</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card class="border-green-100">
          <CardContent class="p-6">
            <div class="flex items-center mb-4">
              {#each Array(5) as _, i}
                <Star class="w-4 h-4 text-yellow-400 fill-current" />
              {/each}
            </div>
            <p class="text-gray-600 mb-4">
              "El pago adelantado ha sido un cambio radical. Antes tenía 3-4 no-shows por semana, ahora
              prácticamente ninguno. Mi agenda está siempre completa."
            </p>
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span class="text-green-600 font-semibold">JR</span>
              </div>
              <div>
                <p class="font-semibold text-gray-900">Javier Rodríguez</p>
                <p class="text-sm text-gray-500">Psicólogo Sanitario, Barcelona</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card class="border-purple-100">
          <CardContent class="p-6">
            <div class="flex items-center mb-4">
              {#each Array(5) as _, i}
                <Star class="w-4 h-4 text-yellow-400 fill-current" />
              {/each}
            </div>
            <p class="text-gray-600 mb-4">
              "Mis pacientes me dicen que ahora parezco más profesional. La página es preciosa y el proceso de
              reserva súper fácil. Estoy encantada."
            </p>
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <span class="text-purple-600 font-semibold">AG</span>
              </div>
              <div>
                <p class="font-semibold text-gray-900">Ana García</p>
                <p class="text-sm text-gray-500">Psicóloga Infantil, Valencia</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>

  <!-- Precios -->
  <section id="precios" class="py-20 bg-gradient-to-br from-blue-50 to-green-50">
    <div class="container mx-auto px-4">
      <div class="text-center space-y-4 mb-16">
        <h2 class="text-3xl lg:text-4xl font-bold text-gray-900">Precios transparentes y justos</h2>
        <p class="text-xl text-gray-600">Solo pagas cuando generas ingresos. Sin sorpresas ni letra pequeña.</p>
      </div>

      <div class="max-w-lg mx-auto">
        <Card class="bg-white border-blue-200 shadow-xl">
          <CardContent class="p-8">
            <div class="text-center space-y-6">
              <div>
                <Badge class="bg-blue-100 text-blue-700 mb-4">Plan Profesional</Badge>
                <div class="space-y-2">
                  <div class="flex items-baseline justify-center space-x-2">
                    <span class="text-4xl font-bold text-gray-900">29€</span>
                    <span class="text-gray-500">/mes</span>
                  </div>
                  <p class="text-gray-600">+ 5% por transacción exitosa</p>
                </div>
              </div>

              <div class="space-y-4 text-left">
                <div class="flex items-center space-x-3">
                  <CheckCircle class="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span class="text-gray-700">Página pública personalizada</span>
                </div>
                <div class="flex items-center space-x-3">
                  <CheckCircle class="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span class="text-gray-700">Calendario automático ilimitado</span>
                </div>
                <div class="flex items-center space-x-3">
                  <CheckCircle class="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span class="text-gray-700">Pagos seguros con Stripe</span>
                </div>
                <div class="flex items-center space-x-3">
                  <CheckCircle class="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span class="text-gray-700">Notificaciones WhatsApp</span>
                </div>
                <div class="flex items-center space-x-3">
                  <CheckCircle class="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span class="text-gray-700">Integración Zoom/Teams</span>
                </div>
                <div class="flex items-center space-x-3">
                  <CheckCircle class="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span class="text-gray-700">Soporte prioritario en español</span>
                </div>
              </div>

              <div class="space-y-4">
                <Button 
                  size="lg" 
                  class="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onclick={handleStartTrial}
                >
                  Empezar prueba gratuita 14 días
                </Button>
                <p class="text-sm text-gray-500 text-center">
                  Sin permanencia • Cancela cuando quieras • Configuración en 5 minutos
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="py-20 bg-white">
    <div class="container mx-auto px-4">
      <div class="text-center space-y-4 mb-16">
        <h2 class="text-3xl lg:text-4xl font-bold text-gray-900">Preguntas frecuentes</h2>
      </div>

      <div class="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardContent class="p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">¿Cómo funciona el periodo de prueba?</h3>
            <p class="text-gray-600">
              14 días completamente gratis, sin introducir tarjeta. Puedes configurar tu página, probar todas las
              funciones y decidir si te convence.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent class="p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">¿Cuándo se cobra la comisión del 5%?</h3>
            <p class="text-gray-600">
              Solo cuando un paciente paga una cita exitosamente. Si no hay ingresos, no hay comisión. El dinero
              llega directo a tu cuenta bancaria.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent class="p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">¿Es seguro para datos médicos?</h3>
            <p class="text-gray-600">
              Totalmente. Cumplimos GDPR, servidores en Europa, cifrado extremo a extremo. Diseñado específicamente
              para profesionales sanitarios.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent class="p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">¿Qué pasa si quiero cancelar?</h3>
            <p class="text-gray-600">
              Puedes cancelar cuando quieras desde tu dashboard. Sin permanencia, sin penalizaciones. Tu página se
              mantiene activa hasta final de mes.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>

  <!-- CTA Final -->
  <section class="py-20 bg-gradient-to-r from-blue-600 to-green-600">
    <div class="container mx-auto px-4 text-center">
      <div class="max-w-3xl mx-auto space-y-8">
        <h2 class="text-3xl lg:text-4xl font-bold text-white">
          ¿Listo para recuperar tu tiempo y aumentar tus ingresos?
        </h2>
        <p class="text-xl text-blue-100">
          Únete a más de 500 psicólogos que ya han automatizado su consulta privada
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            class="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg"
            onclick={handleStartTrial}
          >
            Empezar prueba gratuita 14 días
            <ArrowRight class="ml-2 w-5 h-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            class="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg bg-transparent"
            onclick={handleWatchDemo}
          >
            <Play class="mr-2 w-5 h-5" />
            Ver demo de 2 minutos
          </Button>
        </div>
        <p class="text-blue-100 text-sm">Sin permanencia • Sin configuración técnica • Soporte en español</p>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-gray-900 text-white py-12">
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
            <button 
              type="button"
              class="block hover:text-white transition-colors text-left"
              onclick={() => scrollToSection('caracteristicas')}
            >
              Características
            </button>
            <button 
              type="button"
              class="block hover:text-white transition-colors text-left"
              onclick={() => scrollToSection('precios')}
            >
              Precios
            </button>
            <button 
              type="button"
              class="block hover:text-white transition-colors text-left"
              onclick={handleWatchDemo}
            >
              Demo
            </button>
            <button 
              type="button"
              class="block hover:text-white transition-colors text-left"
              onclick={() => scrollToSection('testimonios')}
            >
              Testimonios
            </button>
          </div>
        </div>

        <div>
          <h3 class="font-semibold mb-4">Soporte</h3>
          <div class="space-y-2 text-gray-400">
            <a href="#" class="block hover:text-white transition-colors">
              Centro de Ayuda
            </a>
            <a href="#" class="block hover:text-white transition-colors">
              Contacto
            </a>
            <a href="#" class="block hover:text-white transition-colors">
              Guías
            </a>
            <a href="#" class="block hover:text-white transition-colors">
              Estado del Sistema
            </a>
          </div>
        </div>

        <div>
          <h3 class="font-semibold mb-4">Legal</h3>
          <div class="space-y-2 text-gray-400">
            <a href="#" class="block hover:text-white transition-colors">
              Términos de Uso
            </a>
            <a href="#" class="block hover:text-white transition-colors">
              Política de Privacidad
            </a>
            <a href="#" class="block hover:text-white transition-colors">
              GDPR
            </a>
            <a href="#" class="block hover:text-white transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p class="text-gray-400">© 2024 PsyBooking. Todos los derechos reservados.</p>
        <p class="text-gray-400 text-sm">Hecho con ❤️ para psicólogos en España</p>
      </div>
    </div>
  </footer>
</div>