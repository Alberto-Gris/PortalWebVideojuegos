from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.schemas.user_schemas import UserCreate, UserUpdate, LoginRequest, UserResponse, UserBackgroundUpdate, UserPerfilUpdate
from app.crud.user_crud import create_user, get_user_by_email, get_user_by_id, update_user, delete_user, verify_password
from app.services.backgroundImage import set_user_background, get_user_background
from app.services.perfilImage import set_user_perfil, get_user_perfil
from app.database.database import get_db
from datetime import datetime, timedelta
from jose import jwt
import os

#from app.

# Configuración JWT
SECRET_KEY = os.getenv("SECRET_KEY", "default_secret_key")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

router = APIRouter()

# Función para generar el token de acceso
def create_access_token(data: dict, expires_delta: timedelta = timedelta(minutes=15)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# Ruta para crear usuario
@router.post("/create-user/", response_model=UserResponse)
def create_user_route(user_data: UserCreate, db: Session = Depends(get_db)):
    # Verificar si el email ya está registrado
    if get_user_by_email(db, user_data.email):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    email = user_data.email
    password = user_data.password
    usuario = user_data.usuario
    nivel_logros = user_data.nivel_logros if user_data.nivel_logros else 0

    # Crear el usuario
    user = create_user(db, email=email, password=password, usuario=usuario, nivel_logros=nivel_logros)
    
    return user


# Ruta para obtener usuario por ID
@router.get("/user/{user_id}", response_model=UserResponse)
def get_user_route(user_id: int, db: Session = Depends(get_db)):
    user = get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# Ruta para actualizar usuario
@router.put("/user/{user_id}", response_model=UserResponse)
def update_user_route(user_id: int, user_data: UserUpdate, db: Session = Depends(get_db)):
    user = update_user(db, user_id, user_data)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# Ruta para eliminar usuario
@router.delete("/user/{user_id}")
def delete_user_route(user_id: int, db: Session = Depends(get_db)):
    success = delete_user(db, user_id)
    if not success:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deleted successfully"}

# Ruta para login
@router.post("/login/")
def login_for_access_token(login_request: LoginRequest, db: Session = Depends(get_db)):
    user = get_user_by_email(db, login_request.email)
    if not user or not verify_password(login_request.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.email}, expires_delta=access_token_expires)

    id_fondo = get_user_background(db, user.id_usuario)
    if id_fondo is None:
        id_fondo = 0

    id_perfil = get_user_perfil(db, user.id_usuario)
    if id_perfil is None:
        id_perfil = 0
    
    return {"access_token": access_token, "token_type": "bearer", "id_fondo": id_fondo, "id_perfil": id_perfil, "id_usuario": user.id_usuario}

@router.put("/update_background/")
def update_background_route(request: UserBackgroundUpdate, db: Session = Depends(get_db)):
    user_background = set_user_background(db, request.user_id, request.background_id)

    if not user_background:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {
        "message": "Background updated successfully",
        "user_background": {
            "user_id": user_background.id_usuario,
            "background_id": user_background.id_fondo
        }
    }

@router.put("/update_perfil/")
def update_perfil_route(request: UserPerfilUpdate, db: Session = Depends(get_db)):
    user_perfil = set_user_perfil(db, request.user_id, request.image_id)

    if not user_perfil:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {
        "message": "Perfil updated successfully",
        "Perfil": {
            "user_id": user_perfil.id_usuario,
            "image_id": user_perfil.id_imagen
        }
    }