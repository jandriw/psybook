<script>
  import * as m from '$lib/paraglide/messages';
  import { getLocale, setLocale } from '$lib/paraglide/runtime';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { Globe } from 'lucide-svelte';
  
  let currentLocale = getLocale();
  
  // Auto-update locale when selection changes
  $: setLocale(currentLocale);
</script>

<div class="container mx-auto p-4">
  <Card class="max-w-md mx-auto">
    <CardHeader class="text-center">
      <CardTitle class="text-3xl font-bold text-slate-900">
        {m.welcome()}
      </CardTitle>
      <CardDescription>
        Ejemplo de internacionalización con shadcn-svelte
      </CardDescription>
    </CardHeader>
    
    <CardContent class="space-y-6">
      <!-- Selector de idioma con bind (sin función de event) -->
      <div class="space-y-2">
        <div class="flex items-center gap-2">
          <Globe class="w-4 h-4" />
          <span class="text-sm font-medium">Cambiar idioma</span>
        </div>
        
        <select 
          bind:value={currentLocale}
          class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="es">🇪🇸 Español</option>
          <option value="en">🇺🇸 English</option>
          <option value="ca">🏴 Català</option>
        </select>
      </div>
      
      <!-- Badge con locale actual -->
      <div class="flex justify-center">
        <Badge variant="secondary" class="px-3 py-1">
          Idioma actual: <strong class="ml-1">{getLocale()}</strong>
        </Badge>
      </div>
      
      <!-- Botones de ejemplo -->
      <div class="flex gap-2 justify-center">
        <Button variant="default">Primario</Button>
        <Button variant="outline">Secundario</Button>
      </div>
    </CardContent>
  </Card>
</div>