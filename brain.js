const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("harshTasks")) || [];

function saveTasks() {
    localStorage.setItem("harshTasks", JSON.stringify(tasks));
}

function updateStats() {

    document.getElementById("totalTasks").textContent =
        `Total Tasks: ${tasks.length}`;

    const completed = tasks.filter(task => task.completed).length;

    document.getElementById("completedTasks").textContent =
        `Completed: ${completed}`;
}

function renderTasks() {

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">
                ${task.text}
            </span>

            <div class="actions">
                <button class="complete-btn" onclick="toggleTask(${index})">
                    ✓
                </button>

                <button class="delete-btn" onclick="deleteTask(${index})">
                    ✕
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });

    updateStats();
}

function addTask() {

    const taskText = taskInput.value.trim();

    if(taskText === ""){
        alert("Please enter a task.");
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    saveTasks();
    renderTasks();

    taskInput.value = "";
}

function toggleTask(index) {

    tasks[index].completed = !tasks[index].completed;

    saveTasks();
    renderTasks();
}

function deleteTask(index) {

    tasks.splice(index,1);

    saveTasks();
    renderTasks();
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(event){

    if(event.key === "Enter"){
        addTask();
    }

});

renderTasks();