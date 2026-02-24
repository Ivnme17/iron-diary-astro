from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import Optional
import sqlite3, os, re

app = FastAPI(title="ironTV API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

DB = "irontv.db"

def get_db():
    conn = sqlite3.connect(DB)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS videos (
            id         INTEGER PRIMARY KEY AUTOINCREMENT,
            yt_id      TEXT NOT NULL,
            title      TEXT NOT NULL,
            author     TEXT NOT NULL DEFAULT 'ironTV',
            category   TEXT NOT NULL DEFAULT 'hiit',
            duration   TEXT,
            likes      INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)
    count = conn.execute("SELECT COUNT(*) FROM videos").fetchone()[0]
    if count == 0:
        seeds = [
            ("wKIrmBgJPMk", "Full Body HIIT — Sin equipo",       "MadFit",          "hiit",      "20 min", 847),
            ("UBMk30rjy0o", "Rutina de Fuerza — Tren superior",  "Jeff Nippard",    "fuerza",    "30 min", 1203),
            ("ml6cT4AZdqI", "Cardio quema grasa — 15 min",       "Sydney Cummings", "cardio",    "15 min", 634),
            ("j0HtW0lRUl0", "Movilidad y flexibilidad completa", "Tom Merrick",     "movilidad", "25 min", 421),
            ("ixkQi2n_7AA", "Nutrición para ganar músculo",      "Mike Israetel",   "nutricion", "18 min", 982),
        ]
        conn.executemany(
            "INSERT INTO videos (yt_id,title,author,category,duration,likes) VALUES (?,?,?,?,?,?)",
            seeds
        )
    conn.commit()
    conn.close()

init_db()

class VideoCreate(BaseModel):
    yt_id:    str
    title:    str
    author:   Optional[str] = "ironTV"
    category: Optional[str] = "hiit"
    duration: Optional[str] = None

class VideoLike(BaseModel):
    delta: int  # +1 o -1

def extract_yt_id(url: str) -> Optional[str]:
    for p in [r"(?:v=|youtu\.be/|embed/)([A-Za-z0-9_-]{11})", r"^([A-Za-z0-9_-]{11})$"]:
        m = re.search(p, url)
        if m: return m.group(1)
    return None

def row_to_dict(row):
    d = dict(row)
    d["thumb"] = f"https://img.youtube.com/vi/{d['yt_id']}/mqdefault.jpg"
    return d

@app.get("/api/videos")
def list_videos(category: Optional[str] = None):
    conn = get_db()
    if category and category != "all":
        rows = conn.execute("SELECT * FROM videos WHERE category=? ORDER BY created_at DESC", (category,)).fetchall()
    else:
        rows = conn.execute("SELECT * FROM videos ORDER BY created_at DESC").fetchall()
    conn.close()
    return [row_to_dict(r) for r in rows]

@app.post("/api/videos", status_code=201)
def create_video(data: VideoCreate):
    yt_id = extract_yt_id(data.yt_id)
    if not yt_id:
        raise HTTPException(400, "URL o ID de YouTube no válido")
    conn = get_db()
    cur = conn.execute(
        "INSERT INTO videos (yt_id,title,author,category,duration) VALUES (?,?,?,?,?)",
        (yt_id, data.title, data.author, data.category, data.duration)
    )
    conn.commit()
    row = conn.execute("SELECT * FROM videos WHERE id=?", (cur.lastrowid,)).fetchone()
    conn.close()
    return row_to_dict(row)

@app.patch("/api/videos/{video_id}/like")
def like_video(video_id: int, body: VideoLike):
    conn = get_db()
    video = conn.execute("SELECT * FROM videos WHERE id=?", (video_id,)).fetchone()
    if not video:
        raise HTTPException(404, "Video no encontrado")
    new_likes = max(0, video["likes"] + body.delta)
    conn.execute("UPDATE videos SET likes=? WHERE id=?", (new_likes, video_id))
    conn.commit()
    row = conn.execute("SELECT * FROM videos WHERE id=?", (video_id,)).fetchone()
    conn.close()
    return row_to_dict(row)

@app.delete("/api/videos/{video_id}", status_code=204)
def delete_video(video_id: int):
    conn = get_db()
    conn.execute("DELETE FROM videos WHERE id=?", (video_id,))
    conn.commit()
    conn.close()

if os.path.exists("static"):
    app.mount("/", StaticFiles(directory="static", html=True), name="static")
