const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { collection: "Users" }
);

const UserModel = mongoose.model("User", User);
module.exports = UserModel;
