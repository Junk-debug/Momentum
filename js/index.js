import { showTime } from './time.js';
import { state } from './settings.js';
import { inputName } from './greeting.js';
import { prevSlideButton, nextSlideButton, setRandomNum, slideNext, slidePrev, setBg } from './slider.js';
import { setLocalStorage, getLocalStorage } from './localStorage.js';
import { setQuote, changeQuoteButton } from './quotes.js';
import { playAudio, playAudioButton, createAudioList, playNext, playPrev, prevAudioButton, nextAudioButton, updateAudioTime, updateVolume } from './audio.js';
import { cityPlaceholderTranslation, namePlaceholderTranslation, startCityTranslation } from './translate.js';
import { inputCity, getWeather } from './weather.js';
import { updateHiddenElements } from './hide.js';
import { applySettings } from './updateSettings.js';

// slider
setRandomNum(1, 20);
setBg();
nextSlideButton.addEventListener("click", slideNext);
prevSlideButton.addEventListener("click", slidePrev);
// localstorage
window.addEventListener("beforeunload", setLocalStorage);
window.addEventListener("load", getLocalStorage);
// translation
inputName.placeholder = namePlaceholderTranslation[state.language];
inputCity.placeholder = cityPlaceholderTranslation[state.language];
