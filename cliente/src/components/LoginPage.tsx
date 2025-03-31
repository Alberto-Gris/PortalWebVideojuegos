import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import Home from "./Home";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { loginWithEmailPassword, isAuthenticated } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    loginWithEmailPassword(email, password);
    console.log("hola");
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/perfil"); // Redirige a la página de inicio
    }
  }, [isAuthenticated]);

  /*if (isChecking) {
    return (
      <h1 className="text-center text-lg font-bold">Verificando usuario...</h1>
    );
  }*/

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-gradient-to-b from-purple-300 to-blue-100"
      data-testid="loginPage"
    >
      <div className="bg-gray-200 p-8 rounded-xl shadow-lg w-96">
        {isAuthenticated ? (
          <>
            <Home></Home>
          </>
        ) : (
          <div data-testid="loginPageUnauth">
            <h2 className="text-center text-2xl font-bold mb-4">
              Iniciar sesión
            </h2>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Usuario
              </label>
              <input
                type="email"
                placeholder="Correo electrónico"
                className="w-full px-3 py-2 border rounded-lg bg-gray-300 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="Contraseña"
                className="w-full px-3 py-2 border rounded-lg bg-gray-300 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div
              onClick={handleLogin}
              className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 cursor-pointer"
            >
              Iniciar sesión
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
