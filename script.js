const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const deleteButton = document.getElementById("deleteButton");
const todoCount = document.getElementById("todoCount");

let tasks = [];

/* ---------- Load on Refresh ---------- */
function showTask(){
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    listContainer.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.innerText = task.text;

        if(task.completed) li.classList.add("checked");

        li.addEventListener("click", () => {
            task.completed = !task.completed;
            saveData();
            showTask();
        });

        let span = document.createElement("span");
        span.innerHTML = "×";
        span.addEventListener("click", (e) => {
            e.stopPropagation();
            tasks.splice(index, 1);
            saveData();
            showTask();
        });

        li.appendChild(span);
        listContainer.appendChild(li);
    });

    updateCount();
}

/* ---------- Save ---------- */
function saveData(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* ---------- Add Task ---------- */
function addTask(){
    if(inputBox.value.trim() === ""){
        alert("You must write something!");
        return;
    }

    tasks.push({
        text: inputBox.value,
        completed: false
    });

    inputBox.value = "";
    saveData();
    showTask();
}

/* ---------- Delete All ---------- */
deleteButton.addEventListener("click", () => {
    tasks = [];
    saveData();
    showTask();
});

/* ---------- Enter Key ---------- */
inputBox.addEventListener("keypress", (e) => {
    if(e.key === "Enter") addTask();
});

/* ---------- Counter ---------- */
function updateCount(){
    todoCount.textContent = tasks.length;
    deleteButton.disabled = tasks.length === 0;
}

showTask();
