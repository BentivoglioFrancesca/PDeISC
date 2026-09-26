import styles from '../styles/StyledScreen.styles';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

// Segunda pantalla: mismo "hola mundo", pero con una estética
// bien distinta (fondo oscuro, tarjeta centrada, tipografía grande).
export default function StyledScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.card}>
        <Text style={styles.emoji}>✨</Text>
        <Text style={styles.title}>¡Hola, mundo!</Text>
        <Text style={styles.subtitle}>Mismo saludo, otro estilo</Text>
      </View>
    </View>
  );
}
