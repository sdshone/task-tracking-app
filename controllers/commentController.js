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

// Update a comment
exports.updateComment = async (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;

    try {
        // Find and update the comment
        const comment = await Comment.findById(commentId);

        if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
        }

        // Ensure only the owner of the comment can update it
        if (comment.author.toString() !== req.userId) {
        return res.status(403).json({ message: 'Not authorized to update this comment' });
        }

        comment.content = content || comment.content; // Update content if provided
        await comment.save();

        res.status(200).json({ message: 'Comment updated successfully.', comment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
    const { commentId } = req.params;

    try {
        const comment = await Comment.findById(commentId);

        if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
        }

        // Ensure only the owner of the comment can delete it
        if (comment.author.toString() !== req.userId) {
        return res.status(403).json({ message: 'Not authorized to delete this comment' });
        }

        await Comment.findByIdAndDelete(commentId);
        res.status(200).json({ message: 'Comment deleted successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
