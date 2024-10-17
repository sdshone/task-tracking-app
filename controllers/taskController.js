const Task = require('../models/Task');

// Create a new task
exports.createTask = async (req, res) => {
    const { title, description, dueDate, assignedUser } = req.body;
    try {
        const task = new Task({
        title,
        description,
        dueDate,
        assignedUser
        });
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

// Get all tasks (filterable and sortable)
exports.getTasks = async (req, res) => {
    const { status, assignedUser, sortBy } = req.query;
    try {
        const filter = {};
        if (status) filter.status = status;
        if (assignedUser) filter.assignedUser = assignedUser;

        const tasks = await Task.find(filter).sort(sortBy ? { [sortBy]: 1 } : {});
        res.json(tasks);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

// Update a task
exports.updateTask = async (req, res) => {
    const { taskId } = req.params;
    const updates = req.body;
    try {
        const task = await Task.findByIdAndUpdate(taskId, updates, { new: true });
        if (!task) return res.status(404).json({ msg: 'Task not found' });
        res.json(task);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    const { taskId } = req.params;
    try {
        await Task.findByIdAndDelete(taskId);
        res.json({ msg: 'Task deleted' });
    } catch (err) {
        res.status(500).send('Server error');
    }
};
