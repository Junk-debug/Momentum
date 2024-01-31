import { showGreeting } from './greeting.js';
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
    const options = {
        weekday: "long",
        month: "long",
        day: "numeric",
    };
    const currentDate = date.toLocaleDateString('en-US', options);
    dateDiv.textContent = currentDate;
}