import createStyles from '../styles/ListScreen.styles';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import ConfirmationModal from '../components/ConfirmationModal';
import { useAppTheme } from '../theme/ThemeContext';

type Item = { id: string; nombre: string };

const ITEMS_INICIALES: Item[] = [
  { id: '1', nombre: 'Banana' },
  { id: '2', nombre: 'Manzana' },
  { id: '3', nombre: 'Durazno' },
  { id: '4', nombre: 'Kiwi' },
  { id: '5', nombre: 'Frutilla' },
];

// FlatList (orden + borrado)

type Orden = 'asc' | 'desc';

// FlatList: lista performante para muchos elementos (solo renderiza lo visible).
// Acá además se puede ordenar asc/desc y borrar un item con confirmación previa.
export default function ListScreen() {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);
  const [items, setItems] = useState<Item[]>(ITEMS_INICIALES);
  const [orden, setOrden] = useState<Orden>('asc');
  const [itemPendiente, setItemPendiente] = useState<Item | null>(null);

  const itemsOrdenados = useMemo(() => {
    const copia = [...items];
    copia.sort((a, b) =>
      orden === 'asc' ? a.nombre.localeCompare(b.nombre) : b.nombre.localeCompare(a.nombre)
    );
    return copia;
  }, [items, orden]);

  function pedirConfirmacionYBorrar(item: Item) {
    setItemPendiente(item);
  }

  function confirmarBorrado() {
    if (!itemPendiente) return;
    setItems((prev) => prev.filter((item) => item.id !== itemPendiente.id));
    setItemPendiente(null);
  }

  return (
    <View style={styles.screen}>
      <ConfirmationModal
        visible={itemPendiente !== null}
        title="Borrar elemento"
        message={`¿Estás seguro de que querés borrar "${itemPendiente?.nombre ?? ''}"? Esta acción no se puede deshacer.`}
        onClose={() => setItemPendiente(null)}
        onConfirm={confirmarBorrado}
      />
      <View style={styles.header}>
        <Text style={styles.usage}>
          FlatList con orden ascendente/descendente y borrado con confirmación.
        </Text>
        <View style={styles.ordenRow}>
          <OrdenBoton label="A → Z" activo={orden === 'asc'} onPress={() => setOrden('asc')} />
          <OrdenBoton label="Z → A" activo={orden === 'desc'} onPress={() => setOrden('desc')} />
        </View>
      </View>

      <FlatList
        data={itemsOrdenados}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.rowText}>{item.nombre}</Text>
            <Pressable style={styles.deleteButton} onPress={() => pedirConfirmacionYBorrar(item)}>
              <Text style={styles.borrar}>Borrar</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No quedan elementos.
          </Text>
        }
      />
    </View>
  );
}

function OrdenBoton({
  label,
  activo,
  onPress,
}: {
  label: string;
  activo: boolean;
  onPress: () => void;
}) {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);
  return (
    <Pressable
      onPress={onPress}
      style={[styles.ordenBoton, activo && styles.activeOrder]}
    >
      <Text style={[styles.orderText, activo && styles.activeOrderText]}>{label}</Text>
    </Pressable>
  );
}
