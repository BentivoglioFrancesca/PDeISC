import styles from '../styles/HomeScreen.styles';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

// Pantalla principal
// tab 1: "hola mundo" con estilo claro
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.title}>Hola mundo 👋</Text>
      <Text style={styles.subtitle}>Mi primer proyecto con Expo</Text>
    </View>
  );
}
