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

        let folderLabel = document.createElement("span")
        folderLabel.innerHTML = name

        let deleteBtn = document.createElement("button")
        deleteBtn.innerHTML = "x"
        deleteBtn.classList.add("delete-btn")
        deleteBtn.onclick = () => {
            folders.splice(index, 1)
            tasks = tasks.filter(t => t.folder !== name)
            saveFolders()
            saveTasks()
            renderFolders()
        }

        let taskList = document.createElement("ul")
        taskList.classList.add("task-sublist")
        taskList.id = `folder-${name}`

        li.appendChild(folderLabel)
        li.appendChild(deleteBtn)
        folderContainer.appendChild(li)
        folderContainer.appendChild(taskList)

        let option = document.createElement("option")
        option.value = name
        option.textContent = name
        taskFolderInput.appendChild(option)
    })

    renderTasks()
}

function renderTasks() {
    document.querySelectorAll(".task-sublist").forEach(ul => ul.innerHTML = '')

    tasks.forEach((task, index) => {
        const targetList = document.getElementById(`folder-${task.folder}`)
        if (!targetList) return

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
        targetList.appendChild(li)
    })
}

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
    } else if (taskFolderInput.value === '') {
        taskFolderInput.focus()
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

openFolderBtn.addEventListener("click", () => {
    folderModal.classList.add("open")
})

closeFolderBtn.addEventListener("click", () => {
    folderModal.classList.remove("open")
})

openTaskBtn.addEventListener("click", () => {
    taskModal.classList.add("open")
})

closeTaskBtn.addEventListener("click", () => {
    taskModal.classList.remove("open")
})

renderFolders()