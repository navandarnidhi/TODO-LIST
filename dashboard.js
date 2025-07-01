const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const filter = document.getElementById("filter");
const logoutBtn = document.getElementById("logoutBtn");
const loggedInPhone = localStorage.getItem("loggedInUser");

// ⛔ Redirect if not logged in
if (!loggedInPhone) {
  window.location.href = "index.html";
}

// 🌐 Get all users
let users = JSON.parse(localStorage.getItem("users")) || [];

const currentuserDetails = users.find(user=>user.phone == loggedInPhone);

document.getElementById("nameDisplay").innerHTML = currentuserDetails.name;


// 🎯 Find current logged in user
let currentUser = users.find((user) => user.phone == loggedInPhone);

// 🔄 Update current user's todos in localStorage
function updateUserTodos() {
  users = users.map((user) =>
    user.phone === currentUser.phone ? currentUser : user
  );
  localStorage.setItem("users", JSON.stringify(users));
}

// 🧱 Create and show a task in the DOM
function renderTask(taskObj) {
  const li = document.createElement("li");

  li.innerHTML = `
    <div class="task-info">
      <label>
        <input type="checkbox" class="checkBox" ${taskObj.completed ? "checked" : ""} />
        <i class="bi ${taskObj.completed ? "bi-check-circle-fill" : "bi-check-circle"} checkIcon"></i>
      </label>
      <p>${taskObj.text}</p>
    </div>
    <div class="task-del">
      <i class="bi bi-trash3 deleteBtn"></i>
    </div>
  `;

  const checkBox = li.querySelector(".checkBox");
  const checkIcon = li.querySelector(".checkIcon");

  if (taskObj.completed) {
    li.classList.add("completed");
  }

  // ✅ Toggle completed state
  checkBox.addEventListener("change", () => {
    taskObj.completed = checkBox.checked;
    updateUserTodos();

    checkIcon.classList.toggle("bi-check-circle-fill", checkBox.checked);
    checkIcon.classList.toggle("bi-check-circle", !checkBox.checked);
    li.classList.toggle("completed", checkBox.checked);
  });

  // 🗑️ Delete task
  li.querySelector(".deleteBtn").addEventListener("click", () => {
    li.remove();
    currentUser.todos = currentUser.todos.filter((t) => t !== taskObj);
    updateUserTodos();
  });

  todoList.appendChild(li);
}

// ➕ Add new task
function addTask() {
  const newTask = todoInput.value.trim();
  if (!newTask) return;

  const taskObj = { text: newTask, completed: false };
  currentUser.todos.push(taskObj);
  updateUserTodos();
  renderTask(taskObj);
  todoInput.value = "";
}

// 🔁 Load existing todos on page load
currentUser.todos.forEach(renderTask);

// ➕ Add task on button click
addBtn.addEventListener("click", addTask);

// 🔍 Filter functionality
filter.addEventListener("change", () => {
  const state = filter.value;
  todoList.innerHTML = "";

  if (state === "all") {
    currentUser.todos.forEach(renderTask);
  } else if (state === "completed") {
    currentUser.todos.filter((t) => t.completed).forEach(renderTask);
  } else if (state === "pending") {
    currentUser.todos.filter((t) => !t.completed).forEach(renderTask);
  }
});

logoutBtn.addEventListener("click", () => {
  // Remove the current user session
  localStorage.removeItem("loggedInUser");

  // Optionally show a message or confirmation
  alert("You have been logged out!");

  // Redirect to login page
  window.location.href = "index.html";
});

