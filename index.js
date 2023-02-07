const app = require("./app");
const PORT = process.env | 3000;

// calling route files
require("./db/connection");
require("./api/routes/get");
require("./api/routes/post");

// starting the server
app.listen(PORT, (error) => {
  const message = error
    ? `Error occurred ${error}!`
    : `Server started on port ${PORT}!`;
  console.log(message);
});
