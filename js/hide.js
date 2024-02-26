import { settings } from "./settings.js";

const blocks = ["time", "date", "greeting-container", "quote-container", "weather", "player", "todo-list-open-button"];

export function updateVisibleElements() {
    const toShow = settings.blocks;

    for (let className of blocks) {
        const element = document.querySelector(`.${className}`);
        element.classList.add("hidden");
        if (className === "todo-list-open-button") {
            document.querySelector(".todo-list__container").classList.remove("open");
        }
    }

    for (let className of toShow) {
        const element = document.querySelector(`.${className}`);
        element.classList.remove("hidden");
    }
}