# Parte del Backend para el Proyecto del Portal de Videojuegos

Esta es la parte diseñada para el backend del portal de videojuegos. Fue realizada con **Python** y el framework **FastAPI**. En caso de que no tengas Python instalado, puedes descargarlo a través del siguiente [link de descarga](https://www.python.org/downloads/), **asegúrate de marcar la casilla "Add Python to PATH" en la instalación**.

## Tecnologías utilizadas

- **FastAPI**: Framework para crear la API.
- **Uvicorn**: Servidor ASGI para FastAPI.
- **SQLAlchemy**: ORM para interactuar con la base de datos.
- **SQLite**: Base de datos ligera para desarrollo.
- **bcrypt**: Para gestionar la autenticación y las contraseñas de los usuarios.
- **python-jose**: Para la creación y verificación de tokens JWT.

## Requisitos previos

- **Python**: Asegúrate de tener Python 3.7 o superior instalado. Puedes verificar la versión con el siguiente comando:
```bash
python --version
```
- **Pipenv**:  Asegúrate de tener **pipenv** instalado en tu sistema. Si no lo tienes, puedes instalarlo con:
```bash
pip install pipenv
```

## Instalación

### 1. Clona el repositorio completo

Asegúrate de tener el repositorio completo del portal de videojuegos clonado. Si aún no lo has hecho, usa el siguiente comando:

```bash
git clone https://github.com/Alberto-Gris/PortalWebVideojuegos
```

### 2. Nos situamos en la carpeta correspondiente

Nos aseguramos de posicionarnos en la carpeta del servidor, por ende ponemos el comando:

```bash
cd servidor
```

### 3. Activamos el entorno virtual

Accesamos al entorno virtual, ya que ahí es donde estan todas las dependencias de nuestro servidor, con el siguiente comando:

```bash
pipenv shell
```

### 3. Instalación de dependencias

Instalamos las dependencias necesarias con el comando:

```bash
pipenv install
```

### 4. Ejecutamos el servidor

Una vez que hayas instalado todas las dependencias, puedes ejecutar el servidor el siguiente comando:

```bash
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```
- **main:app** : Esto le indica a uvicorn que busque la instancia de la aplicación FastAPI en el archivo main.py y que use la variable app.
- **--host 127.0.0.1** : Establece que el servidor escuche en localhost, lo cual es adecuado para desarrollo local.
- **--port 8000** : El servidor correrá en el puerto 8000. Puedes cambiar este puerto si lo necesitas.
- **--reload**: Este flag permite la recarga automática del servidor cada vez que hagas cambios en el código, lo cual es útil durante el desarrollo.