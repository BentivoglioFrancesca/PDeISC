import createStyles from '../styles/BasicsScreen.styles';
import { Image, ScrollView, Text, View } from 'react-native';
import { useAppTheme } from '../theme/ThemeContext';

type SectionProps = {
  title: string;
  usage: string;
  children: React.ReactNode;
};

// View, Text, Image, ScrollView

function Section({ title, usage, children }: SectionProps) {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardUsage}>{usage}</Text>
      <View style={styles.demo}>{children}</View>
    </View>
  );
}

export default function BasicsScreen() {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);
  return (
    // ScrollView: permite que el contenido de la pantalla se desplace
    // cuando no entra completo en el alto disponible.
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
    >
      <Section
        title="View"
        usage="Contenedor base, equivalente a un <div>. Agrupa y da layout con flexbox."
      >
        <View style={styles.box} />
      </Section>

      <Section title="Text" usage="Muestra texto. Todo texto en RN debe ir envuelto en <Text>.">
        <Text style={styles.text}>Este texto está dentro de un componente Text.</Text>
      </Section>

      <Section
        title="Image"
        usage="Muestra imágenes locales (require) o remotas (uri), con control de tamaño."
      >
        <Image
          source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
          style={styles.image}
        />
      </Section>

      <Section
        title="ScrollView"
        usage="Envuelve contenido para que sea desplazable (esta misma pantalla es un ejemplo)."
      >
        <Text style={styles.subtext}>↑ Toda esta pantalla ya está dentro de una.</Text>
      </Section>
    </ScrollView>
  );
}
