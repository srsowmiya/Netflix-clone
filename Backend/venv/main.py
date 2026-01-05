from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not OPENAI_API_KEY:
    print("❌ OPENAI_API_KEY not found in environment")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MoodInput(BaseModel):
    mood: str

@app.get("/")
def home():
    return {"status": "Backend running"}

@app.post("/ai/mood")
def mood_classifier(data: MoodInput):
    """
    TEMP SIMPLE LOGIC (NO AI YET)
    This guarantees backend stability.
    """

    mood = data.mood.lower()

    if any(word in mood for word in ["happy", "excited", "fun"]):
        category = "happy"
    elif any(word in mood for word in ["sad", "lonely", "down"]):
        category = "sad"
    elif any(word in mood for word in ["angry", "intense"]):
        category = "excited"
    else:
        category = "relaxed"

    return {
        "category": category
    }
