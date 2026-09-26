import React, { createContext, useContext, useMemo, useState } from 'react';

import { lightTheme, darkTheme } from '../styles/palettes';
import type { Theme } from '../styles/palettes';
export { lightTheme, darkTheme } from '../styles/palettes';
export type { Theme } from '../styles/palettes';

type ThemeContextValue = {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);

  const value = useMemo(
    () => ({ theme, isDark, toggleTheme: () => setIsDark((prev) => !prev) }),
    [theme, isDark]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useAppTheme debe usarse dentro de <ThemeProvider>');
  return ctx;
}
