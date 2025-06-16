const express = require("express");
const router = express.Router();
const { login } = require("../controllers/admin");

router.post("/login", login);

router.get("/test", (req, res) => {
  res.json({ status: "success", message: "Admin routes working" });
});

module.exports = router;