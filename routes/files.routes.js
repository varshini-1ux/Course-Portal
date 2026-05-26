const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const File = require('../models/File');
const Course = require('../models/Course');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedExtensions = ['.pdf', '.txt', '.doc', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedExtensions.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// Upload file
router.post('/upload/:courseId', verifyToken, verifyAdmin, upload.single('file'), async (req, res) => {
  try {
    const { courseId } = req.params;
    const { fileType } = req.body;
    
    const course = await Course.findById(courseId);
    if (!course) {
      fs.unlinkSync(req.file.path);
      return res.status(404).json({ message: 'Course not found' });
    }
    
    const file = new File({
      courseId,
      filename: req.file.originalname,
      filePath: req.file.path,
      fileType: fileType || 'notes',
      size: req.file.size,
      uploadedBy: req.userId
    });
    
    await file.save();
    
    // Add to course materials
    course.materials.push({
      _id: file._id,
      filename: file.filename,
      filePath: file.filePath,
      type: file.fileType
    });
    await course.save();
    
    res.status(201).json({ message: 'File uploaded successfully', file });
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).json({ message: error.message });
  }
});

// Download file
router.get('/download/:fileId', async (req, res) => {
  try {
    const file = await File.findById(req.params.fileId);
    if (!file) return res.status(404).json({ message: 'File not found' });
    
    file.downloads += 1;
    await file.save();
    
    res.download(file.filePath, file.filename);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get files for course
router.get('/course/:courseId', async (req, res) => {
  try {
    const files = await File.find({ courseId: req.params.courseId });
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
