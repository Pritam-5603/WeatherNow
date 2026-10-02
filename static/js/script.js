// ==============================
// Elements
// ==============================

const form =
    document.querySelector(".search-form");

const button =
    document.querySelector(".search-box button");

const buttonText =
    document.querySelector("#button-text");

const loadingSpinner =
    document.querySelector("#loading-spinner");

const errorMessage =
    document.querySelector("#error-message");

const errorText =
    document.querySelector("#error-text");

const weatherCard =
    document.querySelector("#weather-card");

const feelsLikeElement =
    document.querySelector("#feels-like");

const temperatureElement =
    document.querySelector("#temperature");

const unitElement =
    document.querySelector("#unit");

const unitToggle =
    document.querySelector("#unit-toggle");


// ==============================
// Temperature Variables
// ==============================

let originalTemperature = null;
let originalFeelsLike = null;
let isCelsius = true;


// ==============================
// Celsius / Fahrenheit Toggle
// ==============================

if (
    unitToggle &&
    temperatureElement &&
    feelsLikeElement
) {

    const initialTemperature =
        parseFloat(
            temperatureElement.textContent
        );

    if (!isNaN(initialTemperature)) {
        originalTemperature =
            initialTemperature;
    }


    unitToggle.addEventListener(
        "click",
        function () {

            // No weather data yet
            if (
                originalTemperature === null ||
                originalFeelsLike === null
            ) {
                return;
            }


            // ==============================
            // Celsius → Fahrenheit
            // ==============================

            if (isCelsius) {

                const fahrenheit =
                    (originalTemperature * 9 / 5) + 32;

                const feelsLikeFahrenheit =
                    (originalFeelsLike * 9 / 5) + 32;


                temperatureElement.textContent =
                    Math.round(fahrenheit);

                feelsLikeElement.textContent =
                    Math.round(
                        feelsLikeFahrenheit
                    ) + "°F";


                unitElement.textContent =
                    "°F";

                unitToggle.textContent =
                    "°C";

                isCelsius = false;

            }


            // ==============================
            // Fahrenheit → Celsius
            // ==============================

            else {

                temperatureElement.textContent =
                    Math.round(
                        originalTemperature
                    );

                feelsLikeElement.textContent =
                    Math.round(
                        originalFeelsLike
                    ) + "°C";


                unitElement.textContent =
                    "°C";

                unitToggle.textContent =
                    "°F";

                isCelsius = true;

            }

        }
    );
}


// ==============================
// Wind Direction Function
// ==============================

function getWindDirection(degrees) {

    const directions = [
        "N",
        "NE",
        "E",
        "SE",
        "S",
        "SW",
        "W",
        "NW"
    ];


    const index =
        Math.round(degrees / 45) % 8;


    return directions[index];
}


// ==============================
// Initial Wind Direction
// ==============================

const windDirectionElement =
    document.querySelector(
        "#wind-direction"
    );


if (windDirectionElement) {

    const windDegrees =
        parseFloat(
            windDirectionElement.textContent
        );


    if (!isNaN(windDegrees)) {

        windDirectionElement.textContent =
            getWindDirection(windDegrees);

    }
}


// ==============================
// Error Message Functions
// ==============================

function showError(message) {

    errorText.textContent =
        message;

    errorMessage.classList.remove(
        "hidden"
    );
}


function hideError() {

    errorMessage.classList.add(
        "hidden"
    );
}


// ==============================
// Dynamic Weather Search
// ==============================

form.addEventListener(
    "submit",
    async function (event) {

        // Stop normal form submission
        event.preventDefault();


        // ==============================
        // Get City
        // ==============================

        const city =
            document.querySelector(
                'input[name="city"]'
            ).value.trim();


        if (!city) {
            return;
        }


        // Hide previous error
        hideError();


        // ==============================
        // Loading State
        // ==============================

        buttonText.textContent =
            "Searching...";

        loadingSpinner.classList.remove(
            "hidden"
        );

        button.disabled = true;


        try {

            // ==============================
            // Request Weather Data
            // ==============================

            const response =
                await fetch(
                    `/api/weather?city=${encodeURIComponent(city)}`
                );


            // Convert response to JSON
            const data =
                await response.json();


            // ==============================
            // Handle API Errors
            // ==============================

            if (!response.ok) {

                showError(
                    data.error ||
                    "Unable to get weather data."
                );

                return;
            }


            // Hide any previous error
            hideError();


            // ==============================
            // Show Weather Card
            // ==============================

            weatherCard.classList.remove(
                "hidden"
            );


            // ==============================
            // Update City
            // ==============================

            document.querySelector(
                "#city-name"
            ).textContent =
                data.name;


            // ==============================
            // Update Country
            // ==============================

            document.querySelector(
                "#country"
            ).textContent =
                data.sys.country;


            // ==============================
            // Update Temperature
            // ==============================

            originalTemperature =
                data.main.temp;

            originalFeelsLike =
                data.main.feels_like;


            temperatureElement.textContent =
                Math.round(
                    originalTemperature
                );


            unitElement.textContent =
                "°C";


            isCelsius = true;


            unitToggle.textContent =
                "°F";


            // ==============================
            // Update Feels Like
            // ==============================

            feelsLikeElement.textContent =
                Math.round(
                    originalFeelsLike
                ) + "°C";


            // ==============================
            // Update Humidity
            // ==============================

            document.querySelector(
                "#humidity"
            ).textContent =
                data.main.humidity + "%";


            // ==============================
            // Update Wind Speed
            // ==============================

            document.querySelector(
                "#wind-speed"
            ).textContent =
                data.wind.speed + " m/s";


            // ==============================
            // Update Wind Direction
            // ==============================

            document.querySelector(
                "#wind-direction"
            ).textContent =
                getWindDirection(
                    data.wind.deg
                );


            // ==============================
            // Update Pressure
            // ==============================

            document.querySelector(
                "#pressure"
            ).textContent =
                data.main.pressure + " hPa";


            // ==============================
            // Update Weather Description
            // ==============================

            document.querySelector(
                "#weather-description"
            ).textContent =
                data.weather[0].description;


            // ==============================
            // Update Weather Icon
            // ==============================

            document.querySelector(
                "#weather-icon"
            ).src =
                `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;


            // ==============================
            // Console Message
            // ==============================

            console.log(
                "Weather updated:",
                data
            );

        }


        // ==============================
        // Handle Connection / JS Errors
        // ==============================

        catch (error) {

            console.error(
                "Weather request error:",
                error
            );


            showError(
                "Unable to connect to the weather server."
            );

        }


        // ==============================
        // Restore Search Button
        // ==============================

        finally {

            buttonText.textContent =
                "Search";

            loadingSpinner.classList.add(
                "hidden"
            );

            button.disabled = false;

        }

    }
);