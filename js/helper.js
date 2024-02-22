export function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function setRandomNum(min, max, variable) {
    variable = getRandomNum(min, max);
}

export function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}