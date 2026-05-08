import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [calorieGoal, setCalorieGoal] = useState(2000);

  useEffect(() => {
    async function loadData() {
      const storageUser = await AsyncStorage.getItem('@FIAPressa:user');
      const storageGoal = await AsyncStorage.getItem('@FIAPressa:goal');
      if (storageUser) setUser(JSON.parse(storageUser));
      if (storageGoal) setCalorieGoal(Number(storageGoal));
      setLoading(false);
    }
    loadData();
  }, []);

  const signIn = async (rm) => {
    if (rm.length !== 6) {
      Alert.alert("Erro de Validação", "O RM deve ter exatamente 6 dígitos.");
      return;
    }
    const data = { name: rm };
    setUser(data);
    await AsyncStorage.setItem('@FIAPressa:user', JSON.stringify(data));
  };

  const signOut = async () => {
    await AsyncStorage.clear();
    setUser(null);
    setOrders([]);
  };

  const updateGoal = async (val) => {
    const num = Number(val);
    setCalorieGoal(num);
    await AsyncStorage.setItem('@FIAPressa:goal', String(num));
  };

  const addToOrders = (item) => {
    setOrders([...orders, { ...item, instanceId: Math.random() }]);
  };

  return (
    <AuthContext.Provider value={{ 
      user, loading, signIn, signOut, orders, addToOrders, 
      calorieGoal, setCalorieGoal: updateGoal 
    }}>
      {children}
    </AuthContext.Provider>
  );
};