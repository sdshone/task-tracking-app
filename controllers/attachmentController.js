const Attachment = require('../models/Attachment');
const multer = require('multer');
const path = require('path');

// Set up file storage
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage }).single('file');

// Upload an attachment to a task
exports.uploadAttachment = (req, res) => {
    upload(req, res, async (err) => {
        if (err) return res.status(500).send('File upload error');

        const { taskId } = req.body;
        const { file } = req;
        try {
        const attachment = new Attachment({
            fileName: file.originalname,
            filePath: file.path,
            task: taskId,
            uploadedBy: req.userId
        });
        await attachment.save();
        res.json(attachment);
        } catch (err) {
        res.status(500).send('Server error');
        }
    });
};

// Get all attachments for a task
exports.getAttachments = async (req, res) => {
    const { taskId } = req.params;
    try {
        const attachments = await Attachment.find({ task: taskId });
        res.json(attachments);
    } catch (err) {
        res.status(500).send('Server error');
    }
};
