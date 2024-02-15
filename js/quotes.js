import quotes from './quotes.json' assert { type: "json" };
import { getRandomNum } from "./helper.js";
import { settings } from "./settings.js";

const quoteDiv = document.querySelector(".quote");
const authorDiv = document.querySelector(".author");

const changeQuoteButton = document.querySelector(".change-quote");

let currentQuoteNum;

function setRandomQuoteNum() {
    currentQuoteNum = getRandomNum(0, quotes[settings.language].length - 1);
}

export function setQuote() {
    quoteDiv.textContent = quotes[settings.language][currentQuoteNum].text;
    authorDiv.textContent = quotes[settings.language][currentQuoteNum].author;
}

export function startQuotesLogic() {
    setRandomQuoteNum(currentQuoteNum);
    setQuote();
    changeQuoteButton.addEventListener("click", setRandomQuoteNum.bind(null, currentQuoteNum));
    changeQuoteButton.addEventListener("click", setQuote);
}