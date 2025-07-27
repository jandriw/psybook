// src/lib/stores/dashboard.ts
import { writable } from 'svelte/store';

interface DashboardState {
  isLoading: boolean;
  selectedDate: Date;
  refreshInterval: ReturnType<typeof setInterval> | null;
}

function createDashboardStore() {
  const { subscribe, set, update } = writable<DashboardState>({
    isLoading: false,
    selectedDate: new Date(),
    refreshInterval: null
  });

  return {
    subscribe,
    setLoading: (loading: boolean) => update(s => ({ ...s, isLoading: loading })),
    setSelectedDate: (date: Date) => update(s => ({ ...s, selectedDate: date })),
    startAutoRefresh: () => update(s => ({ 
      ...s, 
      refreshInterval: setInterval(() => {
        // Refresh dashboard data
        console.log('Refreshing dashboard...');
      }, 30000) // 30 seconds
    })),
    stopAutoRefresh: () => update(s => {
      if (s.refreshInterval) {
        clearInterval(s.refreshInterval);
      }
      return { ...s, refreshInterval: null };
    })
  };
}

export const dashboardStore = createDashboardStore();