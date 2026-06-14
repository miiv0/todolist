const addTaskButton = document.getElementById("addTaskButton")
const addFolderButton = document.getElementById("addFolderbutton")
const openFolderBtn = document.getElementById("openFolderModal")
const openTaskBtn = document.getElementById("openTaskModal")
const closeFolderBtn = document.getElementById("closeModal")
const closeTaskBtn = document.getElementById("closeModal")
const taskModal = document.getElementById("modal")
const folderModal = document.getElementById("modal")


const folderInput = document.getElementById("folderInput")
const folderContainer = document.getElementById("content")

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
        folderInput.placeholder = "You must enter a task!"
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = folderInput.value;
        folderContainer.appendChild(li);
    }
    folderInput.value = ''
}