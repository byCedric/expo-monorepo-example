import { Slot } from 'expo-router';
import { Provider } from '@acme/app-mobile/context/auth';

export default function Root() {
  return (
    // Setup the auth context and render our layout inside of it.
    <Provider>
      <Slot />
    </Provider>
  );
}