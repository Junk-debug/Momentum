import { updateUISettings, state, closeButton, popUpContainer } from "./settings.js";
import { startSliderLogic } from "./slider.js";
import { startWeatherLogic, inputCity } from "./weather.js";
import { startQuotesLogic } from "./quotes.js";
import { updateVisibleElements } from "./hide.js";
import { inputName } from "./greeting.js";
import { cityPlaceholderTranslation, namePlaceholderTranslation } from "./translate.js";

export function applySettings() {
    // settings
    updateUISettings();
    // visible elements
    updateVisibleElements();
    // photosource
    startSliderLogic();
    // translation
    startWeatherLogic();
    inputCity.placeholder = cityPlaceholderTranslation[state.language];
    inputName.placeholder = namePlaceholderTranslation[state.language];
    startQuotesLogic();
    // date is translated automatically
}

closeButton.addEventListener("click", () => {
    applySettings();
})

window.addEventListener("keydown", (event) => {
    if (event.key == "Escape") {
        applySettings();
    }
})

popUpContainer.addEventListener('click', event => {
    if (event._isClickWithInModal) return;
    applySettings();
});