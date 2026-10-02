import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("WEATHER_API_KEY")

API_URL = "https://api.openweathermap.org/data/2.5/weather"

city = input("Enter city: ")

params = {
    "q": city,
    "appid": API_KEY,
    "units": "metric"
}

def display_weather(data):
    print("City:", data["name"])
    print("Temperature:", data["main"]["temp"], "°C")
    print("Feels like:", data["main"]["feels_like"], "°C")
    print("Humidity:", data["main"]["humidity"], "%")
    print("Condition:", data["weather"][0]["main"])
    print("Description:", data["weather"][0]["description"])
    print("Wind speed:", data["wind"]["speed"], "m/s")

try:
    response = requests.get(API_URL, params=params, timeout=10)

    if response.status_code == 200:
        data = response.json()
        display_weather(data)


    elif response.status_code == 404:
        print("City not found.")

    elif response.status_code == 401:
        print("Invalid API key.")

    else:
        print("Something went wrong.")
        print("Status code:", response.status_code)

except requests.exceptions.Timeout:
    print("Request timed out. Please try again.")

except requests.exceptions.ConnectionError:
    print("Could not connect to the server. Check your internet connection.")

except requests.exceptions.RequestException as error:
    print("An error occurred:", error)