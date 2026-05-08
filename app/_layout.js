import { Stack } from 'expo-router';
import { AuthProvider, AuthContext } from '../context/AuthContext';
import { useContext, useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';

function RootLayoutNav() {
  const { user, loading } = useContext(AuthContext);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!user && !inAuthGroup) {
      router.replace('/');
    } else if (user && segments[0] !== 'details') {
      router.replace('/details');
    }
  }, [user, loading]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="details" />
      <Stack.Screen name="settings" options={{ presentation: 'modal' }} />
      <Stack.Screen name="checkout" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}