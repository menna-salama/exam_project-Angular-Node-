const express = require("express");
const router = express.Router();
const question = require("../controllers/question");
const { auth } = require("../middlewares/auth");

router.use(auth);

router.post("/add", question.create);
router.put("/update/:id", question.update);
router.delete("/delete/:id", question.delete);
router.get("/exam/:examId", question.getByExam);
router.post("/add-multiple", question.createMany);

module.exports = router;
