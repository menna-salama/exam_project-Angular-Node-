const jwt = require("jsonwebtoken");

exports.auth = function (req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      status: "fail",
      message: "Please login",
    });
  }

  try {
    const decoded = jwt.verify(authorization, process.env.SECRET);
    console.log(decoded); 
    next();
  } catch (err) {
    return res.status(401).json({
      status: "fail",
      message: "Unauthorized",
    });
  }
};
