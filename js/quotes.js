import { getRandomNum } from "./slider.js";
import { lang } from "./translate.js";
import quotes from './quotes.json' assert { type: "json" };

const quoteDiv = document.querySelector(".quote");
const authorDiv = document.querySelector(".author");

export const changeQuoteButton = document.querySelector(".change-quote");

export function setQuote() {
    const random = getRandomNum(0, quotes[lang].length - 1);

    quoteDiv.textContent = quotes[lang][random].text;
    authorDiv.textContent = quotes[lang][random].author;
}