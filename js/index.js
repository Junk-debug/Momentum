import { showTime } from './time.js';
import { inputName } from './greeting.js';
import { prevSlideButton, nextSlideButton, setRandomNum, slideNext, slidePrev, setBg } from './slider.js';
import { setLocalStorage, getLocalStorage } from './localStorage.js';
import { setQuote, changeQuoteButton } from './quotes.js';
import { playAudio, playAudioButton, createAudioList, playNext, playPrev, prevAudioButton, nextAudioButton, updateAudioTime, updateVolume } from './audio.js';
import { cityPlaceholderTranslation, namePlaceholderTranslation, lang, startCityTranslation } from './translate.js';
import { inputCity, getWeather } from './weather.js';

// первый вызов цикличного счетчика времени
showTime();

// случайный выбор фоновой картинки и первый запуск фона
setRandomNum(1, 20);
setBg();

// управление кнопками слайдера
nextSlideButton.addEventListener("click", slideNext);
prevSlideButton.addEventListener("click", slidePrev);

// сохранение в localstorage
window.addEventListener("beforeunload", setLocalStorage);
window.addEventListener("load", getLocalStorage);

// первый запуск погоды и ожидание изменений
inputCity.value = startCityTranslation[lang];
getWeather();

inputCity.addEventListener("change", getWeather);

// quotes
setQuote();
changeQuoteButton.addEventListener("click", setQuote);

// audio
createAudioList();

playAudioButton.addEventListener("click", playAudio)

nextAudioButton.addEventListener("click", playNext);
prevAudioButton.addEventListener("click", playPrev);

updateAudioTime();
updateVolume();


// translation
inputName.placeholder = namePlaceholderTranslation[lang];
inputCity.placeholder = cityPlaceholderTranslation[lang];
