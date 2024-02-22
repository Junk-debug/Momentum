import { settings } from "./settings.js";
import translations from './translate.json' assert { type: "json" };

const greetingDiv = document.querySelector(".greeting");
export const inputName = document.querySelector(".name");

export function showGreeting() {
    const date = new Date();
    const greetingText = getGreeting();
    greetingDiv.textContent = greetingText;
}

function getGreeting() {
    const date = new Date();
    const hours = date.getHours();
    if (hours > 5 && hours < 12) {
        return translations[settings.language].greetingTranslation[0];
    } else if (hours > 11 && hours < 18) {
        return translations[settings.language].greetingTranslation[1];
    } else if (hours > 17 && hours < 24) {
        return translations[settings.language].greetingTranslation[2];
    } else {
        return translations[settings.language].greetingTranslation[3];
    }
}

export function adjustWidth() {
    const inputElement = this;

    // Создаем временный элемент span, чтобы измерить ширину содержимого
    const tempSpan = document.createElement('span');
    tempSpan.innerText = inputElement.value;
    tempSpan.style.fontSize = window.getComputedStyle(inputElement).fontSize;
    document.body.appendChild(tempSpan);

    // Устанавливаем ширину input такую, как ширина содержимого
    inputElement.style.width = (tempSpan.offsetWidth === 0) ? "280px" : tempSpan.offsetWidth + 25 + 'px';

    // Удаляем временный элемент span
    document.body.removeChild(tempSpan);
}

export function startNameInputLogic() {
    window.addEventListener("load", adjustWidth.bind(inputName));
    inputName.addEventListener("input", adjustWidth);
}
