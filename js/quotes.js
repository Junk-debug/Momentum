import quotes from './quotes.json' assert { type: "json" };
import { getRandomNum } from "./slider.js";
import { state } from "./settings.js";

const quoteDiv = document.querySelector(".quote");
const authorDiv = document.querySelector(".author");

const changeQuoteButton = document.querySelector(".change-quote");

export function setQuote() {
    const random = getRandomNum(0, quotes[state.language].length - 1);

    quoteDiv.textContent = quotes[state.language][random].text;
    authorDiv.textContent = quotes[state.language][random].author;
}

export function startQuotesLogic() {
    setQuote();
    changeQuoteButton.addEventListener("click", setQuote);
}