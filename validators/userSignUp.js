const Joi = require("joi");

module.exports = {
  body: {
    username: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
    phone: Joi.string().required(),
  },
};
