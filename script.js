const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const deleteButton = document.getElementById("deleteButton");

function addTask(){
    if (inputBox.value==='') {
        alert("You must write something!");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
    updateCount();
}

listContainer.addEventListener("click", function(e){
    if (e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if (e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
        updateCount();
    }
}, false);

// Attach delete all once, not on every click
deleteButton.addEventListener("click", deleteAllTasks);

function deleteAllTasks(){
    listContainer.innerHTML = '';
    localStorage.setItem("data", '');
    updateCount();
}

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data") || '';
}

showTask();

function updateCount(){
    todoCount.textContent = listContainer.querySelectorAll("li").length;
}
