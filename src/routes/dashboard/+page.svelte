<!-- src/routes/dashboard/+page.svelte -->
<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import StatsCard from '$lib/components/dashboard/StatsCard.svelte';
  import AppointmentCard from '$lib/components/dashboard/AppointmentCard.svelte';
  import WeeklyChart from '$lib/components/dashboard/WeeklyChart.svelte';
  import QuickActions from '$lib/components/dashboard/QuickActions.svelte';
  import NotificationItem from '$lib/components/dashboard/NotificationItem.svelte';
  import {
    Euro,
    Calendar,
    TrendingDown,
    UserPlus,
    Clock,
    Users,
    BarChart3,
    CheckCircle,
    AlertCircle,
    DollarSign,
  } from 'lucide-svelte';

  let { data } = $props();

  // Datos simulados - en real vendrían del servidor
  const statsData = [
    {
      title: "Ingresos del Mes",
      value: "2.340€",
      change: "+12%",
      changeType: "positive",
      icon: Euro,
      valueColor: "green"
    },
    {
      title: "Sesiones Completadas", 
      value: "42",
      change: "+8%",
      changeType: "positive",
      icon: Calendar
    },
    {
      title: "Tasa de Cancelaciones",
      value: "3.2%", 
      change: "-2.1%",
      changeType: "positive",
      icon: TrendingDown,
      valueColor: "green"
    },
    {
      title: "Clientes Nuevos",
      value: "8",
      change: "+3",
      changeType: "positive", 
      icon: UserPlus
    },
  ];

  const todayAppointments = [
    {
      time: "09:00",
      client: "María García",
      type: "Primera consulta",
      status: "confirmed",
      price: 45,
    },
    {
      time: "11:00", 
      client: "Carlos Ruiz",
      type: "Terapia individual",
      status: "confirmed",
      price: 60,
    },
    {
      time: "15:30",
      client: "Ana Martín",
      type: "Seguimiento", 
      status: "confirmed",
      price: 60,
    },
    {
      time: "17:00",
      client: "Pareja López-Sánchez",
      type: "Terapia de pareja",
      status: "confirmed",
      price: 75,
    },
  ];

  const weeklyData = [
    { day: "Lun", appointments: 4, completed: 4 },
    { day: "Mar", appointments: 5, completed: 5 },
    { day: "Mié", appointments: 3, completed: 3 },
    { day: "Jue", appointments: 6, completed: 4 },
    { day: "Vie", appointments: 4, completed: 0 },
    { day: "Sáb", appointments: 2, completed: 0 },
    { day: "Dom", appointments: 0, completed: 0 },
  ];

  const recentNotifications = [
    {
      type: "booking",
      message: "Nueva reserva confirmada: Laura Martínez - Mañana 10:00",
      time: "Hace 15 min",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      type: "payment",
      message: "Pago recibido: 60€ de Carlos Ruiz",
      time: "Hace 1 hora",
      icon: DollarSign,
      color: "text-blue-600",
    },
    {
      type: "reminder", 
      message: "Recordatorio: Sesión con Ana Martín en 30 minutos",
      time: "Hace 2 horas",
      icon: Clock,
      color: "text-orange-600",
    },
    {
      type: "cancellation",
      message: "Cancelación: Pedro Jiménez - Sesión del viernes",
      time: "Hace 3 horas", 
      icon: AlertCircle,
      color: "text-red-600",
    },
  ];
</script>

<svelte:head>
  <title>Dashboard - PsyBooking</title>
</svelte:head>

<div class="space-y-6">
  <!-- Métricas principales -->
  <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    {#each statsData as stat}
      <StatsCard {...stat} />
    {/each}
  </div>

  <div class="grid gap-6 lg:grid-cols-3">
    <!-- Citas de hoy -->
    <div class="lg:col-span-2">
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2 text-2xl">
            <Clock class="h-5 w-5" />
            Citas de Hoy
          </CardTitle>
          <CardDescription>
            {todayAppointments.length} sesiones programadas para hoy
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          {#each todayAppointments as appointment}
            <AppointmentCard {appointment} />
          {/each}
        </CardContent>
      </Card>
    </div>

    <!-- Sidebar derecho -->
    <div class="space-y-6">
      <!-- Acciones rápidas -->
      <QuickActions />

      <!-- Notificaciones recientes -->
      <Card>
        <CardHeader>
          <CardTitle class="text-2xl">Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          {#each recentNotifications as notification}
            <NotificationItem {notification} />
          {/each}
        </CardContent>
      </Card>
    </div>
  </div>

  <!-- Vista semanal -->
  <WeeklyChart {weeklyData} />

  <!-- Estadísticas adicionales -->
  <div class="grid gap-4 md:grid-cols-2">
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center gap-2 text-2xl">
          <Users class="h-5 w-5" />
          Clientes Activos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <span class="text-sm">Total de clientes</span>
            <span class="font-bold">127</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm">Nuevos este mes</span>
            <span class="font-bold text-green-600">8</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm">Sesiones regulares</span>
            <span class="font-bold">89</span>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle class="flex items-center gap-2 text-2xl">
          <BarChart3 class="h-5 w-5" />
          Rendimiento
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <span class="text-sm">Horas trabajadas</span>
            <span class="font-bold">32h</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm">Ingreso por hora</span>
            <span class="font-bold text-green-600">73€</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm">Ocupación</span>
            <span class="font-bold">85%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</div>