import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Catalogo from './components/Catalogo';
import Home from './components/Home';
import Ayuda from './components/Ayuda';
import Juego from './components/Juego';
import Tutorial from './components/Tutorial';
import Perfil from './components/Perfil';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/juego/:id" element={<Juego />} />
        <Route path="/tutorial/:id" element={<Tutorial />} />
        <Route path="/ayuda" element={<Ayuda />} />
        <Route path="/perfil" element={<Perfil/>} />
      </Routes>
    </Router>
  );
}

export default App;