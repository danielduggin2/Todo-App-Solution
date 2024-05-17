const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");

const taskData = JSON.parse(localStorage.getItem("data")) || []; //this array will store all the tasks along with their associated data (title, due date, desc.)
let currentTask = {};

// refactoring the submit event listener
const addOrUpdateTask = () => {
    // findIndex() finds and returns the index of the 1st element in an array meets a criteria, If no such element is foundm tge method returns a -1
    // dataArrIndex provides an index of each task
    const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id); //check if item.id is strictly equal to the id of currentTask

    const taskObj = {
        // user should be able to input a title with upper/lower case letters but for id the value should be lowercase
        // final result should be a hyphenated string. Chain the split method and use the " " separator. Lastly, chain .join("-"). ex: WALK DOG will be "walk-dog"
        id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
        title: titleInput.value,
        date: dateInput.value,
        description: descriptionInput.value,
    };
    // console.log(taskObj);
    // we want to add our id to the taskData array to keep track of each task (only if new). 
    // unshift is an array method that is used to add one or more elements to the beginning of an array
    if (dataArrIndex === -1)
    {
        taskData.unshift(taskObj)
        
    } else {
        taskData[dataArrIndex] = taskObj;
    }

    localStorage.setItem("data", JSON.stringify(taskData));

    updateTaskContainer();
    reset();
}

const updateTaskContainer = () => {
    tasksContainer.innerHTML = ""; //clear out the existing contents of taskContainer before adding a new task
    taskData.forEach(({ id, title, date, description }) => {
        (tasksContainer.innerHTML += `
            <div class="task" id="${id}">
                <p><strong>Title:</strong>${title}</p>
                <p><strong>Date:</strong>${date}</p>
                <p><strong>Description:</strong>${description}</p>
                <button type="button" class="btn" onclick="deleteTask(this)">Delete</button>
                <button type="button" class="btn" onclick="editTask(this)">Edit</button>
            </div>
        `)
    });
}

const deleteTask = (buttonEl) => {
    const dataArrIndex = taskData.findIndex((item) => item.id === buttonEl.parentElement.id);
    buttonEl.parentElement.remove();
    // splice() is an array method that modifies arrays by removing, replacing, or adding elements
    // 3 arguments: first is index where to start, second is items to remove, third is an optional replacement element
    taskData.splice(dataArrIndex, 1);
    localStorage.setItem("data", JSON.stringify(taskData)); //deleted task to be removed from local storage
}

const editTask = (buttonEl) => {
    const dataArrIndex = taskData.findIndex((item) => item.id === buttonEl.parentElement.id);
    currentTask = taskData[dataArrIndex]; //retrieve the task to be edited from the tasData array
    titleInput.value = currentTask.title;
    dateInput.value = currentTask.date;
    descriptionInput.value = currentTask.description;
    addOrUpdateTaskBtn.innerText = "Update Task";
    taskForm.classList.toggle("hidden");
}

// After adding a task, clear the input fields to prevent retaining previous values.
// Create a function to clear input fields, promoting reusability and simplifying code maintenance.
const reset = () => {
    addOrUpdateTaskBtn.innerText = "Add Task";
    titleInput.value = "";
    dateInput.value = "";
    descriptionInput.value = "";
    taskForm.classList.toggle("hidden");
    currentTask = {};
};

if (taskData.length) {
    updateTaskContainer()
}

// toggle will add the class if it not present on the element and remove if it is present. el.classList.toggle("classToToggle")
openTaskFormBtn.addEventListener("click", () => taskForm.classList.toggle("hidden"));

// showModal() can be used to display a modal dialog box 
closeTaskFormBtn.addEventListener("click", () => {
    const formInputsContainValues = titleInput.value || dateInput.value || descriptionInput.value; 
    const formInputValuesUpdated = titleInput.value !== currentTask.title || dateInput.value !== currentTask.date || descriptionInput.value !== currentTask.description;
    // &&: Cancel/Discard buttons in the modal will not be displayed to the user if they havent made any changes to the input fields while editing a task
    if (formInputsContainValues && formInputValuesUpdated) {
        confirmCloseDialog.showModal(); //indicates there are changes, use showModal() method
    } else {
        reset(); //clear input fields and hide the form modal
    }
});

cancelBtn.addEventListener("click", () => confirmCloseDialog.close());

// we want to close the modal showing the cancel/discard buttons so we hide them from the modal. Use callback funct to close the dialog and the toggle the dialog displaying
discardBtn.addEventListener("click", () => {
    confirmCloseDialog.close();
    reset();
});

// getting values from the input fields, save them to taskData array, and display them on the page
taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Reminder: classList is a property of an HTML element representing the classes applied to it.
    // classList provides methods like 'add', 'remove', and 'toggle' to manipulate these classes.
    // Here, we use 'toggle' to control the visibility of the class assigned to the 'taskForm' element.
    // taskForm.classList.toggle("hidden"); replaced due to line 22. call the reset func instead
    addOrUpdateTask();
    
})

// const myTaskArr = [
//   { task: "Walk the Dog", date: "22-04-2022" },
//   { task: "Read some books", date: "02-11-2023" },
//   { task: "Watch football", date: "10-08-2021" },
// ];

// localStorage.setItem("data", JSON.stringify(myTaskArr));
// localStorage.removeItem("data");
// localStorage.clear();
// const getTaskArr = localStorage.getItem("data");
// console.log(getTaskArr)
// const getTaskArrObj = JSON.parse(localStorage.getItem("data"));
// console.log(getTaskArrObj);
