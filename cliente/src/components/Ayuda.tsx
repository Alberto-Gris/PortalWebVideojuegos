import { useState } from "react";
import { useBackground } from "./BackgroundContext";

const preguntas = [
  {
    pregunta: "¿Cómo me registro?",
    respuesta:
      "Para registrarte, haz clic en el icono de perfil en la parte superior derecha de la pantalla.",
  },
  {
    pregunta: "¿Cómo cambio mi contraseña?",
    respuesta:
      'Ve a la sección de perfil, selecciona "Cambiar contraseña" e ingresa tu nueva clave.',
  },
  {
    pregunta: "¿Dónde encuentro mis juegos guardados?",
    respuesta:
      'Tus juegos guardados están en la sección "Favoritos" dentro de tu perfil.',
  },
  {
    pregunta: "¿Qué hago si el juego se traba?",
    respuesta:
      "Si el juego se traba, intenta presionar F5 para recargar la página y volver a intentarlo.",
  },
  {
    pregunta: "¿Dónde puedo aprender a jugar?",
    respuesta:
      "En la sección de tutoriales encontrarás videos y guías para aprender a jugar cada juego.",
  },
  {
    pregunta: "¿Los juegos tienen instrucciones?",
    respuesta:
      "Sí, cada juego tiene una pequeña descripción que explica cómo funciona antes de comenzar.",
  },
];

const Ayuda = () => {
  const { fondoIndex, fondos } = useBackground();
  const [activo, setActivo] = useState(null);

  const togglePregunta = (index: any) => {
    setActivo(activo === index ? null : index);
  };

  return (
    <div
      className="min-h-screen p-8 flex justify-center items-center transition-all duration-500"
      style={{
        backgroundImage: `url(${fondos[fondoIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Centro de Ayuda</h1>
        <div>
          {preguntas.map((item, index) => (
            <div key={index} className="mb-4 border-b">
              <button
                onClick={() => togglePregunta(index)}
                className="w-full text-left font-semibold text-lg p-2 focus:outline-none flex justify-between cursor-pointer"
              >
                {item.pregunta}
                <span>{activo === index ? "▲" : "▼"}</span>
              </button>
              {activo === index && (
                <p className="p-2 text-gray-700">{item.respuesta}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ayuda;
