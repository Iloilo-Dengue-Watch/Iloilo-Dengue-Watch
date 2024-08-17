import requests
import os
from dotenv import load_dotenv
import datetime
load_dotenv()

API_KEY = os.getenv("NEWS_API_KEY")

# get yesterday's date
yesterday = datetime.datetime.now() - datetime.timedelta(days=1)
y_m_d = yesterday.strftime("%Y-%m-%d")

def get_news():
    url = f"https://newsapi.org/v2/everything?q=IloiloCityDengueCases&from={y_m_d}&sortBy=publishedAt&apiKey={API_KEY}"
    response = requests.get(url)
    data = response.json()
    print(data)
    articles = data["articles"]
    for article in articles:
        print(article["title"])
        print(article["description"])
        print(article["url"])
        print("\n")

get_news()