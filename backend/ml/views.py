from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from .scripts.openweather_summary import get_weather_data
from .scripts.ml_utils import train_prophet_model
import io
# Create your views here.
def weather(request):
    response = get_weather_data()
    return JsonResponse(response)

def forecast(request):
    fig, pred = train_prophet_model()
    buf = io.BytesIO()

    # Save the figure to the buffer in PNG format
    fig.savefig(buf, format='png')

    # Rewind the buffer's file pointer
    buf.seek(0)
    # request whether it is image or not
    if request.GET.get('image', ''):
        return HttpResponse(buf, content_type='image/png')
    if request.GET.get('data', ''):
        return JsonResponse(pred, safe=False)
    # Create an HTTP response with the image data
    return HttpResponse(buf, content_type='image/png')