from .views import weather, forecast
from django.urls import path

urlpatterns = [
    path('weather/', weather, name='weather'),
    path('forecast/', forecast, name='forecast')
]