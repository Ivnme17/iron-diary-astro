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

- � **Rutinas Predefinidas**
  - 10+ rutinas diseñadas por expertos
  - Niveles: Principiante, Intermedio, Avanzado
  - Categorías: Full Body, Upper Body, Lower Body, Push-Pull-Legs
  - Carga automática de ejercicios al seleccionar rutina
  - Tiempo estimado y descansos incluidos

- � **Dashboard Interactivo**
  - Visualización de entrenamientos recientes
  - Estadísticas de progreso
  - Navegación intuitiva
  - Diseño responsive

- 🔐 **Autenticación y Sesiones**
  - Sistema de login y registro
  - Gestión de sesiones con Supabase
  - Protección de rutas
  - Datos persistentes en la nube

- 🎨 **Experiencia de Usuario**
  - Autocompletado con navegación por teclado
  - Diseño moderno con Tailwind CSS
  - Totalmente responsive
  - Animaciones y transiciones suaves

### 🔄 Flujo de Trabajo
1. **Dashboard** → Ver entrenamientos y estadísticas
2. **Rutinas Predefinidas** → Explorar y seleccionar rutinas expertas
3. **Nuevo Entrenamiento** → Formulario con autocompletado o carga automática
4. **Registro de Ejercicios** → GIFs demostrativos incluidos
5. **Guardado** → Datos procesados y almacenados en Supabase

## 📁 Estructura del Proyecto

```
iron-diary-astro/
├── frontend/
│   ├── src/
│   │   ├── components/      # Componentes React y Astro
│   │   │   ├── DemoBanner.astro
│   │   │   ├── WorkoutCard.tsx
│   │   │   └── autocomplete.js
│   │   ├── data/            # Datos y configuraciones
│   │   │   ├── exercises.ts
│   │   │   └── preset-routines.ts
│   │   ├── lib/             # Librerías y utilidades
│   │   │   ├── supabase.ts
│   │   │   └── session-manager.js
│   │   ├── layouts/         # Layouts de Astro
│   │   │   ├── Layout.astro
│   │   │   └── SessionProtectedLayout.astro
│   │   └── pages/           # Páginas principales
│   │       ├── index.astro
│   │       ├── dashboard-user.astro
│   │       ├── workout.astro
│   │       ├── routines.astro
│   │       ├── login.astro
│   │       └── register.astro
│   ├── public/              # Archivos estáticos
│   │   └── supabase-client.js
│   └── package.json         # Dependencias Node.js
└── README.md
```

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Node.js 18+
- npm o yarn
- Cuenta en Supabase

### 1. Clonar el Repositorio
```bash
git clone <repository-url>
cd iron-diary-astro
```

### 2. Configurar Supabase
1. Crea un nuevo proyecto en [Supabase](https://supabase.com)
2. Ejecuta el siguiente SQL en el editor de Supabase para crear la tabla:
```sql
CREATE TABLE entrenamientos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    id_usuario UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    fecha TEXT NOT NULL,
    nombre_rutina TEXT NOT NULL,
    ejercicios JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE entrenamientos ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad
CREATE POLICY "Los usuarios pueden ver sus propios entrenamientos" ON entrenamientos
    FOR SELECT USING (auth.uid() = id_usuario);

CREATE POLICY "Los usuarios pueden insertar sus propios entrenamientos" ON entrenamientos
    FOR INSERT WITH CHECK (auth.uid() = id_usuario);

CREATE POLICY "Los usuarios pueden actualizar sus propios entrenamientos" ON entrenamientos
    FOR UPDATE USING (auth.uid() = id_usuario);

CREATE POLICY "Los usuarios pueden eliminar sus propios entrenamientos" ON entrenamientos
    FOR DELETE USING (auth.uid() = id_usuario);
```

### 3. Configurar Variables de Entorno
Crea un archivo `.env` en `frontend/`:
```env
PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
PUBLIC_SUPABASE_ANON_KEY=tu-key-anonima
```

### 4. Configurar el Frontend
```bash
cd frontend
npm install
npm run dev
```

### 5. Acceder a la Aplicación
- **Frontend**: http://localhost:4321

## 🎯 Uso de la Aplicación

### Usar Rutinas Predefinidas
1. Haz clic en **"Rutinas"** en el menú de navegación
2. Filtra por dificultad (principiante, intermedio, avanzado) o categoría
3. Explora las rutinas disponibles con descripciones y tiempos estimados
4. Haz clic en **"Ver Detalles"** para ver todos los ejercicios
5. Selecciona **"Usar Rutina"** para cargarla automáticamente en el formulario

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
