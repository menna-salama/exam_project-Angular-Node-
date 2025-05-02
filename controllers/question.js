const Question = require("../models/QuestionAdmin");
exports.create = async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.status(201).json({ message: "Question added", question });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.update = async (req, res) => {
  try {
    const updated = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Question not found" });
    res.json({ message: "Question updated", updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.delete = async (req, res) => {
  try {
    const deleted = await Question.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Question not found" });
    res.json({ message: "Question deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getByExam = async (req, res) => {
  try {
    const questions = await Question.find({ exam_id: req.params.examId });
    res.json({ questions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.createMany = async (req, res) => {
    try {
      const questions = await Question.insertMany(req.body);
      res.status(201).json({
        message: "Questions added successfully",
        questions,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
