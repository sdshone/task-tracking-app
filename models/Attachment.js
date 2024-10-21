const mongoose = require('mongoose');

const AttachmentSchema = new mongoose.Schema({
    fileName: { type: String, required: true },
    filePath: { type: String, required: true },
    task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Attachment', AttachmentSchema);
