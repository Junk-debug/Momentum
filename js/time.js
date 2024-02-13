import { showGreeting } from './greeting.js';
import { dateTranslation, belMonthFromNum, belDayFromNum } from './translate.js';
import { state } from './settings.js';

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
    const langOption = dateTranslation[state.language];
    const options = {
        weekday: "long",
        month: "long",
        day: "numeric",
    };
    let currentDate;
    if (state.language == "be") {
        currentDate = `${belDayFromNum[date.getDay()]}, ${date.getDate()} ${belMonthFromNum[date.getMonth()]}`;
    } else {
        currentDate = date.toLocaleDateString(langOption, options);
    }
    dateDiv.textContent = currentDate;
}

export function startTimeLogic() {
    showTime();
}