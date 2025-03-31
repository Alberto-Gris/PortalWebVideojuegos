import { useState } from "react";
import { useBackground } from "./BackgroundContext";
import styles from "./ayuda.module.css";  // Importar el módulo CSS

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
  const [activo, setActivo] = useState<number | null>(null);

  const togglePregunta = (index: number) => {
    setActivo(activo === index ? null : index);
  };

  return (
    <div
      data-testid='ayuda'
      className={styles.contenedor}
      style={{
        backgroundImage: `url(${fondos[fondoIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className={styles.cajaAyuda}>
        <h1 className={styles.titulo}>Centro de Ayuda</h1>
        <div className={styles.preguntas}>
          {preguntas.map((item, index) => (
            <div key={index} className={styles.bloquePregunta}>
              <button
                onClick={() => togglePregunta(index)}
                className={styles.botonPregunta}
              >
                {item.pregunta}
                <span className={styles.indicador}>
                  {activo === index ? "▲" : "▼"}
                </span>
              </button>
              {activo === index && (
                <p className={styles.respuesta}>{item.respuesta}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ayuda;
