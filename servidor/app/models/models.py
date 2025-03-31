from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Enum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime

Base = declarative_base()

# Modelo de Usuario
class User(Base):
    __tablename__ = "users"

    id_usuario = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    usuario = Column(String)
    nivel_logros = Column(Integer)
    fecha_registro = Column(DateTime, default=datetime.utcnow)

# Modelo de Juegos
class Game(Base):
    __tablename__ = "game"

    id_juego = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, unique=True, index=True)

    # Relación con misiones
    missions = relationship("Mission", back_populates="game")


# Modelo de Misiones
class Mission(Base):
    __tablename__ = "missions"

    id_mision = Column(Integer, primary_key=True, index=True)
    id_juego = Column(Integer, ForeignKey("game.id_juego"))
    nombre = Column(String)
    descripcion = Column(String)
    puntos = Column(Integer)

    game = relationship("Game", back_populates="missions")
    progress = relationship("Progress", back_populates="mission")


# Modelo de Progreso de Misiones
class Progress(Base):
    __tablename__ = "progress"

    id_progreso = Column(Integer, primary_key=True, index=True)
    id_usuario = Column(Integer, ForeignKey("users.id_usuario"))
    id_mision = Column(Integer, ForeignKey("missions.id_mision"))
    estado = Column(Enum("pendiente", "completada", "fallida", name="estado_enum"))
    fecha_completada = Column(DateTime, default=datetime.utcnow)

    user = relationship("User")
    mission = relationship("Mission", back_populates="progress")
