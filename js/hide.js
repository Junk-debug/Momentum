import { state } from "./settings.js";

const blocks = ["time", "date", "greeting-container", "quote-container", "weather", "player", "todo-list"];

export function updateVisibleElements() {
    const toShow = state.blocks;

    for (let className of blocks) {
        const element = document.querySelector(`.${className}`);
        element.classList.add("hidden");
    }

    for (let className of toShow) {
        const element = document.querySelector(`.${className}`);
        element.classList.remove("hidden");
    }
}