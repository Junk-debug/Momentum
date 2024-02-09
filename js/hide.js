import { state } from "./settings.js";

const blocks = ["time", "date", "greeting-container", "quote-container", "weather", "player", "todo-list"]

export function updateHiddenElements() {
    const toHide = state.blocks;
    for (let className of blocks) {
        const element = document.querySelector(`.${className}`);
        element.classList.remove("hidden");
    }
    
    for (let className of toHide) {
        const element = document.querySelector(`.${className}`);
        element.classList.add("hidden");
    }
}