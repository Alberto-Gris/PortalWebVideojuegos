import { ReactNode, useEffect, useState } from 'react';
import { BackgroundContext } from './BackgroundContext';

import fondo1 from '../assets/fondo1.jpg';
import fondo2 from '../assets/fondo2.jpg';
import fondo3 from '../assets/fondo3.jpg';
import fondo4 from '../assets/fondo4.jpg';
import fondo5 from '../assets/fondo5.jpg';
import fondo6 from '../assets/fondo6.jpg';
import fondo7 from '../assets/fondo7.jpg';

//Proveedor que contiene la lógica
export const BackgroundProvider = ({ children }: { children: ReactNode }) => {
    const fondos = [
        fondo1,
        fondo2,
        fondo3,
        fondo4,
        fondo5,
        fondo6,
        fondo7
    ];

    const initialIndex = parseInt(localStorage.getItem('selectedBackgroundIndex') || '0');
    const [fondoIndex, setFondoIndex] = useState(initialIndex);

    useEffect(() => {
        localStorage.setItem('selectedBackgroundIndex', fondoIndex.toString());
    }, [fondoIndex]);

    const cambiarFondo = async () => {
        setFondoIndex((prevIndex) => (prevIndex + 1) % fondos.length);
        const user_id = parseInt(localStorage.getItem('id_usuario') || '0');
        try {
            const response = await fetch("http://127.0.0.1:8000/update_background/", {
                method: "PUT",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ user_id, background_id: (fondoIndex + 1) % fondos.length }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData);
            } else {
                console.log('Fondo actualizado correctamente');
            }
        } catch (error) {
            console.error('Error al actualizar el fondo:', error);
        }
    };


    //Carga el fondo inicial al cargar la página
    const cargarFondo = (id_fondo: number) => {
        setFondoIndex(id_fondo);
    };

    return (
        <BackgroundContext.Provider value={{ fondoIndex, cambiarFondo, cargarFondo, fondos }}>
            {children}
        </BackgroundContext.Provider>
    );
};
