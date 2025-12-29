from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from openai import OpenAI
import requests
import os
import json
import re

# Load environment variables
load_dotenv()

TMDB_KEY = os.getenv("TMDB_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not TMDB_KEY or not OPENAI_API_KEY:
    raise RuntimeError("TMDB_KEY or OPENAI_API_KEY missing")

client = OpenAI(api_key=OPENAI_API_KEY)

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

# TMDB genre name → ID mapping
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

@app.get("/")
def home():
    return {"message": "Backend running successfully"}

@app.post("/ai/mood")
def mood_recommendation(data: dict):
    try:
        mood_text = data.get("mood")
        if not mood_text:
            raise HTTPException(status_code=400, detail="Mood is required")

        prompt = f"""
Return ONLY valid JSON. No explanation. No markdown.

Mood: "{mood_text}"

Format:
{{
  "genres": ["Comedy"],
  "label": "Comedy picks for you"
}}
"""

        # ---- OpenAI call ----
        response = client.responses.create(
            model="gpt-5.1",
            input=prompt
        )

        # SAFELY extract text
        raw_text = ""
        for item in response.output:
            if item["type"] == "message":
                for c in item["content"]:
                    if c["type"] == "output_text":
                        raw_text += c["text"]

        raw_text = raw_text.strip()
        print("AI RAW RESPONSE:\n", raw_text)

        # Extract JSON only
        match = re.search(r"\{.*\}", raw_text, re.DOTALL)
        if not match:
            raise HTTPException(status_code=500, detail="AI did not return JSON")

        parsed = json.loads(match.group())

        genres = parsed.get("genres", [])
        label = parsed.get("label", "Recommended for you")

        # Convert genre names → IDs
        genre_ids = []
        for g in genres:
            g_clean = g.strip().title()
            if g_clean in GENRE_MAP:
                genre_ids.append(str(GENRE_MAP[g_clean]))

        if not genre_ids:
            return {
                "label": label,
                "genres": genres,
                "results": []
            }

        tmdb_url = (
            "https://api.themoviedb.org/3/discover/movie"
            f"?api_key={TMDB_KEY}"
            f"&with_genres={','.join(genre_ids)}"
        )

        tmdb_res = requests.get(tmdb_url).json()

        return {
            "label": label,
            "genres": genres,
            "results": tmdb_res.get("results", [])
        }

    except HTTPException:
        raise
    except Exception as e:
        print("BACKEND ERROR:", e)
        raise HTTPException(status_code=500, detail=str(e))
