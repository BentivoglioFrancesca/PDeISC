import { StyleSheet } from 'react-native';
import type { Theme } from './palettes';
export default function createStyles(theme: Theme) {
    return StyleSheet.create({
        screen: { flex: 1, backgroundColor: theme.background },
        text: { color: theme.text },
        subtext: { color: theme.subtext },
        headerText: { flex: 1 },
        themeIcon: { color: theme.subtext, fontSize: 12, marginRight: 6 },
        container: {
            backgroundColor: theme.surface, borderBottomColor: theme.border,
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 54,
            paddingBottom: 24,
            paddingHorizontal: 24,
            gap: 12,
            borderBottomWidth: 1,
        },
        title: {
            color: theme.text,
            fontSize: 23,
            fontWeight: '800',
            letterSpacing: -0.7,
        },
        date: {
            color: theme.subtext,
            fontSize: 13,
            lineHeight: 20,
            marginTop: 6,
            textTransform: 'capitalize',
        },
        switchRow: {
            flexDirection: 'row',
            alignItems: 'center',
        },
    });
}
