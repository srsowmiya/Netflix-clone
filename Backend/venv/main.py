from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request schema
class MoodInput(BaseModel):
    mood: str


@app.get("/")
def home():
    return {
        "status": "Backend running"
    }


@app.post("/ai/mood")
async def mood_classifier(data: MoodInput):

    mood = data.mood.lower()

    recommendations = {
        "happy": [
            "Zootopia",
            "La La Land",
            "The Secret Life of Walter Mitty",
            "Inside Out",
            "Frozen"
        ],

        "sad": [
            "Soul",
            "The Pursuit of Happyness",
            "Good Will Hunting",
            "A Beautiful Mind",
            "Inside Out"
        ],

        "excited": [
            "Avengers Endgame",
            "John Wick",
            "Mad Max: Fury Road",
            "Interstellar",
            "Top Gun Maverick"
        ],

        "romantic": [
            "Titanic",
            "The Notebook",
            "La La Land",
            "Me Before You",
            "Pride and Prejudice"
        ],

        "stressed": [
            "Soul",
            "Kung Fu Panda",
            "The Secret Life of Walter Mitty",
            "Up",
            "Ratatouille"
        ],

        "bored": [
            "Inception",
            "Interstellar",
            "The Dark Knight",
            "Ready Player One",
            "Shutter Island"
        ]
    }

    return {
        "mood": mood,
        "recommendations": recommendations.get(
            mood,
            [
                "Inception",
                "Interstellar",
                "The Dark Knight"
            ]
        )
    }