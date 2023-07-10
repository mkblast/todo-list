import { todo } from "./todo";

function newTodo() {
  const title = prompt("New todo");
  const description = prompt("Description");
  const due = prompt("Due");

  return new todo(title, description, due);

}

function displayTodo() {
  const todo = newTodo();
  const listView = document.querySelector(".list-view");

  const newTodoItem = document.createElement("div");

  const todoTitle = document.createElement("p");
  const todoDescription = document.createElement("p");
  const todoDue = document.createElement("p");

  todoTitle.textContent = todo.title;
  todoDescription.textContent = todo.description;
  todoDue.textContent = todo.due;

  newTodoItem.appendChild(todoTitle);
  newTodoItem.appendChild(todoDescription);
  newTodoItem.appendChild(todoDue);

  listView.appendChild(newTodoItem);
}

export { displayTodo }
