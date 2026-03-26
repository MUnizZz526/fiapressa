import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export function ButtonFiap({ title, onPress, outline = false }) {
  return (
    <TouchableOpacity 
      style={[styles.button, outline && styles.outline]} 
      onPress={onPress} 
      activeOpacity={0.8}
    >
      <Text style={[styles.text, outline && styles.textOutline]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 8,
    width: '100%',
    elevation: 3, // Sombra no Android
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  text: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  textOutline: {
    color: Colors.primary,
  }
});