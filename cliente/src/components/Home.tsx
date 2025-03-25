import { useAuthContext } from "../context/AuthContext";

import { useBackground } from './BackgroundContext';

const Home = () => {

  const { logout } = useAuthContext();
  
  const { fondoIndex, fondos } = useBackground();

  return (
    <>
      <div
        className="min-h-screen p-8 flex justify-center items-center transition-all duration-500"
        style={{
          backgroundImage: `url(${fondos[fondoIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <h1>BIENVENIDO</h1>
        <button
          className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700"
          onClick={() => logout()}
        >
          Salir
        </button>
      </div>
    </>
  );
};

export default Home;
