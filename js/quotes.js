import { getRandomNum } from "./slider.js";
import { state } from "./settings.js";
import quotes from './quotes.json' assert { type: "json" };

const quoteDiv = document.querySelector(".quote");
const authorDiv = document.querySelector(".author");

export const changeQuoteButton = document.querySelector(".change-quote");

function setQuote() {
    const random = getRandomNum(0, quotes[state.language].length - 1);

    quoteDiv.textContent = quotes[state.language][random].text;
    authorDiv.textContent = quotes[state.language][random].author;
}

export function startQuotesLogic() {
    setQuote();
    changeQuoteButton.removeEventListener("click", setQuote);
    changeQuoteButton.addEventListener("click", setQuote);
}