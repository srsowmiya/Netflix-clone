from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from openai import OpenAI
import requests
import os
import json
import re

# ---------------- LOAD ENV ----------------
load_dotenv()

TMDB_KEY = os.getenv("TMDB_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

print("🔥 TMDB_KEY LOADED:", TMDB_KEY)

if not TMDB_KEY:
    raise RuntimeError("TMDB_KEY missing")

client = OpenAI(api_key=OPENAI_API_KEY) if OPENAI_API_KEY else None

# ---------------- APP ----------------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- TMDB GENRE MAP ----------------
GENRE_MAP = {
    "Action": 28,
    "Adventure": 12,
    "Animation": 16,
    "Comedy": 35,
    "Crime": 80,
    "Drama": 18,
    "Fantasy": 14,
    "Horror": 27,
    "Romance": 10749,
    "Sci-Fi": 878,
    "Thriller": 53,
}

# ---------------- FALLBACK MOOD MAP ----------------
FALLBACK_MOOD_MAP = {
    "happy": (["Comedy", "Adventure"], "Feel-good picks for you"),
    "sad": (["Drama", "Romance"], "Emotional picks for you"),
    "angry": (["Action", "Thriller"], "High-energy picks for you"),
    "romantic": (["Romance"], "Romantic picks for you"),
    "scared": (["Horror", "Thriller"], "Spooky picks for you"),
    "excited": (["Action", "Adventure"], "Exciting picks for you"),
}

# ---------------- ROUTES ----------------
@app.get("/")
def home():
    return {"message": "Backend running successfully"}

@app.post("/ai/mood")
def mood_recommendation(data: dict):
    mood_text = data.get("mood", "").lower().strip()

    if not mood_text:
        raise HTTPException(status_code=400, detail="Mood is required")

    genres = []
    label = "Recommended for you"

    # ---------- TRY OPENAI ----------
    if client:
        try:
            prompt = f"""
Return ONLY valid JSON.

Mood: "{mood_text}"

Format:
{{
  "genres": ["Comedy"],
  "label": "Comedy picks for you"
}}
"""

            response = client.responses.create(
                model="gpt-5.1",
                input=prompt
            )

            raw_text = ""

            for item in response.output:
                if item["type"] == "message":
                    for c in item["content"]:
                        if c["type"] == "output_text":
                            raw_text += c["text"]

            match = re.search(r"\{.*\}", raw_text, re.DOTALL)
            parsed = json.loads(match.group())

            genres = parsed.get("genres", [])
            label = parsed.get("label", label)

            print("✅ AI USED:", genres)

        except Exception as e:
            print("⚠️ OPENAI FAILED → FALLBACK:", e)

    # ---------- FALLBACK LOGIC ----------
    if not genres:
        for key in FALLBACK_MOOD_MAP:
            if key in mood_text:
                genres, label = FALLBACK_MOOD_MAP[key]
                break
        else:
            genres = ["Comedy"]
            label = "Popular picks for you"

        print("🟡 FALLBACK USED:", genres)

    # ---------- PICK PRIMARY GENRE (CRITICAL FIX) ----------
    primary_genre_id = None
    for g in genres:
        if g in GENRE_MAP:
            primary_genre_id = str(GENRE_MAP[g])
            break

    if not primary_genre_id:
        return {
            "label": label,
            "genres": genres,
            "results": []
        }

    # ---------- TMDB CALL (SAFE) ----------
    tmdb_url = (
        "https://api.themoviedb.org/3/discover/movie"
        f"?api_key={TMDB_KEY}"
        f"&with_genres={primary_genre_id}"
        f"&sort_by=popularity.desc"
    )

    try:
        tmdb_response = requests.get(tmdb_url, timeout=10)

        if tmdb_response.status_code != 200:
            print("TMDB ERROR:", tmdb_response.text)
            raise HTTPException(status_code=502, detail="TMDB service error")

        tmdb_res = tmdb_response.json()

    except Exception as e:
        print("TMDB REQUEST FAILED:", e)
        raise HTTPException(status_code=502, detail="Failed to fetch movies")

    return {
        "label": label,
        "genres": genres,
        "results": tmdb_res.get("results", [])
    }
