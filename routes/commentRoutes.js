const express = require('express');
const { addComment, getComments, updateComment, deleteComment } = require('../controllers/commentController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Comment routes
router.post('/', authMiddleware, addComment); // Add a comment
router.get('/:taskId', authMiddleware, getComments); // Get all comments for a task
router.put('/:commentId', authMiddleware, updateComment); // Update comment
router.delete('/:commentId', authMiddleware, deleteComment); // Delete comment

module.exports = router;
