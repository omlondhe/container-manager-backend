const app = require("../../app");
const User = require("../../db/models/user.model");

app.get("/api/auth/check-if-email-exist", async (req, res) => {
  const email = req.query.email;
  console.log(email);
  const user = await User.findOne({
    email,
  });

  res.status(200).send({ emailExist: user !== null });
});
