import requests
import os
from dotenv import load_dotenv

load_dotenv()

key = os.getenv("TMDB_KEY")
print("USING KEY:", key)

url = f"https://api.themoviedb.org/3/discover/movie?api_key={key}&with_genres=35"

r = requests.get(url)
print("STATUS:", r.status_code)
print("BODY:", r.text[:400])
