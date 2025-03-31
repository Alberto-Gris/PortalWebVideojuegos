from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.schemas.user_schemas import UserCreate, UserUpdate, LoginRequest, UserResponse
from app.crud.user_crud import create_user, get_user_by_email, get_user_by_id, update_user, delete_user, verify_password
from app.database.database import get_db
from datetime import datetime, timedelta
from jose import jwt
import os

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
    
    return {"access_token": access_token, "token_type": "bearer"}
