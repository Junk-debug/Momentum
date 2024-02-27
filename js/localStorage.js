import { inputName } from './greeting.js';
import { inputCity, isCityCorrect, getWeather } from './weather.js';
import { settings } from './settings.js';
import { applySettings } from './updateSettings.js';
import { todosInfoArr, setToDosFromLS } from './todo.js';

function setLocalStorage() {
    localStorage.setItem("name", inputName.value);
    if (isCityCorrect) {
        localStorage.setItem("city", inputCity.value);
    } else {
        localStorage.setItem("city", "");
    }
    localStorage.setItem("settings", JSON.stringify(settings));
    localStorage.setItem("todos", JSON.stringify(todosInfoArr));
}

function getNameFromLS() {
    const nameFromLS = localStorage.getItem("name");
    if (nameFromLS !== null && nameFromLS !== '') {
        return nameFromLS;
    }
}

function getCityFromLS() {
    const cityFromLS = localStorage.getItem("city");
    if (cityFromLS !== null && cityFromLS !== '') {
        return cityFromLS;
    }
}


function setFromLS() {
    const nameFromLS = getNameFromLS(); 
    if (nameFromLS) {
        inputName.value = nameFromLS;
    }
    const cityFromLS = getCityFromLS();
    if (cityFromLS) {
        inputCity.value = cityFromLS;
    }
}


function setSettingsFromLS() {
    const settingsFromLS = JSON.parse(localStorage.getItem("settings"));
    if (settingsFromLS !== null) {
        settings.blocks = settingsFromLS.blocks;
        settings.language = settingsFromLS.language;
        settings.photoSource = settingsFromLS.photoSource;
        settings.showSeconds = settingsFromLS.showSeconds;
    }
}

export function startLocalSorageLogic() {
    window.addEventListener("beforeunload", setLocalStorage);
    window.addEventListener("load", () => {
        setFromLS();
        getWeather();
    }); // is it a usefull?
    setSettingsFromLS();
    applySettings();
    setToDosFromLS();
}