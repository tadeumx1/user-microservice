const Joi = require("joi");

module.exports = {
  body: {
    currentPassword: Joi.string().required().min(6),
    newPassword: Joi.string().required().min(6),
  },
};
