
// Punto de entrada de la app (llamado desde main.jsx, que no se modifica).
// Define las 3 rutas:
//   "/"          -> Home   (lista de tareas)
//   "/tarea/:id" -> Detalle (información completa de una tarea)
//   "/crear"     -> Crear   (formulario de nueva tarea)

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TareasProvider } from "./context/TareasContext";
import { TemaProvider } from "./context/TemaContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Detalle from "./pages/Detalle";
import Crear from "./pages/Crear";
import "./App.css";

function App() {
  return (
    <TemaProvider>
      <TareasProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tarea/:id" element={<Detalle />} />
            <Route path="/crear" element={<Crear />} />
          </Routes>
        </BrowserRouter>
      </TareasProvider>
    </TemaProvider>
  );
}

export default App;
