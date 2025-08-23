<!--src/routes/patient/+page.svelte-->
<script lang="ts">
  import NextSession from '$lib/components/patient/NextSession.svelte';
  import UpcomingAppointments from '$lib/components/patient/UpcomingAppointments.svelte';
  import SessionHistory from '$lib/components/patient/SessionHistory.svelte';
  import ProgressStats from '$lib/components/patient/ProgressStats.svelte';
  import HelpfulReminders from '$lib/components/patient/HelpfulReminders.svelte';
  import QuickContact from '$lib/components/patient/QuickContact.svelte';

  let { data } = $props();
</script>

<svelte:head>
  <title>Mi Área Personal - PsyBooking</title>
</svelte:head>

<div class="max-w-6xl mx-auto space-y-8">
  <!-- Próxima sesión destacada -->
  <NextSession nextSession={data.nextSession} />

  <div class="grid lg:grid-cols-3 gap-8">
    <!-- Contenido principal -->
    <div class="lg:col-span-2 space-y-8">
      <UpcomingAppointments appointments={data.upcomingAppointments} />
      <SessionHistory sessions={data.sessionHistory} />
    </div>

    <!-- Sidebar -->
    <div class="space-y-6">
      <ProgressStats stats={data.progressStats} />
      <HelpfulReminders />
      <QuickContact psychologist={data.psychologist} />
    </div>
  </div>
</div>