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