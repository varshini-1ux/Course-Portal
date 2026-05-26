const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  semester: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5, 6, 7, 8]
  },
  instructor: {
    type: String,
    required: true
  },
  credits: {
    type: Number,
    default: 3
  },
  materials: [{
    _id: mongoose.Schema.Types.ObjectId,
    filename: String,
    filePath: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    },
    type: {
      type: String,
      enum: ['pdf', 'notes', 'assignment'],
      default: 'notes'
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Course', courseSchema);
