import { setBg } from "./slider.js";
import { updateHiddenElements } from "./hide.js";
import { setQuote } from "./quotes.js";
import { getWeather } from "./weather.js";


export function applySettings() {
    // photo source
    setBg();
    // language
    console.log("setted");
    getWeather();
    setQuote();
    // hidden items
    updateHiddenElements();
}

const closeButton = document.querySelector(".settings-close");
const settingsContainer = document.querySelector(".settings-container");

closeButton.addEventListener("click", () => {
    applySettings();
})

window.addEventListener("keydown", (event) => {
    if (event.key == "Escape") {
        applySettings();
    }
})

settingsContainer.addEventListener('click', event => {
    if (event._isClickWithInModal) return;
    applySettings();
});