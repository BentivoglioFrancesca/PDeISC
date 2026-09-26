import { Modal, Pressable, Text, View } from 'react-native';
import { useAppTheme } from '../theme/ThemeContext';
import createStyles from '../styles/ConfirmationModal.styles';

type Props = {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
};

export default function ConfirmationModal({ visible, title, message, onClose, onConfirm }: Props) {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.card} accessibilityViewIsModal>
          <Text accessibilityRole="header" style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.actions}>
            <Pressable accessibilityRole="button" onPress={onClose} style={styles.cancel}>
              <Text style={styles.cancelText}>{onConfirm ? 'Cancelar' : 'Entendido'}</Text>
            </Pressable>
            {onConfirm && (
              <Pressable accessibilityRole="button" onPress={onConfirm} style={styles.confirm}>
                <Text style={styles.confirmText}>Borrar</Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}
