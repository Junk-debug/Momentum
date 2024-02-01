import playList from "./playList.js";

const audio = document.querySelector("audio");

export const playAudioButton = document.querySelector(".play");
export const nextAudioButton = document.querySelector(".play-next");
export const prevAudioButton = document.querySelector(".play-prev");

const audioList = document.querySelector(".play-list");

let isPlay = false;
let playNum = 0;

export function createAudioList() {
    for (let i = 0; i < playList.length; i++) {
        const li = document.createElement('li');
        li.textContent = playList[i].title;
        li.className = "play-item";
        li.value = i;
        audioList.append(li);
        li.addEventListener("click", () => {
            isPlay = false;
            playNum = li.value;
            playAudio()
        });
    }
}

function updateAudioList() {
    const list = document.querySelectorAll(".play-item")
    const li = list[playNum];
    for (const li of list) {
        li.classList.remove("item-active");
    }
    li.classList.add("item-active");
}

export function playAudio() {
    audio.src = playList[playNum].src;
    if (isPlay) {
        playAudioButton.classList.remove("pause");
        audio.pause();
        isPlay = false;
    } else {
        playAudioButton.classList.add("pause");
        audio.play();
        isPlay = true;
    }
    updateAudioList();
}

export function playNext() {
    isPlay = false;
    playNum++;
    if (playNum > 3) {
        playNum = 0;
    }
    playAudio()
}

export function playPrev() {
    isPlay = false;
    playNum--;
    if (playNum < 0) {
        playNum = 3;
    }
    playAudio()
}
