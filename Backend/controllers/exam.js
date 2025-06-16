const Exam = require("../models/ExamAdmin");

exports.getAll = async (req, res) => {
  try {
    const exams = await Exam.find();
    res.status(200).json({ status: "success", exams });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) return res.status(404).json({ status: "fail", message: "Exam not found" });
    res.status(200).json({ status: "success", exam });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const exam = new Exam(req.body);
    await exam.save();
    res.status(201).json({ status: "success", message: "Exam created", exam });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await Exam.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ status: "fail", message: "Exam not found" });
    res.status(200).json({ status: "success", message: "Exam updated", updated });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

exports.deleteExam = async (req, res) => {
  try {
    const deleted = await Exam.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ status: "fail", message: "Exam not found" });
    res.status(200).json({ status: "success", message: "Exam deleted" });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};
