// ThemeContext.jsx
// Modo día/noche. Se guarda en localStorage para que se mantenga
// aunque se recargue la página.

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [tema, setTema] = useState(() => localStorage.getItem('biblioteca_tema') || 'claro');

  useEffect(() => {
    document.documentElement.setAttribute('data-tema', tema);
    localStorage.setItem('biblioteca_tema', tema);
  }, [tema]);

  function alternarTema() {
    setTema((t) => (t === 'claro' ? 'oscuro' : 'claro'));
  }

  return (
    <ThemeContext.Provider value={{ tema, alternarTema }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
