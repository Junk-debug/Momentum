import translations from './translate.json' assert { type: "json" };
import { settings } from "./settings.js";
import { adjustWidth } from './helper.js';

const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const weatherError = document.querySelector(".weather-error");
export const inputCity = document.querySelector(".city");

function setWeatherInfo(data) {
    weatherError.textContent = '';
    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp} °C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `${translations[settings.language].weather.weatherDescriptionTranslation.windSpeed}: ${data.wind.speed} ${translations[settings.language].weather.weatherDescriptionTranslation.ms}`;
    humidity.textContent = `${translations[settings.language].weather.weatherDescriptionTranslation.humidity}: ${data.main.humidity} %`;
}

function setWeatherError(error) {
    weatherError.innerHTML = error;
    weatherIcon.className = '';
    temperature.textContent = '';
    weatherDescription.textContent = '';
    wind.textContent = '';
    humidity.textContent = '';
}


export async function getWeather() {
    const cityNotFoundError = `${translations[settings.language].weather.cityErrorMessage} '${inputCity.value }'!`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&lang=${settings.language}&appid=b1201d454068452807855ae9447aa96e&units=metric`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.message === "city not found" || data.message === "Nothing to geocode") {
            throw new Error(cityNotFoundError);
        }
        setWeatherInfo(data);
    } catch(error) {
        console.error(error);
        if (error.message === "Failed to fetch") {
            setWeatherError(`<svg class="wifi-off-icon"></svg> ${translations[settings.language].weather.networkErrorMessage}`);
        } else {
            setWeatherError(error.message);
        }
    }
}

export function startWeatherLogic() {
    inputCity.value = translations[settings.language].weather.startCityTranslation;
    inputCity.addEventListener("change", getWeather);
    // inputCity.addEventListener("input", adjustWidth.bind(inputCity));
    inputCity.addEventListener("keydown", (event) => {
        if (event.key == "Enter") {
            event.currentTarget.blur();
        }
    });
    getWeather();
}