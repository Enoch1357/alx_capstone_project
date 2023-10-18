#!/usr/bin/node
// Imported functions from 'utility.js' module
import { selectedOptionAction, validateForm, validateUpdateForm, resetTaskCreator, getCreateFormInput, getUpdateFormInput, showViewTaskDivRelativeToButton, validateSearch, resetSearch, validateFilter, resetFilter } from "./utility.js";

const options = document.getElementById("options");
options.addEventListener('change', function () {
    // Select option and perform corresponding action
    const selectedOption = options.value;
    selectedOptionAction(selectedOption);
    options.value = '...';
})

const cancel = document.getElementById('cancel');
cancel.addEventListener('click', function () {
    // 'Close' action for task update form
    const updateTaskForm = document.getElementById('updateTaskForm');
    const createTaskForm = document.getElementById('createTaskForm');
    updateTaskForm.style.display = 'none';
    createTaskForm.style.display = 'flex';

})


const createTaskButton = document.getElementById("createTaskButton");
const tasks = JSON.parse(localStorage.getItem('tasks'));
createTaskButton.addEventListener('click', function(event) {
    // Task Creation Form Button Actions
    event.preventDefault();
    const isValid = validateForm();
    if (!isValid) {
        return;
    }
    const createTaskFormValues = getCreateFormInput();
    resetTaskCreator();

    tasks.push(createTaskFormValues);
    const stringifiedTasks = JSON.stringify(tasks);
    localStorage.setItem('tasks', stringifiedTasks);
    renderTask(tasks);
})

const markCompletedButton = document.getElementById('markCompletedButton');
markCompletedButton.addEventListener('click', function(event) {
    // Update task form mark as not completed button
    event.preventDefault();
    currentCompleteStatus = "Not completed";
})

const submitUpdateButton = document.getElementById("submitUpdateButton");
submitUpdateButton.addEventListener('click', function(event) {
    // Task Update submit button action
    event.preventDefault();
    const isValid = validateUpdateForm();
    if (!isValid) {
        return;
    }
    const updateFormValues = getUpdateFormInput();
    tasks[currentPosition] = updateFormValues;
    tasks[currentPosition].completed = currentCompleteStatus;
    const stringifiedTasks = JSON.stringify(tasks);
    localStorage.setItem('tasks', stringifiedTasks);
    renderTask(tasks);

    const updateTaskForm = document.getElementById('updateTaskForm');
    const createTaskForm = document.getElementById('createTaskForm');
    updateTaskForm.style.display = 'none';
    createTaskForm.style.display = 'flex';
})

const renderDiv = document.querySelector('#cardDisplayDiv');
const renderTask = (tasks) => {
    // Dynamic tasks render function
    renderDiv.innerHTML = "";
    
    for (let itemPosition = 0; itemPosition < tasks.length; itemPosition++) {
        const task = tasks[itemPosition];
        const item = createTaskCard(task, itemPosition);
        renderDiv.appendChild(item)
    }
    
}

let currentPosition = 0;
let currentCompleteStatus = "";

const createTaskCard = (task, itemPosition) => {
    // Created tasks dynamic card creation
    const taskCard = document.createElement('div');
    taskCard.setAttribute('id', 'taskCardDiv');

    const editAndViewTaskDiv = document.createElement("div");
    editAndViewTaskDiv.setAttribute('id', 'editAndViewTaskDiv');

    const editDisplayButton = document.createElement("button");
    editDisplayButton.setAttribute('id', 'editDisplayButton');
    editDisplayButton.setAttribute('class', 'button-font');
    editDisplayButton.textContent = "Edit";

    editDisplayButton.addEventListener('click', function() {
        // Dynamic Edit task button actions 
        const updateTaskForm = document.getElementById('updateTaskForm');
        const createTaskForm = document.getElementById('createTaskForm');
        updateTaskForm.style.display = 'flex';
        createTaskForm.style.display = 'none';

        const updateTaskNameField = document.getElementById("updateTaskNameField");
        const updateDescriptionField = document.getElementById("updateDescriptionField");
        const updateDateField = document.getElementById("updateDateField");
        const updateTimeField = document.getElementById("updateTimeField");

        updateTaskNameField.value = tasks[itemPosition].taskName;
        updateDescriptionField.value = tasks[itemPosition].description;
        updateDateField.value = tasks[itemPosition].date;
        updateTimeField.value = tasks[itemPosition].time;

        currentPosition = itemPosition;
        currentCompleteStatus = tasks[itemPosition].completed;
        
    })

    editAndViewTaskDiv.appendChild(editDisplayButton);

    const viewTaskDisplayButton = document.createElement("button");
    viewTaskDisplayButton.setAttribute('id', 'viewTaskDisplayButton');
    viewTaskDisplayButton.setAttribute('class', 'button-font');
    viewTaskDisplayButton.textContent = "View Task";

    let isVisible = false;
    viewTaskDisplayButton.addEventListener('click', function() {
        // Dynamic View task button for pop-up task display actions
        const viewTaskDiv = document.getElementById('viewTaskDiv');
        const taskNameViewPara = document.getElementById('taskNameViewPara');
        const markCompletedViewPara = document.getElementById('markCompletedViewPara');
        const descriptionViewPara = document.getElementById('descriptionViewPara');
        const dateViewPara = document.getElementById('dateViewPara');
        const timeViewPara = document.getElementById('timeViewPara');

        taskNameViewPara.textContent = `${task.taskName}`;
        markCompletedViewPara.textContent = `Completed status: ${task.completed}`;
        descriptionViewPara.textContent = `DESCRIPTION: ${task.description}`;
        dateViewPara.textContent = `Date: ${task.date}`;
        timeViewPara.textContent = `Time: ${task.time}`;


        if (!isVisible) {
            showViewTaskDivRelativeToButton(viewTaskDisplayButton);
            isVisible = true;
        } else {
            viewTaskDiv.style.display = "none";
            isVisible = false;
        }

    })

    editAndViewTaskDiv.appendChild(viewTaskDisplayButton);
    taskCard.appendChild(editAndViewTaskDiv);

    const taskNameDisplay = document.createElement('p');
    taskNameDisplay.setAttribute('id', 'taskNameDisplay');
    taskNameDisplay.setAttribute('class', 'button-font');
    taskNameDisplay.textContent = `${task.taskName}`;

    taskCard.appendChild(taskNameDisplay);

    const deleteDiv = document.createElement('div');
    deleteDiv.setAttribute('id', 'deleteDiv');

    const dateStampDiv = document.createElement('div');
    dateStampDiv. setAttribute('id', 'dateStampDiv');

    const dateStampImage = document.createElement('img');
    dateStampImage.setAttribute('id', 'dateStampImage');
    dateStampImage.setAttribute('src', './Assets/calendar-clear-outline.png');
    dateStampImage.setAttribute('alt', 'Calendar-Image');

    dateStampDiv.appendChild(dateStampImage);

    const dateStamp = document.createElement('p');
    dateStamp.setAttribute('id', 'dateStamp');
    dateStamp.setAttribute('class', 'cancel-sign-font');
    dateStamp.textContent = `${task.date}`;

    dateStampDiv.appendChild(dateStamp);
    deleteDiv.appendChild(dateStampDiv);

    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('id', 'deleteButton');
    deleteButton.setAttribute('class', 'button-font');
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener('click', function() {
        // Dynamic Delete task button action
        tasks.splice(itemPosition, 1);
        const stringifiedTasks = JSON.stringify(tasks);
        localStorage.setItem('tasks', stringifiedTasks);
        renderTask(tasks);
    })

    const markCompletedDisplayButton = document.createElement('button');
    markCompletedDisplayButton.setAttribute('id', 'markCompletedDisplayButton');
    markCompletedDisplayButton.setAttribute('class', 'button-font');
    markCompletedDisplayButton.textContent = "Mark as completed";

    markCompletedDisplayButton.addEventListener('click', function() {
        // Dynamic Mark task as Completed button action
        tasks[itemPosition].completed = "Completed";
        const stringifiedTasks = JSON.stringify(tasks);
        localStorage.setItem('tasks', stringifiedTasks);
        renderTask(tasks);
    })

    deleteDiv.appendChild(deleteButton);
    deleteDiv.appendChild(markCompletedDisplayButton);

    taskCard.appendChild(deleteDiv);

    const markCompletedDisplay = document.createElement('p');
    markCompletedDisplay.setAttribute('id', 'markCompletedDisplay');
    markCompletedDisplay.setAttribute('class', 'button-font')
    markCompletedDisplay.textContent = `${task.completed}`;

    taskCard.appendChild(markCompletedDisplay);

    return taskCard;

}

// Render persisted tasks from previous session on page load
renderTask(tasks);




const searchButton = document.getElementById("searchButton");
searchButton.addEventListener('click', function(event) {
    // Search form submit action
    event.preventDefault();
    const isValid = validateSearch();
    if (!isValid) {
        return;
    }
    resetSearch();
})

const filterButton = document.getElementById("filterButton");
filterButton.addEventListener('click', function(event) {
    // Filter form submit button action
    event.preventDefault();
    const isValid = validateFilter();
    if (!isValid) {
        return;
    }
    resetFilter();
})

