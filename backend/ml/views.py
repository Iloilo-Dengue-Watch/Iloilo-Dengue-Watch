from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from .scripts.openweather_summary import get_weather_data
from .scripts.ml_utils import train_prophet_model
import io

def weather(request):
    response = get_weather_data()
    return JsonResponse(response)

def forecast(request):
    fig, fig2, pred, warning = train_prophet_model()
    buf = io.BytesIO()

    # Check if the request is asking for an image
    if request.GET.get('image', ''):
        image_type = request.GET.get('image')

        if image_type == 'forecast':
            # Save the forecast figure to the buffer in PNG format
            fig.savefig(buf, format='png')
            buf.seek(0)
            return HttpResponse(buf, content_type='image/png')

        elif image_type == 'warning':
            # Save the warning figure to the buffer in PNG format
            fig2.savefig(buf, format='png')
            buf.seek(0)
            return HttpResponse(buf, content_type='image/png')
    # Check if the request is asking for prediction data
    if request.GET.get('data', ''):
        data_type = request.GET.get('data')
        if data_type == 'prediction':

            return JsonResponse(pred, safe=False)
        elif data_type == 'warning':
            return JsonResponse(warning, safe=False)

    # Fallback: Return an empty response if no valid request parameter is provided
    return HttpResponse(status=400)
