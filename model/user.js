const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const table_user = mongoose.Schema({
  username: { type: String, unique: true },
  name: { type: String },
  email: { type: String },
  password: { type: String },
  phone: { type: String },
  createdat: { type: Date, default: Date.now },
});

// Fazer a criptografia da senha

table_user.pre("save", function (next) {
  let user = this;
  if (!user.isModified("password")) {
    return next();
  }

  // Quantidade de vezes que faz o cálculo para fazer a criptografia da senha

  bcrypt.hash(user.password, 10, (error, hashpassword) => {
    user.password = hashpassword;
    return next();
  });

});

module.exports = mongoose.model("user", table_user);
