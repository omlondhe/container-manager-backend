const app = require("../../app");
const jwt = require("jsonwebtoken");
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

app.post("/api/auth/check-if-email-exist", async (req, res) => {
  const email = req.body.email;

  const user = await User.findOne({
    email,
  });

  res.status(200).send({ emailExist: user !== null });
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
    const token = jwt.sign(
      {
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      },
      "t1h2i3s4j5s6o0n9w8e7b4t6o7k9e3n2m4u5s@$b!ek3ept54sec23r2et3sot5h36atno34o!!$$cr312yp$!$!%^%^tthis&*!*payload"
    );
    res.status(200).send({
      user: token,
    });
  } else {
    res.status(400).send({
      message: "Wrong password!",
    });
  }
});
