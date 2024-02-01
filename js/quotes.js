import { getRandomNum } from "./slider.js";

const quoteDiv = document.querySelector(".quote");
const authorDiv = document.querySelector(".author");

export const changeButton = document.querySelector(".change-quote");

export async function setQuote() {
    const url = 'https://type.fit/api/quotes';
    const res = await fetch(url);
    const data = await res.json();

    const random = getRandomNum(0, data.length - 1);

    quoteDiv.textContent = data[random].text;
    authorDiv.textContent = data[random].author;
}