-- Paso 1: Crear la tabla entrenamientos
CREATE TABLE entrenamientos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    id_usuario UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    fecha TEXT NOT NULL,
    nombre_rutina TEXT NOT NULL,
    ejercicios JSONB NOT NULL,
    fecha_creacion TIMESTAMPTZ DEFAULT NOW(),
    fecha_actualizacion TIMESTAMPTZ DEFAULT NOW()
);

-- Paso 2: Crear índices
CREATE INDEX idx_entrenamientos_id_usuario ON entrenamientos(id_usuario);
CREATE INDEX idx_entrenamientos_fecha ON entrenamientos(fecha DESC);

-- Paso 3: Habilitar Row Level Security
ALTER TABLE entrenamientos ENABLE ROW LEVEL SECURITY;

-- Paso 4: Crear políticas de seguridad
CREATE POLICY "Usuarios pueden ver sus entrenamientos" ON entrenamientos 
    FOR SELECT USING (auth.uid() = id_usuario);

CREATE POLICY "Usuarios pueden insertar sus entrenamientos" ON entrenamientos 
    FOR INSERT WITH CHECK (auth.uid() = id_usuario);

CREATE POLICY "Usuarios pueden actualizar sus entrenamientos" ON entrenamientos 
    FOR UPDATE USING (auth.uid() = id_usuario);

CREATE POLICY "Usuarios pueden eliminar sus entrenamientos" ON entrenamientos 
    FOR DELETE USING (auth.uid() = id_usuario);
