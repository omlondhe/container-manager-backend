// adding mongodb
const mongoose = require("mongoose");
const { MONGODB_CONNECTION_STRING } = require("../utils/commons");

// connecting to the mongodb atlas
mongoose
  .connect(MONGODB_CONNECTION_STRING)
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));
