// 1 show time and date
const timeDiv = document.querySelector(".time");
const dateDiv = document.querySelector(".date");

function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    timeDiv.textContent = currentTime;
    showDate();
    showGreeting();

    setTimeout(showTime, 1000);
}

function showDate() {
    const date = new Date();
    const options = {
        weekday: "long",
        month: "long",
        day: "numeric",
    };
    const currentDate = date.toLocaleDateString('en-US', options);
    dateDiv.textContent = currentDate;
}

function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    if (hours > 5 && hours < 12) {
        return "morning";
    } else if (hours > 11 && hours < 18) {
        return "afternoon";
    } else if (hours > 17 && hours < 24) {
        return "evening";
    } else {
        return "night";
    }
}

// 2 show greeting
const greetingDiv = document.querySelector(".greeting");
const inputName = document.querySelector(".name");

function showGreeting() {
    const date = new Date();
    const timeOfDay = getTimeOfDay();
    const greetingText = `Good ${timeOfDay},`;
    greetingDiv.textContent = greetingText;
}
// 3 slider logic

const body = document.querySelector("body");

const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');

let randomNum;

function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    randomNum = Math.floor(Math.random() * (max - min + 1) + min);
}

function setBg() {
    const timeOfDay = getTimeOfDay();
    const bgNum = randomNum.toString().padStart(2, "0");
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    img.onload = () => {
        document.body.style.backgroundImage = `url('${img.src}')`;
    };
}

function getSlideNext() {
    randomNum++;
    if (randomNum > 20) {
        randomNum = 1;
    }
    setBg();
}

function getSlidePrev() {
    randomNum--;
    if (randomNum < 1) {
        randomNum = 20;
    }
    setBg();
}


// 4  weather widget
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const inputCity = document.querySelector(".city");
const weatherError = document.querySelector(".weather-error");

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&lang=en&appid=b1201d454068452807855ae9447aa96e&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.cod == 404) {
        weatherError.textContent = `Error: ${data.message} for '${inputCity.value}'!`;
        weatherIcon.className = "weather-icon owf";
        temperature.textContent = '';
        weatherDescription.textContent = '';
        wind.textContent = '';
        humidity.textContent = '';
    } else {
        weatherError.textContent = '';
        weatherIcon.className = "weather-icon owf";
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${data.main.temp}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = `Wind speed: ${data.wind.speed} m/s`;
        humidity.textContent = `Humidity: ${data.main.humidity} %`;
    }
}

// 5 localstorage


function setLocalStorage() {
    localStorage.setItem("name", inputName.value);
    localStorage.setItem("city", inputCity.value)
}

function getLocalStorage() {
    const nameFromLS = localStorage.getItem("name");
    const cityFromLS = localStorage.getItem("city");
    if (nameFromLS !== null && nameFromLS !== '') {
        inputName.value = nameFromLS;
    }
    if (cityFromLS !== null && cityFromLS !== '') {
        inputCity.value = cityFromLS;
    }
}

// code 

showTime();

getRandomNum(1, 20);
setBg();

slideNext.addEventListener("click", getSlideNext);
slidePrev.addEventListener("click", getSlidePrev);

getWeather();
inputCity.addEventListener("change", getWeather);

window.addEventListener("beforeunload", setLocalStorage);
window.addEventListener("load", getLocalStorage);