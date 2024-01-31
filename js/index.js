import { showTime } from './time.js';
import { inputCity, getWeather } from './weather.js';
import { slidePrev, slideNext, getRandomNum, getSlideNext, getSlidePrev, setBg } from './slider.js';
import { setLocalStorage, getLocalStorage } from './localStorage.js';

// первый вызов цикличного счетчика времени
showTime();

// случайный выбор фоновой картинки и первый запуск фона
getRandomNum(1, 20);
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


