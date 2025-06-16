const express = require('express');
const router = express.Router();
const { auth } = require("../middlewares/auth");
const resultController = require('../controllers/result');
router.get('/admin/results',auth, resultController.getAllResults);

module.exports = router;
