# 🌦️ WeatherNow

A modern, responsive weather web application built with **Python, Flask,
JavaScript, HTML, and CSS**. WeatherNow uses the **OpenWeather API** to
fetch current weather information for any city and displays it through a
clean, minimal dashboard.

The project was built incrementally to learn how APIs, Flask, JSON,
JavaScript `fetch()`, DOM manipulation, error handling, and responsive
frontend design work together.

------------------------------------------------------------------------

## ✨ Features

-   🔎 Search weather by city name
-   🌡️ Display current temperature
-   🌡️ Display "Feels Like" temperature
-   🔄 Switch between Celsius and Fahrenheit
-   💧 Display humidity
-   💨 Display wind speed
-   🧭 Convert wind degrees into compass directions
-   ◉ Display atmospheric pressure
-   🌤️ Display current weather condition and icon
-   ⚠️ In-page error messages for invalid cities/API errors
-   ⏳ Loading state while fetching weather data
-   🔄 Dynamic updates without refreshing the page
-   📱 Responsive design for desktop and mobile
-   🔐 API key stored securely using environment variables
-   🎨 Minimal dark UI with custom SVG weather-detail icons

------------------------------------------------------------------------

## 🛠️ Technologies Used

### Backend

-   **Python**
-   **Flask**
-   **Requests**
-   **python-dotenv**

### Frontend

-   **HTML5**
-   **CSS3**
-   **JavaScript**
-   **Fetch API**
-   **SVG icons**

### API

-   **OpenWeather API**

------------------------------------------------------------------------

## 📁 Project Structure

``` text
WeatherApp/
│
├── app.py
├── weather.py
├── requirements.txt
├── .env
├── .gitignore
│
├── templates/
│   └── index.html
│
└── static/
    ├── css/
    │   └── style.css
    │
    └── js/
        └── script.js
```

### File Description

  -----------------------------------------------------------------------
  File                                Purpose
  ----------------------------------- -----------------------------------
  `app.py`                            Flask application and API endpoint

  `weather.py`                        Python command-line weather/API
                                      learning implementation

  `requirements.txt`                  Python dependencies

  `.env`                              Stores the OpenWeather API key
                                      locally

  `.gitignore`                        Prevents `.env` and Python cache
                                      files from being committed

  `index.html`                        Main webpage and weather dashboard

  `style.css`                         UI design, layout, responsiveness,
                                      and animations

  `script.js`                         Dynamic weather search, DOM
                                      updates, loading state, errors, and
                                      unit conversion
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 🔑 API Key Setup

WeatherNow requires an OpenWeather API key.

Create a `.env` file in the project root:

``` env
WEATHER_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your own API key.

**Never upload your real API key to GitHub.**

The project loads the key through an environment variable:

``` python
from dotenv import load_dotenv
import os

load_dotenv()

API_KEY = os.getenv("WEATHER_API_KEY")
```

The `.env` file should remain inside `.gitignore`.

------------------------------------------------------------------------

## 📦 Installation

### 1. Clone the repository

``` bash
git clone https://github.com/YOUR-USERNAME/WeatherApp.git
```

Then move into the project directory:

``` bash
cd WeatherApp
```

> Replace `YOUR-USERNAME` with your GitHub username after uploading the
> project.

### 2. Create a virtual environment

``` bash
python -m venv venv
```

Activate it on Windows:

``` bash
venv\Scripts\activate
```

### 3. Install dependencies

``` bash
pip install -r requirements.txt
```

### 4. Create `.env`

Add:

``` env
WEATHER_API_KEY=your_api_key_here
```

### 5. Run the Flask application

``` bash
python app.py
```

The application will run locally at:

``` text
http://127.0.0.1:5000
```

Open that address in your browser.

------------------------------------------------------------------------

## 🌐 How It Works

The application follows this basic flow:

``` text
User enters city
       ↓
JavaScript captures the form
       ↓
fetch() sends request to Flask
       ↓
/api/weather?city=Mumbai
       ↓
Flask requests data from OpenWeather
       ↓
OpenWeather returns JSON
       ↓
Flask returns JSON to JavaScript
       ↓
JavaScript updates the webpage
```

The browser does not need to reload the entire page when a city is
searched.

------------------------------------------------------------------------

## 🔌 Flask API Endpoint

WeatherNow provides its own backend endpoint:

``` text
GET /api/weather?city=Mumbai
```

Example:

``` text
http://127.0.0.1:5000/api/weather?city=Mumbai
```

A successful response contains weather information returned by
OpenWeather.

The frontend uses JavaScript:

``` javascript
const response = await fetch(
    `/api/weather?city=${encodeURIComponent(city)}`
);

const data = await response.json();
```

The returned JSON is then used to update the weather card.

------------------------------------------------------------------------

## 📊 Weather Information Displayed

The application currently displays:

-   City name
-   Country code
-   Temperature
-   Feels Like temperature
-   Weather condition
-   Weather icon
-   Humidity
-   Wind speed
-   Wind direction
-   Atmospheric pressure

Temperature values can be switched between:

``` text
°C
```

and

``` text
°F
```

------------------------------------------------------------------------

## ⚠️ Error Handling

The application handles common API problems such as:

-   Invalid city
-   Invalid API key
-   Failed weather request
-   Connection/request errors

Instead of using browser popup alerts, errors are displayed directly
inside the application's interface.

Example:

``` text
⚠ City not found. Please enter a valid city.
```

------------------------------------------------------------------------

## 🎨 UI Design

WeatherNow uses a minimal dark interface designed around:

-   Charcoal backgrounds
-   Neutral gray typography
-   Subtle borders
-   Soft shadows
-   Responsive cards
-   Custom SVG icons
-   Small animations
-   Mobile-friendly layouts

The design intentionally avoids excessive colors and gradients to keep
the interface clean and professional.

------------------------------------------------------------------------

## 📱 Responsive Design

The application includes responsive CSS breakpoints for smaller screens.

On mobile devices:

-   The weather layout becomes vertically stacked
-   Weather details use a two-column layout
-   Search controls become more compact
-   Font sizes adjust automatically
-   Card spacing is reduced

------------------------------------------------------------------------

## 🧠 What I Learned

This project helped me understand how different parts of a web
application communicate with each other.

### Python

-   Making HTTP requests
-   Working with API responses
-   Reading JSON data
-   Handling request errors
-   Using environment variables

### Flask

-   Creating routes
-   Handling requests
-   Returning JSON responses
-   Connecting frontend requests to backend logic

### JavaScript

-   `fetch()`
-   Async/await
-   DOM manipulation
-   Event listeners
-   Dynamic UI updates
-   Error handling

### HTML & CSS

-   Forms
-   Responsive layouts
-   CSS Grid and Flexbox
-   Animations
-   Custom SVG icons
-   UI styling

------------------------------------------------------------------------

## 🚀 Possible Future Improvements

The current version intentionally focuses on current weather and a clean
user experience.

Possible future additions include:

-   Weather-specific background effects
-   Recent search history
-   Geolocation-based weather
-   Forecast information
-   Sunrise and sunset times
-   Visibility information
-   More detailed weather statistics
-   Improved accessibility
-   Additional UI animations

------------------------------------------------------------------------

## 🔐 Security Notes

-   The OpenWeather API key is stored in `.env`.
-   `.env` should never be committed to GitHub.
-   Do not place the API key directly inside JavaScript or HTML.
-   If an API key is accidentally exposed publicly, revoke or rotate it.

------------------------------------------------------------------------

## 📄 License

This project is intended as a learning and portfolio project.

If you reuse or modify the project, you are encouraged to add your own
improvements and attribution where appropriate.

------------------------------------------------------------------------

## 👨‍💻 Author

**Pritam Das**

Built as a Python/Flask API learning project.

------------------------------------------------------------------------

## ⭐ Project Status

**Version 1.0 --- Complete**

The current version provides a functional weather search application
with a Flask backend, OpenWeather integration, dynamic JavaScript
updates, responsive design, and a polished user interface.
