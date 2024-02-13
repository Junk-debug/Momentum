import { inputName } from './greeting.js';
import { inputCity } from './weather.js';
import { state } from './settings.js';
import { applySettings } from './updateSettings.js';

function setLocalStorage() {
    localStorage.setItem("name", inputName.value);
    localStorage.setItem("city", inputCity.value)
    localStorage.setItem("state", JSON.stringify(state));
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
        state.blocks = stateFromLS.blocks;
        state.language = stateFromLS.language;
        state.photoSource = stateFromLS.photoSource;
    }
}

export function startLocalSorageLogic() {
    window.addEventListener("beforeunload", setLocalStorage);
    window.addEventListener("load", getLocalStorage);
    getSettingsFromLS();
    applySettings();
}