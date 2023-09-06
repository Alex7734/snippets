import { Slot } from 'expo-router';
import { Provider } from '@auth/auth';

export default function Root() {
  return (
    <Provider>
      <Slot />
    </Provider>
  );
}