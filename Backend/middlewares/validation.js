const Joi = require('joi');

exports.validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate({ ...req.body, ...req.params }, { abortEarly: false });
    if (error) {
      return res.status(422).json({ status: "fail", message: error.details[0].message });
    } else {
      next();
    }
  };
};