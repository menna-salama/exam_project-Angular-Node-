const express = require('express');
const router = express.Router();
const { validation } = require('../middlewares/validation');
const { registerSchema, loginSchema } = require('../validation/authValidation');
const { register, login, updateProfile, changePassword } = require('../controllers/users');
const { auth } = require('../middlewares/auth');


router.post('/register', validation(registerSchema), register); 
router.post('/login', validation(loginSchema), login);
router.put('/update-profile', auth, (req, res, next) => {
    console.log('🔁 Update Profile Route Hit');
    next();
  }, updateProfile);
  
router.put('/change-password', auth, changePassword);


module.exports = router;