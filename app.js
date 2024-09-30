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
const shopContainer = document.getElementById('shopContainer');
const shopBtn = document.getElementById('shopBtn');
const buyBtns = document.querySelectorAll('.buyBtn');
const settingsContainer = document.getElementById('settingsContainer');
const settingsBtn = document.getElementById('settingsBtn');
const backgroundsBtn = document.getElementById('backgroundsBtn');
const backgroundsItems = document.getElementById('backgroundsItems');
const themesBtn = document.getElementById('themesBtn');
const themesItems = document.getElementById('themesItems');

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
                if (shopContainer.classList != 'hidden') {
                    shopContainer.classList.toggle('hidden');
                    btnContainer.classList.toggle('hidden');
                }
                if (settingsContainer.classList != 'hidden') {
                    settingsContainer.classList.toggle('hidden');
                    btnContainer.classList.toggle('hidden');
                }
                if (btnContainer.classList != 'hidden') {
                    btnContainer.classList.toggle('hidden');
                }
                taskContainer.classList.toggle('hidden');
                break;
            case 'Shop':
                // Code to open the shop
                if (taskContainer.classList != 'hidden') {
                    taskContainer.classList.toggle('hidden');
                    btnContainer.classList.toggle('hidden');
                }
                if (settingsContainer.classList != 'hidden') {
                    settingsContainer.classList.toggle('hidden');
                    btnContainer.classList.toggle('hidden');
                }
                if (btnContainer.classList != 'hidden') {
                    btnContainer.classList.toggle('hidden');
                }
                shopContainer.classList.toggle('hidden');
                break;
            case 'Settings':
                // Code to show settings
                if (taskContainer.classList != 'hidden') {
                    taskContainer.classList.toggle('hidden');
                    btnContainer.classList.toggle('hidden');
                }
                if (shopContainer.classList != 'hidden') {
                    shopContainer.classList.toggle('hidden');
                    btnContainer.classList.toggle('hidden');
                }
                if (btnContainer.classList != 'hidden') {
                    btnContainer.classList.toggle('hidden');
                }
                settingsContainer.classList.toggle('hidden');
                break;
        }
    });
});

// Toggles shop's backgrounds category
backgroundsBtn.addEventListener('click', function () {
    if (themesItems.classList != 'hidden') {
        themesItems.classList.toggle('hidden');
    }
    backgroundsItems.classList.toggle('hidden');
});

// Toggles shop's themes category
themesBtn.addEventListener('click', function () {
    if (backgroundsItems.classList != 'hidden') {
        backgroundsItems.classList.toggle('hidden');
    }
    themesItems.classList.toggle('hidden');
});

// Handle buying items
buyBtns.forEach(button => {
    button.addEventListener('click', function() {
        const itemCost = parseInt(this.getAttribute('data-cost'));
        const itemName = this.getAttribute('data-item');
        
        // get the current EXP from localStorage
        let currentEXP = getEXPFromStorage();
        let purchasedItems = getPurchasedItemsFromStorage();  

        // checks if user has purchased item before
        if (purchasedItems.includes(itemName)) {
            // allow the user to select item for free
            applyCustomization(itemName);
            alert(`You have already purchased ${itemName}.\nSwitching to it for free!`);
        } else {
        // check if user has enough EXP
            if (currentEXP >= itemCost) {
                // deduct cost and update EXP
                currentEXP -= itemCost;
                localStorage.setItem('exp', currentEXP);
                // update EXP display
                updateEXPDisplay();  

                // add the item to the purchased items array
                purchasedItems.push(itemName);
                localStorage.setItem('purchasedItems', JSON.stringify(purchasedItems));

                // apply purchased customization
                applyCustomization(itemName);

                alert(`You bought ${itemName}!`);
            } else {
                alert('Not enough EXP!');
            }
        }
    });
});

// Helper function to apply the customization
function applyCustomization(itemName) {
    const gameboy = document.querySelector('.container');
    const gameboyScreen = document.querySelector('.card');
    const gameboyText = document.querySelector('.headerText');

    // Remove all theme classes to reset styles
    gameboy.classList.remove('sci-fi');
    gameboyScreen.classList.remove('sci-fi');
    gameboyText.classList.remove('sci-fi');

    switch (itemName) {
        case 'Default_Background':
            document.body.style.backgroundImage = "url('/images/simple_natural_landscape_pixel_art_background/origbig.png')";
            localStorage.setItem('background', 'Default_Background');
            break;
        case 'City_Skyline_Background':
            document.body.style.backgroundImage = "url('/images/city_parallax_background_with_buildings_pixel_art/10.png')";
            localStorage.setItem('background', 'City_Skyline_Background');
            break;
        case 'Mountain_Range_Background':
            document.body.style.backgroundImage = "url('/images/nature_landscape_pixel_background/Background/origbig.png')";
            localStorage.setItem('background', 'Mountain_Range_Background');
            break;
        case 'Grey_Forest_Background':
            document.body.style.backgroundImage = "url('/images/grey_forest_landscape.jpg')";
            localStorage.setItem('background', 'Grey_Forest_Background');
            break;
        case 'Sci_Fi_Theme':
            gameboy.classList.add('sci-fi');  // Change Gameboy's appearance
            gameboyScreen.classList.add('sci-fi');  // Change the Gameboy screen's background
            gameboyText.classList.add('sci-fi');
            document.body.style.backgroundImage = "url('/images/space_background/space_background.png')";
            localStorage.setItem('background', 'Sci_Fi_Theme');
            break;
        // add more cases for other items later on
    }
}

// Helper function to get purchased items from localStorage
function getPurchasedItemsFromStorage() {
    let purchasedItems = localStorage.getItem('purchasedItems');
    // return empty array if no item purchased
    return purchasedItems ? JSON.parse(purchasedItems) : [];
}

// Load saved customizations on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedBackground = localStorage.getItem('background');
    if (savedBackground) {
        // apply the saved background or theme purchased
        applyCustomization(savedBackground);  
    }
});

const creditsBtn = document.getElementById('creditsBtn');

// Credits button
creditsBtn.addEventListener('click', function() {
    alert("Creator: Julie Nguyen\n─── ⋆⋅☆⋅⋆ ───\nArt Credits (all sourced from OpenGameArt.org):\n - CraftPix.net 2D Game Assets\n - Killyoverdrive\n - Jkjkke\n - Ansimuz\n - Bonsaiheldin");
})