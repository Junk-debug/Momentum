import { updateUISettings, settings, closeButton, popUpContainer, setSettings } from "./settings.js";
import { setBg } from "./slider.js";
import { getWeather, inputCity } from "./weather.js";
import { setQuote } from "./quotes.js";
import { updateVisibleElements } from "./hide.js";
import { inputName } from "./greeting.js";
import translations from './translate.json' assert { type: "json" };

export function applySettings(isLanguageSettingChanged) {
    // settings
    updateUISettings();
    // visible elements
    updateVisibleElements();
    // photosource
    setBg();
    if (isLanguageSettingChanged) {
        // translation
        inputCity.value = translations[settings.language].startCityTranslation;
        getWeather();
        inputCity.placeholder = translations[settings.language].cityPlaceholderTranslation;
        inputName.placeholder = translations[settings.language].namePlaceholderTranslation;
        setQuote();
        // date is translated automatically
    }
}

const settingsDiv = document.querySelector(".settings-container .settings");

settingsDiv.addEventListener("input", () => {
    applySettings(setSettings());
});

/* 
closeButton.addEventListener("click", () => {
    applySettings(setSettings());
})

window.addEventListener("keydown", (event) => {
    if (event.key == "Escape") {
        applySettings(setSettings());
    }
})

popUpContainer.addEventListener('click', (event) => {
    if (event._isClickWithInModal) return;
    applySettings(setSettings());
}); */