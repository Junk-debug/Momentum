import { inputName } from './greeting.js';
import { inputCity } from './weather.js';
export function setLocalStorage() {
    localStorage.setItem("name", inputName.value);
    localStorage.setItem("city", inputCity.value)
}

export function getLocalStorage() {
    const nameFromLS = localStorage.getItem("name");
    const cityFromLS = localStorage.getItem("city");
    if (nameFromLS !== null && nameFromLS !== '') {
        inputName.value = nameFromLS;
    }
    if (cityFromLS !== null && cityFromLS !== '') {
        inputCity.value = cityFromLS;
    }
}