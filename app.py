import os
import requests

from flask import Flask, render_template, request
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("WEATHER_API_KEY")

API_URL = "https://api.openweathermap.org/data/2.5/weather"

app = Flask(__name__)


# ==============================
# Dynamic Weather API Route
# ==============================

@app.route("/api/weather")
def api_weather():

    city = request.args.get("city")

    params = {
        "q": city,
        "appid": API_KEY,
        "units": "metric"
    }

    response = requests.get(
        API_URL,
        params=params,
        timeout=10
    )

    if response.status_code == 200:
        return response.json()

    elif response.status_code == 404:
        return {"error": "City not found."}, 404

    elif response.status_code == 401:
        return {"error": "Invalid API key."}, 401

    else:
        return {"error": "Something went wrong."}, 500


# ==============================
# Main Page Route
# ==============================

@app.route("/", methods=["GET", "POST"])
def home():

    if request.method == "POST":

        city = request.form["city"]

        params = {
            "q": city,
            "appid": API_KEY,
            "units": "metric"
        }

        response = requests.get(
            API_URL,
            params=params,
            timeout=10
        )

        if response.status_code == 200:

            data = response.json()

            return render_template(
                "index.html",
                weather=data
            )

        elif response.status_code == 404:

            return render_template(
                "index.html",
                error="City not found. Please enter a valid city."
            )

        elif response.status_code == 401:

            return render_template(
                "index.html",
                error="Invalid API key."
            )

        else:

            return render_template(
                "index.html",
                error="Something went wrong. Please try again."
            )

    return render_template("index.html")


# ==============================
# Run Flask
# ==============================

if __name__ == "__main__":
    app.run(debug=True)