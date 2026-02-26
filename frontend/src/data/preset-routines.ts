// Rutinas predefinidas para usuarios nuevos
export interface PresetRoutine {
  id: string;
  name: string;
  description: string;
  difficulty: 'principiante' | 'intermedio' | 'avanzado';
  category: 'full-body' | 'upper-body' | 'lower-body' | 'push-pull-legs';
  exercises: {
    name: string;
    sets: number;
    reps: number;
    weight?: number;
    rest?: number;
  }[];
  estimatedTime: number; // minutos
}

export const PRESET_ROUTINES: PresetRoutine[] = [
  // Full Body Principiante
  {
    id: 'full-body-principiante',
    name: 'Full Body Principiante',
    description: 'Rutina completa para principiantes con ejercicios básicos',
    difficulty: 'principiante',
    category: 'full-body',
    exercises: [
      { name: 'Sentadilla con peso corporal', sets: 3, reps: 12, rest: 60 },
      { name: 'Flexiones en rodillas', sets: 3, reps: 10, rest: 60 },
      { name: 'Remo con mancuernas', sets: 3, reps: 10, rest: 60 },
      { name: 'Press militar con mancuernas', sets: 3, reps: 10, rest: 60 },
      { name: 'Plancha abdominal', sets: 3, reps: 30, rest: 45 }
    ],
    estimatedTime: 30
  },

  // Push Day Intermedio
  {
    id: 'push-day-intermedio',
    name: 'Push Day Intermedio',
    description: 'Día de empuje enfocado en pecho, hombros y tríceps',
    difficulty: 'intermedio',
    category: 'upper-body',
    exercises: [
      { name: 'Press banca plano', sets: 4, reps: 8, rest: 90 },
      { name: 'Press banca inclinado', sets: 3, reps: 10, rest: 90 },
      { name: 'Aperturas con mancuernas', sets: 3, reps: 12, rest: 60 },
      { name: 'Press militar con barra', sets: 4, reps: 8, rest: 90 },
      { name: 'Elevaciones laterales', sets: 3, reps: 15, rest: 60 },
      { name: 'Extensiones de tríceps en polea', sets: 3, reps: 12, rest: 60 }
    ],
    estimatedTime: 45
  },

  // Pull Day Intermedio
  {
    id: 'pull-day-intermedio',
    name: 'Pull Day Intermedio',
    description: 'Día de tracción enfocado en espalda y bíceps',
    difficulty: 'intermedio',
    category: 'upper-body',
    exercises: [
      { name: 'Dominadas', sets: 4, reps: 8, rest: 90 },
      { name: 'Jalón al pecho', sets: 4, reps: 10, rest: 90 },
      { name: 'Remo con barra', sets: 3, reps: 10, rest: 90 },
      { name: 'Remo con mancuerna', sets: 3, reps: 12, rest: 60 },
      { name: 'Face pulls', sets: 3, reps: 15, rest: 60 },
      { name: 'Curl con barra', sets: 3, reps: 12, rest: 60 },
      { name: 'Curl martillo', sets: 3, reps: 12, rest: 60 }
    ],
    estimatedTime: 45
  },

  // Leg Day Intermedio
  {
    id: 'leg-day-intermedio',
    name: 'Leg Day Intermedio',
    description: 'Día de piernas completo para desarrollo muscular',
    difficulty: 'intermedio',
    category: 'lower-body',
    exercises: [
      { name: 'Sentadilla con barra', sets: 4, reps: 8, rest: 120 },
      { name: 'Prensa de piernas', sets: 3, reps: 12, rest: 90 },
      { name: 'Zancadas con mancuernas', sets: 3, reps: 10, rest: 90 },
      { name: 'Peso muerto rumano', sets: 3, reps: 10, rest: 90 },
      { name: 'Extensión de cuádriceps', sets: 3, reps: 15, rest: 60 },
      { name: 'Curl femoral acostado', sets: 3, reps: 15, rest: 60 },
      { name: 'Elevación de gemelos', sets: 4, reps: 20, rest: 45 }
    ],
    estimatedTime: 50
  },

  // Full Body Avanzado
  {
    id: 'full-body-avanzado',
    name: 'Full Body Avanzado',
    description: 'Rutina completa con ejercicios avanzados y mayor intensidad',
    difficulty: 'avanzado',
    category: 'full-body',
    exercises: [
      { name: 'Peso muerto', sets: 4, reps: 6, rest: 120 },
      { name: 'Press banca plano', sets: 4, reps: 8, rest: 90 },
      { name: 'Sentadilla frontal', sets: 3, reps: 8, rest: 120 },
      { name: 'Dominadas con peso', sets: 4, reps: 8, rest: 90 },
      { name: 'Press militar con barra', sets: 3, reps: 8, rest: 90 },
      { name: 'Remo con barra', sets: 3, reps: 10, rest: 90 },
      { name: 'Curl con barra', sets: 3, reps: 12, rest: 60 },
      { name: 'Extensiones de tríceps', sets: 3, reps: 12, rest: 60 }
    ],
    estimatedTime: 60
  },

  // Upper Body Avanzado
  {
    id: 'upper-body-avanzado',
    name: 'Upper Body Avanzado',
    description: 'Día de torso superior con técnicas avanzadas',
    difficulty: 'avanzado',
    category: 'upper-body',
    exercises: [
      { name: 'Press banca plano', sets: 5, reps: 6, rest: 120 },
      { name: 'Press banca inclinado', sets: 4, reps: 8, rest: 90 },
      { name: 'Dominadas', sets: 4, reps: 8, rest: 90 },
      { name: 'Remo con barra', sets: 4, reps: 8, rest: 90 },
      { name: 'Press militar', sets: 3, reps: 8, rest: 90 },
      { name: 'Elevaciones laterales', sets: 3, reps: 15, rest: 60 },
      { name: 'Curl con barra', sets: 3, reps: 10, rest: 60 },
      { name: 'Extensiones de tríceps en polea', sets: 3, reps: 12, rest: 60 }
    ],
    estimatedTime: 55
  },

  // Lower Body Avanzado
  {
    id: 'lower-body-avanzado',
    name: 'Lower Body Avanzado',
    description: 'Día de piernas intenso con ejercicios compuestos',
    difficulty: 'avanzado',
    category: 'lower-body',
    exercises: [
      { name: 'Sentadilla con barra', sets: 5, reps: 6, rest: 150 },
      { name: 'Peso muerto', sets: 4, reps: 6, rest: 150 },
      { name: 'Zancadas con barra', sets: 3, reps: 10, rest: 90 },
      { name: 'Prensa de piernas', sets: 3, reps: 12, rest: 90 },
      { name: 'Peso muerto rumano', sets: 3, reps: 10, rest: 90 },
      { name: 'Extensión de cuádriceps', sets: 3, reps: 15, rest: 60 },
      { name: 'Curl femoral', sets: 3, reps: 15, rest: 60 },
      { name: 'Elevación de gemelos', sets: 4, reps: 25, rest: 45 }
    ],
    estimatedTime: 65
  },

  // Push-Pull-Legs Principiante
  {
    id: 'ppl-principiante',
    name: 'Push-Pull-Legs Principiante',
    description: 'Rutina PPL simplificada para principiantes',
    difficulty: 'principiante',
    category: 'push-pull-legs',
    exercises: [
      { name: 'Flexiones', sets: 3, reps: 10, rest: 60 },
      { name: 'Press militar con mancuernas', sets: 3, reps: 10, rest: 60 },
      { name: 'Extensiones de tríceps', sets: 3, reps: 12, rest: 60 }
    ],
    estimatedTime: 20
  },

  // HIIT Cardio
  {
    id: 'hiit-cardio',
    name: 'HIIT Cardio Intenso',
    description: 'Entrenamiento de intervalos de alta intensidad',
    difficulty: 'intermedio',
    category: 'full-body',
    exercises: [
      { name: 'Burpees', sets: 4, reps: 15, rest: 30 },
      { name: 'Mountain climbers', sets: 4, reps: 20, rest: 30 },
      { name: 'Saltos al cajón', sets: 4, reps: 15, rest: 30 },
      { name: 'Jumping jacks', sets: 4, reps: 30, rest: 30 },
      { name: 'Plancha con saltos', sets: 4, reps: 10, rest: 30 }
    ],
    estimatedTime: 25
  },

  // Core Especializado
  {
    id: 'core-especializado',
    name: 'Core Especializado',
    description: 'Entrenamiento enfocado en abdomen y core',
    difficulty: 'intermedio',
    category: 'full-body',
    exercises: [
      { name: 'Plancha frontal', sets: 3, reps: 60, rest: 45 },
      { name: 'Plancha lateral', sets: 3, reps: 30, rest: 45 },
      { name: 'Crunch abdominal', sets: 3, reps: 20, rest: 45 },
      { name: 'Elevación de piernas', sets: 3, reps: 15, rest: 45 },
      { name: 'Russian twists', sets: 3, reps: 20, rest: 45 },
      { name: 'Mountain climbers', sets: 3, reps: 20, rest: 45 }
    ],
    estimatedTime: 25
  }
];

// Función para obtener rutinas por dificultad
export const getRoutinesByDifficulty = (difficulty: PresetRoutine['difficulty']) => {
  return PRESET_ROUTINES.filter(routine => routine.difficulty === difficulty);
};

// Función para obtener rutinas por categoría
export const getRoutinesByCategory = (category: PresetRoutine['category']) => {
  return PRESET_ROUTINES.filter(routine => routine.category === category);
};

// Función para obtener una rutina por ID
export const getRoutineById = (id: string) => {
  return PRESET_ROUTINES.find(routine => routine.id === id);
};

// Función para obtener nombres de rutinas para autocompletado
export const getPresetRoutineNames = () => {
  return PRESET_ROUTINES.map(routine => routine.name);
};
