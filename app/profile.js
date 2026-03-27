import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Colors } from '../constants/Colors';

export default function Profile() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 5000); // 5 segundos para "ficar pronto"
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.userSection}>
        <View style={styles.avatar}><Text style={styles.avatarText}>RM</Text></View>
        <Text style={styles.userName}>RM99999 - Aluno FIAP</Text>
      </View>

      <View style={styles.statusCard}>
        <Text style={styles.statusTitle}>Status do Pedido Atual:</Text>
        
        {!isReady ? (
          <View style={styles.row}>
            <ActivityIndicator color={Colors.primary} />
            <Text style={styles.waitingText}>Preparando seu lanche...</Text>
          </View>
        ) : (
          <View style={styles.readyBox}>
            <Text style={styles.readyText}>✅ PRONTO PARA RETIRADA!</Text>
            <Text style={styles.subtext}>Dirija-se ao balcão com seu RM.</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, backgroundColor: Colors.background },
  userSection: { alignItems: 'center', marginBottom: 40 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  avatarText: { fontWeight: 'bold', color: '#555' },
  userName: { fontSize: 18, fontWeight: '600' },
  statusCard: { backgroundColor: Colors.card, padding: 25, borderRadius: 20, width: '100%' },
  statusTitle: { fontSize: 14, color: Colors.gray, marginBottom: 15 },
  row: { flexDirection: 'row', alignItems: 'center' },
  waitingText: { marginLeft: 15, fontSize: 16, fontWeight: '500' },
  readyBox: { alignItems: 'center' },
  readyText: { color: Colors.success, fontWeight: 'bold', fontSize: 18 },
  subtext: { marginTop: 5, color: Colors.gray }
});
