const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const questionController = require("../controllers/question");

router.get("/:examId", auth, questionController.getByExam);
router.post("/", auth, questionController.create);
router.post("/many", auth, questionController.createMany);
router.put("/:id", auth, questionController.update);
router.delete("/:id", auth, questionController.deleteQuestion);

module.exports = router;
