import { useState } from 'react';
import type { FC } from 'react';
import FormularioSimple from './components/FormularioSimple';
import './App.css';

type Theme = 'light' | 'dark';

/* Maneja el tema global y renderiza el formulario */
const App: FC = () => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = (): void => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="app" data-theme={theme}>
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label="Cambiar modo día/noche"
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>

      <FormularioSimple />
    </div>
  );
};

export default App;