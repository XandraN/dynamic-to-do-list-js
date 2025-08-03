// Wait for the DOM to fully load before executing any JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to load tasks from localStorage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' prevents re-saving during load
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        // Get and trim the input value if taskText is not provided (i.e., from user input)
        const text = taskText || taskInput.value.trim();

        // Check if the input is not empty
        if (text === '') {
            alert('Please enter a task');
            return;
        }

        // Create new list item
        const li = document.createElement('li');
        li.textContent = text;

        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        // Add click event to remove button
        removeButton.onclick = () => {
            taskList.removeChild(li);
            // Update localStorage after removal
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const updatedTasks = storedTasks.filter(task => task !== text);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        };

        // Append remove button to list item and list item to task list
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Save to localStorage if required
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(text);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        // Clear the input field if task was added via input
        if (!taskText) {
            taskInput.value = '';
        }
    }

    // Add event listener to the Add Task button
    addButton.addEventListener('click', () => addTask());

    // Add event listener for Enter key press in the input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks from localStorage on page load
    loadTasks();
});