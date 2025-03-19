from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# Obtener la URL de la base de datos desde .env
DATABASE_URL = os.getenv("DATABASE_URL")

# Crear el motor de la base de datos
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

# Crear la sesión de la base de datos
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base para los modelos
Base = declarative_base()
