import { showGreeting } from './greeting.js';
import { dateTranslation, lang, belMonthFromNum, belDayFromNum } from './translate.js';

const timeDiv = document.querySelector(".time");
const dateDiv = document.querySelector(".date");

export function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    timeDiv.textContent = currentTime;
    showDate();
    showGreeting();

    setTimeout(showTime, 1000);
}

function showDate() {
    const date = new Date();
    const langOption = dateTranslation[lang];
    const options = {
        weekday: "long",
        month: "long",
        day: "numeric",
    };
    let currentDate;
    if (lang == "be") {
        currentDate = `${belDayFromNum[date.getDay()]}, ${date.getDate()} ${belMonthFromNum[date.getMonth()]}`;
    } else {
        currentDate = date.toLocaleDateString(langOption, options);
    }
    dateDiv.textContent = currentDate;
}