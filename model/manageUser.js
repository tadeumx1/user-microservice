const mongoose = require("mongoose");

const table_manageruser = mongoose.Schema({
  userid: { type: String },
  username: { type: String },
  name: { type: String },
  email: { type: String },
  password: { type: String },
  phone: { type: String },
  datelogin: { type: Date, default: Date.now },
});

module.exports = mongoose.model("manager_user", table_manageruser);
