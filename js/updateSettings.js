import { updateUISettings, state, closeButton, popUpContainer, setSettings } from "./settings.js";
import { setBg } from "./slider.js";
import { getWeather, inputCity } from "./weather.js";
import { setQuote } from "./quotes.js";
import { updateVisibleElements } from "./hide.js";
import { inputName } from "./greeting.js";
import { cityPlaceholderTranslation, namePlaceholderTranslation, startCityTranslation } from "./translate.js";

export function applySettings(isLanguageSettingChanged) {
    // settings
    updateUISettings();
    // visible elements
    updateVisibleElements();
    // photosource
    setBg();
    if (isLanguageSettingChanged) {
        // translation
        inputCity.value = startCityTranslation[state.language];
        getWeather();
        inputCity.placeholder = cityPlaceholderTranslation[state.language];
        inputName.placeholder = namePlaceholderTranslation[state.language];
        setQuote();
        // date is translated automatically
    }
}

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
});