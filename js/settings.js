import { onKeyDownEvent } from "./audio.js";
import translations from './translate.json' assert { type: "json" };

export const settings = {
    language: "en",
    photoSource: "github",
    blocks: ["time", "date", "greeting-container", "quote-container", "weather", "player", "todo-list"],
    showSeconds: false,
    set: function (property, newValue) {
        if (this[property] !== newValue) {
            this[property] = newValue;
        }
    }
};

const settingsButton = document.querySelector(".settings-button");
export const popUpContainer = document.querySelector(".settings-container");
const settingsDiv = document.querySelector(".settings-container .settings");

let isPopUpOpened = false;

function openPopUp() {
    popUpContainer.classList.add("open");
    settingsButton.classList.add("active");
    isPopUpOpened = true;
    updateHotKeys();
}

function closePopUp() {
    popUpContainer.classList.remove("open");
    settingsButton.classList.remove("active");
    isPopUpOpened = false;
    updateHotKeys();
}

function addPopUpListeners() {
    settingsButton.addEventListener("click", () => {
        if (isPopUpOpened) {
            closePopUp();
        } else {
            openPopUp();
        }
    })

    window.addEventListener("keydown", (event) => {
        if (event.key == "Escape") {
            closePopUp();
        }
    })

    settingsDiv.addEventListener('click', event => {
        event._isClickWithInModal = true;
    });

    popUpContainer.addEventListener('click', event => {
        if (event._isClickWithInModal) return;
        closePopUp();
    });
}

const inputName = document.querySelector(".name");
const inputCity = document.querySelector(".city");
const inputTodo = document.querySelector(".todo-list__add-button");

export function updateHotKeys() {
    // если попап открыт либо если фокус на элементе либо если фокус на сити либо на инпуте тудушки
    if (isPopUpOpened || (document.activeElement === inputName) || (document.activeElement === inputCity) || (document.activeElement === inputTodo)) {
        document.removeEventListener("keydown", onKeyDownEvent);
    } else {
        document.addEventListener("keydown", onKeyDownEvent);
    }
}

function addHotKeysListeners() {
    inputCity.addEventListener("focus", updateHotKeys);
    inputCity.addEventListener("blur", updateHotKeys);
    inputName.addEventListener("focus", updateHotKeys);
    inputName.addEventListener("blur", updateHotKeys);
    inputTodo.addEventListener("focus", updateHotKeys);
    inputTodo.addEventListener("blur", updateHotKeys);
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
    const checkboxesToSelect = settings.blocks;
    for (let checkbox of checkboxes) {
        checkbox.checked = false;
        if (checkboxesToSelect.includes(checkbox.value)) {
            checkbox.checked = true;
        }
    }
}

const languageSelectEl = document.querySelector("select[name='language']");
const photoSelectEl = document.querySelector("select[name='photo']");
const showSecondsToggler = document.querySelector("input[name='showSeconds']");

function setSelectElements() {
    languageSelectEl.value = settings.language;
    photoSelectEl.value = settings.photoSource;
    showSecondsToggler.checked = settings.showSeconds;
}

function translateSettingsUI() {
    const photoSelectLabel = settingsDiv.querySelector(".settings-photo span");

    const languageSelectLabel = settingsDiv.querySelector(".settings-language span");
    const languageOptions = settingsDiv.querySelectorAll(".settings-language select option");
    const optionTranslations = translations[settings.language].settings.languageSelectOptionsTranslation;

    const visibleElementsCaption = settingsDiv.querySelector(".settings-hide caption");
    const visibleElementsTranslation = translations[settings.language].settings.visibleElementsTranslation;

    const visibleElementsLabels = settingsDiv.querySelectorAll(".settings-hide .label");

    const timeLabel = settingsDiv.querySelector(".settings-time caption");

    const showSecondsLabel = settingsDiv.querySelector(".settings-time .label");

    timeLabel.textContent = translations[settings.language].settings.timeFormatLabelTranslation;
    showSecondsLabel.textContent = translations[settings.language].settings.timeFormatTranslation;

    languageSelectLabel.textContent = translations[settings.language].settings.languageSelectLabelTranslation;

    for (let i = 0; i < languageOptions.length; i++) {
        languageOptions[i].textContent = optionTranslations[i];
    }

    photoSelectLabel.textContent = translations[settings.language].settings.photoSelectLabelTranslation;

    visibleElementsCaption.textContent = translations[settings.language].settings.visibleElementsLabelTranslation;

    for (let i = 0; i < visibleElementsLabels.length; i++) {
        visibleElementsLabels[i].textContent = visibleElementsTranslation[i];
    }

}

export function setSettings() {
    settings.set("blocks", getSelectedCheckboxes());
    settings.set("language", languageSelectEl.value);
    settings.set("photoSource", photoSelectEl.value);
    settings.set("showSeconds", !!showSecondsToggler.checked);
}

export function updateSettingsUI() {
    translateSettingsUI();
    setSelectedCheckboxes();
    setSelectElements();
}


export function startSettingsLogic() {
    updateHotKeys();
    addHotKeysListeners();
    addPopUpListeners();
}