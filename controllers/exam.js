const Exam = require("../models/ExamAdmin");

exports.getAll = async (req, res) => {
  try {
    const exams = await Exam.find();
    res.json({ status: "success", exams });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};

exports.create = async (req, res) => {
  const exam = new Exam(req.body);
  await exam.save();
  res.status(201).json({ message: "Exam created", exam });
};

exports.update = async (req, res) => {
  const updated = await Exam.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: "Exam not found" });
  res.json({ message: "Exam updated", updated });
};

exports.delete = async (req, res) => {
  const deleted = await Exam.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Exam not found" });
  res.json({ message: "Exam deleted" });
};
