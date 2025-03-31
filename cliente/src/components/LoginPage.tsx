import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import Home from "./Home";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const { loginWithEmailPassword, isAuthenticated } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    loginWithEmailPassword(email, password);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/perfil");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {isAuthenticated ? (
          <Home />
        ) : (
          <>
            <h2 className={styles.title}>Iniciar sesión</h2>

            <div className={styles.field}>
              <label className={styles.label}>Usuario</label>
              <input
                type="email"
                placeholder="Correo electrónico"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Contraseña</label>
              <input
                type="password"
                placeholder="Contraseña"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button onClick={handleLogin} className={styles.button}>
              Iniciar sesión
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
