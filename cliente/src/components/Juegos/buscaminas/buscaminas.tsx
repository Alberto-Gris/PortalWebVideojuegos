import { useState } from "react";
import { Navigate } from "react-router-dom";
import styles from "./busca.module.css";

const filas = 8;
const columnas = 8;
const minas = 10;

const generarTablero = () => {
    let tablero = Array(filas)
        .fill(null)
        .map(() => Array(columnas).fill({ mina: false, descubierto: false }));

    let minasColocadas = 0;
    while (minasColocadas < minas) {
        let x = Math.floor(Math.random() * filas);
        let y = Math.floor(Math.random() * columnas);
        if (!tablero[x][y].mina) {
            tablero[x][y] = { ...tablero[x][y], mina: true };
            minasColocadas++;
        }
    }
    return tablero;
};

const Buscaminas = () => {
    const [tablero, setTablero] = useState(generarTablero());
    const [puntuacion, setPuntuacion] = useState(0);
    const [regresar, setRegresar] = useState(false);

    const manejarClick = (fila: number, col: number) => {
        if (tablero[fila][col].mina) {
            alert("💥 ¡Perdiste! Había una mina!");
            setTablero(generarTablero());
            setPuntuacion(0); // Reinicia la puntuación al perder
        } else {
            let nuevoTablero = [...tablero];
            if (!nuevoTablero[fila][col].descubierto) {
                nuevoTablero[fila][col] = { ...nuevoTablero[fila][col], descubierto: true };
                setPuntuacion(puntuacion + 1); // Incrementa la puntuación al descubrir
            }
            setTablero(nuevoTablero);
        }
    };

    if (regresar) {
        return <Navigate to="/catalogo" />;
    }

    return (
        <div className={styles.buscaminas}>
            <div className={styles.puntuacion}>Puntuación: {puntuacion}</div>
            <div className={styles.contenidoPrincipal}>
                <div className={styles.botonRegresar}>
                    <button className={styles.btnRegresar} onClick={() => setRegresar(true)}>
                        Salir
                    </button>
                </div>
                <div className={styles.tablero}>
                    {tablero.map((fila, i) =>
                        fila.map((celda, j) => (
                            <button
                                key={`${i}-${j}`}
                                className={celda.descubierto ? styles.descubierto : styles.oculto}
                                onClick={() => manejarClick(i, j)}
                            >
                                {celda.descubierto ? (celda.mina ? "💣" : "✅") : ""}
                            </button>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Buscaminas;
