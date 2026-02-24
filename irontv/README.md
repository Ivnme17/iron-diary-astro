# ironTV — Backend FastAPI + SQLite

## Requisitos
- Python 3.9+

## Instalación

```bash
# 1. Entra al directorio
cd irontv

# 2. Crea entorno virtual (recomendado)
python -m venv venv
source venv/bin/activate        # Mac/Linux
# venv\Scripts\activate         # Windows

# 3. Instala dependencias
pip install -r requirements.txt

# 4. Arranca el servidor
uvicorn main:app --reload --port 8000
```

El servidor arranca en: http://localhost:8000
La base de datos `irontv.db` se crea automáticamente en el mismo directorio.

## Frontend
Abre `static/index.html` en tu navegador (o intégralo en tu app).
- En la barra naranja superior, asegúrate de que la URL apunta a `http://localhost:8000`
- Haz clic en **Conectar**

## API Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/videos` | Listar videos (opcional: `?category=hiit`) |
| POST | `/api/videos` | Agregar video |
| PATCH | `/api/videos/{id}/like` | Dar like (`{"delta": 1}` o `{"delta": -1}`) |
| DELETE | `/api/videos/{id}` | Eliminar video |

Documentación interactiva: http://localhost:8000/docs

## Producción
Para desplegar en un servidor real, cambia la URL de la API en el frontend
por tu dominio: `https://tu-dominio.com`
