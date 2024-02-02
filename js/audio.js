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
            resetAudio()
            playAudio();
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
    resetAudio()
    playAudio();
}

export function playPrev() {
    isPlay = false;
    playNum--;
    if (playNum < 0) {
        playNum = 3;
    }
    resetAudio();
    playAudio();
}

function resetAudio() {
    progressBar.style.transition = "none";
    progressBar.style.width = 0;
    audio.src = playList[playNum].src;
}

const timeline = document.querySelector(".timeline");
const progressBar = document.querySelector(".progress");

const currentTimeSpan = document.querySelector(".audio-current");
const endTimeSpan = document.querySelector(".audio-end");

export function updateAudioTime() {
    const currentTime = new Date(audio.currentTime * 1000);
    const duration = new Date(audio.duration * 1000)

    if (currentTime >= duration) {
        playNext();
    }

    currentTimeSpan.textContent = `${currentTime.getMinutes().toString().padStart(2, "0")}:${currentTime.getSeconds().toString().padStart(2, "0")}`;
    endTimeSpan.textContent = `${duration.getMinutes().toString().padStart(2, "0")}:${duration.getSeconds().toString().padStart(2, "0")}`

    updateProgressBar();
    setTimeout(updateAudioTime, 500);
}

function updateProgressBar() {
    progressBar.style.transition = "2s ease-out width";
    progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
}
// при клике на прогресбар можно перематывать аудиотрек
timeline.addEventListener("click", (event) => {
    const timelineWidth = window.getComputedStyle(timeline).width;
    const timeToSeek = event.offsetX / parseInt(timelineWidth) * audio.duration;
    audio.currentTime = timeToSeek;
    progressBar.style.transition = "none";
    progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
})