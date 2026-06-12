const titleBox = document.getElementById("titleInput")
const dateBox = document.getElementById("dateInput")
const listContainer = document.getElementById("taskList")
const error = document.getElementById('error')

function addProject() {

}

function addTask() {
    if (titleBox.value === '' || dateBox.value === '') {
        error.innerHTML = "Missing information, Retry"
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = titleBox.value + dateBox.value;
        listContainer.appendChild(li);
    }
    titleBox.value = ''
    dateBox.value = ''
}