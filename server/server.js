const express = require("express");
const cors = require("cors");

require('dotenv').config()

const app = express();
app.use(cors());

app.use(express.json())

const {getTasks, addTask, updateTask, deleteTask} = require('./controller.js')

app.get('/api/tasks', getTasks)
app.post('/api/tasks', addTask)
app.put('/api/tasks', updateTask)
app.delete('/api/tasks/:id', deleteTask)


app.listen(6789, () => console.log('Docked at port 6789.'))