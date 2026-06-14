const openFolderBtn = document.getElementById("openFolderModal")
const openProjectBtn = document.getElementById("openProjectModal")
const closeFolderBtn = document.getElementById("closeFolderButton")
const closeProjectBtn = document.getElementById("closeProjectButton")
const folderModal = document.getElementById("folderModal")
const projectModal = document.getElementById("projectModal")
const folderContainer = document.getElementById("folderList")
const folderInput = document.getElementById("folderInput")
const projectTitleInput = document.getElementById("projectTitle")
const projectDescInput = document.getElementById("projectDescription")
const projectFolderInput = document.getElementById("projectFolder")
const projectDateInput = document.getElementById("projectDate")
const projectView = document.getElementById("projectView")
const placeholder = document.getElementById("placeholder")
const viewTitle = document.getElementById("viewTitle")
const viewDescription = document.getElementById("viewDescription")
const viewFolderSelect = document.getElementById("viewFolderSelect")
const subtaskList = document.getElementById("subtaskList")
const subtaskInput = document.getElementById("subtaskInput")
const subtaskDateInput = document.getElementById("subtaskDate")

let folders = JSON.parse(localStorage.getItem("folders")) || []
let projects = JSON.parse(localStorage.getItem("projects")) || []
let activeProjectIndex = null

function saveFolders() {
    localStorage.setItem("folders", JSON.stringify(folders))
}

function saveProjects() {
    localStorage.setItem("projects", JSON.stringify(projects))
}

function populateFolderSelects() {
    const options = `<option value="none">No folder</option>` +
        folders.map(f => `<option value="${f}">${f}</option>`).join('')

    projectFolderInput.innerHTML = options
    viewFolderSelect.innerHTML = options

    if (activeProjectIndex !== null) {
        viewFolderSelect.value = projects[activeProjectIndex].folder || 'none'
    }
}

function renderAll() {
    folderContainer.innerHTML = ''
    populateFolderSelects()

    folders.forEach((name, index) => {
        let li = document.createElement("li")
        li.classList.add("list-item", "folder-item")

        let folderLabel = document.createElement("span")
        folderLabel.innerHTML = name

        let deleteBtn = document.createElement("button")
        deleteBtn.innerHTML = "x"
        deleteBtn.classList.add("delete-btn")
        deleteBtn.onclick = (e) => {
            e.stopPropagation()
            folders.splice(index, 1)
            projects = projects.filter(p => p.folder !== name)
            saveFolders()
            saveProjects()
            renderAll()
        }

        let projectList = document.createElement("ul")
        projectList.classList.add("task-sublist")
        projectList.id = `folder-${name}`

        li.appendChild(folderLabel)
        li.appendChild(deleteBtn)
        folderContainer.appendChild(li)
        folderContainer.appendChild(projectList)
    })

    let noFolderList = document.createElement("ul")
    noFolderList.classList.add("task-sublist")
    noFolderList.id = "folder-none"
    folderContainer.appendChild(noFolderList)

    projects.forEach((project, index) => {
        const targetList = document.getElementById(`folder-${project.folder}`)
        if (!targetList) return

        let li = document.createElement("li")
        li.classList.add("list-item", "task-item")

        let label = document.createElement("span")
        label.innerHTML = project.title
        label.style.cursor = "pointer"
        label.onclick = () => openProject(index)

        let deleteBtn = document.createElement("button")
        deleteBtn.innerHTML = "x"
        deleteBtn.classList.add("delete-btn")
        deleteBtn.onclick = (e) => {
            e.stopPropagation()
            if (activeProjectIndex === index) {
                projectView.style.display = 'none'
                placeholder.style.display = 'flex'
                activeProjectIndex = null
            }
            projects.splice(index, 1)
            saveProjects()
            renderAll()
        }

        li.appendChild(label)
        li.appendChild(deleteBtn)
        targetList.appendChild(li)
    })
}

function openProject(index) {
    activeProjectIndex = index
    const project = projects[index]
    viewTitle.textContent = project.title
    viewDescription.textContent = project.description || ''
    placeholder.style.display = 'none'
    projectView.style.display = 'flex'
    populateFolderSelects()
    renderSubtasks()
}

viewFolderSelect.addEventListener("change", () => {
    if (activeProjectIndex === null) return
    projects[activeProjectIndex].folder = viewFolderSelect.value
    saveProjects()
    renderAll()
})

function renderSubtasks() {
    subtaskList.innerHTML = ''
    const project = projects[activeProjectIndex]
    if (!project || !project.subtasks) return

    project.subtasks.forEach((subtask, index) => {
        let li = document.createElement("li")
        li.classList.add("list-item", "subtask-item")

        let checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.checked = subtask.done
        checkbox.onchange = () => {
            projects[activeProjectIndex].subtasks[index].done = checkbox.checked
            saveProjects()
            renderSubtasks()
        }

        let label = document.createElement("span")
        label.textContent = subtask.text
        if (subtask.done) label.style.textDecoration = "line-through"

        let due = document.createElement("span")
        due.classList.add("subtask-due")
        due.textContent = subtask.date
            ? new Date(subtask.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            : ''

        let deleteBtn = document.createElement("button")
        deleteBtn.innerHTML = "x"
        deleteBtn.classList.add("delete-btn")
        deleteBtn.onclick = (e) => {
            e.stopPropagation()
            projects[activeProjectIndex].subtasks.splice(index, 1)
            saveProjects()
            renderSubtasks()
        }

        li.appendChild(checkbox)
        li.appendChild(label)
        li.appendChild(due)
        li.appendChild(deleteBtn)
        subtaskList.appendChild(li)
    })
}

function addSubtask() {
    if (activeProjectIndex === null || subtaskInput.value === '') return
    if (!projects[activeProjectIndex].subtasks) {
        projects[activeProjectIndex].subtasks = []
    }
    projects[activeProjectIndex].subtasks.push({
        text: subtaskInput.value,
        done: false,
        date: subtaskDateInput.value || ''
    })
    saveProjects()
    subtaskInput.value = ''
    subtaskDateInput.value = ''
    renderSubtasks()
}

function addFolder() {
    if (folderInput.value === '') {
        folderInput.placeholder = "You must enter a folder name!"
    } else {
        folders.push(folderInput.value)
        saveFolders()
        renderAll()
        folderModal.classList.remove("open")
    }
    folderInput.value = ''
}

function addProject() {
    if (projectTitleInput.value === '') {
        projectTitleInput.placeholder = "You must enter a title!"
    } else {
        const project = {
            title: projectTitleInput.value,
            description: projectDescInput.value,
            folder: projectFolderInput.value || 'none',
            date: projectDateInput.value,
            subtasks: []
        }
        projects.push(project)
        saveProjects()
        renderAll()
        projectModal.classList.remove("open")
    }
    projectTitleInput.value = ''
    projectDescInput.value = ''
    projectFolderInput.value = ''
    projectDateInput.value = ''
}

openFolderBtn.addEventListener("click", () => folderModal.classList.add("open"))
closeFolderBtn.addEventListener("click", () => folderModal.classList.remove("open"))
openProjectBtn.addEventListener("click", () => projectModal.classList.add("open"))
closeProjectBtn.addEventListener("click", () => projectModal.classList.remove("open"))

renderAll()