import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { tsr } from './tsr';

export { tsr };

export function QueryProviders(props: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <tsr.ReactQueryProvider>{props.children}</tsr.ReactQueryProvider>
    </QueryClientProvider>
  );
}
