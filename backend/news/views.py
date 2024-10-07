from django.shortcuts import render
from django.http import JsonResponse
from .models import News
from .scripts.get_news import search_articles
def index(request):
    # get the date in request
    date = request.GET.get('date')
    # filter news by date
    news_results = search_articles(date)
    # serialize news objects to json format
    news_json = list(news_results.values())
    print(news_json)
    # return the json response
    return JsonResponse(news_json, safe=False)