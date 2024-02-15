import { inputName } from './greeting.js';
import { inputCity } from './weather.js';
import { settings } from './settings.js';
import { applySettings } from './updateSettings.js';

function setLocalStorage() {
    localStorage.setItem("name", inputName.value);
    localStorage.setItem("city", inputCity.value)
    localStorage.setItem("state", JSON.stringify(settings));
}

function getLocalStorage() {
    const nameFromLS = localStorage.getItem("name");
    const cityFromLS = localStorage.getItem("city");

    if (nameFromLS !== null && nameFromLS !== '') {
        inputName.value = nameFromLS;
    }
    if (cityFromLS !== null && cityFromLS !== '') {
        inputCity.value = cityFromLS;
    }
}

function getSettingsFromLS() {
    const stateFromLS = JSON.parse(localStorage.getItem("state"));
    if (stateFromLS !== null) {
        settings.blocks = stateFromLS.blocks;
        settings.language = stateFromLS.language;
        settings.photoSource = stateFromLS.photoSource;
    }
}

export function startLocalSorageLogic() {
    window.addEventListener("beforeunload", setLocalStorage);
    window.addEventListener("load", getLocalStorage); // is it a usefull?
    getSettingsFromLS();
    applySettings();
}