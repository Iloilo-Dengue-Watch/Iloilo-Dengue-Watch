import pandas as pd
import os
from datetime import datetime


def clean_openweather_data(file_path: str) -> bool:
    """
    This function reads a JSONL file containing weather data from OpenWeatherMap,
    cleans the data, and saves it to a CSV file.

    Parameters:
    file_path (str): The path to the JSONL file containing weather data.

    Returns:
    bool: True if the cleaning process is successful, False otherwise.
    """
    columns = ['dt', 'temp', 'pressure', 'humidity', 'rain']  # relevant columns for our analysis
    if not os.path.exists('data/openweather'):
        os.makedirs('data/openweather')
    with open('data/openweather/weather_data.csv', 'w') as file:
        file.write(','.join(columns) + '\n')
    with open(file_path, 'r') as file:
        for line in file:
            data = eval(line)
            dt = datetime.fromtimestamp(data['dt']).strftime('%Y-%m-%d')
            temp = round(data['temp'] - 273.15, 2)  # convert temperature from Kelvin to Celsius
            pressure = data['pressure']
            humidity = data['humidity']
            try:
                rain = data.get('rain', 0)['1h'] if 'rain' in data.keys() else 0
            except KeyError:
                rain = 0
            with open('data/openweather/weather_data.csv', 'a') as file2:
                file2.write(f"{dt},{temp},{pressure},{humidity},{rain}\n")
    print(f"Cleaned weather data saved to 'data/openweather/weather_data.csv'")
    return True

def clean_openweather_data_summary(file_path):
    columns = ["date", "precipitation", "max_temp", "min_temp"]
    with open("data/openweather/weather_data_summary.csv", "w") as file:
        file.write(",".join(columns) + "\n")
    with open(file_path, "r") as file:
        for line in file:
            data = eval(line)
            date = data["date"]
            precipitation = list(data.get("precipitation", 0).values())[0] # check weather_data_summary.jsonl format
            temperature = data.get("temperature", 0) # check weather_data_summary.jsonl format
            max_temp = temperature["max"]
            min_temp = temperature["min"]
            with open("data/openweather/weather_data_summary.csv", "a") as file2:
                file2.write(f"{date},{precipitation},{max_temp},{min_temp}\n")
    print("Cleaned weather data summary saved to 'data/openweather/weather_data_summary.csv'")
    return True


if __name__ == "__main__":
    clean_openweather_data("weather_data.jsonl")
    clean_openweather_data_summary("weather_data_summary.jsonl")