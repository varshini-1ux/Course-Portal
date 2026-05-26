const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    enum: ['pdf', 'notes', 'assignment'],
    required: true
  },
  size: Number,
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  downloads: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('File', fileSchema);
