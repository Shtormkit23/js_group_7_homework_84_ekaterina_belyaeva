const router = require("express").Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");


router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.find({user: req.user._id});
        return res.send(tasks);
    } catch {
        res.sendStatus(500);
    }
});

router.post("/", auth, async (req, res) => {
    const userTokenId = req.user._id;
    const taskData = req.body;
    taskData.user = userTokenId;
    const task = new Task(taskData);

    try {
        await task.save();
        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.put("/:id", auth, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task || task.user.toString() !== req.user._id.toString()) {
            return res.status(404).send({ error: "No such task found" });
        }
        else {
            req.body.title && (task.title = req.body.title);
            req.body.status && (task.status = req.body.status);
            req.body.description && (task.description = req.body.description);
            await task.save();
            return res.send({ message: `Task - ${task._id} successfully edited` });
        }
    } catch (e) {
        return res.status(422).send(e);
    }
});

router.delete("/:id", auth, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task || task.user.toString() !== req.user._id.toString()) {
            return res.status(404).send({ error: "No such task found" });
        } else {
            await task.remove();
            return res.send({ message: `Task - ${task._id} successfully removed` });
        }
    } catch {
        res.sendStatus(500);
    }
});




module.exports = router;