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
    folders.forEach((name, index) => {
        let li = document.createElement("li")
        li.classList.add("list-item")
        li.innerHTML = `<span>${name}</span>`

        let deleteBtn = document.createElement("button")
        deleteBtn.innerHTML = "x"
        deleteBtn.classList.add("delete-btn")
        deleteBtn.onclick = () => {
            folders.splice(index, 1)
            saveFolders()
            renderFolders()
        }

        li.appendChild(deleteBtn)
        folderContainer.appendChild(li)

        let option = document.createElement("option")
        option.value = name
        option.textContent = name
        taskFolderInput.appendChild(option)
    })
}

function renderTasks() {
    // clear only task items, not folders
    document.querySelectorAll(".task-item").forEach(el => el.remove())
    tasks.forEach((task, index) => {
        let li = document.createElement("li")
        li.classList.add("list-item", "task-item")
        li.innerHTML = `<span>${task.title}</span>`

        let deleteBtn = document.createElement("button")
        deleteBtn.innerHTML = "x"
        deleteBtn.classList.add("delete-btn")
        deleteBtn.onclick = () => {
            tasks.splice(index, 1)
            saveTasks()
            renderTasks()
        }

        li.appendChild(deleteBtn)
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
        renderTasks()
        taskModal.classList.remove("open")
    }
    taskTitleInput.value = ''
    taskDescInput.value = ''
    taskFolderInput.value = ''
    taskDateInput.value = ''
}

renderFolders()
renderTasks()