import { useEffect, useState } from 'react';
import { useBackground } from './BackgroundContext';
import styles from './Perfil.module.css';

import perfil1 from '../assets/perfil1.jpg';
import perfil2 from '../assets/perfil2.jpg';
import perfil3 from '../assets/perfil3.jpg';
import perfil4 from '../assets/perfil4.jpg';
import perfil5 from '../assets/perfil5.jpg';
import perfil6 from '../assets/perfil6.jpg';
import perfil7 from '../assets/perfil7.jpg';

export const Perfil = () => {
  const { fondoIndex, cambiarFondo, fondos } = useBackground();
  const perfiles = [perfil1, perfil2, perfil3, perfil4, perfil5, perfil6, perfil7];

  const initialIndex = parseInt(localStorage.getItem('selectedBackgroundIndex') || '0');
  const [perfilIndex, setPerfilIndex] = useState(initialIndex);

  useEffect(() => {
    const id_perfil = parseInt(localStorage.getItem('id_perfil') || '0');
    setPerfilIndex(id_perfil);
  }, []);

  const cambiarPerfil = async () => {
    setPerfilIndex((prevIndex) => (prevIndex + 1) % perfiles.length);
    const user_id = parseInt(localStorage.getItem('id_usuario') || '0');
    try {
      const response = await fetch("http://127.0.0.1:8000/update_perfil/", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, image_id: (perfilIndex + 1) % perfiles.length }),
      });
      if (!response.ok) {
        console.error('Error:', await response.json());
      } else {
        console.log('Foto de perfil actualizada correctamente');
      }
    } catch (error) {
      console.error('Error al actualizar la foto de perfil:', error);
    }
  };

  return (
    <div className={styles.container} style={{ backgroundImage: `url(${fondos[fondoIndex]})` }}>
      <div className={styles.rectangle} />
      <h2 className={styles.title}>P E R F I L</h2>
      <div className={styles.profileCard}>
        <h3 className={styles.subtitle}>Información de perfil</h3>
        <div className={styles.profileContent}>
          <div className={styles.profileInfo}>
            {['Usuario', 'Contraseña', 'Favorito', 'Nivel'].map((label, idx) => (
              <div key={idx} className={styles.inputGroup}>
                <span className={styles.label}>{label}</span>
                <input type="text" value={['MatabootsHpro', '12387373@', 'Snake', '69'][idx]} readOnly className={styles.input} />
              </div>
            ))}
            <button className={styles.saveButton}>Guardar</button>
          </div>
          <div className={styles.profileImages}>
            {[{ label: 'Foto de Perfil', img: perfiles[perfilIndex], onClick: cambiarPerfil }, { label: 'Fondo de Pantalla', img: fondos[fondoIndex], onClick: cambiarFondo }].map(({ label, img, onClick }, idx) => (
              <div key={idx} className={styles.imageSection}>
                <span className={styles.label}>{label}</span>
                <div className={styles.imageContainer}>
                  <img src={img} alt={label} className={styles.image} loading="lazy" />
                </div>
                <button className={styles.changeButton} onClick={onClick}>Cambiar</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;