import { Stack } from 'expo-router';

import AppShell from '@/components/navigation/AppShell';

export default function AppLayout() {
  return (
    <AppShell>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="sales" />
        <Stack.Screen name="inventory" />
        <Stack.Screen name="menu" />
        <Stack.Screen name="finances" />
        <Stack.Screen name="more" />
      </Stack>
    </AppShell>
  );
}
