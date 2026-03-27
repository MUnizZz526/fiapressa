import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '../constants/Colors';

export default function Details() {
  const [cartapacio, setCartapacio] = useState([

    { id: '1', nome: 'Pão de Queijo', preco: 'R$ 6,00' },
    { id: '2', nome: 'Coxinha de Frango', preco: 'R$ 8,50' },
    { id: '3', nome: 'Suco Natural 300ml', preco: 'R$ 10,00' },
    { id: '4', nome: 'Sanduíche Natural', preco: 'R$ 12,00' },
    
  ]);

  const handleOrder = (item) => {
    Alert.alert("Pedido Realizado!", `Seu ${item} já foi enviado para a cozinha.`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Selecione seu Lanche</Text>
      
      <FlatList
        data={cartapacio}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handleOrder(item.nome)}>
            <View>
              <Text style={styles.itemName}>{item.nome}</Text>
              <Text style={styles.itemPrice}>{item.preco}</Text>
            </View>
            <Text style={styles.orderText}>Pedir ➔</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text>O cardápio está vazio no momento.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: Colors.primary },
  card: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    backgroundColor: Colors.card, 
    padding: 20, 
    borderRadius: 15, 
    marginBottom: 12,
    borderLeftWidth: 5,
    borderLeftColor: Colors.primary
  },
  itemName: { fontSize: 16, fontWeight: 'bold' },
  itemPrice: { color: Colors.gray, marginTop: 4 },
  orderText: { color: Colors.primary, fontWeight: 'bold' },
  empty: { alignItems: 'center', marginTop: 50 }
});
