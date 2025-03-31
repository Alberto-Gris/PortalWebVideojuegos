import { useEffect, useState } from 'react';

import { useBackground } from './BackgroundContext';

import perfil1 from '../assets/perfil1.jpg';
import perfil2 from '../assets/perfil2.jpg';
import perfil3 from '../assets/perfil3.jpg';
import perfil4 from '../assets/perfil4.jpg';
import perfil5 from '../assets/perfil5.jpg';
import perfil6 from '../assets/perfil6.jpg';
import perfil7 from '../assets/perfil7.jpg';


export const Perfil = () => {

  const { fondoIndex, cambiarFondo, fondos } = useBackground();

  const perfiles = [
    perfil1,
    perfil2,
    perfil3,
    perfil4,
    perfil5,
    perfil6,
    perfil7
  ];

  const initialIndex = parseInt(localStorage.getItem('selectedBackgroundIndex') || '0');
  const [perfilIndex, setPerfilIndex] = useState(initialIndex);

  useEffect(() => {
    const id_perfil = parseInt(localStorage.getItem('id_perfil') || '0');
    setPerfilIndex(id_perfil);
  } , []);

  const cambiarPerfil = async () => {
      setPerfilIndex((prevIndex) => (prevIndex + 1) % perfiles.length);
      const user_id = parseInt(localStorage.getItem('id_usuario') || '0');
      try {
        const response = await fetch("http://127.0.0.1:8000/update_perfil/", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id, image_id: (perfilIndex + 1) % perfiles.length }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error:', errorData);
        } else {
            console.log('Foto de perfill actualizada correctamente');
        }
      } catch (error) {
          console.error('Error al actualizar la foto de perfil:', error);
      }
  };


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
      
      {/* Rectángulo decorativo */}
      <div className="w-[35px] h-[69px] bg-[#301E59] rounded-[10px] absolute left-[57px] top-[120px]" />

      {/* Título principal */}
      <h2 className="text-[#322452] text-[24px] font-bold absolute left-[107px] top-[138px]">
        P E R F I L
      </h2>

      {/* Contenedor de perfil */}
      <div className="bg-[#e0e0e0] p-16 rounded-[15px] shadow-lg flex flex-col items-center w-[70vw]">

        {/* Título centrado */}
        <h3 className="text-2xl font-bold text-[#322452] mb-8 text-center">
          Información de perfil
        </h3>

        <div className="flex justify-between w-full">

          {/* Información de perfil */}
          <div className="flex flex-col gap-6 w-1/2 items-center">
            
            <div className="flex flex-col gap-3">
                {/* Usuario */}
                <div className="flex flex-col gap-2">
                    <span className="text-lg font-semibold">Usuario</span>
                    <input 
                    type="text" 
                    value="MatabootsHpro"
                    readOnly
                    className="bg-[#bdbdbd] text-[#322452] px-4 py-2 rounded-md w-[300px]"
                    />
                </div>

                {/* Contraseña */}
                <div className="flex flex-col gap-2">
                    <span className="text-lg font-semibold">Contraseña</span>
                    <input 
                    type="text" 
                    value="12387373@" 
                    readOnly
                    className="bg-[#bdbdbd] text-[#322452] px-4 py-2 rounded-md w-[300px]"
                    />
                </div>

                {/* Favorito */}
                <div className="flex flex-col gap-2">
                    <span className="text-lg font-semibold">Favorito</span>
                    <input 
                    type="text" 
                    value="Snake"
                    readOnly
                    className="bg-[#bdbdbd] text-[#322452] px-4 py-2 rounded-md w-[300px]"
                    />
                </div>

                {/* Nivel */}
                <div className="flex flex-col gap-2">
                    <span className="text-lg font-semibold">Nivel</span>
                    <input 
                    type="text" 
                    value="69"
                    readOnly
                    className="bg-[#bdbdbd] text-[#322452] px-4 py-2 rounded-md w-[300px]"
                    />
                </div>
            </div>

            {/* Botón Guardar */}
            <button className="bg-[#6a35ad] text-white px-6 py-2 rounded-md hover:bg-[#4a1c85] transition w-1/4 self-center">
              Guardar
            </button>
          </div>

          {/* Contenedor de imágenes en el mismo renglón */}
          <div className="flex justify-center items-center gap-12 w-1/2">

            {/* Foto de perfil */}
            <div className="flex flex-col items-center gap-4">
              <span className="text-lg font-semibold">Foto de Perfil</span>
              <div className="w-[200px] h-[200px] rounded-lg bg-blue-500 flex justify-center items-center">
                <img 
                  src={perfiles[perfilIndex]}
                  alt="Foto de perfil" 
                  className="w-full h-full object-cover rounded-lg"
                  loading="lazy"    // ✅ Lazy loading para optimizar rendimiento
                />
              </div>

              <button 
              className="bg-[#6a35ad] text-white px-6 py-2 rounded-md hover:bg-[#4a1c85] transition w-full"
              onClick={() => cambiarPerfil()}>
                Cambiar
              </button>
            </div>

            {/* Foto de fondo */}
            <div className="flex flex-col items-center gap-4">
              <span className="text-lg font-semibold">Fondo de Pantalla</span>
              <div className="w-[200px] h-[200px] rounded-lg bg-blue-500 flex justify-center items-center">
                <img 
                  src={fondos[fondoIndex]}
                  alt="Foto de fondo" 
                  className="w-full h-full object-cover rounded-lg"
                  loading="lazy"    // ✅ Lazy loading
                />
              </div>

              <button 
              className="bg-[#6a35ad] text-white px-6 py-2 rounded-md hover:bg-[#4a1c85] transition w-full"
              onClick={() => cambiarFondo()}>
                Cambiar
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Perfil;
