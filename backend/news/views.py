from django.shortcuts import render
from django.http import JsonResponse
from .models import News
import serpapi
import openai

def index(request):
    # get the date in request
    date = request.GET.get('date')
    # filter news by date
    news_list = News.objects.filter(published_date=date)
    # if no news found,
    # serialize news objects to json format
    news_json = [news.serialize() for news in news_list]
    # return the json response
    return JsonResponse(news_json, safe=False)