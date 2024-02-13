import { onKeyDownEvent } from "./audio.js";

export const state = {
    language: "en",
    photoSource: "github",
    blocks: ["time", "date", "greeting-container", "quote-container", "weather", "player", "todo-list"]
};

const settingsButton = document.querySelector(".settings-button");
export const popUpContainer = document.querySelector(".settings-container");
export const closeButton = document.querySelector(".settings-close");
const settings = document.querySelector(".settings-container .settings");

let isPopUpOpened = false;

settingsButton.addEventListener("click", () => {
    popUpContainer.classList.add("open");
    isPopUpOpened = true;
    updateHotKeys();
})

closeButton.addEventListener("click", () => {
    popUpContainer.classList.remove("open");
    isPopUpOpened = false;
    updateHotKeys();
    setSettings();
})

window.addEventListener("keydown", (event) => {
    if (event.key == "Escape") {
        popUpContainer.classList.remove("open");
        isPopUpOpened = false;
        updateHotKeys();
        setSettings();
    }
})

function updateHotKeys() {
    if (!isPopUpOpened) {
        document.addEventListener("keydown", onKeyDownEvent);
    } else {
        document.removeEventListener("keydown", onKeyDownEvent);
    }
}

updateHotKeys();

settings.addEventListener('click', event => {
    event._isClickWithInModal = true;
});

popUpContainer.addEventListener('click', event => {
    if (event._isClickWithInModal) return;
    event.currentTarget.classList.remove('open');
    isPopUpOpened = false;
    updateHotKeys();
    setSettings();
});


const checkboxes = document.querySelectorAll("input[name='toShow']");

function getSelectedCheckboxes() {
    const selectedChekboxes = []
    for (let checkbox of checkboxes) {
        if (checkbox.checked) {
            selectedChekboxes.push(checkbox.value);
        }
    }
    return selectedChekboxes;
}

function setSelectedCheckboxes() {
    const checkboxesToSelect = state.blocks;
    for (let checkbox of checkboxes) {
        checkbox.checked = false;
        if (checkboxesToSelect.includes(checkbox.value)) {
            checkbox.checked = true;
        }
    }
}

const selectedLanguage = document.querySelector("select[name='language']");
const selectedPhotoSource = document.querySelector("select[name='photo']");

function setSelectElements() {
    selectedLanguage.value = state.language;
    selectedPhotoSource.value = state.photoSource;
}

function setSettings() {
    const blocks = getSelectedCheckboxes();
    state.blocks = blocks;
    state.language = selectedLanguage.value;
    state.photoSource = selectedPhotoSource.value;
}

export function updateUISettings() {
    setSelectedCheckboxes();
    setSelectElements();
}





