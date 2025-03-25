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

    const cambiarFondo = () => {
        setFondoIndex((prevIndex) => (prevIndex + 1) % fondos.length);
    };

    return (
        <BackgroundContext.Provider value={{ fondoIndex, cambiarFondo, fondos }}>
            {children}
        </BackgroundContext.Provider>
    );
};
