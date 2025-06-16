// Run this script with: node seedAdmin.js
// It will create an admin user in your MongoDB database.

const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const userModel = require('./models/users');
require('dotenv').config();

async function createAdmin() {
  await mongoose.connect(process.env.MONGO_URI);

  const username = 'admin2';
  const email = 'admin2@gmail.com';
  const password = 'AdminPass123';
  const role = 'admin';

  // Check if admin already exists
  const existing = await userModel.findOne({ email });
  if (existing) {
    console.log('Admin user already exists:', email);
    process.exit(0);
  }

  const hashedPassword = await bcryptjs.hash(password, 10);
  const admin = new userModel({ username, email, password: hashedPassword, role });
  await admin.save();
  console.log('Admin user created:', { username, email, password, role });
  process.exit(0);
}

createAdmin().catch(err => {
  console.error(err);
  process.exit(1);
});
