import { showGreeting } from './greeting.js';
import translations from './translate.json' assert { type: "json" };
import { settings } from './settings.js';

const timeDiv = document.querySelector(".time");
const dateDiv = document.querySelector(".date");

function showTime() {
    const date = new Date();
    const currentTime = (settings.showSeconds == true) ? date.toLocaleTimeString() : date.getHours().toString().padStart(2, "0") + ":" +  date.getMinutes().toString().padStart(2, "0");
    console.error(settings);
    if (settings.showSeconds == true) {
        timeDiv.style.fontSize = "150px";
        timeDiv.style.minHeight = "135px";
        timeDiv.style.maxHeight = "140px";
    } else {
        timeDiv.style.fontSize = "190px";
        timeDiv.style.minHeight = "170px";
        timeDiv.style.maxHeight = "180px";
    }
    timeDiv.textContent = currentTime;
    showDate();
    showGreeting();
}

function showDate() {
    const date = new Date();
    const langOption = translations[settings.language].dateTranslation;
    const options = {
        weekday: "long",
        month: "long",
        day: "numeric",
    };
    let currentDate;
    if (settings.language == "be") {
        currentDate = `${translations.be.belDayFromNum[date.getDay()]}, ${date.getDate()} ${translations.be.belMonthFromNum[date.getMonth()]}`;
    } else {
        currentDate = date.toLocaleDateString(langOption, options);
    }
    currentDate = currentDate[0].toUpperCase() + currentDate.slice(1);
    dateDiv.textContent = currentDate;
}

export function startTimeLogic() {
    setInterval(showTime, 500);
}