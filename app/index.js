import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'expo-router';

export default function Login() {
  const [rm, setRm] = useState('');
  const { signIn, user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) router.replace('/details');
  }, [user, loading]);

  if (loading) return null;

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.logoBox}>
        <Image 
          source={require('../assets/images/logo_fiapressa.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>AUTENTICAÇÃO ACADÊMICA</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Digite seu RM" 
          placeholderTextColor="#333" 
          keyboardType="numeric"
          maxLength={6}
          value={rm}
          onChangeText={setRm}
        />
        <TouchableOpacity style={styles.btn} onPress={() => signIn(rm)}>
          <Text style={styles.btnText}>ENTRAR</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050505', justifyContent: 'center', padding: 40 },
  logoBox: { alignItems: 'center', marginBottom: 60 },
  logo: { width: 300, height: 120 },
  form: { width: '100%' },
  label: { color: '#ED145B', fontSize: 10, fontWeight: '900', marginBottom: 15, textAlign: 'center', letterSpacing: 2 },
  input: { backgroundColor: '#0A0A0A', color: '#fff', padding: 22, borderRadius: 15, fontSize: 22, borderWidth: 1, borderColor: '#1A1A1A', marginBottom: 20, textAlign: 'center', fontWeight: 'bold' },
  btn: { backgroundColor: '#ED145B', padding: 22, borderRadius: 15, alignItems: 'center', shadowColor: '#ED145B', shadowOpacity: 0.4, shadowRadius: 15, elevation: 8 },
  btnText: { color: '#fff', fontWeight: '900', fontSize: 14, letterSpacing: 2 }
});