document.getElementById('add-task').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const taskList = document.getElementById('task-list');

        const listItem = document.createElement('li');
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit');
        editButton.addEventListener('click', () => editTask(listItem, taskSpan));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', () => deleteTask(listItem));

        listItem.appendChild(taskSpan);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        taskList.appendChild(listItem);
        taskInput.value = '';
        saveTasksToLocalStorage();
    }
}

function editTask(listItem, taskSpan) {
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = taskSpan.textContent;
    listItem.replaceChild(inputField, taskSpan);

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.classList.add('save');

    saveButton.addEventListener('click', () => {
        taskSpan.textContent = inputField.value.trim();
        listItem.replaceChild(taskSpan, inputField);
        saveButton.replaceWith(editButton);
        saveTasksToLocalStorage();
    });

    const editButton = listItem.querySelector('.edit');
    editButton.replaceWith(saveButton);
}

function deleteTask(listItem) {
    listItem.remove();
    saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(item => {
        tasks.push(item.querySelector('span').textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const taskList = document.getElementById('task-list');
        const listItem = document.createElement('li');
        const taskSpan = document.createElement('span');
        taskSpan.textContent = task;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit');
        editButton.addEventListener('click', () => editTask(listItem, taskSpan));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', () => deleteTask(listItem));

        listItem.appendChild(taskSpan);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        taskList.appendChild(listItem);
    });
}

window.onload = function() {
    loadTasksFromLocalStorage();
};