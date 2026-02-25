# Configuración Manual de Supabase

Como el IDE no reconoce la sintaxis PostgreSQL, sigue estos pasos manuales:

## Paso 1: Crear la tabla workouts
Ve a tu panel de Supabase: https://supabase.com/dashboard/project/deqwjyvqchtsexttwftl

### En el SQL Editor, ejecuta:

```sql
CREATE TABLE workouts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    date TEXT NOT NULL,
    routine_name TEXT NOT NULL,
    exercises JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Paso 2: Crear índices

```sql
CREATE INDEX idx_workouts_user_id ON workouts(user_id);
CREATE INDEX idx_workouts_date ON workouts(date DESC);
```

## Paso 3: Habilitar Row Level Security

```sql
ALTER TABLE workouts ENABLE ROW LEVEL SECURITY;
```

## Paso 4: Crear políticas de seguridad

```sql
CREATE POLICY "Users can view own workouts" ON workouts 
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own workouts" ON workouts 
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own workouts" ON workouts 
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own workouts" ON workouts 
    FOR DELETE USING (auth.uid() = user_id);
```

## Paso 5: Configurar autenticación
Ve a Authentication → Settings y asegúrate que:
- Site URL: `http://localhost:4321`
- Enable email confirmations: según prefieras

¡Listo! Tu base de datos está configurada para el sistema de autenticación.
