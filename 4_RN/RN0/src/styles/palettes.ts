// Paleta simple para modo día y modo noche.
// No usamos ninguna librería de estilos externa: solo objetos JS,
// que es el enfoque más simple para React Native
export const lightTheme = {
    mode: 'light' as const,
    background: '#f1f5f3',
    surface: '#ffffff',
    text: '#183c38',
    subtext: '#607570',
    primary: '#21695c',
    accent: '#be8b42',
    danger: '#b53e4b',
    border: '#dce7e1',
};
export const darkTheme = {
    mode: 'dark' as const,
    background: '#101e1c',
    surface: '#1a2c28',
    text: '#edf5ef',
    subtext: '#adc3b9',
    primary: '#347d6b',
    accent: '#e3bd7e',
    danger: '#ff929c',
    border: '#344b43',
};
export type Theme = typeof lightTheme | typeof darkTheme;
