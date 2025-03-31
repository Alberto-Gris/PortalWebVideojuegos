import { Routes, Route } from "react-router-dom";
import Catalogo from "../components/Catalogo/Catalogo";
import Home from "../components/Home";
import Ayuda from "../components/Ayuda";
import Juego from "../components/Juego";
import Tutorial from "../components/Tutorial";
import Perfil from "../components/Perfil";
import LoginPage from "../components/LoginPage";
import Buscaminas from "../components/Juegos/buscaminas/buscaminas"; 

function IndexRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Home />} />
      <Route path="/catalogo" element={<Catalogo />} />
      <Route path="/juego/:id" element={<Juego />} />
      <Route path="/tutorial/:id" element={<Tutorial />} />
      <Route path="/ayuda" element={<Ayuda />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/buscaminas" element={<Buscaminas />} /> 
    </Routes>
  );
}

export default IndexRoutes;
