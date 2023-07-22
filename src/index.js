import "./style.css";

let currentProject = "Default";

window.onload = loadProjectsFromStroga;

function loadProjectsFromStroga() {
  const storage = localStorage.getItem("projects");

  if (storage != null) {
    const htmlParser = new DOMParser();
    const projectView = document.querySelector(".project-view");
    const html = htmlParser.parseFromString(storage, "text/html");

    projectView.innerHTML = html.body.innerHTML;

  }

  const project = document.querySelectorAll(".project");

  project.forEach((e) => {
    switchProject(e);
    console.log(e);
  })

  loadTodoesFromStorage();

}

function loadTodoesFromStorage() {
  const storage = localStorage.getItem(currentProject);
  const todoView = document.querySelector(".todo-view");

  if (storage != null) {
    const htmlParser = new DOMParser();
    const html = htmlParser.parseFromString(storage, "text/html");

    todoView.innerHTML = html.body.innerHTML;

    const buttons = document.querySelectorAll(".delete");
    buttons.forEach((e) => {
      e.addEventListener(("click"), () => {
        deleteButtonEvent(e.parentNode);
      })
    })
  } else {
    todoView.innerHTML = ""
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
  localStorage.setItem(currentProject, todoView.innerHTML);
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
  localStorage.setItem(currentProject, todoView.innerHTML);
}

function createProject() {
  const projectView = document.querySelector(".project-view");
  const projectName = prompt("Gimme the name");
  const button = document.createElement("button");

  button.textContent = projectName;
  button.setAttribute("data-name", projectName);
  button.classList.add("project");

  switchProject(button);

  projectView.appendChild(button);

  localStorage.setItem("projects", projectView.innerHTML);
}

function switchProject(project) {
  project.addEventListener("click", () => {
    currentProject = project.getAttribute("data-name");
    loadTodoesFromStorage()
  })
}

const newTodoButton = document.querySelector(".new");
newTodoButton.addEventListener("click", addNewTodo);

const newProjectButton = document.querySelector(".new-project");
newProjectButton.addEventListener("click", createProject);
