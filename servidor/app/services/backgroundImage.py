from sqlalchemy.orm import Session
from app.models.models import UserBackground

def set_user_background(db: Session, user_id: int, background_id: int):
    # Verificar si el usuario ya tiene un fondo asignado
    user_background = db.query(UserBackground).filter(UserBackground.id_usuario == user_id).first()
    
    if user_background:
        # Actualizar el fondo existente
        user_background.id_fondo = background_id
    else:
        # Crear un nuevo fondo para el usuario
        user_background = UserBackground(id_usuario=user_id, id_fondo=background_id)
        db.add(user_background)
    
    db.commit()
    db.refresh(user_background)
    return user_background

def get_user_background(db: Session, user_id: int):
    # Obtener el fondo del usuario
    user_background = db.query(UserBackground).filter(UserBackground.id_usuario == user_id).first()
    
    if not user_background:
        return None
    
    return user_background.id_fondo
    
