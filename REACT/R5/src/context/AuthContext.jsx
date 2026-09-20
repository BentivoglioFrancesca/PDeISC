import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/api';
import { completarIngresoSocial, iniciarIngresoSocial } from '../api/social';

const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [errorSocial, setErrorSocial] = useState('');
  const [tokenParaVincular, setTokenParaVincular] = useState(null);
  function guardarSesion(data) {
    localStorage.setItem('biblioteca_token', data.token);
    localStorage.setItem('biblioteca_usuario', JSON.stringify(data.usuario));
    setUsuario(data.usuario);
  }
  useEffect(() => {
    let activo = true;
    async function iniciar() {
      try {
        const data = await completarIngresoSocial(api);
        if (!activo) return;
        if (data) guardarSesion(data);
        else {
          const token = localStorage.getItem('biblioteca_token');
          const guardado = localStorage.getItem('biblioteca_usuario');
          if (token && guardado) setUsuario(JSON.parse(guardado));
        }
      } catch (err) {
        if (activo) {
          localStorage.removeItem('biblioteca_token');
          localStorage.removeItem('biblioteca_usuario');
          setErrorSocial(err.response?.data?.mensaje || err.message);
          if (err.tokenParaVincular) setTokenParaVincular(err.tokenParaVincular);
        }
      } finally { if (activo) setCargando(false); }
    }
    iniciar();
    return () => { activo = false; };
  }, []);
  async function login(email, password) {
    const { data } = await api.post('/auth/login', { email, password });
    if (tokenParaVincular) {
      await api.post('/auth/social/vincular', { accessToken: tokenParaVincular }, { headers: { Authorization: 'Bearer ' + data.token } });
      setTokenParaVincular(null);
      setErrorSocial('');
    }
    guardarSesion(data);
  }
  async function registrar(nombre, email, password) {
    await api.post('/auth/registrar', { nombre, email, password });
  }
  function logout() {
    setTokenParaVincular(null);
    setErrorSocial('');
    localStorage.removeItem('biblioteca_token');
    localStorage.removeItem('biblioteca_usuario');
    setUsuario(null);
  }
  return <AuthContext.Provider value={{ usuario, cargando, errorSocial, login, loginSocial: iniciarIngresoSocial, registrar, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() { return useContext(AuthContext); }
