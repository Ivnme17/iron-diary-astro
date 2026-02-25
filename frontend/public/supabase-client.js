// Importar Supabase desde CDN
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Configuración de Supabase
const supabaseUrl = 'https://deqwjyvqchtsexttwftl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlcXdqeXZxY2h0c2V4dHR3ZnRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMDMzMDgsImV4cCI6MjA4NzU3OTMwOH0.soQ9wQyd2lQ-q5xi-YaARIMmTgecuErsBAgale85wpA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Funciones de autenticación
export const authApi = {
  // Registrar usuario
  async signUp(email, password, metadata) {
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
  async signIn(email, password) {
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
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback)
  }
}

// Funciones para interactuar con Supabase
export const supabaseApi = {
  // Obtener todos los entrenamientos del usuario actual
  async getWorkouts() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Usuario no autenticado')

    const { data, error } = await supabase
      .from('workouts')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // Crear nuevo entrenamiento
  async createWorkout(workout) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Usuario no autenticado')

    const { data, error } = await supabase
      .from('workouts')
      .insert([{ ...workout, user_id: user.id }])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Actualizar entrenamiento
  async updateWorkout(id, workout) {
    const { data, error } = await supabase
      .from('workouts')
      .update({ ...workout, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Eliminar entrenamiento
  async deleteWorkout(id) {
    const { error } = await supabase
      .from('workouts')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Obtener estadísticas del usuario
  async getStats() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Usuario no autenticado')

    const { data: workouts, error } = await supabase
      .from('workouts')
      .select('exercises')
      .eq('user_id', user.id)
    
    if (error) throw error
    
    if (!workouts || workouts.length === 0) {
      return {
        total_workouts: 0,
        total_exercises: 0,
        total_kg: 0
      }
    }

    const allExercises = workouts.flatMap(w => w.exercises)
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
