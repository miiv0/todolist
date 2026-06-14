const openFolderBtn = document.getElementById("openFolderModal")
const openTaskBtn = document.getElementById("openTaskModal")
const closeFolderBtn = document.getElementById("closeFolderButton")
const closeFolderBtn = document.getElementById("closeFolderButton")
const closeTaskBtn = document.getElementById("closeTaskButton")
const folderModal = document.getElementById("folderModal")
const taskModal = document.getElementById("taskModal")
const folderContainer = document.getElementById("folderList")
const folderInput = document.getElementById("folderInput")

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