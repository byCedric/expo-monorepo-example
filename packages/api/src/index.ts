import * as trpcNext from '@trpc/next';
import * as trpc from '@trpc/server/adapters/next';

import { AppRouter, appRouter } from './routes/_app';
import { createContext } from './utils/createContext';

/**
 * The API endpoint that we can use in Next.js API pages.
 * @see https://trpc.io/docs/nextjs#3-create-a-trpc-router
 */
export const trpcApiHandler = trpc.createNextApiHandler({
  router: appRouter,
  createContext, // See: ./utils/createContext.ts
});

/**
 * Create a strongly-typed HOC to use in Next.js `pages/_app`.
 * @see https://trpc.io/docs/nextjs#5-configure-_apptsx
 */
export function withTRPC(nextApiRoute = '/api/trpc') {
  function getBaseUrl() {
    // Rendering client side, inherit the base url from the browser
    if (typeof window !== 'undefined') {
      return '';
    }

    // Rendering server side in Vercel, use environment variable
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }

    // assume localhost
    return `http://localhost:${process.env.PORT ?? 3000}`;
  }

  return trpcNext.withTRPC<AppRouter>({
    config() {
      return {
        url: `${getBaseUrl()}${nextApiRoute}`,
      };
    },
  });
}
