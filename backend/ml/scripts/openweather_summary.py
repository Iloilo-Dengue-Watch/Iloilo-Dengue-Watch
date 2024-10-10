import dotenv
import os
import datetime
dotenv.load_dotenv()
import requests
API_KEY = os.getenv("OPENWEATHER_API_KEY")

def get_weather_data(lat="10.72015", long="122.562106"):
    #get current date and time in unix format
    date_time = int(datetime.datetime.now().timestamp())
    date_time = datetime.datetime.fromtimestamp(date_time).strftime('%Y-%m-%d')
    url = f"https://api.openweathermap.org/data/3.0/onecall/day_summary?lat={lat}&lon={long}&date={date_time}&appid={API_KEY}"
    response = requests.get(url).json()
    print(response)
    humidity = response["humidity"]['afternoon']
    temp = response["temperature"]['afternoon']
    precipitation = response["precipitation"]['total']
    resp = {
        "humidity": humidity,
        "temperature": temp,
        "precipitation": precipitation
    }
    return resp
