from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import google.generativeai as genai
import os

# Load environment variables
load_dotenv()

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Gemini model
model = genai.GenerativeModel("gemini-2.5-flash")

# FastAPI app
app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request body
class MoodInput(BaseModel):
    mood: str

# Home route
@app.get("/")
def home():
    return {"status": "Backend running"}

# AI Mood Route
@app.post("/ai/mood")
async def mood_classifier(data: MoodInput):

    mood = data.mood

    try:

        prompt = f"""
        Classify the user's mood into ONLY ONE category.

        Possible categories:
        happy
        sad
        excited
        romantic
        angry
        emotional
        scared

        User mood:
        {mood}

        Return ONLY the category word.
        """

        response = model.generate_content(prompt)

        category = response.text.strip().lower()

        return {
            "category": category
        }

    except Exception as e:
        return {
            "error": str(e)
        }