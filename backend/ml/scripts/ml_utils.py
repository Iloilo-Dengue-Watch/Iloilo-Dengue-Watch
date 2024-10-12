import os
import prophet
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib

# Use 'Agg' backend to avoid GUI issues
matplotlib.use('Agg')

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
    prediction = forecast[~df_with_future['ds'].isin(df_weekly['ds'])]

    date = list(prediction['ds'].dt.date)
    y = list(map(int, prediction['yhat']))
    prediction = {'date': date, 'y': y}

    forecast_2024 = forecast[forecast['ds'].dt.year == 2024]
    actual_2024 = df_with_future[df_with_future['ds'].dt.year == 2024].iloc[:-4]

    fig, ax = plt.subplots(figsize=(10, 6))
    ax.plot(forecast_2024['ds'], forecast_2024['yhat'], label='Forecast')
    ax.scatter(actual_2024['ds'], actual_2024['y'], label='Actual', color='black')
    ax.fill_between(forecast_2024['ds'], forecast_2024['yhat_lower'], forecast_2024['yhat_upper'], color='blue', alpha=0.5, label='Uncertainty Interval')
    ax.set_title('Forecast for 2024')
    ax.set_xlabel('Date')
    ax.set_ylabel('Forecasted Value')

    fig2, ax2 = plt.subplots(figsize=(10, 6))
    ax2.plot(forecast_2024['ds'], forecast_2024['yhat'], label='Forecast')
    ax2.fill_between(forecast_2024['ds'], forecast_2024['yhat_lower'], forecast_2024['yhat_upper'], color='blue', alpha=0.5, label='Uncertainty Interval')
    warning = {}
    for i in range(len(actual_2024)):
        try:
            if actual_2024['y'].iloc[i] > forecast_2024['yhat_upper'].iloc[i]:
                y_dict = {'y': actual_2024['y'].iloc[i], 'yhat': forecast_2024['yhat'].iloc[i], 'yhat_lower': forecast_2024['yhat_lower'].iloc[i], 'yhat_upper': forecast_2024['yhat_upper'].iloc[i]}
                warning[str(actual_2024['ds'].iloc[i])] = y_dict
                ax2.scatter(actual_2024['ds'].iloc[i], actual_2024['y'].iloc[i], color='red')
            else:
                ax2.scatter(actual_2024['ds'].iloc[i], actual_2024['y'].iloc[i], color='green')
        except:
            continue

    ax.legend()
    ax2.legend()

    # Close figures to prevent memory issues in non-interactive environments
    plt.close(fig)
    plt.close(fig2)

    return fig, fig2, prediction, warning
