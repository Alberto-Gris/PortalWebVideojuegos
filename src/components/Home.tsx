import { useAuthContext } from "../context/AuthContext";

const Home = () => {
  const { logout } = useAuthContext();
  return (
    <>
      <h1>BIENVENIDO</h1>
      <button
        className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700"
        onClick={() => logout()}
      >
        Salir
      </button>
    </>
  );
};

export default Home;
