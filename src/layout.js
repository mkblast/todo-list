import { todo } from "./todo";

function newTodo() {
  const title = prompt("New todo");
  const description = prompt("Description");

  return new todo(title, description);
}

function displayTodo() {
  const todo = newTodo();
  const listView = document.querySelector(".list-view");

  const newTodoItem = document.createElement("div");

  const todoTitle = document.createElement("p");
  const todoDescription = document.createElement("p");
  const todoDue = document.createElement("input");

  const deleteButton = document.createElement("button");
  const doneButton = document.createElement("button");

  todoTitle.textContent = todo.title;

  todoDescription.textContent = todo.description;

  todoDue.setAttribute("type", "date");

  doneButton.addEventListener("click", () => {
    deleteTodo(newTodoItem)
  });
  doneButton.textContent = "Done";

  deleteButton.addEventListener("click", () => {
    deleteTodo(newTodoItem)
  });
  deleteButton.textContent = "Remove";

  newTodoItem.appendChild(todoTitle);
  newTodoItem.appendChild(todoDescription);
  newTodoItem.appendChild(todoDue);
  newTodoItem.appendChild(doneButton);
  newTodoItem.appendChild(deleteButton);

  newTodoItem.classList.add("todo");

  listView.appendChild(newTodoItem);
}

function deleteTodo(parent) {
  parent.remove();
}

export { displayTodo }
