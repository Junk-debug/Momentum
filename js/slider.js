import { getTimeOfDay } from "./greeting.js";

export const slideNext = document.querySelector('.slide-next');
export const slidePrev = document.querySelector('.slide-prev');

let randomNum;

export function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    randomNum = Math.floor(Math.random() * (max - min + 1) + min);
}

export function setBg() {
    const timeOfDay = getTimeOfDay();
    const bgNum = randomNum.toString().padStart(2, "0");
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    img.onload = () => {
        document.body.style.backgroundImage = `url('${img.src}')`;
    };
}

export function getSlideNext() {
    randomNum++;
    if (randomNum > 20) {
        randomNum = 1;
    }
    setBg();
}

export function getSlidePrev() {
    randomNum--;
    if (randomNum < 1) {
        randomNum = 20;
    }
    setBg();
}
