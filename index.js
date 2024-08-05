import {} from "./js/loader.js";
import { startSettingsLogic } from "./js/settings.js";
import { startLocalSorageLogic } from "./js/localStorage.js";
import { startAudioLogic } from "./js/audio.js";
import { startTimeLogic } from "./js/time.js";
import { startWeatherLogic } from "./js/weather.js";
import { startSliderLogic } from "./js/slider.js";
import { startQuotesLogic } from "./js/quotes.js";
import { startNameInputLogic } from "./js/greeting.js";
import { startToDosLogic } from "./js/todo.js";

startSettingsLogic();
//slider
startSliderLogic();
//quotes
startQuotesLogic();
// localstorage
startLocalSorageLogic();
// weather
startWeatherLogic();
// audio
startAudioLogic();
// time
startTimeLogic();
// greeting name input
startNameInputLogic();
// todos
startToDosLogic();
