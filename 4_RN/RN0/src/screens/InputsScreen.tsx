import createStyles from '../styles/InputsScreen.styles';
import { useState } from 'react';
import { Button, ScrollView, Switch, Text, TextInput, View } from 'react-native';
import ConfirmationModal from '../components/ConfirmationModal';
import { useAppTheme } from '../theme/ThemeContext';

//TextInput, Button, Switch

function Section({
  title,
  usage,
  children,
}: {
  title: string;
  usage: string;
  children: React.ReactNode;
}) {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardUsage}>{usage}</Text>
      {children}
    </View>
  );
}

export default function InputsScreen() {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);
  const [nombre, setNombre] = useState('');
  const [notificaciones, setNotificaciones] = useState(true);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
    >
      <ConfirmationModal
        visible={mostrarMensaje}
        title="Button"
        message="Se presionó el botón nativo."
        onClose={() => setMostrarMensaje(false)}
      />
      <Section
        title="TextInput"
        usage="Campo de texto editable. Guarda lo que el usuario escribe en un estado."
      >
        <TextInput
          value={nombre}
          onChangeText={setNombre}
          placeholder="Escribí tu nombre..."
          placeholderTextColor={theme.subtext}
          style={styles.input}
        />
        {nombre.length > 0 && (
          <Text style={styles.hint}>Hola, {nombre} 👋</Text>
        )}
      </Section>

      <Section title="Button" usage="Botón nativo del sistema operativo, con acción al presionar.">
        <Button
          title="Presioname"
          color={theme.primary}
          onPress={() => setMostrarMensaje(true)}
        />
      </Section>

      <Section
        title="Switch"
        usage="Interruptor on/off. Acá controla, a modo de ejemplo, las notificaciones."
      >
        <View style={styles.switchRow}>
          <Text style={styles.text}>Notificaciones</Text>
          <Switch value={notificaciones} onValueChange={setNotificaciones} />
        </View>
      </Section>
    </ScrollView>
  );
}
