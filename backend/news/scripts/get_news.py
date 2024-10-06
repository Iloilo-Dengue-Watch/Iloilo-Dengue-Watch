import openai
from serpapi import GoogleSearch
import dotenv
import os

dotenv.load_dotenv()

SERP_KEY = os.getenv('SERP_KEY')
CHATGPT_KEY = os.getenv('CHATGPT_KEY')

def search_articles(date):
    params = {
        "api_key": SERP_KEY,
        "engine": "google_news",
        "hl": "en",
        "gl": "ph",
        "q": "Dengue Philippines Iloilo City",
        "num": 3,
        "tbm": "nws",
        "as_qdr": "d5"
    }
    search = GoogleSearch(params)
    results = search.get_dict()
    news_results = results.get("news_results", [])
    client = openai.Client(api_key=CHATGPT_KEY)

    for article in news_results:
