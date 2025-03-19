import LoginPage from "./components/LoginPage";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar></Navbar>
        <LoginPage></LoginPage>
      </AuthProvider>
    </>
  );
}

export default App;
