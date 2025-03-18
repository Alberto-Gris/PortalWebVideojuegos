import { useAuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const { isChecking, isAuthenticated, loginWithEmailPassword, logout, user } =
    useAuthContext();

  if (isChecking) {
    return <h1>Verificando usuarios</h1>;
  }

  return (
    <>
      {isAuthenticated ? (
        <>
          <h3>Bienvenido</h3>
          <pre>{JSON.stringify(user, null, 2)}</pre>
          <button
            onClick={() => logout()}
            className="bg-blue-500 text-white rounded-2xl mt-2"
          >
            Salir
          </button>
        </>
      ) : (
        <>
          <h3>Ingresar a la aplicación</h3>
          <button
            onClick={() => loginWithEmailPassword("albert@gmail.com", "123")}
            className="bg-blue-500 text-white rounded-2xl mt-2"
          >
            Ingresar
          </button>
        </>
      )}
      <h3>Login</h3>
      <span></span>
    </>
  );
};

export default LoginPage;
