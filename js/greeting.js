const greetingDiv = document.querySelector(".greeting");
export const inputName = document.querySelector(".name");

export function showGreeting() {
    const date = new Date();
    const timeOfDay = getTimeOfDay();
    const greetingText = `Good ${timeOfDay},`;
    greetingDiv.textContent = greetingText;
}

export function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    if (hours > 5 && hours < 12) {
        return "morning";
    } else if (hours > 11 && hours < 18) {
        return "afternoon";
    } else if (hours > 17 && hours < 24) {
        return "evening";
    } else {
        return "night";
    }
}