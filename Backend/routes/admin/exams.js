const express = require('express');
const router = express.Router();
const { getAllExams, getExamById, createExam, updateExam, deleteExam } = require('../../controllers/exams');
const { createQuestion, updateQuestion, deleteQuestion } = require('../../controllers/questionController');
const { auth, adminOnly } = require('../../middlewares/auth');

// Apply both middlewares
router.use(auth, adminOnly);

router.post('/', createExam);
router.put('/:id', updateExam);
router.delete('/:id', deleteExam);

router.post('/:examId/questions', createQuestion);
router.put('/:examId/questions/:questionId', updateQuestion);
router.delete('/:examId/questions/:questionId', deleteQuestion);

module.exports = router;