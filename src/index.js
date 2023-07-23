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

  newTodo.classList.add("todo");

  todoView.appendChild(newTodo);
  deleteButton(newTodo);
  console.log(currentProject);
  localStorage.setItem(currentProject, todoView.innerHTML);
}

function createProject() {
  let projectName;
  do {
    projectName = prompt("Gimme the name:")
  } while (projectName == "");

  console.log(projectName != null)
  if (projectName != null) {
    const projectView = document.querySelector(".project-view");
    const project = document.createElement("button");
    project.textContent = projectName;
    project.setAttribute("data-name", projectName);
    project.classList.add("project");

    switchProject(project);
    console.log(project.getAttribute("data-name"))

    projectView.appendChild(project);

    localStorage.setItem("projects", projectView.innerHTML);
  }
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
