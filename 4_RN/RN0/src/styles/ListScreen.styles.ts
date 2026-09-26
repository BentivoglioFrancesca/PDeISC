import { StyleSheet } from 'react-native';
import type { Theme } from './palettes';
export default function createStyles(theme: Theme) {
    return StyleSheet.create({
        screen: { flex: 1, backgroundColor: theme.background },
        text: { color: theme.text },
        subtext: { color: theme.subtext },
        empty: { color: theme.subtext, textAlign: 'center', marginTop: 24 },
        activeOrder: { backgroundColor: theme.primary },
        orderText: { color: theme.text, fontWeight: '600' },
        activeOrderText: { color: '#fff' },
        header: {
            paddingHorizontal: 20,
            paddingTop: 24,
            paddingBottom: 20,
            width: '100%',
            maxWidth: 760,
            alignSelf: 'center',
        },
        usage: {
            color: theme.subtext,
            fontSize: 14,
            lineHeight: 22,
            marginBottom: 18,
        },
        ordenRow: {
            flexDirection: 'row',
            gap: 10,
            flexWrap: 'wrap',
        },
        ordenBoton: {
            backgroundColor: theme.surface, borderColor: theme.border,
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 14,
            borderWidth: 1,
        },
        listContent: {
            paddingHorizontal: 20,
            paddingBottom: 32,
            gap: 12,
            width: '100%',
            maxWidth: 760,
            alignSelf: 'center',
        },
        row: {
            backgroundColor: theme.surface, borderColor: theme.border,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderWidth: 1,
            borderRadius: 20,
            paddingVertical: 16,
            paddingHorizontal: 18,
            gap: 12,
        },
        rowText: {
            color: theme.text,
            fontSize: 16,
            fontWeight: '600',
            flex: 1,
        },
        deleteButton: {
            borderColor: theme.border,
            borderWidth: 1,
            borderRadius: 12,
            paddingVertical: 12,
            paddingHorizontal: 14,
        },
        borrar: {
            color: theme.danger,
            fontSize: 13,
            fontWeight: '700',
        },
    });
}
