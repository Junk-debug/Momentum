import { updateSettingsUI, settings, setSettings } from "./settings.js";
import { setBg } from "./slider.js";
import { getWeather, inputCity } from "./weather.js";
import { setQuote } from "./quotes.js";
import { updateVisibleElements } from "./hide.js";
import { inputName } from "./greeting.js";
import translations from './translate.json' assert { type: "json" };

export function applySettings() {
    // settings
    updateSettingsUI();
    // visible elements
    updateVisibleElements();
    // photosource
    setBg();
    // translation
    inputCity.value = translations[settings.language].startCityTranslation;
    getWeather();
    inputCity.placeholder = translations[settings.language].cityPlaceholderTranslation;
    inputName.placeholder = translations[settings.language].namePlaceholderTranslation;
    setQuote();
    // date is translated automatically
}

const settingsDiv = document.querySelector(".settings-container .settings");

settingsDiv.addEventListener("input", () => {
    console.log(settings)
    setSettings();
    applySettings();
});