const app = require("./app");
const path = require("path");
const express = require("express");
const PORT = process.env | 3000;

// calling route files
require("./db/connection");
require("./api/auth/get.js");
require("./api/auth/post.js");
require("./api/routes/get");
require("./api/routes/post");

// if (process.env.NODE_ENV === "production") {
app.use(express.static(path.join(__dirname, "../client", "build")));
app.use(express.static(path.join(__dirname, "../client", "build/media")));
app.use(express.static(path.join(__dirname, "../client", "build/static")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
});
// }

// starting the server
app.listen(PORT, (error) => {
  const message = error
    ? `Error occurred ${error}!`
    : `Server started on http://127.0.0.1:${PORT} !`;
  console.log(message);
});
