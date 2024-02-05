import { getRandomNum } from "./slider.js";
import quotes from './quotes.json' assert { type: "json" };

const quoteDiv = document.querySelector(".quote");
const authorDiv = document.querySelector(".author");

export const changeQuoteButton = document.querySelector(".change-quote");

export function setQuote() {
    const random = getRandomNum(0, quotes.length - 1);

    quoteDiv.textContent = quotes[random].text;
    authorDiv.textContent = quotes[random].author;
}