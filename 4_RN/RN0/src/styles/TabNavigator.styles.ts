import { StyleSheet } from 'react-native';
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import type { Theme } from './palettes';
export const createStyles = (theme: Theme) => StyleSheet.create({
    screen: { flex: 1, backgroundColor: theme.background },
});
export const getTabOptions = (theme: Theme): BottomTabNavigationOptions => ({
    headerShown: false,
    tabBarActiveTintColor: theme.text,
    tabBarInactiveTintColor: theme.subtext,
    tabBarActiveBackgroundColor: theme.background,
    tabBarLabelStyle: { fontSize: 12, fontWeight: '700' },
    tabBarIconStyle: { display: 'none' },
    tabBarItemStyle: { borderRadius: 14, marginHorizontal: 4, marginVertical: 6, paddingVertical: 12 },
    tabBarStyle: { backgroundColor: theme.surface, borderTopColor: theme.border, elevation: 0 },
});
