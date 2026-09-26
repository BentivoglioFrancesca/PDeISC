import createStyles from '../styles/DateHeader.styles';
import { Switch, Text, View } from 'react-native';
import { useAppTheme } from '../theme/ThemeContext';

// barra de arriba: fecha + switch de tema

const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const MESES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];

// Encabezado fijo: muestra día/mes/año y el switch de modo día/noche.
// Vive arriba de todas las pantallas (se usa desde el navigator).

export default function DateHeader() {
  const { theme, isDark, toggleTheme } = useAppTheme();
  const styles = createStyles(theme);
  const hoy = new Date();
  const texto = `${DIAS[hoy.getDay()]} ${hoy.getDate()} de ${MESES[hoy.getMonth()]} de ${hoy.getFullYear()}`;

  return (
    <View
      style={styles.container}
    >
      <View style={styles.headerText}>
        <Text style={styles.title}>Componentes nativos</Text>
        <Text style={styles.date}>{texto}</Text>
      </View>
      <View style={styles.switchRow}>
        <Text style={styles.themeIcon}>
          {isDark ? '🌙' : '☀️'}
        </Text>
        <Switch value={isDark} onValueChange={toggleTheme} />
      </View>
    </View>
  );
}
