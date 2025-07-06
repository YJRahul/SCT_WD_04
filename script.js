const taskInput = document.getElementById('taskInput');
const dateInput = document.getElementById('dateInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

let tasks = [];

addBtn.addEventListener('click', addTask);

function addTask() {
  const title = taskInput.value.trim();
  const dateTime = dateInput.value;

  if (!title) {
    alert('Please enter a task.');
    return;
  }

  const task = {
    id: Date.now(),
    title,
    dateTime,
    completed: false
  };

  tasks.push(task);
  taskInput.value = '';
  dateInput.value = '';
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = '';

  tasks
    .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime))
    .forEach(task => {
      const li = document.createElement('li');
      li.className = 'task' + (task.completed ? ' completed' : '');

      const infoDiv = document.createElement('div');
      infoDiv.className = 'info';
      infoDiv.innerHTML = `
        <div class="title">${task.title}</div>
        <div class="datetime">${task.dateTime ? new Date(task.dateTime).toLocaleString() : ''}</div>
      `;

      const actionsDiv = document.createElement('div');
      actionsDiv.className = 'actions';

      const completeBtn = document.createElement('button');
      completeBtn.textContent = task.completed ? 'Undo' : 'Done';
      completeBtn.onclick = () => toggleComplete(task.id);

      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit';
      editBtn.onclick = () => editTask(task.id);

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.onclick = () => deleteTask(task.id);

      actionsDiv.append(completeBtn, editBtn, deleteBtn);

      li.append(infoDiv, actionsDiv);
      taskList.appendChild(li);
    });
}

function toggleComplete(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

function editTask(id) {
  const task = tasks.find(t => t.id === id);
  const newTitle = prompt("Edit task:", task.title);
  if (newTitle !== null) {
    task.title = newTitle.trim();
  }

  const newDate = prompt("Edit date/time (YYYY-MM-DDTHH:MM):", task.dateTime);
  if (newDate !== null) {
    task.dateTime = newDate.trim();
  }

  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}
