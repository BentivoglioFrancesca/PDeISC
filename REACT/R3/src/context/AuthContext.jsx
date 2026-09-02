// AuthContext.jsx
// Igual que en la versión con React Router, pero sin dependencia de
// navigate: acá el cambio de "pantalla" lo maneja App.jsx con useState.

import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('biblioteca_token');
    const usuarioGuardado = localStorage.getItem('biblioteca_usuario');
    if (token && usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
    setCargando(false);
  }, []);

  async function login(email, password) {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('biblioteca_token', data.token);
    localStorage.setItem('biblioteca_usuario', JSON.stringify(data.usuario));
    setUsuario(data.usuario);
  }

  async function registrar(nombre, email, password) {
    await api.post('/auth/registrar', { nombre, email, password });
  }

  function logout() {
    localStorage.removeItem('biblioteca_token');
    localStorage.removeItem('biblioteca_usuario');
    setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, cargando, login, registrar, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
