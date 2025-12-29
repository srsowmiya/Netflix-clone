from dotenv import load_dotenv
import os

load_dotenv()

print("TMDB_KEY =", os.getenv("TMDB_KEY"))
print("OPENAI_API_KEY =", os.getenv("OPENAI_API_KEY"))
