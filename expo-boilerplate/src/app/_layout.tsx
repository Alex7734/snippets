import { Provider } from '@auth/auth';
import { Slot } from 'expo-router';

export default function Root() {
  return (
    <Provider>
      <Slot />
    </Provider>
  );
}
