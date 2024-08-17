from dotenv import load_dotenv
import os
import requests
from utils import convert_single_to_double_quotes
from datetime import datetime
# Load environment variables from .env file
load_dotenv()

API_KEY = os.getenv("OPENWEATHER_API_KEY")


def get_weather_data(date_time, lat="10.72015", long="122.562106"):
    """
    Retrieves historical weather data from the OpenWeatherMap API.

    Args:
        unix_time (int): The date and time in Unix time format for which to retrieve weather data.
        lat (str, optional): The latitude of the location for which to retrieve weather data. Defaults to "10.72015".
        long (str, optional): The longitude of the location for which to retrieve weather data. Defaults to "122.562106".

    Returns:
        dict: The JSON response from the OpenWeatherMap API containing the historical weather data.
    """
    url = f"https://api.openweathermap.org/data/3.0/onecall/day_summary?lat={lat}&lon={long}&date={date_time}&appid={API_KEY}"
    response = requests.get(url).json()
    print(response)
    if 'cod' in response.keys():
        convert_single_to_double_quotes("weather_data_summary.jsonl")
        raise Exception(f"Error: {response['message']}")
    return response


def weather_to_jsonl(date_time):

    weather_data = get_weather_data(date_time)
    with open("weather_data_summary.jsonl", "a") as file:
        file.write(str(weather_data) + "\n")


def main():
    """
    The main function of the script. It retrieves historical weather data from the OpenWeatherMap API,
    converts it into a JSONL format, and saves it to a file. If the file does not exist, it creates it.

    Parameters:
    None

    Returns:
    None
    """
    
    last_datetime = 1293811200  # 1st January 2011
    now_datetime = int(datetime.now().timestamp())
    try:
        with open("weather_data_summary.jsonl", "r") as file:
            # check the last row and datetime
            last_line = file.readlines()[-1]
            last_line_dict = eval(last_line)
            last_datetime = last_line_dict["date"]
            last_datetime = int(datetime.strptime(last_datetime, "%Y-%m-%d").timestamp())
            print(last_datetime)
    except FileNotFoundError:
        #create the file if it doesn't exist
        with open("weather_data_summary.jsonl", "w") as file:
            pass

    for i in range(last_datetime, now_datetime, 86400):
        date = datetime.utcfromtimestamp(i).strftime('%Y-%m-%d')
        weather_to_jsonl(date)


main()