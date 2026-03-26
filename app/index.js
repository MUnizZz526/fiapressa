import { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ActivityIndicator, 
  ScrollView, 
  Dimensions 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { ButtonFiap } from '../components/ButtonFiap';

import MinhaLogo from '../assets/images/logo_fiapressa.png';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image 
        source={MinhaLogo} 
        style={styles.logo}
        resizeMode="contain" 
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>FIAPressa</Text>
        <Text style={styles.subtitle}>O lanche da FIAP na velocidade do seu aprendizado.</Text>
        
        <ButtonFiap title="Ver Cardápio" onPress={() => router.push('/details')} />
        <ButtonFiap title="Meus Pedidos" outline onPress={() => router.push('/profile')} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    backgroundColor: Colors.background, 
    padding: 25,
    alignItems: 'center' 
  },
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: Colors.background 
  },
  logo: {
    width: Dimensions.get('window').width * 0.6,
    height: 150,
    marginTop: 40,
    marginBottom: 20,
  },
  content: { 
    width: '100%', 
    alignItems: 'center' 
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: Colors.primary 
  },
  subtitle: { 
    fontSize: 16, 
    color: Colors.gray, 
    textAlign: 'center', 
    marginVertical: 15 
  },
});