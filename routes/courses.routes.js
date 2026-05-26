const express = require('express');
const Course = require('../models/Course');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

const router = express.Router();

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().sort({ semester: 1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get courses by semester
router.get('/semester/:semester', async (req, res) => {
  try {
    const courses = await Course.find({ semester: req.params.semester });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single course
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create course (Admin only)
router.post('/', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { title, description, code, semester, instructor, credits } = req.body;
    
    const course = new Course({
      title,
      description,
      code,
      semester,
      instructor,
      credits
    });
    
    await course.save();
    res.status(201).json({ message: 'Course created', course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update course (Admin only)
router.put('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json({ message: 'Course updated', course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete course (Admin only)
router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json({ message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
