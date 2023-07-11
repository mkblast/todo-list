import "./style.css"

window.onload = loadFromStorage;

function loadFromStorage() {
  const htmlParser = new DOMParser();
  const todoView = document.querySelector(".todo-view");
  const storage = localStorage.getItem("todoes");

  if (storage != null) {
    const html = htmlParser.parseFromString(storage, "text/html");

    todoView.innerHTML = html.body.innerHTML;

    const buttons = document.querySelectorAll(".delete");
    buttons.forEach((e) => {
      e.addEventListener(("click"), () => {
        deleteButtonEvent(e.parentNode);
      })
    })
  }
}

function deleteButton(parent) {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete");

  deleteButton.addEventListener("click", () => {
    deleteButtonEvent(parent);
  })

  parent.appendChild(deleteButton);
}

function deleteButtonEvent(parent) {
  const todoView = document.querySelector(".todo-view");
  parent.remove();
  localStorage.setItem("todoes", todoView.innerHTML);
}

function addNewTodo() {
  const todoView = document.querySelector(".todo-view");
  const newTodo = document.createElement("div");

  newTodo.innerHTML = `
  <input type="text" class="title">
  <input type="text" class="decription">
  <input type="date" class="due">
  <button class="done">Done</button>
  `;

  todoView.appendChild(newTodo);
  deleteButton(newTodo);
  localStorage.setItem("todoes", todoView.innerHTML);
}

function createProject() {
  const projectButton = document.querySelector(".project-view")
  const projectName = prompt("Gimme the name");
  const button = document.createElement("button");
  button.textContent = projectName;
  projectButton.appendChild(button);
}

const newTodoButton = document.querySelector(".new");
newTodoButton.addEventListener("click", addNewTodo);

const newProjectButton = document.querySelector(".project-view");
newProjectButton.addEventListener("click", createProject);
