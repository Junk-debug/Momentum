import { showGreeting } from './greeting.js';
import translations from './translate.json' assert { type: "json" };
import { settings } from './settings.js';

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
    showTime();
}