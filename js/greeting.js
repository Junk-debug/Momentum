import { state } from "./settings.js";
import { greetingTranslation } from "./translate.js";

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
        return greetingTranslation[state.language][0];
    } else if (hours > 11 && hours < 18) {
        return greetingTranslation[state.language][1];
    } else if (hours > 17 && hours < 24) {
        return greetingTranslation[state.language][2];
    } else {
        return greetingTranslation[state.language][3];
    }
}