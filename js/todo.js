import { setCursorToEnd, generateUUID, adjustSelectWidth } from "./helper.js";
import translations from './translate.json' assert { type: "json" };
import { settings } from "./settings.js";

const todoListContainer = document.querySelector(".todo-list__container");
const todoOpenButton = document.querySelector(".todo-list-open-button");
const addToDoButton = document.querySelector(".todo-list__add-button");
const todosDiv = document.querySelector(".todo-list");
const groupSelect = document.querySelector("[name='todoGroups']");

export let todosInfoArr = [];

function createToDo(value, id) {
    const todoDiv = document.createElement("li");
    const checkbox = document.createElement("input");
    const span = document.createElement("span");
    const closeBtn = document.createElement("button");

    todoDiv.className = "todo-list__todo";
    checkbox.className = "todo-list__checkbox"
    checkbox.type = "checkbox";
    span.className = "todo-list__text";
    span.textContent = value;
    closeBtn.className = "todo-list__delete-button";

    todoDiv.appendChild(checkbox);
    todoDiv.appendChild(span);
    todoDiv.appendChild(closeBtn);

    span.addEventListener('dblclick', editToDo);
    span.addEventListener('blur', (event) => event.currentTarget.contentEditable = false);

    checkbox.addEventListener("change", updateDoneTasks);
    closeBtn.addEventListener("click", deleteToDo.bind(null, id));

    todoDiv.id = id;

    return todoDiv;
}

function editToDo(event) {
    const span = event.currentTarget;
    span.contentEditable = true;
    span.focus();
    setCursorToEnd(span);
}

function appendToDo(todo) {
    todosDiv.appendChild(todo);
}

function updateDoneTasks() {
    const todos = document.querySelectorAll(".todo-list__todo");

    for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];

        const checkbox = todo.querySelector("input[type=checkbox]");
        const index = todosInfoArr.findIndex(todoInfo => todoInfo.id === todo.id);

        if (index >= 0) {
            todosInfoArr[index].done = checkbox.checked;
        }
    }
}

function deleteToDo(id) {
    const index = todosInfoArr.findIndex(todoInfo => todoInfo.id === id);
    if (index >= 0) {
        todosInfoArr.splice(index, 1);
    }

    const todo = document.getElementById(id);
    todosDiv.removeChild(todo);
    updateEmptyList();
}

function addToDo(event) {
    const container = document.querySelector(".todo-list__wrapper");
    const todo = createToDo(event.currentTarget.value, "todo#" + generateUUID());

    const todoInfo = {
        textContent: todo.getElementsByTagName("span")[0].textContent,
        done: todo.getElementsByTagName("input")[0].checked,
        id: todo.id,
        creationDate: new Date()
    }
    todosInfoArr.push(todoInfo);

    appendToDo(todo);

    container.scrollTop = container.scrollHeight;
    event.currentTarget.value = '';
    updateEmptyList();
}


function setToDos(arr) {
    for (let todoInfo of arr) {
        const todo = createToDo(todoInfo.textContent, todoInfo.id);
        todo.getElementsByTagName("input")[0].checked = todoInfo.done;
        appendToDo(todo);
    }
}

function getToDosFromLS() {
    const todosFromLS = JSON.parse(localStorage.getItem("todos"));
    if (todosFromLS !== null && todosFromLS != '') {
        return todosFromLS;
    }
    return [];
}


export function setToDosFromLS() {
    todosInfoArr = getToDosFromLS();
    setToDos(todosInfoArr);
}

function toggleTodoList() {
    todoListContainer.classList.toggle("open");
    todoOpenButton.classList.toggle("active");
}

export function updateEmptyList() {
    const taskTranslation = `"${translations[settings.language].todoList.noTasksTranslation}"`;
    todosDiv.style.setProperty('--content-text', taskTranslation);
    if (todosDiv.children.length === 0) {
        todosDiv.classList.add("empty");
    } else {
        todosDiv.classList.remove("empty");
    }
}

export function updateBtnTranslation() {
    addToDoButton.placeholder = translations[settings.language].todoList.addTaskPlaceholderTranslation;
}

/* function filterTodos(filter) {
    if (filter === "done") {
        return todosInfoArr.filter(todoInfo => todoInfo.done);
    }
} */

export function startToDosLogic() {
    adjustSelectWidth.apply(groupSelect);
    groupSelect.addEventListener("change", adjustSelectWidth);
    updateBtnTranslation()
    updateEmptyList();
    todoOpenButton.addEventListener("click", toggleTodoList);
    addToDoButton.addEventListener('change', addToDo);
}


