<script>
  import SettingsHeader from '$lib/components/settings/SettingsHeader.svelte';
  import StatusCardIntegration from '$lib/components/settings/StatusCardIntegration.svelte';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { CreditCard, Building, FileText } from 'lucide-svelte';

  let { data } = $props();

  let fiscalData = $state({
    nif: data.profile?.fiscalData?.nif || "12345678A",
    businessName: data.profile?.fiscalData?.businessName || "Carmen Rodríguez Martín",
    address: data.profile?.fiscalData?.address || "Calle Mayor 123, 28001 Madrid"
  });

  let bankAccount = $state({
    bank: "Banco Santander",
    account: "****1234",
    verified: true
  });

  async function changeBankAccount() {
    // Lógica para cambiar cuenta bancaria
  }

  async function saveFiscalData() {
    // Lógica para guardar datos fiscales
  }
</script>

<div class="max-w-4xl mx-auto space-y-8">
  <SettingsHeader 
    icon={CreditCard} 
    title="Pagos y Facturación"
    description="Gestiona tu cuenta bancaria y configuración fiscal"
  />

  <Card>
    <CardHeader>
      <CardTitle class="flex items-center gap-2 text-2xl">
        <Building class="w-5 h-5" />
        Cuenta Bancaria
      </CardTitle>
      <CardDescription>Los pagos se transferirán a esta cuenta</CardDescription>
    </CardHeader>
    <CardContent class="space-y-4">
      <StatusCardIntegration
        title={bankAccount.bank}
        description={bankAccount.account}
        status="Verificada"
        statusType="verified"
      />
      <Button variant="outline" class="bg-transparent" onclick={changeBankAccount}>
        Cambiar cuenta bancaria
      </Button>
    </CardContent>
  </Card>

  <Card>
    <CardHeader>
      <CardTitle class="flex items-center gap-2 text-2xl">
        <FileText class="w-5 h-5" />
        Datos Fiscales
      </CardTitle>
    </CardHeader>
    <CardContent class="space-y-4">
      <div class="grid md:grid-cols-2 gap-4">
        <div>
          <Label for="nif" class="mb-2">NIF/CIF</Label>
          <Input id="nif" bind:value={fiscalData.nif} />
        </div>
        <div>
          <Label for="business-name" class="mb-2">Nombre fiscal</Label>
          <Input id="business-name" bind:value={fiscalData.businessName} />
        </div>
      </div>
      <div>
        <Label for="address" class="mb-2">Dirección fiscal</Label>
        <Input id="address" bind:value={fiscalData.address} />
      </div>
      
      <Button class="bg-blue-600 hover:bg-blue-700" onclick={saveFiscalData}>
        Guardar cambios
      </Button>
    </CardContent>
  </Card>
</div>