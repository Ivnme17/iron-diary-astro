import { useState } from "react";
import { Calendar, Edit, ChevronDown, ChevronUp } from "lucide-react";

interface Exercise {
    id: string;
    name: string;
    sets: number;
    reps: number;
    weight: number;
}

interface Workout {
    id: string;
    fecha: string;
    nombre_rutina: string;
    ejercicios: Exercise[];
}

// Function to get emoji for routine names
function getRoutineEmoji(routineName: string): string {
    // Push Day variations
    if (routineName.includes('push') || routineName.includes('pecho') || routineName.includes('press') || routineName.includes('banc')) {
        return '💪';
    }
    
    // Pull Day variations
    if (routineName.includes('pull') || routineName.includes('espalda') || routineName.includes('dorsal') || routineName.includes('jalón')) {
        return '🎯';
    }
    
    // Leg Day variations
    if (routineName.includes('leg') || routineName.includes('pierna') || routineName.includes('cuádriceps') || routineName.includes('femoral') || routineName.includes('sentadilla')) {
        return '🦵';
    }
    
    // Full Body variations
    if (routineName.includes('full') || routineName.includes('completo') || routineName.includes('total')) {
        return '🏋️';
    }
    
    // Upper Body variations
    if (routineName.includes('upper') || routineName.includes('superior')) {
        return '💪';
    }
    
    // Lower Body variations
    if (routineName.includes('lower') || routineName.includes('inferior')) {
        return '🦵';
    }
    
    // Cardio variations
    if (routineName.includes('cardio') || routineName.includes('correr') || routineName.includes('carrera')) {
        return '🔥';
    }
    
    // HIIT variations
    if (routineName.includes('hiit') || routineName.includes('intenso')) {
        return '⚡';
    }
    
    // PPL variations
    if (routineName.includes('ppl') || routineName.includes('push/pull')) {
        return '📊';
    }
    
    // Bro Split variations
    if (routineName.includes('bro') || routineName.includes('split')) {
        return '💎';
    }
    
    // Default emoji
    return '🏋️';
}

export default function WorkoutCard({ workout, index }: { workout: Workout; index: number }) {
    const [expanded, setExpanded] = useState(false);
    const routineEmoji = getRoutineEmoji(workout.nombre_rutina);
    const cardStyle = {
        animationDelay: `${index * 80}ms`,
        animationFillMode: "both" as const,
    };
    const titleStyle = {
        fontFamily: "var(--font-display)",
    };

    return (
        <div
            className="animate-slide-up rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-lg"
            style={cardStyle}
        >
            <div className="mb-3 flex items-start justify-between">
                <div>
                    <h3 className="text-2xl text-foreground" style={titleStyle}>
                        {routineEmoji} {workout.nombre_rutina.toUpperCase()}
                    </h3>
                    <p className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(workout.fecha).toLocaleDateString("es-ES", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                        })}
                    </p>
                </div>
                <div className="flex gap-1">
                    <button
                        title={expanded ? "Colapsar" : "Expandir"}
                        onClick={() => setExpanded(!expanded)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    >
                        {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                    <a
                        href="/workout"
                        title="Editar entrenamiento"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    >
                        <Edit className="h-4 w-4" />
                    </a>
                </div>
            </div>

            <div className="space-y-1.5">
                {(expanded ? workout.ejercicios : workout.ejercicios.slice(0, 2)).map((ex) => (
                    <div
                        key={ex.id}
                        className="flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-2 text-sm"
                    >
                        <span className="font-medium text-foreground">{ex.name}</span>
                        <span className="text-muted-foreground">
                            {ex.sets}×{ex.reps} · {ex.weight > 0 ? `${ex.weight}kg` : "Peso corporal"}
                        </span>
                    </div>
                ))}
                {!expanded && workout.ejercicios.length > 2 && (
                    <button
                        onClick={() => setExpanded(true)}
                        className="w-full rounded-lg py-1 text-xs text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                    >
                        +{workout.ejercicios.length - 2} ejercicios más
                    </button>
                )}
            </div>
        </div>
    );
}
