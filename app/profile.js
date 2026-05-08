import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { AuthContext } from '../context/AuthContext'; 

export default function Profile() {
  const { user, orders } = useContext(AuthContext);
  const totalKcal = orders.reduce((sum, item) => sum + (item.kcal || 0), 0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Meus Pedidos 📝</Text>
        <View style={styles.stats}>
          <View style={styles.statBox}><Text style={styles.sL}>PEDIDOS</Text><Text style={styles.sV}>{orders.length}</Text></View>
          <View style={[styles.statBox, { borderLeftWidth: 1, borderColor: '#333' }]}><Text style={styles.sL}>TOTAL KCAL</Text><Text style={[styles.sV, { color: '#ED145B' }]}>{totalKcal}</Text></View>
        </View>

        {orders.length === 0 ? (
          <Text style={styles.empty}>Nenhum pedido realizado hoje.</Text>
        ) : (
          orders.map((p, i) => (
            <View key={i} style={styles.card}>
              <View>
                <Text style={styles.name}>{p.name}</Text>
                <Text style={styles.sub}>{p.data} • {p.kcal} kcal</Text>
              </View>
              <View style={styles.status}><Text style={styles.statusT}>Preparando</Text></View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
  stats: { flexDirection: 'row', backgroundColor: '#1A1A1A', borderRadius: 15, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: '#ED145B' },
  statBox: { flex: 1, alignItems: 'center' },
  sL: { color: '#666', fontSize: 10, fontWeight: 'bold' },
  sV: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  card: { backgroundColor: '#1A1A1A', padding: 15, borderRadius: 12, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { color: '#fff', fontWeight: 'bold' },
  sub: { color: '#666', fontSize: 12 },
  status: { backgroundColor: '#ED145B22', padding: 5, borderRadius: 5, borderWidth: 1, borderColor: '#ED145B' },
  statusT: { color: '#ED145B', fontSize: 10, fontWeight: 'bold' },
  empty: { color: '#444', textAlign: 'center', marginTop: 50 }
});