from pydantic import BaseModel
from typing import List


class Exercise(BaseModel):
    id: str
    name: str
    sets: int
    reps: int
    weight: float


class Workout(BaseModel):
    id: str
    date: str
    routine_name: str
    exercises: List[Exercise]


class Stats(BaseModel):
    total_workouts: int
    total_exercises: int
    total_kg: int
