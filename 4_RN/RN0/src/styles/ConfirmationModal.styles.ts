import { StyleSheet } from 'react-native';
import type { Theme } from './palettes';
export default function createStyles(theme: Theme) {
    return StyleSheet.create({
        backdrop: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.55)',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 24,
        },
        card: {
            width: '100%',
            maxWidth: 420,
            borderRadius: 24,
            padding: 24,
            backgroundColor: theme.surface,
            borderColor: theme.border,
            borderWidth: 1,
        },
        title: { fontSize: 22, fontWeight: '700', color: theme.text },
        message: { fontSize: 16, lineHeight: 25, marginTop: 12, color: theme.subtext },
        actions: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-end', gap: 12, marginTop: 24 },
        cancel: { paddingVertical: 14, paddingHorizontal: 20, borderRadius: 14, backgroundColor: theme.background },
        cancelText: { color: theme.text, fontWeight: '600' },
        confirm: { paddingVertical: 14, paddingHorizontal: 20, borderRadius: 14, backgroundColor: '#b53e4b' },
        confirmText: { color: '#ffffff', fontWeight: '700' },
    });
}
