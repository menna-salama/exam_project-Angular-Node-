const express = require('express');
const router = express.Router();
const Exam = require('../models/exams');
const examSchema = require('../validation/examValidation');
const { validation } = require('../middlewares/validation');
const { auth, adminOnly } = require('../middlewares/auth');
const { getAllExams, createExam, updateExam, deleteExam ,getExamById} = require('../controllers/exams');

router.get('/count', auth, async (req, res) => {
    try {
      const count = await Exam.countDocuments();
      res.json(count);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching exams count', error: error.message });
    }
  });

router.get('/getAll', auth, getAllExams);
router.get('/:id', auth, getExamById);
router.post('/createExam', auth, adminOnly, createExam);
router.put('/:id', auth, adminOnly, updateExam);
router.delete('/:id', auth, adminOnly, deleteExam);

module.exports = router;