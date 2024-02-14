import { weatherDescriptionTranslation, startCityTranslation, errorMessage } from "./translate.js";
import { state } from "./settings.js";

const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const weatherError = document.querySelector(".weather-error");
export const inputCity = document.querySelector(".city");

export async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&lang=${state.language}&appid=b1201d454068452807855ae9447aa96e&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    try {
        weatherError.textContent = '';
        weatherIcon.className = "weather-icon owf";
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${data.main.temp}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = `${weatherDescriptionTranslation[state.language][0]}: ${data.wind.speed} ${weatherDescriptionTranslation[state.language][1]}`;
        humidity.textContent = `${weatherDescriptionTranslation[state.language][2]}: ${data.main.humidity} %`;
    } catch {
        weatherError.textContent = `Error: ${errorMessage[state.language]} '${inputCity.value}'!`;
        weatherIcon.className = "weather-icon owf";
        temperature.textContent = '';
        weatherDescription.textContent = '';
        wind.textContent = '';
        humidity.textContent = '';
    }
}

export function startWeatherLogic() {
    inputCity.value = startCityTranslation[state.language];
    inputCity.addEventListener("change", getWeather);
    getWeather();
}