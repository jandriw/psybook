<script>
  import { Card, CardContent } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { Edit, Trash2 } from 'lucide-svelte';
  
  let { 
    item,
    onEdit = () => {},
    onDelete = () => {},
    children
  } = $props();
</script>

<Card>
  <CardContent class="px-6 py-1">
    <div class="flex items-center justify-between">
      <div class="flex-1">
        {#if children}
          {@render children()}
        {/if}
      </div>
      
      <div class="flex items-center space-x-2">
        <Button variant="outline" size="sm" class="bg-transparent" onclick={() => onEdit(item)}>
          <Edit class="w-4 h-4" />
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          class="text-red-600 hover:text-red-700 bg-transparent"
          onclick={() => onDelete(item)}
        >
          <Trash2 class="w-4 h-4" />
        </Button>
      </div>
    </div>
  </CardContent>
</Card>