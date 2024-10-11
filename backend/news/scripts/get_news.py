from datetime import datetime
from django.utils import timezone
from serpapi import GoogleSearch  # Ensure this is imported
import openai
import logging
from ..models import News
import dotenv
import os
# Configure logging
logger = logging.getLogger(__name__)
dotenv.load_dotenv()
CHATGPT_KEY = os.getenv('CHATGPT_KEY')
SERP_KEY = os.getenv('SERP_KEY')
def search_articles(date_str):
    try:
        # Get the current date and make it timezone-aware
        current_date = timezone.now().date()  # Get current date as a date object
        print(current_date)

        # Check if news articles exist for the current date
        news_list = News.objects.filter(date=current_date)
        if news_list.exists():  # Use exists() for better performance
            return news_list

        # Set up search parameters for Google News
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
        news_counter = 0
        for article in news_results:  # Limit to top 3 articles directly in the loop
            if news_counter >= 6:
                break
            title = article.get("title", 'No title available')
            description = article.get("description", 'No description available')
            url = article.get("link", 'No URL available')
            source = article.get("source", {}).get("name", 'No source name available')
            img_url = article.get("thumbnail", 'No thumbnail URL available')
            if img_url == 'No thumbnail URL available':
                continue
            # Parse the date from the article
            article_date_str = article.get("date", 'No date available').replace(' UTC', '')  # Remove ' UTC'
            try:
                article_date = datetime.strptime(article_date_str, '%m/%d/%Y, %I:%M %p, %z')  # Parsing the article date
            except ValueError as ve:
                logger.error(f"Date parsing error for article {title}: {ve}")
                continue  # Skip this article if the date cannot be parsed

            # Generate summary using ChatGPT
            try:
                response = client.chat.completions.create(
                    model="gpt-4",
                    messages=[
                        {"role": "system", "content": "You are a web developer. Summarize the following article in the url. Include vital statistics like number of dengue cases, etc."},
                        {"role": "user", "content": url}
                    ]
                )
                summary_web = response.choices[0].message.content
            except Exception as chatgpt_error:
                logger.error(f"ChatGPT error for article {title}: {chatgpt_error}")
                summary_web = "Summary not available."  # Fallback in case of error

            # Create a News entry and save it to the database
            news_entry = News(
                date=current_date,
                published_date=article_date,
                title=title,
                description=description,
                source=source,
                img_url=img_url,
                chatgpt_summ_web=summary_web,
                chatgpt_summ_twitter=summary_web,  # You can change this if Twitter summary is different
                url=url
            )
            news_entry.save()
            top_3_news.append(news_entry)
            news_counter += 1
        logger.info(f"Successfully added {len(top_3_news)} news articles to the database.")
        return top_3_news

    except Exception as e:
        logger.error(f"An error occurred in search_articles: {e}")
        return []
