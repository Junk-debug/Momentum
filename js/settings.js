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

function addPopUpOpenListeners() {
    settingsButton.addEventListener("click", () => {
        popUpContainer.classList.add("open");
        isPopUpOpened = true;
        updateHotKeys();
    })
}

function addPopUpCloseListeners() {
    closeButton.addEventListener("click", () => {
        popUpContainer.classList.remove("open");
        isPopUpOpened = false;
        updateHotKeys();
    })

    window.addEventListener("keydown", (event) => {
        if (event.key == "Escape") {
            popUpContainer.classList.remove("open");
            isPopUpOpened = false;
            updateHotKeys();
        }
    })

    settings.addEventListener('click', event => {
        event._isClickWithInModal = true;
    });

    popUpContainer.addEventListener('click', event => {
        if (event._isClickWithInModal) return;
        event.currentTarget.classList.remove('open');
        isPopUpOpened = false;
        updateHotKeys();
    });
}

function updateHotKeys() {
    if (!isPopUpOpened) {
        document.addEventListener("keydown", onKeyDownEvent);
    } else {
        document.removeEventListener("keydown", onKeyDownEvent);
    }
}

export function startSettingsLogic() {
    updateHotKeys();
    addPopUpOpenListeners();
    addPopUpCloseListeners();
}

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

export function setSettings() {
    const blocks = getSelectedCheckboxes();
    const obj = {
        blocks: blocks,
        language: selectedLanguage.value,
        photoSource: selectedPhotoSource.value
    }
    let isLanguageSettingChanged = true;
    if (obj.language == state.language) {
        isLanguageSettingChanged = false;
    }
    state.blocks = blocks;
    state.language = selectedLanguage.value;
    state.photoSource = selectedPhotoSource.value;
    return isLanguageSettingChanged;
}

export function updateUISettings() {
    setSelectedCheckboxes();
    setSelectElements();
}





// todo: add settings menu translation