const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    user: {
        type: Schema.Types.ObjectID,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    status: {
        type:String,
        enum: ["new", "in_progress", "done"],
        default: "new"
    }
});

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;