const button = document.querySelector("#btn");
const card = document.querySelector("#card-right");
const type = document.querySelector("#card-input");

function createCard(value) {
    return `
   <div class="forms">
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
function validate(type) {
    if (type.length < 3) {
        alert("fill in the blank");
        type.focus();
        return false;
    }
    return true;
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
});
