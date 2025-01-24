document.addEventListener("DOMContentLoaded", () => {
    const taskList = document.getElementById("taskList");
    const newTaskInput = document.getElementById("newTaskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const filterButtons = document.querySelectorAll(".filters button");
  
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    function renderTasks(filter = "all") {
      taskList.innerHTML = "";
      const filteredTasks = tasks.filter((task) => {
        if (filter === "completed") return task.completed;
        if (filter === "pending") return !task.completed;
        return true;
      });
  
      filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";
        li.draggable = true;
  
        const taskText = document.createElement("span");
        taskText.textContent = task.text;
  
        const actionsDiv = document.createElement("div");
        actionsDiv.classList.add("actions");
  
        // Complete Button
        const completeBtn = document.createElement("button");
        completeBtn.textContent = task.completed ? "Undo" : "Complete";
        completeBtn.addEventListener("click", () => toggleComplete(index));
  
        // Edit Button
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", () => editTask(index));
  
        // Delete Button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => deleteTask(index));
  
        actionsDiv.appendChild(completeBtn);
        actionsDiv.appendChild(editBtn);
        actionsDiv.appendChild(deleteBtn);
  
        li.appendChild(taskText);
        li.appendChild(actionsDiv);
  
        li.addEventListener("dragstart", () => li.classList.add("dragging"));
        li.addEventListener("dragend", () => li.classList.remove("dragging"));
  
        taskList.appendChild(li);
      });
    }
  
    function addTask() {
      const text = newTaskInput.value.trim();
      if (text) {
        tasks.push({ text, completed: false });
        saveTasks();
        renderTasks();
        newTaskInput.value = "";
      }
    }
  
    function toggleComplete(index) {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    }
  
    function editTask(index) {
      const newText = prompt("Edit your task:", tasks[index].text);
      if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        saveTasks();
        renderTasks();
      }
    }
  
    function deleteTask(index) {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    }
  
    taskList.addEventListener("dragover", (e) => {
      e.preventDefault();
      const afterElement = getDragAfterElement(taskList, e.clientY);
      const dragging = document.querySelector(".dragging");
      if (afterElement == null) {
        taskList.appendChild(dragging);
      } else {
        taskList.insertBefore(dragging, afterElement);
      }
    });
  
    function getDragAfterElement(container, y) {
      const draggableElements = [
        ...container.querySelectorAll("li:not(.dragging)"),
      ];
  
      return draggableElements.reduce(
        (closest, child) => {
          const box = child.getBoundingClientRect();
          const offset = y - box.top - box.height / 2;
          if (offset < 0 && offset > closest.offset) {
            return { offset, element: child };
          } else {
            return closest;
          }
        },
        { offset: Number.NEGATIVE_INFINITY }
      ).element;
    }
  
    addTaskBtn.addEventListener("click", addTask);
  
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.getAttribute("data-filter");
        renderTasks(filter);
      });
    });
  
    renderTasks();
  });
  