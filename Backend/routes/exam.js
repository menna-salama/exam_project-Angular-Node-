const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const {
  getAll,
  getById,
  create,
  update,
  deleteExam
} = require("../controllers/exam");

router.get("/", auth, getAll);
router.get("/:id", auth, getById);
router.post("/", auth, create);
router.put("/:id", auth, update);
router.delete("/:id", auth, deleteExam);

module.exports = router;
