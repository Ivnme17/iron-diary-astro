import { createClient } from '@supabase/supabase-js'

// Configuración de Supabase
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos de datos para TypeScript
export interface User {
  id: string
  email: string
  user_metadata?: Record<string, any>
  created_at: string
}

export interface Workout {
  id: string
  id_usuario: string
  fecha: string
  nombre_rutina: string
  ejercicios: Exercise[]
  fecha_creacion: string
  fecha_actualizacion: string
}

export interface Exercise {
  id: string
  name: string
  sets: number
  reps: number
  weight: number
}

export interface Stats {
  total_workouts: number
  total_exercises: number
  total_kg: number
}

// Funciones de autenticación
export const authApi = {
  // Registrar usuario
  async signUp(email: string, password: string, metadata?: Record<string, any>) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    })
    
    if (error) throw error
    return data
  },

  // Iniciar sesión
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) throw error
    return data
  },

  // Cerrar sesión
  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  // Obtener usuario actual
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  },

  // Escuchar cambios de autenticación
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback)
  }
}

// Funciones para interactuar con Supabase
export const supabaseApi = {
  // Obtener todos los entrenamientos del usuario actual
  async getWorkouts(): Promise<Workout[]> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Usuario no autenticado')

    const { data, error } = await supabase
      .from('entrenamientos')
      .select('*')
      .eq('id_usuario', user.id)
      .order('fecha', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // Crear nuevo entrenamiento
  async createWorkout(workout: Omit<Workout, 'id' | 'fecha_creacion' | 'fecha_actualizacion' | 'id_usuario'>): Promise<Workout> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Usuario no autenticado')

    const { data, error } = await supabase
      .from('entrenamientos')
      .insert([{ ...workout, id_usuario: user.id }])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Actualizar entrenamiento
  async updateWorkout(id: string, workout: Partial<Workout>): Promise<Workout> {
    const { data, error } = await supabase
      .from('entrenamientos')
      .update({ ...workout, fecha_actualizacion: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Eliminar entrenamiento
  async deleteWorkout(id: string): Promise<void> {
    const { error } = await supabase
      .from('entrenamientos')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Obtener estadísticas del usuario
  async getStats(): Promise<Stats> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Usuario no autenticado')

    const { data: workouts, error } = await supabase
      .from('entrenamientos')
      .select('ejercicios')
      .eq('id_usuario', user.id)
    
    if (error) throw error
    
    if (!workouts || workouts.length === 0) {
      return {
        total_workouts: 0,
        total_exercises: 0,
        total_kg: 0
      }
    }

    const allExercises = workouts.flatMap(w => w.exercises as Exercise[])
    const total_kg = Math.round(
      allExercises.reduce((sum, ex) => sum + (ex.weight * ex.sets * ex.reps), 0) / 1000
    )

    return {
      total_workouts: workouts.length,
      total_exercises: allExercises.length,
      total_kg
    }
  }
}
