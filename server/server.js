const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());

const {getTasks} = require(`./controller.js`)

app.get(`/api/tasks`, getTasks)




app.listen(6789, () => console.log("Server running at port 6789"))