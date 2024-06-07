const queueManager = require("../services/queueManager");
const workerManager = require("../services/workerManager");

const addTask = async (req, res) => {
    try {
        const { task } = req.body;
        await queueManager.addTask(req.user._id, task);
        workerManager.startWorker(req.user._id);
        res.status(201).json({ message: "Task added to the queue" });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};

module.exports = {addTask};
