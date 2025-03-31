from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.user_routes import router as user_router
from app.database.database import engine, Base
from sqlalchemy import inspect
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# Verificar conexión a la base de datos
try:
    engine.connect()
    print("Conexión exitosa a la base de datos.")
except Exception as e:
    print(f"Error de conexión: {e}")

# Configuración FastAPI
app = FastAPI()

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registrar las rutas de usuario
app.include_router(user_router)

@app.on_event("startup")
async def startup_event():
    # Intentar crear tablas
    print("Intentando crear tablas...")
    try:
        Base.metadata.create_all(bind=engine)  # Crear las tablas en la base de datos
        print("Tablas creadas correctamente.")
    except Exception as e:
        print(f"Error al crear tablas: {e}")
    
    # Inspeccionar las tablas creadas
    inspector = inspect(engine)
    tables = inspector.get_table_names()
    print("Tablas en la base de datos:", tables)

    print("\nFastAPI running at: http://localhost:8000 🚀")
    print("Docs available at: http://localhost:8000/docs 📄\n")
