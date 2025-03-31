from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv
from sqlalchemy.orm import Session
from app.models.models import Base  # Asegúrate de que se está importando Base correctamente

# Cargar variables de entorno
load_dotenv()

# Obtener la URL de la base de datos desde .env
DATABASE_URL = os.getenv("DATABASE_URL")
# Imprimir la URL de la base de datos para verificar que se cargó correctamente
print(f"DATABASE_URL: {os.getenv('DATABASE_URL')}")

# Crear el motor de la base de datos
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

# Crear la sesión de la base de datos
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Intentar crear las tablas y verificar errores
try:
    print("Intentando crear tablas...")
    Base.metadata.create_all(bind=engine)
    print("Tablas creadas correctamente.")
except Exception as e:
    print(f"Error al crear tablas: {e}")

# Función para obtener la sesión de la base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
