const express = require("express");
const tasks = require("./app/tasks");
const users = require('./app/users');

const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 8000;


app.use(cors());
app.use(express.json());

const run = async () => {
    await mongoose.connect("mongodb://localhost/todo_list", {useNewUrlParser: true});

    app.use("/tasks", tasks);
    app.use('/users', users);

    console.log("Connected to mongoDB");

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
};

run().catch(console.log);