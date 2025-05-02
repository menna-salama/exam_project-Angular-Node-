const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
exports.login = async function (req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: "fail", message: "You must provide email and password" });
    }
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ status: "fail", message: "Invalid email or password" });
    }
    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      return res.status(401).json({ status: "fail", message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.SECRET
    );
    res.status(200).json({ status: "success", data: { token } });
};
