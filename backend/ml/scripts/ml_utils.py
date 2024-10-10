import os
import prophet
import pandas as pd

# Define the base path relative to the script's location
base_path = os.path.abspath(os.path.dirname(__file__))
df_with_future_path = os.path.join(base_path, 'data', 'data_with_future.csv')
df_weekly_path = os.path.join(base_path, 'data', 'df_merged_weekly.csv')

# Read the CSV files using the absolute paths
df_with_future = pd.read_csv(df_with_future_path)
df_weekly = pd.read_csv(df_weekly_path)

def train_prophet_model():
    model = prophet.Prophet()
    df_weekly['ds'] = pd.to_datetime(df_weekly['ds'])
    df_with_future['ds'] = pd.to_datetime(df_with_future['ds'])
    regressors = ['temp', 'humidity', 'precipitation', 'feels_like', 'pressure']
    print(df_weekly.isnull().sum())
    for regressor in regressors:
        model.add_regressor(regressor)
    model.fit(df_weekly)
    future = model.make_future_dataframe(periods=4, freq='W')
    for regressor in regressors:
        future[regressor] = df_with_future[regressor]
    forecast = model.predict(future)
    fig = model.plot(forecast, xlabel='Date', ylabel='Cases', include_legend=True, figsize=(12, 6))
    prediction = forecast[~df_with_future['ds'].isin(df_weekly['ds'])]
    print(prediction)
    date = list(prediction['ds'].dt.date)
    y = list(prediction['yhat'])
    prediction = {'date': date, 'y': y}
    return fig, prediction