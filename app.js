const cors = require("cors");
// adding express to the application
const express = require("express");
const app = express();

// asking to use JSON
app.use(express.json());
// asking to use extended and encoded urls
app.use(express.urlencoded({ extended: true }));
// using cross origin access
app.use(cors());

// exporting app
module.exports = app;
