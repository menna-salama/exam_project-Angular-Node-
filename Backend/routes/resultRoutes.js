const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');
const { auth, adminOnly } = require('../middlewares/auth');

router.post('/submit', auth, resultController.submitExam);
router.get('/', auth, resultController.getResults);

module.exports = router;