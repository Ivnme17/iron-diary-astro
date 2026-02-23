from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import Exercise, Workout, Stats
from typing import List

app = FastAPI(
    title="Iron Diary API",
    description="API backend para la demo de Iron Diary — Diario de entrenamiento personal",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4321", "http://127.0.0.1:4321"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Datos de ejemplo ────────────────────────────────────────────────────────
DEMO_WORKOUTS: List[Workout] = [
    Workout(
        id="1",
        date="2025-02-20",
        routine_name="Push Day",
        exercises=[
            Exercise(id="e1", name="Press Banca", sets=4, reps=8, weight=80),
            Exercise(id="e2", name="Press Inclinado Mancuernas", sets=3, reps=10, weight=22),
            Exercise(id="e3", name="Fondos en Paralelas", sets=3, reps=12, weight=0),
            Exercise(id="e4", name="Extensión Tríceps Polea", sets=3, reps=15, weight=25),
        ],
    ),
    Workout(
        id="2",
        date="2025-02-18",
        routine_name="Pull Day",
        exercises=[
            Exercise(id="e5", name="Peso Muerto", sets=4, reps=5, weight=120),
            Exercise(id="e6", name="Dominadas", sets=3, reps=8, weight=0),
            Exercise(id="e7", name="Remo con Barra", sets=3, reps=10, weight=60),
            Exercise(id="e8", name="Curl Bíceps Mancuernas", sets=3, reps=12, weight=14),
        ],
    ),
    Workout(
        id="3",
        date="2025-02-16",
        routine_name="Leg Day",
        exercises=[
            Exercise(id="e9", name="Sentadilla Trasera", sets=5, reps=5, weight=100),
            Exercise(id="e10", name="Prensa de Piernas", sets=3, reps=12, weight=150),
            Exercise(id="e11", name="Curl Femoral", sets=3, reps=12, weight=40),
            Exercise(id="e12", name="Elevación de Gemelos", sets=4, reps=20, weight=60),
        ],
    ),
    Workout(
        id="4",
        date="2025-02-14",
        routine_name="Full Body",
        exercises=[
            Exercise(id="e13", name="Sentadilla Goblet", sets=3, reps=15, weight=24),
            Exercise(id="e14", name="Press Militar", sets=4, reps=8, weight=50),
            Exercise(id="e15", name="Hip Thrust", sets=3, reps=12, weight=80),
        ],
    ),
    Workout(
        id="5",
        date="2025-02-12",
        routine_name="Push Day",
        exercises=[
            Exercise(id="e16", name="Press Banca", sets=4, reps=8, weight=77.5),
            Exercise(id="e17", name="Aperturas Cable", sets=3, reps=15, weight=12),
            Exercise(id="e18", name="Press Arnold", sets=3, reps=10, weight=18),
            Exercise(id="e19", name="Tríceps Cuerda", sets=4, reps=12, weight=22),
        ],
    ),
    Workout(
        id="6",
        date="2025-02-10",
        routine_name="Pull Day",
        exercises=[
            Exercise(id="e20", name="Peso Muerto Rumano", sets=4, reps=8, weight=90),
            Exercise(id="e21", name="Jalón Polea Alta", sets=4, reps=10, weight=65),
            Exercise(id="e22", name="Encogimientos Trapecio", sets=3, reps=15, weight=30),
        ],
    ),
]


# ─── Endpoints ───────────────────────────────────────────────────────────────

@app.get("/", tags=["Root"])
def root():
    return {"message": "Iron Diary API — Demo", "docs": "/docs"}


@app.get("/api/workouts", response_model=List[Workout], tags=["Workouts"])
def get_workouts():
    """Devuelve todos los entrenamientos de ejemplo."""
    return DEMO_WORKOUTS


@app.get("/api/workouts/{workout_id}", response_model=Workout, tags=["Workouts"])
def get_workout(workout_id: str):
    """Devuelve un entrenamiento por su ID."""
    workout = next((w for w in DEMO_WORKOUTS if w.id == workout_id), None)
    if not workout:
        raise HTTPException(status_code=404, detail="Entrenamiento no encontrado")
    return workout


@app.get("/api/stats", response_model=Stats, tags=["Stats"])
def get_stats():
    """Devuelve estadísticas agregadas de los entrenamientos."""
    total_workouts = len(DEMO_WORKOUTS)
    all_exercises = [ex for w in DEMO_WORKOUTS for ex in w.exercises]
    total_exercises = len(all_exercises)
    total_kg = round(
        sum(ex.weight * ex.sets * ex.reps for ex in all_exercises) / 1000
    )
    return Stats(
        total_workouts=total_workouts,
        total_exercises=total_exercises,
        total_kg=total_kg,
    )
