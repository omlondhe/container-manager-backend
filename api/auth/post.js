const app = require("../../app");
const User = require("../../db/models/user.model");

// signup
app.post("/api/auth/signup", async (req, res) => {
  const firstName = req.body.firstName;
  const middleName = req.body.middleName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;

  try {
    await User.create({
      firstName,
      middleName,
      lastName,
      email,
      password,
    });
    res.status(200).send({
      firstName,
      middleName,
      lastName,
      email,
      password,
      message: "Authentication successful!",
    });
  } catch (error) {
    res.status(400).send({
      error: error,
      message: "An error occurred!",
    });
  }
});

// login
app.post("/api/auth/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({
    email,
    password,
  });

  if (user) {
    res.status(200).send({
      user,
      message: "Authentication successful!",
    });
  } else {
    res.status(400).send({
      message: "User not found!",
    });
  }
});
