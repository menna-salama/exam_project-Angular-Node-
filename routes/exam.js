const express = require("express");
const router = express.Router();
const exam = require("../controllers/exam");
const { auth } = require("../middlewares/auth");

router.use(auth);

router.get("/", exam.getAll);
router.post("/add", exam.create);
router.put("/update/:id", exam.update);
router.delete("/delete/:id", exam.delete);

module.exports = router;
