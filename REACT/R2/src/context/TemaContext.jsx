// Maneja el modo día/noche de toda la app. El tema elegido se guarda en
// localStorage y se aplica como atributo data-tema en <html>

import { createContext, useContext, useEffect, useState } from "react";

const CLAVE_STORAGE = "reactLatest_tema";
const TemaContext = createContext(null);

export function TemaProvider({ children }) {
  const [tema, setTema] = useState(() => {
    return localStorage.getItem(CLAVE_STORAGE) || "claro";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-tema", tema);
    localStorage.setItem(CLAVE_STORAGE, tema);
  }, [tema]);

  function alternarTema() {
    setTema((actual) => (actual === "claro" ? "oscuro" : "claro"));
  }

  return (
    <TemaContext.Provider value={{ tema, alternarTema }}>
      {children}
    </TemaContext.Provider>
  );
}

export function useTema() {
  const contexto = useContext(TemaContext);
  if (!contexto) {
    throw new Error("useTema debe usarse dentro de un <TemaProvider>");
  }
  return contexto;
}
