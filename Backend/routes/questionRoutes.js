const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const auth = require('../middlewares/auth');

router.get('/:examId/allQuestions', questionController.getQuestions);
router.post('/:examId/addQuestion', questionController.createQuestion);
router.put('/:examId/question/:id', questionController.updateQuestion);
router.delete('/:examId/question/:id',questionController.deleteQuestion);

module.exports = router;