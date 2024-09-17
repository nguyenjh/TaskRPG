const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);

// Add event listener for adding tasks
addTaskBtn.addEventListener('click', addTask);

function addTask() {
    const task = taskInput.value;
    const exp = expPerTask; 

    if (task) {
        const tasks = getTasksFromStorage();
        // Store as object in localStorage
        tasks.push({ task, exp });  
        // Save updated tasks list
        localStorage.setItem('tasks', JSON.stringify(tasks));  

        // Add task to the DOM
        addTaskToDOM(task, exp);  
        // Clear the input field  
        taskInput.value = ''; 
    } else {
        alert('Please enter a task.');
    }
}

// Load tasks from localStorage into DOM
function loadTasks() {
    const tasks = getTasksFromStorage();
    tasks.forEach(item => addTaskToDOM(item.task, item.exp));
}

// Helper function to get tasks from localStorage
function getTasksFromStorage() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

// Helper function to add task to DOM
function addTaskToDOM(task, exp) {
    const li = document.createElement('li');
    // Show the task and EXP together
    li.textContent = `${task} (EXP: ${exp})`;
    taskList.appendChild(li);
}

// Add event listener for deleting tasks
taskList.addEventListener('click', completeTask);

// How much EXP is given per completed task
const expPerTask = 10;

// Remove Task and Update EXP Points
function completeTask(e) {
    if (e.target.tagName === 'LI') {
        const taskText = e.target.textContent.split(' (EXP:')[0];
        // Remove from DOM
        e.target.remove();
        // Remove from localStorage
        removeTaskFromStorage(taskText);
        awardEXP(expPerTask);
    }
}

function awardEXP(exp) {
    let currEXP = getEXPFromStorage();
    currEXP += exp;
    localStorage.setItem('exp', currEXP);
    updateEXPDisplay();
}

// Helper function to get EXP amount from localStorage
function getEXPFromStorage() {
    let exp = localStorage.getItem('exp');
    return exp ? parseInt(exp) : 0;
}

function updateEXPDisplay() {
    const expDisplay = document.getElementById('expDisplay');
    const currEXP = getEXPFromStorage();
    expDisplay.textContent = `EXP: ${currEXP}`;
}

document.addEventListener('DOMContentLoaded', updateEXPDisplay);

// Helper function to remove task from localStorage
function removeTaskFromStorage(taskText) {
    const tasks = getTasksFromStorage();
    const updatedTasks = tasks.filter(item => item.task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

// --- Profile Photo Upload Function
let profilePic = document.getElementById('profilePic');
let inputFile = document.getElementById('inputFile');

// Load the saved image from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
    const storedImage = localStorage.getItem('profileImage');
    if (storedImage) {
        // set img source as the saved image
        profilePic.src = storedImage;
    }
});

// Handle img upload and save to localStorage
inputFile.onchange = function() {
    const file = inputFile.files[0];
    const reader = new FileReader();

    // Convert the uploaded file to Base64
    reader.onloadend = function() {
        // Base64 string of the image
        const base64String = reader.result;
        // set the profile picture to the uploaded image
        profilePic.src = base64String;
        // save img to localStorage
        localStorage.setItem('profileImage', base64String);
    };

    // read img file as a Data URL (Base64)
    if (file) {
        reader.readAsDataURL(file);
    }
};


// --- Menu Button
const menuBtn = document.getElementById('menu-btn');
const gameboyMenu = document.getElementById('gameboy-menu');

menuBtn.addEventListener('click', function () {
    if (progressContainer.classList != 'hidden') {
        progressContainer.classList.toggle('hidden');
    }
    gameboyMenu.classList.toggle('hidden');
});

// --- Menu Option Function
const menuOptions = document.querySelectorAll('.menu-option');
const viewTasksBtn = document.getElementById('viewTasksBtn');
const taskContainer = document.getElementById('taskContainer');
const progressContainer = document.getElementById('progressContainer');
const btnContainer = document.querySelector('.btnContainer');

// Handle clicking on the menu option
menuOptions.forEach(option => {
    option.addEventListener('click', function () {
        console.log(`Selected: ${option.textContent}`);
        switch (option.textContent) {
            case 'View Progress':
                // Code to show Progress
                gameboyMenu.classList.toggle('hidden');
                progressContainer.classList.toggle('hidden');
                break;
            case 'To-Do Tasks':
                // Toggle visibility of the to-do list
                taskContainer.classList.toggle('hidden');
                btnContainer.classList.toggle('hidden');
                break;
            case 'Shop':
                // Code to open the shop
                alert('Shop Screen');
                break;
            case 'Settings':
                // Code to show settings
                alert('Settings Screen');
                break;
        }
    });
});