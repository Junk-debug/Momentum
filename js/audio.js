import playList from "./playList.js";

const audio = document.querySelector("audio");

const playAudioButton = document.querySelector(".play");
const nextAudioButton = document.querySelector(".play-next");
const prevAudioButton = document.querySelector(".play-prev");

const volumeSlider = document.querySelector(".volume-slider");
const volumeButton = document.querySelector(".volume-icon");

const audioList = document.querySelector(".play-list");

const timeline = document.querySelector(".timeline");
const progressBar = document.querySelector(".progress");

const currentTimeSpan = document.querySelector(".audio-current");
const endTimeSpan = document.querySelector(".audio-end");


let isPlay = false;
let playNum = 0;



function createAudioList() {
    for (let i = 0; i < playList.length; i++) {
        const li = document.createElement('li');
        li.textContent = playList[i].title;
        li.className = "play-item";
        const button = document.createElement('button');
        button.value = i;
        button.className = "li-button li-play";
        li.prepend(button);
        audioList.append(li);
        button.addEventListener("click", function () {
            if (playNum == button.value) {
                playAudio();
            } else {
                isPlay = false;
                playNum = button.value
                resetAudio();
                playAudio();
            }
        })
    }
}

function updateAudioList() {
    const list = document.querySelectorAll(".play-item");
    for (const li of list) {
        li.querySelector("button").classList.remove("pause");
        li.classList.remove("item-active");
    }
    const button = list[playNum].querySelector("button");
    list[playNum].classList.add("item-active");
    if (isPlay) {
        button.classList.add("pause");
    }
}



function playAudio() {
    if (isPlay) {
        progressBar.style.transition = "none";
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

function playNext() {
    isPlay = false;
    playNum++;
    if (playNum > 3) {
        playNum = 0;
    }
    resetAudio()
    playAudio();
}

function playPrev() {
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



function getTimeCode(sec) {
    const time = new Date(sec * 1000);
    return `${time.getMinutes().toString().padStart(2, "0")}:${time.getSeconds().toString().padStart(2, "0")}`;
}

function updateAudioTime() {
    const currentTime = getTimeCode(audio.currentTime);
    const duration = playList[playNum].duration;

    currentTimeSpan.textContent = currentTime;
    endTimeSpan.textContent = duration;

    updateProgressBar();

    if (audio.ended) {
        playNext()
    }

    setTimeout(updateAudioTime, 500);
}

function updateProgressBar() {
    progressBar.style.transition = "0.25s";
    progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
}



function muteAudio() {
    if (audio.muted) {
        audio.muted = false;
    } else {
        audio.muted = true;
    }
    volumeButton.classList.toggle("volume-mute");
}

function updateVolume() {
    audio.volume = volumeSlider.value / 100;
}

function volumeUp() {
    audio.volume += (1 / 100);
    volumeSlider.value++;
}

function volumeDown() {
    audio.volume -= (1 / 100);
    volumeSlider.value--;
}

export function onKeyDownEvent(event) {
    if (event.code == "KeyM") {
        muteAudio();
    } else if (event.code == "Space") {
        playAudio();
    } else if (event.code == "KeyK") {
        playAudio();
    } else if (event.code == "KeyN" && event.shiftKey) {
        playNext();
    } else if (event.code == "KeyP" && event.shiftKey) {
        playPrev();
    } else if (event.code == "ArrowUp") {
        volumeUp();
    } else if (event.code == "ArrowDown") {
        volumeDown();
    }
}



function turnOnAudioControlsListeners() {
    playAudioButton.addEventListener("click", playAudio)

    nextAudioButton.addEventListener("click", playNext);
    prevAudioButton.addEventListener("click", playPrev);
}


function turnOnTimelineClickListener() {
    timeline.addEventListener("click", (event) => {
        const timelineWidth = window.getComputedStyle(timeline).width;
        const timeToSeek = event.offsetX / parseInt(timelineWidth) * audio.duration;
        audio.currentTime = timeToSeek;
        progressBar.style.transition = "none";
        progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
    })
}


function turnOnVolumeControlsListener() {
    volumeSlider.addEventListener("input", updateVolume);
    volumeButton.addEventListener("click", muteAudio);
}





export function startAudioLogic() {
    createAudioList();

    turnOnAudioControlsListeners();
    turnOnTimelineClickListener();
    turnOnVolumeControlsListener();

    updateAudioTime();
    updateVolume();
}