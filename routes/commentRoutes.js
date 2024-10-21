const express = require('express');
const { addComment, getComments } = require('../controllers/commentController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Comment routes
router.post('/', authMiddleware, addComment); // Add a comment
router.get('/:taskId', authMiddleware, getComments); // Get all comments for a task

module.exports = router;
