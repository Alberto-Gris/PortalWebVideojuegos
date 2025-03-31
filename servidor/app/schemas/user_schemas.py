from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class UserCreate(BaseModel):
    email: str
    password: str
    usuario: str
    nivel_logros: Optional[int] = 0
    
    class Config:
        orm_mode = True

class UserUpdate(BaseModel):
    email: Optional[str] = None
    password: Optional[str] = None
    usuario: Optional[str] = None
    nivel_logros: Optional[int] = None

class UserResponse(BaseModel):
    id_usuario: int
    email: str
    usuario: str
    nivel_logros: int
    fecha_registro: datetime

    class Config:
        from_attributes = True

class LoginRequest(BaseModel):
    email: str
    password: str
