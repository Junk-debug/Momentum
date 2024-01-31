const timeDiv = document.querySelector(".time");
const dateDiv = document.querySelector(".date");

const greetingContainer = document.querySelector(".greeting-container");

const greetingDiv = greetingContainer.querySelector(".greeting");
const inputName = greetingContainer.querySelector(".name");

const body = document.querySelector("body");

const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');

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

function showGreeting() {
    const date = new Date();
    const timeOfDay = getTimeOfDay();
    const greetingText = `Good ${timeOfDay},`;
    greetingDiv.textContent = greetingText;
}

showTime();

function setLocalStorage() {
    localStorage.setItem("name", inputName.value);
}

function getLocalStorage() {
    const nameFromLS = localStorage.getItem("name");

    if (nameFromLS !== null) {
        inputName.value = nameFromLS;
    }
}

window.addEventListener("load", getLocalStorage);
window.addEventListener("beforeunload", setLocalStorage);

let randomNum;
getRandomNum(1, 20);
setBg();

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

slideNext.addEventListener("click", getSlideNext);
slidePrev.addEventListener("click", getSlidePrev);
