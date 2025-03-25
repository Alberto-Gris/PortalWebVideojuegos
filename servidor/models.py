from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

# Modelo de Usuario
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

class Backgrounds(Base):
    __tablename__ = "backgrounds"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    index = Column(Integer, index=True)


class BackgroundsUser(Base):
    __tablename__ = "backgrounds_users"

    id_user = Column(Integer, ForeignKey("users.id"), primary_key=True)
    id_background = Column(Integer, ForeignKey("backgrounds.id"), primary_key=True)

    user = relationship("User", back_populates="backgrounds")
    background = relationship("Backgrounds", back_populates="users")
