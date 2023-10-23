#!/usr/bin/node

const selectedOptionAction = (selectedOption) => {
    // Action for Search or Filter Select Options
    
    if (selectedOption == 'Search') {
        const filterForm = document.getElementById('filterForm');
        const searchForm = document.getElementById('searchForm');
        filterForm.style.display = 'none';
        searchForm.style.display = 'flex';
    
    } else if (selectedOption == 'Filter Tasks') {
        const filterForm = document.getElementById('filterForm');
        const searchForm = document.getElementById('searchForm');
        searchForm.style.display = 'none';
        filterForm.style.display = 'flex';
    }
}

const taskNameField = document.getElementById("taskNameField");
const dateField = document.getElementById("dateField");
const timeField = document.getElementById("timeField");
const descriptionField = document.getElementById("descriptionField");

const updateTaskNameField = document.getElementById("updateTaskNameField");
const updateDescriptionField = document.getElementById("updateDescriptionField");
const updateDateField = document.getElementById("updateDateField");
const updateTimeField = document.getElementById("updateTimeField");

const validateForm = () => {
    // Task Creation Form Validation
    const inputs = [taskNameField, dateField, timeField];

    inputs.forEach(input => {
        input.style.borderColor = "rgba(47, 128, 237, 1)";
    })

    if (taskNameField.value == "" || dateField.value == "" || timeField.value == "") {
        inputs.forEach(input => {
        input.style.borderColor = "red";
        })
        return false;
    }
    return true;

}

const validateUpdateForm = () => {
    // Task Update Form Validation
    const inputs = [updateTaskNameField, updateDateField, updateTimeField];

    inputs.forEach(input => {
        input.style.borderColor = "rgba(47, 128, 237, 1)";
    })

    if (updateTaskNameField.value == "" || updateDateField.value == "" || updateTimeField.value == "") {
        inputs.forEach(input => {
            input.style.borderColor = "red";
        })
        return false;
    }
    return true;
}

const resetTaskCreator = () => {
    const inputs = [taskNameField, dateField, timeField, descriptionField];
    inputs.forEach(input => {
        input.value = "";
    })  // Resets all fields of the create task form
}

const searchNameField = document.getElementById("searchNameField");
const validateSearch = () => {
    // Search Form Validation
    searchNameField.style.borderColor = "rgba(47, 128, 237, 1)";

    if (searchNameField.value == "") {
        searchNameField.style.borderColor = "red";
        return false;
    }
    return true;
}

const resetSearch =() => {
    searchNameField.value = ""; // Reset search input field
}

const filterDateField = document.getElementById("filterDateField");
const validateFilter =() => {
    // Filter form Validation
    filterDateField.style.borderColor = "rgba(47, 128, 237, 1)";

    if (filterDateField.value == "") {
        filterDateField.style.borderColor = "red";
        return false;
    }
    return true;
}

const resetFilter =() => {
    // reset filter date input field
    filterDateField.value = "";
}

const getCreateFormInput = () => {
    // Get task creation form user input
    const taskName = taskNameField.value;
    const date = dateField.value;
    const time = timeField.value;
    const description = descriptionField.value;
    let completed = "Not completed"
    return {taskName, date, time, description, completed};
}

const getUpdateFormInput =() => {
    // Get task update form user input
    const taskName = updateTaskNameField.value;
    const date = updateDateField.value;
    const time = updateTimeField.value;
    const description = updateDescriptionField.value;
    let completed = "Not completed"
    return {taskName, date, time, description, completed};
}

const showViewTaskDivRelativeToButton = (button) => {
    // Shows View Task Pop-up Display Beside View Task Button
    const viewTaskDiv = document.getElementById('viewTaskDiv');

    const position = button.getBoundingClientRect();
    const left = position.left + position.width + 15;
    const top = position.top - position.height - 40;

    viewTaskDiv.style.display = "flex";
    viewTaskDiv.style.top = `${top + window.scrollY}px`;
    viewTaskDiv.style.left = `${left}px`;
}


const reminderNotification = (taskName) => {
    let permission = Notification.permission;
    
    if(permission === "granted"){
        showNotification();
    } else if(permission === "default"){
        requestAndShowPermission();
    } else {
        alert("Use normal alert");
    }
    
    function requestAndShowPermission() {
        Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                showNotification();
            }
        });
    }
    
    function showNotification() {
        // if(document.visibilityState === "visible") {
        //     return;
        // }
        
        let title = currentTaskName;
        let body = "Message to be displayed";
    
        let notification = new Notification(title, { body });
    
        notification.onclick = () => {
                notification.close();
                // window.parent.focus();
        }
    
    }

}


// Exporting functions into the global scope
export { selectedOptionAction, validateForm, validateUpdateForm, resetTaskCreator, getCreateFormInput, getUpdateFormInput, showViewTaskDivRelativeToButton, validateSearch, resetSearch, validateFilter, resetFilter, reminderNotification };
