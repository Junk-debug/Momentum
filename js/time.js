import { showGreeting } from './greeting.js';
import translations from './translate.json' assert { type: "json" };
import { settings } from './settings.js';
import { capitalize } from './helper.js';

const timeDiv = document.querySelector(".time");
const dateDiv = document.querySelector(".date");

function showTime() {
    const date = new Date();
    const currentTime = (settings.showSeconds == true) ? date.toLocaleTimeString() : date.getHours().toString().padStart(2, "0") + ":" +  date.getMinutes().toString().padStart(2, "0");
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
    const currentDate = ("dayFromNum" in translations[settings.language]) ? 
    `${translations[settings.language].dayFromNum[date.getDay()]}, ${date.getDate()} ${translations[settings.language].monthFromNum[date.getMonth()]}`
    :
    date.toLocaleDateString(langOption, options);
    dateDiv.textContent = capitalize(currentDate);
}

export function startTimeLogic() {
    setInterval(showTime, 500);
}