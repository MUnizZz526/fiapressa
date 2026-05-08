import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'expo-router';

export default function Orders() {
  const { orders } = useContext(AuthContext);
  const router = useRouter();

  const total = orders.reduce((acc, item) => {
    const priceNum = parseFloat(item.price.replace('R$ ', '').replace(',', '.'));
    return acc + priceNum;
  }, 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backBtn}>← VOLTAR AO MENU</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Carrinho</Text>
        <View style={{width: 50}} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {orders.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>Seu carrinho está vazio.</Text>
          </View>
        ) : (
          <>
            {orders.map((item, index) => (
              <View key={index} style={styles.orderRow}>
                <Text style={styles.emoji}>{item.emoji}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.kcal}>-{item.kcal} kcal</Text>
                </View>
                <Text style={styles.price}>{item.price}</Text>
              </View>
            ))}

            <View style={styles.totalCard}>
              <Text style={styles.totalLabel}>TOTAL ESTIMADO</Text>
              <Text style={styles.totalValue}>R$ {total.toFixed(2).replace('.', ',')}</Text>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050505' },
  header: { 
    paddingTop: 60, 
    padding: 25, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  backBtn: { color: '#ED145B', fontWeight: '900', fontSize: 11, letterSpacing: 1 },
  title: { color: '#fff', fontSize: 18, fontWeight: '900' },
  content: { padding: 25 },
  orderRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#0A0A0A', 
    padding: 20, 
    borderRadius: 22, 
    marginBottom: 15, 
    borderWidth: 1, 
    borderColor: '#1A1A1A' 
  },
  emoji: { fontSize: 24, marginRight: 15 },
  name: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  kcal: { color: '#FF3B30', fontSize: 12, fontWeight: 'bold', marginTop: 2 },
  price: { color: '#ED145B', fontWeight: 'bold', fontSize: 15 },
  totalCard: { 
    marginTop: 20, 
    backgroundColor: '#ED145B', 
    padding: 30, 
    borderRadius: 25, 
    alignItems: 'center' 
  },
  totalLabel: { color: '#fff', fontSize: 10, fontWeight: '900', letterSpacing: 2, opacity: 0.8 },
  totalValue: { color: '#fff', fontSize: 32, fontWeight: '900', marginTop: 5 },
  emptyBox: { marginTop: 100, alignItems: 'center' },
  emptyText: { color: '#444', fontSize: 16, fontWeight: '600' }
});