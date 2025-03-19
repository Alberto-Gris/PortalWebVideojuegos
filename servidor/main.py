from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from models import User
from database import engine, SessionLocal
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

class LoginRequest(BaseModel):
    email: str
    password: str


# Crear las tablas en la base de datos
User.metadata.create_all(bind=engine)

# Configuración FastAPI
app = FastAPI()

# Configurar el middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Cambia esto según el puerto de tu frontend
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos HTTP
    allow_headers=["*"],  # Permite todos los encabezados
)

# Configurar la seguridad para el login
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Contexto para la gestión de contraseñas
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Configuración de JWT
SECRET_KEY = "9a5204f8a5a004d507e5048ed72b18470b1f1d49d21d36f2f6cf03260e1d42a8"  # Cambia esto a algo más seguro
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Crear el objeto de base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Función para verificar la contraseña
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# Función para obtener un usuario por su correo electrónico
def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

# Función para generar un token JWT
def create_access_token(data: dict, expires_delta: timedelta = timedelta(minutes=15)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Ruta para crear un nuevo usuario
@app.post("/create-user/")
def create_user(email: str, password: str, db: Session = Depends(get_db)):
    hashed_password = pwd_context.hash(password)
    db_user = User(email=email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return {"email": db_user.email, "id": db_user.id}

# Ruta para login
@app.post("/login/")
def login_for_access_token(login_request: LoginRequest, db: Session = Depends(get_db)):
    email = login_request.email
    password = login_request.password
    
    user = get_user_by_email(db, email)
    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}
