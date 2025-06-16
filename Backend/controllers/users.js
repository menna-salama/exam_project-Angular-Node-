const userModel = require('../models/users');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { registerSchema } = require('../validation/authValidation'); 

const register = async (req, res) => {
  const { error } = registerSchema.validate(req.body, { abortEarly: false }); 
  if (error) {
    return res.status(400).json({ status: 'fail', message: error.details[0].message });
  }

  const existingUser = await userModel.findOne({ email: req.body.email.toLowerCase() });
  if (existingUser) {
    return res.status(400).json({ status: 'fail', message: 'Email already exists' });
  }

  let user = await userModel.create(req.body);
  user = await userModel.findById(user._id).select('-password');

  res.status(201).json({
    status: 'success',
    data: {
      username: user.username,
      email: user.email,
      role: user.role,
      _id: user._id,
    },
  });
};

const login = async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ status: "fail", message: "you must provide email and password to login" });
  }
  let user = await userModel.findOne({ email }).select('+password');
  if (!user) {
    return res.status(401).json({ status: "fail", message: "invalid email or password" });
  }
  let isValid = await bcryptjs.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({ status: "fail", message: "invalid email or password" });
  }

  const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({
    status: 'success',
    token,
    username: user.username,
    role: user.role
  });
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user; 
    const { userName, email } = req.body;

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { userName, email },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user;

  const user = await userModel.findById(userId).select('+password');
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const isValid = await bcryptjs.compare(oldPassword, user.password);
  if (!isValid) {
    return res.status(400).json({ message: 'Old password is incorrect' });
  }

  user.password = await bcryptjs.hash(newPassword, 10);
  await user.save();

  res.status(200).json({ message: 'Password updated successfully' });
};


module.exports = { register, login, updateProfile ,changePassword };