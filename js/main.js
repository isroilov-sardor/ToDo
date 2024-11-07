const button = document.querySelector("#btn");
const card = document.querySelector("#card-right");
const type = document.querySelector("#card-input");

function createCard(value) {
    return `
        <div class="forms" data-id="${value.id}">
            <div class="form-same">
                <img src="./images/card-right-first-image.svg" width="40" height="40" alt="">
                <div class="todo-name">${value.todolist}</div>
            </div>
            <div class="change-buttons">
                <button class="change-button">...</button>
                <button class="del-button">--</button>
            </div>
        </div>
    `;
}

function getDataFromLocalStorage() {
    let data = [];
    if (localStorage.getItem("todos")) {
        data = JSON.parse(localStorage.getItem("todos"));
    }
    return data;
}

function validate(inputElement) {
    if (inputElement.value.length < 3) {
        alert("Iltimos, maydonni to'ldiring");
        inputElement.focus();
        return false;
    }
    return true;
}

function deleteCard(id) {
    let todos = getDataFromLocalStorage();
    todos = todos.filter((todo) => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(todos));
    const cardElement = document.querySelector(`.forms[data-id="${id}"]`);
    if (cardElement) {
        cardElement.remove();
    }
}

function changeCard(id) {
    const todos = getDataFromLocalStorage();
    const todo = todos.find((todo) => todo.id === id);

    if (todo) {
        const newTodo = prompt("Yangi qiymat kiriting:", todo.todolist);
        if (newTodo && newTodo.length >= 3) {
            todo.todolist = newTodo;
            localStorage.setItem("todos", JSON.stringify(todos));
            const cardElement = document.querySelector(
                `.forms[data-id="${id}"] .todo-name`
            );
            if (cardElement) {
                cardElement.textContent = newTodo;
            }
        } else {
            alert("Iltimos, 3 ta belgidan ko'proq kiriting.");
        }
    }
}

function deleteAllCards(event) {
  event.stopPropagation();
    localStorage.removeItem("todos");
    card.innerHTML = "";
}

button &&
    button.addEventListener("click", function (event) {
        event.preventDefault();
        const isValid = validate(type);
        if (!isValid) {
            return;
        }
        const data = {
            id: Date.now(),
            todolist: type.value,
        };
        const form = createCard(data);
        card.innerHTML += form;
        let todos = getDataFromLocalStorage();
        todos.push(data);
        localStorage.setItem("todos", JSON.stringify(todos));
        type.value = "";
    });

document.addEventListener("DOMContentLoaded", function () {
    let todos = getDataFromLocalStorage();
    todos.forEach((element) => {
        let ssikl = createCard(element);
        card.innerHTML += ssikl;
    });

    const delAllButton = document.querySelector("#del-all-button");
    if (delAllButton) {
        delAllButton.addEventListener("click", function (event) {
            deleteAllCards(event);
        });
    }
});

card.addEventListener("click", function (event) {
    const cardElement = event.target.closest(".forms");
    if (cardElement) {
        const cardId = Number(cardElement.getAttribute("data-id"));

        if (event.target.classList.contains("del-button")) {
            deleteCard(cardId);
        }

        if (event.target.classList.contains("change-button")) {
            changeCard(cardId);
        }
    }
});
