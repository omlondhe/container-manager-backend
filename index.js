const app = require("./app");
const PORT = process.env | 3000;

// calling route files
require("./db/connection");
require("./api/auth/get.js");
require("./api/auth/post.js");
require("./api/routes/get");
require("./api/routes/post");

// starting the server
app.listen(PORT, (error) => {
  const message = error
    ? `Error occurred ${error}!`
    : `Server started on http://127.0.0.1:${PORT} !`;
  console.log(message);
});
