import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import { BackgroundProvider } from "./components/BackgroundProvider";
import { useBackground } from "./components/BackgroundContext";
import RouterIndex from "./routes/IndexRoutes";

const LayoutWithBackground = ({ children }: { children: React.ReactNode }) => {
  const { fondoIndex, fondos } = useBackground();

  return (
    <div
      className="min-h-screen transition-all duration-500"
      style={{
        backgroundImage: `url(${fondos[fondoIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
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
          <RouterIndex />
        </LayoutWithBackground>
      </Router>
    </BackgroundProvider>
  );
}

export default App;
