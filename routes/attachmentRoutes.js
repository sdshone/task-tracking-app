const express = require('express');
const { uploadAttachment, getAttachments } = require('../controllers/attachmentController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Attachment routes
router.post('/', authMiddleware, uploadAttachment); // Upload a file
router.get('/:taskId', authMiddleware, getAttachments); // Get all attachments for a task

module.exports = router;
