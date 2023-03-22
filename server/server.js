const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());

const {getTasks, addTask} = require(`./controller.js`)

app.get(`/api/tasks`, getTasks)

app.post(`api/tasks`, addTask)




app.listen(6789, () => console.log("Server running at port 6789"))