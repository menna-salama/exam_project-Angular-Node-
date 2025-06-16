// path: Backend/controllers/resultController.js
const Result = require('../models/result');
const Question = require('../models/question');

exports.submitExam = async (req, res, next) => {
  try {
    const { examId, answers } = req.body;
    const userId = req.user._id; // Extracted from JWT middleware

    const questions = await Question.find({ examId });
    if (!questions || questions.length === 0) {
      return res.status(404).json({ status: 'fail', message: 'No questions found for this exam' });
    }

    let score = 0;
    const totalQuestions = questions.length;

    const processedAnswers = answers.map(answer => {
      const question = questions.find(q => q._id.toString() === answer.questionId);
      const isCorrect = question && question.correctAnswer === answer.answer;
      if (isCorrect) score += 1;

      return {
        questionId: answer.questionId,
        answer: answer.answer,
        correctAnswer: question ? question.correctAnswer : null,
        isCorrect
      };
    });

    const result = new Result({
      userId,
      examId,
      answers: processedAnswers,
      score,
      totalQuestions
    });

    await result.save();
    res.status(201).json({ status: 'success', data: { score, totalQuestions } });
  } catch (error) {
    next(error);
  }
};

exports.getResults = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const results = await Result.find({ userId }).populate('examId');
    res.status(200).json({ status: 'success', data: results });
  } catch (error) {
    next(error);
  }
};

exports.getAllResults = async (req, res, next) => {
  try {
    const results = await Result.find().populate('examId').populate('userId');
    res.status(200).json({ status: 'success', data: results });
  } catch (error) {
    next(error);
  }
};