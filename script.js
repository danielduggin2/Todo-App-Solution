const { date } = require("astro/zod");

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

const taskData = []; //this array will store all the tasks along with their associated data (title, due date, desc.)
let currentTask = {};

// toggle will add the class if it not present on the element and remove if it is present. el.classList.toggle("classToToggle")
openTaskFormBtn.addEventListener("click", () => taskForm.classList.toggle("hidden"));

// showModal() can be used to display a modal dialog box 
closeTaskFormBtn.addEventListener("click", () => confirmCloseDialog.showModal());

cancelBtn.addEventListener("click", () => confirmCloseDialog.close());

// we want to close the modal showing the cancel/discard buttons so we hide them from the modal. Use callback funct to close the dialog and the toggle the dialog displaying
discardBtn.addEventListener("click", () => {
    confirmCloseDialog.close();
    taskForm.classList.toggle("hidden");
});

// getting values from the input fields, save them to taskData array, and display them on the page
taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // findIndex() finds and returns the index of the 1st element in an array meets a criteria, If no such element is foundm tge method returns a -1
    // dataArrIndex provides an index of each task
    const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id); //check if item.id is strictly equal to the id of currentTask

    const taskObj = {
        // user should be able to input a title with upper/lower case letters but for id the value should be lowercase
        // final result should be a hyphenated string. Chain the split method and use the " " separator. Lastly, chain .join("-"). ex: WALK DOG will be "walk-dog"
        id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
        title: titleInput.value,
        date: dateInput.value,
        description: descriptionInput.value
    };
    // console.log(taskObj);
    // we want to add our id to the taskData array to keep track of each task (only if new). 
    // unshift is an array method that is used to add one or more elements to the beginning of an array
    if (dataArrIndex === -1) {taskData.unshift(taskObj)};
})
