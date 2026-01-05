from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from openai import OpenAI
import os
import json
import re

from movies import MOVIES  # 👈 import curated list

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

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

@app.get("/")
def home():
    return {"message": "Backend running successfully"}

@app.post("/ai/mood")
def mood_recommendation(data: dict):
    mood_text = data.get("mood")

    if not mood_text:
        raise HTTPException(status_code=400, detail="Mood is required")

    # AI → mood → genres
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

    raw = response.output_text.strip()

    match = re.search(r"\{.*\}", raw, re.DOTALL)
    if not match:
        raise HTTPException(status_code=500, detail="Invalid AI response")

    parsed = json.loads(match.group())

    genres = parsed.get("genres", [])
    label = parsed.get("label", "Recommended for you")

    # 🎯 Filter curated movies
    filtered_movies = []
    for movie in MOVIES:
        if any(g in movie["genres"] for g in genres):
            filtered_movies.append({
                "id": movie["id"],
                "title": movie["title"],
                "youtubeId": movie["youtubeId"],
                "poster": f"https://img.youtube.com/vi/{movie['youtubeId']}/hqdefault.jpg"
            })

    return {
        "label": label,
        "results": filtered_movies
    }
