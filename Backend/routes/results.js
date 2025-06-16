const express = require('express');
const router = express.Router();
const { getResults, getAllResults } = require('../controllers/resultController');
const { auth, adminOnly } = require('../middlewares/auth');

router.get('/me', auth, getResults);
router.get('/admin', auth, adminOnly, getAllResults);

module.exports = router;