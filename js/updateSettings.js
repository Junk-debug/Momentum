import { updateSettingsUI, settings, setSettings } from "./settings.js";
import { setBg } from "./slider.js";
import { getWeather, inputCity } from "./weather.js";
import { setQuote } from "./quotes.js";
import { updateVisibleElements } from "./hide.js";
import { inputName } from "./greeting.js";
import { adjustWidth } from './helper.js';
import { updateBtnTranslation, updateEmptyList } from "./todo.js";
import translations from './translate.json' assert { type: "json" };

export function applySettings() {
    // settings
    updateSettingsUI();
    // visible elements
    updateVisibleElements();
    // photosource
    setBg();
    // translation
    inputCity.value = translations[settings.language].weather.startCityTranslation;
    getWeather();
    inputCity.placeholder = translations[settings.language].weather.cityPlaceholderTranslation;
    inputName.placeholder = translations[settings.language].greeting.namePlaceholderTranslation;
    setQuote();
    adjustWidth.apply(inputName);
    updateEmptyList();
    updateBtnTranslation();
    // date is translated automatically
}

const settingsDiv = document.querySelector(".settings-container .settings");

settingsDiv.addEventListener("input", () => {
    setSettings();
    applySettings();
});