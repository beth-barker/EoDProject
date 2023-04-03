
const newTaskForm = document.querySelector('form')

const buildTasks = (tasks) => {
  let tasksDisplay = document.getElementById('task-display')
  tasksDisplay.innerHTML = ''

  tasks.forEach((task) => {
    let newTask = document.createElement('div')
    newTask.classList.add('task')

    let checkbox = document.createElement('input')
    checkbox.classList.add('task-completed')
    checkbox.type = 'checkbox'

    if(task.status){
      checkbox.setAttribute('checked', true)
    }

    newTask.appendChild(checkbox)

    newTask.innerHTML += `
    <p class="task-name">${task.name}</p>
    <p class="task-priority">${task.priority}</p>
    <img
      class='trash-can'
      src='https://www.freeiconspng.com/thumbs/trash-can-icon/trash-can-icon-26.png'
      alt='trash'
    />`

    tasksDisplay.appendChild(newTask)
  })
}

const addTask = (event) => {
  event.preventDefault()

  const name = document.querySelector("#new-task-name")
  const priority = document.querySelector("#new-task-priority")

  const newTask = {name: name.value, priority: priority.value}

  axios.post('http://localhost:6789/api/tasks', newTask)
    .then(res => {
      getTasks()
    })
}

newTaskForm.addEventListener('submit', addTask)

const getTasks = () => {
  axios.get('http://localhost:6789/api/tasks')
    .then(res => {
      console.log(res.data)
      buildTasks(res.data)
    })
}

getTasks()