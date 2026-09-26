import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#101c2c',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 28,
    },
    card: {
        width: '100%',
        maxWidth: 460,
        backgroundColor: '#192b40',
        borderRadius: 32,
        paddingVertical: 56,
        paddingHorizontal: 24,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#34485e',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 16 },
        shadowOpacity: 0.22,
        shadowRadius: 24,
        elevation: 8,
    },
    emoji: {
        fontSize: 44,
        marginBottom: 28,
    },
    title: {
        fontSize: 34,
        fontWeight: '800',
        color: '#f5d9a3',
        letterSpacing: -1,
        textAlign: 'center',
    },
    subtitle: {
        marginTop: 14,
        fontSize: 16,
        lineHeight: 25,
        textAlign: 'center',
        color: '#b2c1d3',
    },
});
