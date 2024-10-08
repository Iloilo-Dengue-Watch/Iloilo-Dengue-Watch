import openai
from serpapi import GoogleSearch
import dotenv
import os
from django.utils import timezone
from datetime import datetime
from ..models import News
import logging

dotenv.load_dotenv()

SERP_KEY = os.getenv('SERP_KEY')
CHATGPT_KEY = os.getenv('CHATGPT_KEY')

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def search_articles(date_str):
    try:
        date = datetime.strptime(date_str, '%Y-%m-%d')
        date = timezone.make_aware(date, timezone.get_current_timezone())

        # Check if date exists in the News database
        news_list = News.objects.filter(date=date)
        if news_list:
            return news_list

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
        top_3_news = []

        for article in news_results:
            title = article.get("title", 'No title available')
            description = article.get("description", 'No description available')
            #if description == 'No description available':
            #    continue  # Ensure that there is always a description
            if article.get('position') > 3:
                break
            url = article.get("link", 'No URL available')
            source = article.get("source", 'No source available')
            source_name = source.get("name", 'No source name available')
            img_url = article.get("thumbnail", 'No thumbnail URL available')
            # Parse the date from the article
            article_date_str = article.get("date", 'No date available')
            article_date_str = article_date_str.replace(' UTC', '')  # Remove ' UTC'
            article_date = datetime.strptime(article_date_str, '%m/%d/%Y, %I:%M %p, %z')

            response = client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are web developer. Summarize the following article in the url."},
                    {"role": "user", "content": url}
                ]
            )
            summary_web = response.choices[0].message.content
            news_entry = News(
                date=date,
                published_date = article_date,
                title=title,
                description=description,
                source=source_name,
                img_url=img_url,
                chatgpt_summ_web=summary_web,
                chatgpt_summ_twitter=summary_web,  # You can change this if Twitter summary is different
                url = url
            )
            news_entry.save()
            top_3_news.append(news_entry)

        logger.info(f"Successfully added {len(top_3_news)} news articles to the database.")
        return top_3_news

    except Exception as e:
        logger.error(f"An error occurred: {e}")
        return []