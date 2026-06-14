const openFolderBtn = document.getElementById("openFolderModal")
const openTaskBtn = document.getElementById("openTaskModal")
const closeFolderBtn = document.getElementById("closeFolderButton")
const closeTaskBtn = document.getElementById("closeTaskButton")
const folderModal = document.getElementById("folderModal")
const taskModal = document.getElementById("taskModal")
const folderContainer = document.getElementById("folderList")
const folderInput = document.getElementById("folderInput")
const taskTitleInput = document.getElementById("taskTitle")
const taskDescInput = document.getElementById("taskDescription")
const taskFolderInput = document.getElementById("taskFolder")
const taskDateInput = document.getElementById("taskDate")

openFolderBtn.addEventListener("click", () => {
    folderModal.classList.add("open");
});

closeFolderBtn.addEventListener("click", () => {
    folderModal.classList.remove("open");
});

openTaskBtn.addEventListener("click", () => {
    taskModal.classList.add("open");
});

closeTaskBtn.addEventListener("click", () => {
    taskModal.classList.remove("open");
});

function addFolder() {
    if (folderInput.value === '') {
        folderInput.placeholder = "You must enter a folder name!"
    } else {
        let li = document.createElement("li");
        li.innerHTML = folderInput.value;
        folderContainer.appendChild(li);
        folderModal.classList.remove("open")
    }
    folderInput.value = ''
}

function addTask() {
    if (taskTitleInput.value === '') {
        taskTitleInput.placeholder = "You must enter a title!"
    } else {
        let li = document.createElement("li");
        li.innerHTML = taskTitleInput.value;
        folderContainer.appendChild(li);
        taskModal.classList.remove("open")
    }
    taskTitleInput.value = ''
    taskDescInput.value = ''
    taskFolderInput.value = ''
    taskDateInput.value = ''
}