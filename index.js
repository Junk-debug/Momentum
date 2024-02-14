import { startSettingsLogic } from './js/settings.js';
import { startLocalSorageLogic } from './js/localStorage.js';
import { startAudioLogic } from './js/audio.js';
import { startTimeLogic } from './js/time.js';
import { startWeatherLogic } from './js/weather.js';
import { startSliderLogic } from './js/slider.js';
import { startQuotesLogic } from './js/quotes.js';

startSettingsLogic();
//slider
startSliderLogic();
// localstorage
startLocalSorageLogic();
// weather
startWeatherLogic();
//quotes
startQuotesLogic();
// audio
startAudioLogic();
// time
startTimeLogic();
