import { onKeyDownEvent } from "./audio.js";

export const state = {
    language: "en",
    photoSource: "github",
    blocks: [],
};

const settingsButton = document.querySelector(".settings-button");
const settingsContainer = document.querySelector(".settings-container");
const closeButton = document.querySelector(".settings-close");
const settings = document.querySelector(".settings-container .settings");

export let isPopUpOpened = false;

settingsButton.addEventListener("click", () => {
    settingsContainer.classList.add("open");
    isPopUpOpened = true;
    updateHotKeys();
})

closeButton.addEventListener("click", () => {
    settingsContainer.classList.remove("open");
    isPopUpOpened = false;
    updateHotKeys();
    setSettings();
})

window.addEventListener("keydown", (event) => {
    if (event.key == "Escape") {
        settingsContainer.classList.remove("open");
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

settingsContainer.addEventListener('click', event => {
    if (event._isClickWithInModal) return;
    event.currentTarget.classList.remove('open');
    isPopUpOpened = false;
    updateHotKeys();
    setSettings();
});


const checkboxes = document.querySelectorAll("input[name='toHide']");

function getSelectedCheckboxes() {
    const selectedChekboxes = []
    for (let checkbox of checkboxes) {
        if (checkbox.checked) {
            selectedChekboxes.push(checkbox.value);
        }
    }
    return selectedChekboxes;
}

const selectedLanguage = document.querySelector("select[name='language']");
const selectedPhotoSource = document.querySelector("select[name='photo']");

function setSettings() {
    const blocks = getSelectedCheckboxes();
    state.blocks = blocks;
    state.language = selectedLanguage.value;
    state.photoSource = selectedPhotoSource.value;
    console.log(state);
}





