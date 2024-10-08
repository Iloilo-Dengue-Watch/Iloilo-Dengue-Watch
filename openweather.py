from dotenv import load_dotenv
import os
import requests
from utils import convert_single_to_double_quotes
import datetime
import pytz
# Load environment variables from .env file
load_dotenv()

API_KEY = os.getenv("OPENWEATHER_API_KEY")


def get_weather_data(unix_time, lat="10.72015", long="122.562106"):
    """
    Retrieves historical weather data from the OpenWeatherMap API.

    Args:
        unix_time (int): The date and time in Unix time format for which to retrieve weather data.
        lat (str, optional): The latitude of the location for which to retrieve weather data. Defaults to "10.72015".
        long (str, optional): The longitude of the location for which to retrieve weather data. Defaults to "122.562106".

    Returns:
        dict: The JSON response from the OpenWeatherMap API containing the historical weather data.
    """
    url = f"https://api.openweathermap.org/data/3.0/onecall/timemachine?lat={lat}&lon={long}&dt={unix_time}&appid={API_KEY}"
    response = requests.get(url).json()
    print(response)
    if 'cod' in response.keys():
        convert_single_to_double_quotes("weather_data_new.jsonl")
        raise Exception(f"Error: {response['message']}")
    data = response['data'][0]
    return data


def weather_to_jsonl(unix_time):
    """
    Converts the weather data retrieved from the OpenWeatherMap API into a JSONL format and saves it to a file.

    Args:
        unix_time (int): The Unix timestamp representing the date and time for which the weather data is retrieved.

    Returns:
        None
    """
    weather_data = get_weather_data(unix_time)
    with open("weather_data_new.jsonl", "a") as file:
        file.write(str(weather_data) + "\n")


def main():
    """
    The main function that controls the flow of the program.

    It starts by initializing the last datetime to January 1st, 2011.
    It then attempts to open the weather_data.jsonl file and read the last line to get the last datetime.
    If the file does not exist, it creates a new file.

    After that, it loops through each day from the last datetime to a specified end datetime,
    calling the weather_to_jsonl function for each day.

    Parameters:
        None

    Returns:
        None
    """
    manila_tz = pytz.timezone("Asia/Manila")
    manila_time = manila_tz.localize(datetime.datetime(2022,1,1,15,0,0))
    last_datetime = int(manila_time.timestamp())
    date_time_now = int(manila_tz.localize(datetime.datetime.now()).timestamp())
    try:
        with open("weather_data_new.jsonl", "r") as file:
            # check the last row and datetime
            last_line = file.readlines()[-1]
            last_line_dict = eval(last_line)
            last_datetime = last_line_dict["dt"]
    except FileNotFoundError:
        #create the file if it doesn't exist
        with open("weather_data_new.jsonl", "w") as file:
            pass
    for i in range(last_datetime, date_time_now, 86400):
        weather_to_jsonl(i)


main()
