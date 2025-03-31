from sqlalchemy.orm import Session
from app.models.models import UserImagePerfil

def set_user_perfil(db: Session, user_id: int, image_id: int):
    # Verificar si el usuario ya tiene un fondo asignado
    user_perfil = db.query(UserImagePerfil).filter(UserImagePerfil.id_usuario == user_id).first()
    
    if user_perfil:
        # Actualizar el fondo existente
        user_perfil.id_imagen = image_id
    else:
        # Crear un nuevo fondo para el usuario
        user_perfil = UserImagePerfil(id_usuario=user_id, id_imagen=image_id)
        db.add(user_perfil)
    
    db.commit()
    db.refresh(user_perfil)
    return user_perfil

def get_user_perfil(db: Session, user_id: int):
    # Obtener la foto de perfil del usuario
    user_perfil = db.query(UserImagePerfil).filter(UserImagePerfil.id_usuario == user_id).first()
    
    if not user_perfil:
        return None
    
    return user_perfil.id_imagen