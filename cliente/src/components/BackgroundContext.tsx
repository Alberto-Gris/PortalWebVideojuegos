import { createContext, useContext } from 'react';

//Define el tipo del contexto
interface BackgroundContextType {
    fondoIndex: number;
    cambiarFondo: () => void;
    fondos: string[];
}

//Contexto
export const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

//Hook personalizado para usar el contexto
export const useBackground = () => {
    const context = useContext(BackgroundContext);
    if (!context) {
        throw new Error('useBackground debe usarse dentro de BackgroundProvider');
    }
    return context;
};
