import { setCursorToEnd, generateUUID, adjustSelectWidth } from "./helper.js";
import translations from "./translate.js";
import { settings, updateHotKeys } from "./settings.js";

const todoListContainer = document.querySelector(".todo-list__container");
const todoOpenButton = document.querySelector(".todo-list-open-button");
const addToDoButton = document.querySelector(".todo-list__add-button");
const todosDiv = document.querySelector(".todo-list");
export const groupSelect = document.querySelector("[name='todoGroups']");

export let todosInfoArr = [];

function createToDo(value, id) {
  const todoDiv = document.createElement("li");
  const checkbox = document.createElement("input");
  const span = document.createElement("span");
  const closeBtn = document.createElement("button");

  todoDiv.className = "todo-list__todo";
  checkbox.className = "todo-list__checkbox";
  checkbox.type = "checkbox";
  span.className = "todo-list__text";
  span.textContent = value;
  closeBtn.className = "todo-list__delete-button";

  todoDiv.appendChild(checkbox);
  todoDiv.appendChild(span);
  todoDiv.appendChild(closeBtn);

  // initialization
  span.contentEditable = false;

  todoDiv.addEventListener("dblclick", enableEditMode);
  span.addEventListener("blur", () => {
    const index = findToDoInfo(id);
    applyChanges(span, todosInfoArr[index]);
  });

  span.addEventListener("focus", updateHotKeys);
  span.addEventListener("blur", updateHotKeys);

  span.addEventListener("keydown", (event) => {
    if (event.currentTarget.textContent === "" && event.key === "Backspace") {
      deleteToDo(event.currentTarget.parentElement.id);
    } else if (event.key === "Enter") {
      const index = findToDoInfo(id);
      applyChanges(event.currentTarget, todosInfoArr[index]);
    }
  });

  checkbox.addEventListener("change", updateDoneTasks);
  checkbox.addEventListener("change", updateToDosGroup);
  closeBtn.addEventListener("click", deleteToDo.bind(null, id));

  todoDiv.id = id;

  return todoDiv;
}

function enableEditMode(event) {
  const span = event.currentTarget.querySelector("span");
  span.contentEditable = true;
  span.focus();
  setCursorToEnd(span);
}

function applyChanges(span, todoInfo) {
  span.contentEditable = false;
  if (span.textContent) {
    todoInfo.textContent = span.textContent;
  }
}

function appendToDo(todo) {
  todosDiv.appendChild(todo);
}

function updateDoneTasks() {
  const todos = document.querySelectorAll(".todo-list__todo");

  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];

    const checkbox = todo.querySelector("input[type=checkbox]");
    const index = todosInfoArr.findIndex((todoInfo) => todoInfo.id === todo.id);

    if (index >= 0) {
      todosInfoArr[index].done = checkbox.checked;
    }
  }
}

function deleteToDo(id) {
  const index = todosInfoArr.findIndex((todoInfo) => todoInfo.id === id);
  if (index >= 0) {
    todosInfoArr.splice(index, 1);
  }

  const todo = document.getElementById(id);
  todosDiv.removeChild(todo);
  updateEmptyList();
}

function findToDoInfo(id) {
  return todosInfoArr.findIndex((todoInfo) => todoInfo.id === id);
}

function addToDo(event) {
  const container = document.querySelector(".todo-list__wrapper");
  const todo = createToDo(event.currentTarget.value, "todo#" + generateUUID());

  const todoInfo = {
    textContent: todo.getElementsByTagName("span")[0].textContent,
    done: todo.getElementsByTagName("input")[0].checked,
    id: todo.id,
    creationDate: new Date(),
  };

  const filter = groupSelect.options[groupSelect.selectedIndex].value;
  updateToDo(filter, todo, todoInfo);

  todosInfoArr.push(todoInfo);

  appendToDo(todo);

  container.scrollTop = container.scrollHeight;
  event.currentTarget.value = "";
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
  if (todosFromLS !== null && todosFromLS != "") {
    return todosFromLS;
  }
  return [];
}

export function setToDosFromLS() {
  const selectFromLS = localStorage.getItem("groupSelect");
  if (selectFromLS !== null && selectFromLS !== "") {
    groupSelect.value = selectFromLS;
  }
  todosInfoArr = getToDosFromLS();
  const filter = groupSelect.value;
  setToDos(filterTodos(filter));
}

function toggleTodoList() {
  todoListContainer.classList.toggle("open");
  todoOpenButton.classList.toggle("active");
}

export function updateEmptyList() {
  const taskTranslation = `"${
    translations[settings.language].todoList.noTasksTranslation
  }"`;
  todosDiv.style.setProperty("--content-text", taskTranslation);
  if (todosDiv.children.length === 0) {
    todosDiv.classList.add("empty");
  } else {
    todosDiv.classList.remove("empty");
  }
}

export function updateTranslations() {
  addToDoButton.placeholder =
    translations[settings.language].todoList.addTaskPlaceholderTranslation;
  const filterOptions = todoListContainer.querySelectorAll(
    ".todo-list__header select option"
  );
  const optionTranslations =
    translations[settings.language].todoList.groupsTranslation;
  for (let i = 0; i < filterOptions.length; i++) {
    filterOptions[i].textContent = optionTranslations[filterOptions[i].value];
  }
  updateEmptyList();
}

function filterTodos(filter) {
  if (filter === "done") {
    return todosInfoArr.filter((todoInfo) => todoInfo.done);
  } else if (filter === "undone") {
    return todosInfoArr.filter((todoInfo) => !todoInfo.done);
  } else if (filter === "today") {
    return todosInfoArr.filter((todoInfo) => {
      const creationDate = new Date(todoInfo.creationDate);
      const today = new Date();
      return (
        creationDate.getDate() === today.getDate() &&
        creationDate.getMonth() === today.getMonth() &&
        creationDate.getFullYear() === today.getFullYear()
      );
    });
  }
  return todosInfoArr;
}

function removeChilds(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

function updateToDosGroup() {
  const select = groupSelect;
  const filter = select.options[select.selectedIndex].value;
  removeChilds(todosDiv);
  setToDos(filterTodos(filter));
  updateEmptyList();
}

function updateToDo(filter, todo, todoInfo) {
  const checkbox = todo.querySelector("input[type=checkbox]");
  if (filter === "done") {
    checkbox.checked = true;
    todoInfo.done = checkbox.checked;
  }
}

export function startToDosLogic() {
  adjustSelectWidth.apply(groupSelect);

  groupSelect.addEventListener("change", adjustSelectWidth);

  groupSelect.addEventListener("change", updateToDosGroup);

  updateTranslations();

  updateEmptyList();

  todoOpenButton.addEventListener("click", toggleTodoList);

  addToDoButton.addEventListener("keydown", (event) => {
    if (event.key === "Enter") addToDo(event);
  });
}
