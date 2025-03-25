import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Catalogo from "./components/Catalogo/Catalogo";
import Home from './components/Home';
import Ayuda from './components/Ayuda';
import Juego from './components/Juego';
import Tutorial from './components/Tutorial';
import Perfil from './components/Perfil';
import LoginPage from './components/LoginPage';
import { BackgroundProvider } from './components/BackgroundProvider';
import { useBackground } from './components/BackgroundContext';

// ✅ Componente contenedor con fondo dinámico
const LayoutWithBackground = ({ children }: { children: React.ReactNode }) => {
    const { fondoIndex, fondos } = useBackground();

    return (
        <div
            className="min-h-screen transition-all duration-500"
            style={{
                backgroundImage: `url(${fondos[fondoIndex]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            {children}
        </div>
    );
};

function App() {
    return (
        <BackgroundProvider>
            <Router>
                <Navbar />
                <LayoutWithBackground>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/catalogo" element={<Catalogo />} />
                        <Route path="/juego/:id" element={<Juego />} />
                        <Route path="/tutorial/:id" element={<Tutorial />} />
                        <Route path="/ayuda" element={<Ayuda />} />
                        <Route path="/perfil" element={<Perfil />} />
                    </Routes>
                </LayoutWithBackground>
            </Router>
        </BackgroundProvider>
    );
}

export default App;
