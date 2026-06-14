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

let folders = JSON.parse(localStorage.getItem("folders")) || []
let tasks = JSON.parse(localStorage.getItem("tasks")) || []

function saveFolders() {
    localStorage.setItem("folders", JSON.stringify(folders))
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function renderFolders() {
    folderContainer.innerHTML = ''
    taskFolderInput.innerHTML = '<option value="">Select a folder</option>'
    folders.forEach(name => {
        let li = document.createElement("li")
        li.innerHTML = name
        folderContainer.appendChild(li)

        let option = document.createElement("option")
        option.value = name
        option.textContent = name
        taskFolderInput.appendChild(option)
    })
}

function renderTasks() {
    tasks.forEach(task => {
        let li = document.createElement("li")
        li.innerHTML = task.title
        folderContainer.appendChild(li)
    })
}

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
        folders.push(folderInput.value)
        saveFolders()
        renderFolders()
        folderModal.classList.remove("open")
    }
    folderInput.value = ''
}

function addTask() {
    if (taskTitleInput.value === '') {
        taskTitleInput.placeholder = "You must enter a title!"
    } else {
        const task = {
            title: taskTitleInput.value,
            description: taskDescInput.value,
            folder: taskFolderInput.value,
            date: taskDateInput.value
        }
        tasks.push(task)
        saveTasks()
        let li = document.createElement("li")
        li.innerHTML = task.title
        folderContainer.appendChild(li)
        taskModal.classList.remove("open")
    }
    taskTitleInput.value = ''
    taskDescInput.value = ''
    taskFolderInput.value = ''
    taskDateInput.value = ''
}

renderFolders()
renderTasks()