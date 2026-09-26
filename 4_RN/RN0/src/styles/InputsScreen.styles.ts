import { StyleSheet } from 'react-native';
import type { Theme } from './palettes';
export default function createStyles(theme: Theme) {
    return StyleSheet.create({
        screen: { flex: 1, backgroundColor: theme.background },
        text: { color: theme.text },
        subtext: { color: theme.subtext },
        container: {
            padding: 20,
            paddingBottom: 32,
            gap: 18,
            width: '100%',
            maxWidth: 760,
            alignSelf: 'center',
        },
        card: {
            backgroundColor: theme.surface, borderColor: theme.border,
            borderRadius: 22,
            borderWidth: 1,
            padding: 22,
        },
        cardTitle: {
            color: theme.text,
            fontSize: 19,
            letterSpacing: -0.4,
            fontWeight: '700',
        },
        cardUsage: {
            color: theme.subtext,
            fontSize: 14,
            lineHeight: 22,
            marginTop: 6,
            marginBottom: 20,
        },
        input: {
            color: theme.text, borderColor: theme.border, backgroundColor: theme.background,
            borderWidth: 1,
            borderRadius: 14,
            paddingHorizontal: 16,
            paddingVertical: 14,
            fontSize: 15,
        },
        hint: {
            color: theme.subtext,
            marginTop: 12,
            fontSize: 14,
            lineHeight: 22,
        },
        switchRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
    });
}
