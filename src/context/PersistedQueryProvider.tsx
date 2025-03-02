import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    } as any,
  },
});

// Create a persister using localStorage.
const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
});

// Persist the query cache so that offline data is rehydrated on load.
persistQueryClient({
  queryClient,
  persister: localStoragePersister,
});

interface PersistedQueryProviderProps {
  children: ReactNode;
}

const PersistedQueryProvider = ({ children }: PersistedQueryProviderProps) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default PersistedQueryProvider;
