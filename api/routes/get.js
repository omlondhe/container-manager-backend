const app = require("../../app");

// path to check of the site is working
app.get("/", (_, res) => {
  res.status(200).send({
    status: 200,
    message: "Up and running!",
  });
});
