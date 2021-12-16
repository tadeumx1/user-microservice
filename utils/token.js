const jwt = require("jsonwebtoken");
const config = require("../config/config");

const createToken = (id, username, name) => {
  return jwt.sign({ id: id, user: username, name: name }, config.jwt_key, {
    expiresIn: config.jwt_expires,
  });
};

const getTokenInfo = (token) => {
  return jwt.decode(token);
}

module.exports = {
  createToken,
  getTokenInfo,
}
