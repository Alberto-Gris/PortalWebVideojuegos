from sqlalchemy.orm import Session
from app.models.models import User
from app.services.auth_service import verify_password
from passlib.context import CryptContext
from datetime import datetime

# Contexto para la gestión de contraseñas
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Obtener un usuario por su ID
def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id_usuario == user_id).first()

# Obtener un usuario por su correo electrónico
def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

# Crear un usuario
def create_user(db: Session, email: str, password: str, usuario: str, nivel_logros: int = 0):
    hashed_password = pwd_context.hash(password)
    db_user = User(
        email=email,
        hashed_password=hashed_password,
        usuario=usuario,
        nivel_logros=0,  
        fecha_registro=datetime.utcnow()
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Actualizar los datos de un usuario
def update_user(db: Session, user_id: int, email: str = None, usuario: str = None, password: str = None, nivel_logros: int = None):
    user = db.query(User).filter(User.id_usuario == user_id).first()
    if not user:
        return None
    
    if email:
        user.email = email
    if usuario:
        user.usuario = usuario
    if password:
        user.hashed_password = pwd_context.hash(password)
    if nivel_logros is not None:
        user.nivel_logros = nivel_logros
    
    db.commit()
    db.refresh(user)
    return user

# Eliminar un usuario
def delete_user(db: Session, user_id: int):
    user = db.query(User).filter(User.id_usuario == user_id).first()
    if not user:
        return None
    
    db.delete(user)
    db.commit()
    return user

# Verificar la contraseña de un usuario
def verify_user_password(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if not user or not verify_password(password, user.hashed_password):
        return None
    return user
