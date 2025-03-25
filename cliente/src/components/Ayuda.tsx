
import { useBackground } from './BackgroundContext';

// 2. Crear el componente funcional
const Ayuda = () => {
  // 3. Lógica del componente (opcional)
  
  const { fondoIndex, fondos } = useBackground();

  // 4. Retornar JSX
  return (
    <div
      className="min-h-screen p-8 flex justify-center items-center transition-all duration-500"
      style={{
        backgroundImage: `url(${fondos[fondoIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div>
        <h1>¡Hola soy un nuevo componente!</h1>
      </div>
    </div>
  );
};

// 5. Exportar el componente
export default Ayuda;