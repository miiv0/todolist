const inputBox = document.getElementById("taskInput")
const listContainer = document.getElementById("taskList")

function addTask() {
    if (inputBox.value === '') {
        inputBox.placeholder = "You must enter a task!"
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
    }
    inputBox.value = ''
}