const Joi = require("joi");

module.exports = {
  body: {
    username: Joi.string().required(),
    password: Joi.string().required().min(6),
  },
};
