const Question = require('../models/question');

exports.getQuestions = async (req, res) => {
  const {examId} = req.params;
  console.log(examId)
  try {
    const question = await Question.find({ examId }); 
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// exports.getQuestions = async (req, res) => {
  
//   try {
//     const questions = await Question.find();  
//     res.json(questions);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

exports.createQuestion = async (req, res) => {
  const {examId} = req.params;
  console.log(examId);
 
  const question = new Question({
    examId,
    text: req.body.text,
    options: req.body.options,
    correctAnswer: req.body.correctAnswer
  });
  try {
    const newQuestion = await question.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(question);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json({ message: 'Question deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};