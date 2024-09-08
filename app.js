const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);

// Add event listener for adding tasks
addTaskBtn.addEventListener('click', addTask);

function addTask() {
    const task = taskInput.value;
    
    if (task) {
        const tasks = getTasksFromStorage();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));  // Save to localStorage
        addTaskToDOM(task);
        // Clear input field
        taskInput.value = '';
    }
}

// Load tasks from localStorage into DOM
function loadTasks() {
    const tasks = getTasksFromStorage();
    tasks.forEach(task => addTaskToDOM(task));
}

// Helper function to get tasks from localStorage
function getTasksFromStorage() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

// Helper function to add task to DOM
function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.textContent = task;
    taskList.appendChild(li);
}

// Add event listener for deleting tasks
taskList.addEventListener('click', removeTask);

function removeTask(e) {
    if (e.target.tagName === 'LI') {
        const task = e.target.textContent;
        // Remove from DOM
        e.target.remove();
        // Remove from localStorage
        removeTaskFromStorage(task);
    }
}

// Helper function to remove task from localStorage
function removeTaskFromStorage(task) {
    const tasks = getTasksFromStorage();
    const updatedTasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

// --- Profile Photo Upload Function
let profilePic = document.getElementById('profilePic');
let inputFile = document.getElementById('inputFile');

inputFile.onchange = function() {
    profilePic.src = URL.createObjectURL(inputFile.files[0])
}