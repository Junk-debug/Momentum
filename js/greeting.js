import { settings, updateHotKeys } from "./settings.js";
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
    const tempInputSpan = document.createElement('span');
    tempInputSpan.innerText = inputElement.value;
    tempInputSpan.style.fontSize = window.getComputedStyle(inputElement).fontSize;
    document.body.appendChild(tempInputSpan);

    const inputWidth = tempInputSpan.offsetWidth;

    document.body.removeChild(tempInputSpan);

    const placeholderText = inputElement.getAttribute('placeholder');

    const tempPlaceholderSpan = document.createElement('span');
    tempPlaceholderSpan.style.visibility = 'hidden';
    tempPlaceholderSpan.style.fontSize = window.getComputedStyle(inputElement).fontSize;
    tempPlaceholderSpan.textContent = placeholderText;

    document.body.appendChild(tempPlaceholderSpan);

    const placeholderWidth = tempPlaceholderSpan.getBoundingClientRect().width + 20 + "px";

    document.body.removeChild(tempPlaceholderSpan);

    // Устанавливаем ширину input такую, как ширина содержимого

    inputElement.style.width = (inputWidth == 0) ? placeholderWidth : inputWidth + 25 + 'px';
}

export function startNameInputLogic() {
    window.addEventListener("load", adjustWidth.bind(inputName));
    inputName.addEventListener("input", adjustWidth);
    inputName.addEventListener("keydown", (event) => {
        if (event.key == "Enter") {
            event.currentTarget.blur();
        }
    });
}
