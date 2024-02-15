import translations from './translate.json' assert { type: "json" };
import { settings } from "./settings.js";

const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const weatherError = document.querySelector(".weather-error");
export const inputCity = document.querySelector(".city");

export async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&lang=${settings.language}&appid=b1201d454068452807855ae9447aa96e&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    try {
        weatherError.textContent = '';
        weatherIcon.className = "weather-icon owf";
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${data.main.temp}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = `${translations[settings.language].weatherDescriptionTranslation.windSpeed}: ${data.wind.speed} ${translations[settings.language].weatherDescriptionTranslation.ms}`;
        humidity.textContent = `${translations[settings.language].weatherDescriptionTranslation.humidity}: ${data.main.humidity} %`;
    } catch {
        weatherError.textContent = `Error: ${translations[settings.language].errorMessage} '${inputCity.value}'!`;
        weatherIcon.className = "weather-icon owf";
        temperature.textContent = '';
        weatherDescription.textContent = '';
        wind.textContent = '';
        humidity.textContent = '';
    }
}

export function startWeatherLogic() {
    inputCity.value = translations[settings.language].startCityTranslation;
    inputCity.addEventListener("change", getWeather);
    getWeather();
}