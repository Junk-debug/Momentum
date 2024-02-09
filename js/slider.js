import { state } from "./settings.js";

export const nextSlideButton = document.querySelector('.slide-next');
export const prevSlideButton = document.querySelector('.slide-prev');

let randomNum;

function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    if (hours > 5 && hours < 12) {
        return "morning"
    } else if (hours > 11 && hours < 18) {
        return "afternoon";
    } else if (hours > 17 && hours < 24) {
        return "evening";
    } else {
        return "night";
    }
}

export function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function setRandomNum(min, max) {
    randomNum = getRandomNum(min, max);
}

export async function setBg() {
    const imageLink = await setImageLink();
    const img = new Image();
    img.src = imageLink;
    img.onload = () => {
        document.body.style.backgroundImage = `url('${img.src}')`;
    };
}

export function slideNext() {
    randomNum++;
    if (randomNum > 20) {
        randomNum = 1;
    }
    setBg();
}

export function slidePrev() {
    randomNum--;
    if (randomNum < 1) {
        randomNum = 20;
    }
    setBg();
}

async function getLinkFromUnsplash() {
    const unsplashUrl = 'https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=97BROPl_UZvO5qc-w-C5bPcK0Bfu7goXFz-JbUrDKaU';
    const res = await fetch(unsplashUrl);
    const data = await res.json();
    return data.urls.regular;
}

async function getLinkFromFlickr() {
    const flickrUrl = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=6b2b5f35c8598701f64ac533d6f53d57&tags=nature&extras=url_l&format=json&nojsoncallback=1';
    const res = await fetch(flickrUrl);
    const data = await res.json();
    return data.photos.photo[randomNum].url_l;
}

function getLinkFromGithub() {
    const timeOfDay = getTimeOfDay();
    const bgNum = randomNum.toString().padStart(2, "0");
    return `https://raw.githubusercontent.com/Junk-debug/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.webp`;
}

async function setImageLink() {
    switch (state.photoSource) {
        case "github":
            return getLinkFromGithub();
        case "unsplash":
            return await getLinkFromUnsplash();
        case "flickr":
            return await getLinkFromFlickr();
    }
}