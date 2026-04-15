from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os
from openai import OpenAI

# Load env
load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

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
async def mood_classifier(data: MoodInput):
    mood = data.mood

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",  # or any available model
            messages=[
                {
                    "role": "system",
                    "content": "You are a movie recommendation assistant."
                },
                {
                    "role": "user",
                    "content": f"Suggest 5 movie genres or types for this mood: {mood}"
                }
            ]
        )

        result = response.choices[0].message.content

        return {
            "recommendations": result
        }

    except Exception as e:
        return {"error": str(e)}