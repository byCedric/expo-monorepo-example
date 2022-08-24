import { withTRPC } from '@acme/api';

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

// Make sure we have full access to tRPC in Next, including SSR
export default withTRPC()(MyApp);
