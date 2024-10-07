from django.db import models

# Create your models here.
class WeatherData(models.Model):
    date = models.DateField(primary_key=True)
    temperature = models.FloatField()
    feels_like = models.FloatField()
    humidity = models.FloatField()


class DengueCases(models.Model):
    date = models.DateField(primary_key=True)
    week = models.IntegerField()
    cases = models.IntegerField()
