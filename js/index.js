import { showTime } from './time.js';
import { inputCity, getWeather } from './weather.js';
import { slidePrev, slideNext, setRandomNum, getSlideNext, getSlidePrev, setBg } from './slider.js';
import { setLocalStorage, getLocalStorage } from './localStorage.js';
import { setQuote, changeButton } from './quotes.js';

// первый вызов цикличного счетчика времени
showTime();

// случайный выбор фоновой картинки и первый запуск фона
setRandomNum(1, 20);
setBg();

// управление кнопками слайдера
slideNext.addEventListener("click", getSlideNext);
slidePrev.addEventListener("click", getSlidePrev);

// первый запуск погоды и ожидание изменений
getWeather();
inputCity.addEventListener("change", getWeather);

// сохранение в localstorage
window.addEventListener("beforeunload", setLocalStorage);
window.addEventListener("load", getLocalStorage);

// quotes
setQuote();
changeButton.addEventListener("click", setQuote);