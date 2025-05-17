document.addEventListener('DOMContentLoaded', () => {
  // --- SIGNUP PAGE LOGIC ---
  // ...existing code...
const signupBtn = document.getElementById('signup-btn');
if (signupBtn) {
  signupBtn.onclick = function() {
    const name = document.getElementById('signup-name').value;
    const age = document.getElementById('signup-age').value;
    const email = document.getElementById('signup-email').value;
    const phone = document.getElementById('signup-phone').value;
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    const msg = document.getElementById('signup-message');
    if (name && age && email && phone && username && password) {
      localStorage.setItem('todo-name', name);
      localStorage.setItem('todo-age', age);
      localStorage.setItem('todo-email', email);
      localStorage.setItem('todo-phone', phone);
      localStorage.setItem('todo-username', username);
      localStorage.setItem('todo-password', password);
      msg.textContent = "Sign up successful! Redirecting...";
      setTimeout(() => window.location.href = "signin.html", 1000);
    } else {
      msg.textContent = "Please fill all fields.";
    }
  };
  return; // Stop further execution on signup page
}
// ...existing code...

  // --- SIGNIN PAGE LOGIC ---
  const signinBtn = document.getElementById('signin-btn');
  if (signinBtn) {
    signinBtn.onclick = function() {
      const username = document.getElementById('signin-username').value;
      const password = document.getElementById('signin-password').value;
      const storedUser = localStorage.getItem('todo-username');
      const storedPass = localStorage.getItem('todo-password');
      const msg = document.getElementById('signin-message');
      if (username === storedUser && password === storedPass) {
        localStorage.setItem('todo-loggedin', 'true');
        window.location.href = "index.html";
      } else {
        msg.textContent = "Invalid credentials.";
      }
    };
    return; // Stop further execution on signin page
  }

  // --- INDEX (TODO) PAGE LOGIC ---
  // Protect page
  if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
    if (localStorage.getItem('todo-loggedin') !== 'true') {
      window.location.href = "signin.html";
      return;
    }
  }

  // To-Do List Logic
  const taskInput = document.getElementById('task-input');
  const addTaskBtn = document.getElementById('add-task');
  const taskList = document.getElementById('task-list');
  const signoutBtn = document.getElementById('signout-btn');

  // Only run if on the todo page
  if (taskInput && addTaskBtn && taskList) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const saveTasks = () => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const renderTasks = () => {
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;
        if (task.completed) {
          li.classList.add('completed');
        }

        // Toggle completion
        li.addEventListener('click', () => {
          tasks[index].completed = !tasks[index].completed;
          saveTasks();
          renderTasks();
        });

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          tasks.splice(index, 1);
          saveTasks();
          renderTasks();
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
      });
    };

    addTaskBtn.addEventListener('click', () => {
      const text = taskInput.value.trim();
      if (text !== '') {
        tasks.push({ text, completed: false });
        saveTasks();
        renderTasks();
        taskInput.value = '';
      }
    });

    renderTasks();
  }

  // Sign out logic
  if (signoutBtn) {
    signoutBtn.onclick = function() {
      localStorage.setItem('todo-loggedin', 'false');
      window.location.href = "signin.html";
    };
  }
});