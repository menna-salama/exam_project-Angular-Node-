const mongoose = require('mongoose');
const questionSchema = new mongoose.Schema({
  examId:{type: mongoose.Schema.Types.ObjectId, required: false, ref:'Exam'},
  text: { type: String, required: true },
  options:  [{ type: String, required: true }],
  correctAnswer: { type: String, required: true }
});

module.exports = mongoose.model('Question', questionSchema);