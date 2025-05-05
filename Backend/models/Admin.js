const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const adminSchema = new mongoose.Schema({
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  role: {
    type: String,
    default: 'admin'
  }
}, { timestamps: true });
const Admin = mongoose.model('Admin', adminSchema);

 
const createDefaultAdmin = async () => {
  const existing = await Admin.findOne({ email: 'menna@gmail.com' });
  if (existing) return;
  const hashedPassword = await bcrypt.hash('menna123', 10);
  const defaultAdmin = new Admin({
    email: 'menna@gmail.com',
    password: hashedPassword
  });

  try {
    await defaultAdmin.save();
    console.log(' admin created');
  } catch (error) {
    console.error('Error creating default admin:', error.message);
  }
};
createDefaultAdmin();
module.exports = Admin;
