const Comment = require('../models/Comment');

// Add a comment to a task
exports.addComment = async (req, res) => {
    const { content, taskId } = req.body;
    try {
        const comment = new Comment({
        content,
        author: req.userId,
        task: taskId
        });
        await comment.save();
        res.json(comment);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

// Get all comments for a task
exports.getComments = async (req, res) => {
    const { taskId } = req.params;
    try {
        const comments = await Comment.find({ task: taskId }).populate('author', 'name');
        res.json(comments);
    } catch (err) {
        res.status(500).send('Server error');
    }
};
