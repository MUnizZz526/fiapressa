import { Stack } from 'expo-router';
import { Colors } from '../constants/Colors';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        headerTitle: 'FIAPressa',
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Início' }} />
      <Stack.Screen name="details" options={{ title: 'Cardápio Digital' }} />
      <Stack.Screen name="profile" options={{ title: 'Meus Pedidos' }} />
    </Stack>
  );
}