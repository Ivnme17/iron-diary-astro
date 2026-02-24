# Iron Diary Astro 🏋️‍♂️

Una aplicación web moderna para el registro y seguimiento de entrenamientos, construida con Astro y FastAPI.

## 📋 Descripción

Iron Diary Astro es una aplicación de fitness que permite a los usuarios:
- Crear y gestionar rutinas de entrenamiento
- Registrar ejercicios con series, repeticiones y peso
- Visualizar estadísticas de progreso
- Disfrutar de una interfaz moderna y responsiva

## 🛠️ Stack Tecnológico

### Frontend
- **Astro** - Framework web moderno
- **React** - Componentes interactivos
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de CSS utility-first
- **Lucide React** - Iconos modernos

### Backend
- **FastAPI** - Framework API de Python
- **Uvicorn** - Servidor ASGI
- **TypeScript** - Tipado en el frontend

## 🚀 Características Principales

### ✅ Funcionalidades Implementadas
- 🏋️ **Formulario de Entrenamiento Completo**
  - Autocompletado inteligente para rutinas y ejercicios
  - 70+ ejercicios predefinidos organizados por categorías
  - GIFs demostrativos para cada ejercicio
  - Añadir/eliminar ejercicios dinámicamente
  - Validación de datos en tiempo real

- 📊 **Dashboard Interactivo**
  - Visualización de entrenamientos recientes
  - Estadísticas de progreso
  - Navegación intuitiva
  - Diseño responsive

- 🎨 **Experiencia de Usuario**
  - Autocompletado con navegación por teclado
  - Diseño moderno con Tailwind CSS
  - Totalmente responsive
  - Animaciones y transiciones suaves

### 🔄 Flujo de Trabajo
1. **Dashboard** → Ver entrenamientos y estadísticas
2. **Nuevo Entrenamiento** → Formulario con autocompletado
3. **Registro de Ejercicios** → GIFs demostrativos incluidos
4. **Guardado** → Datos procesados y almacenados

## 📁 Estructura del Proyecto

```
iron-diary-astro/
├── backend/
│   ├── main.py              # API FastAPI
│   └── requirements.txt     # Dependencias Python
├── frontend/
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   │   ├── DemoBanner.astro
│   │   │   ├── MuscleMap.tsx  # (Eliminado)
│   │   │   └── WorkoutCard.tsx
│   │   ├── pages/           # Páginas Astro
│   │   │   ├── index.astro
│   │   │   ├── dashboard.astro
│   │   │   └── workout.astro
│   │   └── styles/
│   │       └── global.css
│   └── package.json         # Dependencias Node.js
└── README.md
```

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Node.js 18+
- Python 3.8+
- npm o yarn

### 1. Clonar el Repositorio
```bash
git clone <repository-url>
cd iron-diary-astro
```

### 2. Configurar el Backend

#### Opción A: Instalar dependencias y ejecutar
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

#### Opción B: Si uvicorn no está reconocido (Windows)
```bash
cd backend
pip install fastapi uvicorn[standard]
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

#### Opción C: Usar Python directamente (si uvicorn no está en PATH)
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

#### Solución de problemas comunes:
- **Error: "uvicorn is not recognized"** → Usa `python -m uvicorn` en lugar de `uvicorn`
- **Error: "No module named uvicorn"** → Ejecuta `pip install uvicorn[standard]`
- **Error: "No module named fastapi"** → Ejecuta `pip install fastapi`

### 3. Configurar el Frontend
```bash
cd frontend
npm install
npm run dev
```

### 4. Acceder a la Aplicación
- **Frontend**: http://localhost:4321
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 🎯 Uso de la Aplicación

### Crear un Nuevo Entrenamiento
1. Haz clic en **"Nuevo Entrenamiento"** en el dashboard
2. Ingresa el nombre de la rutina (con autocompletado)
3. Selecciona la fecha
4. Añade ejercicios usando el autocompletado:
   - Escribe parte del nombre del ejercicio
   - Usa ↑↓ para navegar, Enter para seleccionar
   - Los GIFs aparecen automáticamente
5. Configura series, repeticiones y peso
6. Guarda el entrenamiento

### Navegación por Teclado
- **↑↓** - Navegar sugerencias de autocompletado
- **Enter** - Seleccionar sugerencia
- **Escape** - Cerrar sugerencias
- **Tab** - Navegar entre campos del formulario

## 🏋️ Base de Datos de Ejercicios

La aplicación incluye 70+ ejercicios organizados por categorías:

### Push Day
- Press Banca, Press Inclinado, Fondos, Aperturas
- Press Militar, Elevaciones Laterales
- Extensión Tríceps, Press Francés

### Pull Day
- Dominadas, Jalón al Pecho, Remo con Barra
- Curl Bíceps, Curl Martillo, Palo Músculo
- Face Pulls, Encogimientos

### Leg Day
- Sentadilla (Trasera, Frontal, Goblet)
- Prensa de Piernas, Zancadas
- Peso Muerto, Hip Thrust
- Elevación de Gemelos

### Core y Cardio
- Plancha, Crunch, Russian Twists
- Burpees, Saltos Cuerda, Mountain Climbers

## 🔧 Configuración de CORS

El backend está configurado para aceptar peticiones desde:
- http://localhost:4321
- http://127.0.0.1:4321

## 🎨 Características de Diseño

### Sistema de Autocompletado
- **Búsqueda instantánea** mientras escribes
- **Resaltado de coincidencias** en negrita
- **Navegación por teclado** completa
- **Posicionamiento inteligente** debajo de cada campo
- **Cierre automático** al hacer clic fuera

### Diseño Responsive
- **Mobile-first** approach
- **Adaptable** a tablets y desktop
- **Touch-friendly** en dispositivos móviles
- **Optimizado** para diferentes tamaños de pantalla

### Tema y Estilos
- **Modo oscuro/claro** soportado
- **Variables CSS** para consistencia
- **Animaciones suaves** y transiciones
- **Iconos modernos** con Lucide

## 🚀 Mejoras Futuras

### Planificado
- [ ] Persistencia real de datos (Base de datos)
- [ ] Autenticación de usuarios
- [ ] Gráficos de progreso avanzados
- [ ] Exportación de datos (PDF, CSV)
- [ ] Modo offline con PWA
- [ ] Integración con wearables

### En Progreso
- [ ] Más ejercicios y GIFs demostrativos
- [ ] Sistema de plantillas de rutinas
- [ ] Historial detallado de progreso
- [ ] Social features (compartir rutinas)

## 🐛 Solución de Problemas

### Problemas Comunes

**Error: "uvicorn is not recognized as the name of a cmdlet, function, script file, or operable program"**
```bash
# Solución 1: Usar python -m uvicorn
cd backend
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000

# Solución 2: Reinstalar uvicorn con soporte estándar
pip install uvicorn[standard]

# Solución 3: Instalar dependencias manualmente
pip install fastapi uvicorn[standard]
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

**Error de conexión con el backend**
```bash
# Asegúrate que el backend esté corriendo
cd backend
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000

# Verifica que el servidor esté activo en http://localhost:8000
```

**Autocompletado no funciona**
- Verifica que el JavaScript se cargue correctamente
- Revisa la consola del navegador para errores
- Asegúrate de no tener bloqueadores de anuncios

**GIFs no aparecen**
- Algunos GIFs pueden tardar en cargar
- Verifica la conexión a internet
- Los GIFs son opcionales, el formulario funciona sin ellos

**Problemas de instalación en Windows**
```bash
# Si pip no funciona, intenta con python -m pip
python -m pip install -r requirements.txt

# Si Python no está en PATH, usa la ruta completa
C:\Python39\python.exe -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Contacto

Para soporte o preguntas:
- Crea un issue en el repositorio
- Contacta al equipo de desarrollo

---

**Iron Diary Astro** - Tu compañero perfecto para alcanzar tus metas de fitness 💪
