
const newTaskForm = document.querySelector('form')

const updateStatus = (id, status) => {
  let body = {id, status}

  axios.put(`http://localhost:6789/api/tasks/`, body)
  .then(res => {
    console.log(res.data)
    getTasks()
  })
}

const deleteTask = (id) => {
  axios.delete(`http://localhost:6789/api/tasks/${id}`)
    .then(res => {
      console.log(res)
      getTasks()
    })
}


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

    const trashCan = document.createElement('img')
    trashCan.classList.add('trash-can')
    trashCan.setAttribute('src', 'https://www.freeiconspng.com/thumbs/trash-can-icon/trash-can-icon-26.png')
    trashCan.setAttribute('alt', 'trash')

    trashCan.addEventListener('click', () => deleteTask(task.task_id))
    newTask.appendChild(trashCan)

    tasksDisplay.appendChild(newTask)

    const allBoxes = document.getElementsByClassName('task-completed')
    const lastBox = allBoxes[allBoxes.length-1]

    lastBox.addEventListener('change', () => updateStatus(task.task_id, !task.status))
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

