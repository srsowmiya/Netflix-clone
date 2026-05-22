from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv
import os
import json

load_dotenv()

app = FastAPI(title="Netflix Clone — AI Mood Recommender")

# Allow frontend dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-2.0-flash")


class MoodRequest(BaseModel):
    mood: str


class MoodResponse(BaseModel):
    mood: str
    recommendations: list[str]


@app.post("/ai/mood", response_model=MoodResponse)
async def recommend_by_mood(req: MoodRequest):
    mood = req.mood.strip()
    if not mood:
        raise HTTPException(status_code=400, detail="Mood cannot be empty")

    prompt = (
        f'The user is feeling "{mood}". '
        "Recommend exactly 8 movies that match this mood. "
        "Pick well-known, popular movies that people would genuinely enjoy. "
        "Return ONLY a valid JSON array of movie title strings, no markdown, no explanation. "
        'Example: ["Movie One", "Movie Two", "Movie Three"]'
    )

    try:
        response = model.generate_content(prompt)
        raw = response.text.strip()

        # Clean markdown fences if the model wraps them
        if raw.startswith("```"):
            raw = raw.split("\n", 1)[-1]  # remove first line (```json)
            raw = raw.rsplit("```", 1)[0]  # remove closing fence
            raw = raw.strip()

        movies = json.loads(raw)

        if not isinstance(movies, list):
            raise ValueError("LLM did not return a list")

        # Ensure all items are strings
        movies = [str(m) for m in movies]

        return MoodResponse(mood=mood, recommendations=movies)

    except json.JSONDecodeError:
        raise HTTPException(
            status_code=502,
            detail="Failed to parse LLM response as JSON",
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Gemini API error: {str(e)}",
        )


@app.get("/health")
async def health():
    return {"status": "ok"}
