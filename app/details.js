import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Dimensions } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function Details() {
  const { orders, calorieGoal, setCalorieGoal, addToOrders, user, signOut } = useContext(AuthContext);
  const router = useRouter();

  const consumed = orders.reduce((acc, item) => acc + item.kcal, 0);
  const remaining = calorieGoal - consumed;
  const progress = calorieGoal > 0 ? Math.min((consumed / calorieGoal) * 100, 100) : 0;

  const menuItems = [
    { 
      id: 1, 
      name: 'Burger FIAP Turbo', 
      kcal: 850, 
      price: 'R$ 42,00', 
      emoji: '🍔',
      desc: 'Blend especial de carne angus 180g, queijo cheddar premium derretido, cebola caramelizada e maionese de bacon artesanal no pão brioche.',
      alert: 'Contém Glúten, Lactose e Ovos.'
    },
    { 
      id: 2, 
      name: 'Poke Developer', 
      kcal: 520, 
      price: 'R$ 38,00', 
      emoji: '🥗',
      desc: 'Cubos de salmão fresco marinado, edamame vagem, manga em cubos, sunomono e base de arroz japonês temperado (shari).',
      alert: 'Contém Peixe, Soja e Gergelim.'
    },
    { 
      id: 3, 
      name: 'Energy Fries', 
      kcal: 410, 
      price: 'R$ 18,00', 
      emoji: '🍟',
      desc: 'Porção de batatas rústicas cortadas à mão, duplamente fritas para máxima crocância, temperadas com páprica defumada e alecrim fresco.',
      alert: 'Pode conter traços de soja.'
    }
  ];

  return (
    <View style={styles.container}>
      {/* HEADER STATUS - GLASS EFFECT */}
      <View style={styles.header}>
        <Image 
          source={require('../assets/images/logo_fiapressa.png')} 
          style={styles.miniLogo}
          resizeMode="contain"
        />
        <TouchableOpacity style={styles.userBadge} onPress={signOut}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarLetter}>{user?.name?.substring(0, 2).toUpperCase()}</Text>
          </View>
          <View>
            <Text style={styles.userRm}>RM {user?.name}</Text>
            <Text style={styles.logoutSub}>SAIR DA CONTA</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* DASHBOARD - THE NEON CORE */}
        <View style={styles.neonCard}>
          <View style={styles.metaTop}>
            <View>
              <Text style={styles.labelAccent}>META DIÁRIA</Text>
              <View style={styles.goalContainer}>
                <TextInput 
                  style={styles.goalInput}
                  keyboardType="numeric"
                  value={String(calorieGoal)}
                  onChangeText={(v) => setCalorieGoal(v.replace(/[^0-9]/g, ''))}
                  selectionColor="#ED145B"
                />
                <Text style={styles.unitText}>kcal</Text>
              </View>
            </View>
            <View style={styles.statSeparator} />
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.labelAccent}>RESTANTE</Text>
              <Text style={[styles.remainingVal, { color: remaining < 0 ? '#FF3B30' : '#FFF' }]}>
                {remaining}
              </Text>
            </View>
          </View>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressBarBg}>
              <View 
                style={[
                  styles.progressBarFill, 
                  { 
                    width: `${progress}%`, 
                    backgroundColor: progress > 90 ? '#FF3B30' : '#ED145B' 
                  }
                ]} 
              />
            </View>
            <Text style={styles.progressPercentage}>{progress.toFixed(0)}%</Text>
          </View>
        </View>

        {/* SECTION NAVIGATION */}
        <View style={styles.navRow}>
          <Text style={styles.sectionHeading}>MENU PRINCIPAL</Text>
          <TouchableOpacity style={styles.floatingCart} onPress={() => router.push('/orders')}>
            <Text style={styles.cartLabel}>CARRINHO</Text>
            <View style={styles.cartDot}>
              <Text style={styles.cartNumber}>{orders.length}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* PREMIUM CARDS */}
        {menuItems.map(item => (
          <View key={item.id} style={styles.foodCard}>
            <View style={styles.cardHeader}>
              <View style={styles.emojiWrapper}>
                <View style={styles.emojiGlow} />
                <Text style={styles.largeEmoji}>{item.emoji}</Text>
              </View>
              
              <View style={styles.titleArea}>
                <Text style={styles.foodTitle}>{item.name}</Text>
                <View style={styles.badgeRow}>
                  <View style={styles.kcalBadge}>
                    <Text style={styles.kcalText}>{item.kcal} KCAL</Text>
                  </View>
                  <Text style={styles.priceTag}>{item.price}</Text>
                </View>
              </View>

              <TouchableOpacity 
                style={styles.addButton} 
                onPress={() => addToOrders(item)}
                activeOpacity={0.5}
              >
                <Text style={styles.plusSign}>+</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.cardDivider} />
            
            <Text style={styles.foodDescription}>{item.desc}</Text>
            
            <View style={styles.allergenFooter}>
              <Text style={styles.allergenTitle}>INFO ALÉRGENOS</Text>
              <Text style={styles.allergenContent}>{item.alert}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  
  header: { 
    paddingTop: 60, 
    paddingHorizontal: 25, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingBottom: 20
  },
  miniLogo: { width: 120, height: 40 },
  userBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#0A0A0A', 
    padding: 8, 
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#111'
  },
  avatarCircle: { 
    width: 32, 
    height: 32, 
    borderRadius: 16, 
    backgroundColor: '#ED145B', 
    justifyContent: 'center', 
    alignItems: 'center',
    marginRight: 10
  },
  avatarLetter: { color: '#FFF', fontSize: 12, fontWeight: '900' },
  userRm: { color: '#FFF', fontSize: 10, fontWeight: '800' },
  logoutSub: { color: '#ED145B', fontSize: 8, fontWeight: '900', letterSpacing: 0.5 },

  scrollContent: { paddingHorizontal: 20, paddingBottom: 80 },
  
  neonCard: { 
    backgroundColor: '#070707', 
    padding: 25, 
    borderRadius: 35, 
    borderWidth: 1, 
    borderColor: '#151515',
    marginBottom: 30,
    shadowColor: '#ED145B',
    shadowOpacity: 0.15,
    shadowRadius: 30,
  },
  metaTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  labelAccent: { color: '#444', fontSize: 9, fontWeight: '900', letterSpacing: 2, marginBottom: 5 },
  goalContainer: { flexDirection: 'row', alignItems: 'baseline' },
  goalInput: { color: '#FFF', fontSize: 42, fontWeight: '900', letterSpacing: -1, padding: 0 },
  unitText: { color: '#222', fontSize: 16, fontWeight: '900', marginLeft: 5 },
  statSeparator: { width: 1, height: 40, backgroundColor: '#111', marginHorizontal: 15 },
  remainingVal: { fontSize: 42, fontWeight: '900', letterSpacing: -2 },
  progressContainer: { marginTop: 25, flexDirection: 'row', alignItems: 'center' },
  progressBarBg: { flex: 1, height: 8, backgroundColor: '#111', borderRadius: 10, overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: 10 },
  progressPercentage: { color: '#ED145B', fontSize: 12, fontWeight: '900', marginLeft: 15, width: 40 },

  navRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  sectionHeading: { color: '#FFF', fontSize: 14, fontWeight: '900', letterSpacing: 3 },
  floatingCart: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#111', 
    paddingVertical: 10, 
    paddingHorizontal: 18, 
    borderRadius: 25 
  },
  cartLabel: { color: '#FFF', fontSize: 10, fontWeight: '900', marginRight: 10 },
  cartDot: { backgroundColor: '#ED145B', width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  cartNumber: { color: '#FFF', fontSize: 10, fontWeight: '900' },

  foodCard: { 
    backgroundColor: '#0A0A0A', 
    padding: 25, 
    borderRadius: 40, 
    marginBottom: 25, 
    borderWidth: 1, 
    borderColor: '#121212',
    elevation: 10
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center' },
  emojiWrapper: { 
    width: 80, 
    height: 80, 
    backgroundColor: '#000', 
    borderRadius: 30, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1A1A1A',
    position: 'relative'
  },
  emojiGlow: {
    position: 'absolute',
    width: 40,
    height: 40,
    backgroundColor: '#ED145B',
    borderRadius: 20,
    opacity: 0.15,
    blurRadius: 20,
  },
  largeEmoji: { fontSize: 40 },
  titleArea: { flex: 1, paddingLeft: 20 },
  foodTitle: { color: '#FFF', fontSize: 22, fontWeight: '800', letterSpacing: -0.5 },
  badgeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  kcalBadge: { backgroundColor: '#111', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 8, marginRight: 12 },
  kcalText: { color: '#ED145B', fontSize: 9, fontWeight: '900' },
  priceTag: { color: '#555', fontSize: 15, fontWeight: '700' },
  addButton: { 
    width: 55, 
    height: 55, 
    backgroundColor: '#ED145B', 
    borderRadius: 22, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  plusSign: { color: '#FFF', fontSize: 32, fontWeight: '300' },
  
  cardDivider: { height: 1, backgroundColor: '#111', marginVertical: 20 },
  
  foodDescription: { 
    color: '#888', 
    fontSize: 14, 
    lineHeight: 22, 
    fontWeight: '400', 
    marginBottom: 20 
  },
  allergenFooter: { 
    backgroundColor: '#000', 
    padding: 18, 
    borderRadius: 22, 
    borderWidth: 1, 
    borderColor: '#111' 
  },
  allergenTitle: { color: '#333', fontSize: 9, fontWeight: '900', marginBottom: 5, letterSpacing: 1 },
  allergenContent: { color: '#666', fontSize: 11, fontWeight: '600' }
});