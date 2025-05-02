const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  exam_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
    required: true,
  },
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correct_answer: { type: String, required: true },
}, {
  timestamps: true
});

module.exports = mongoose.model("Question", questionSchema);
