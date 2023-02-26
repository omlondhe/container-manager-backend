const { default: axios } = require("axios");
const app = require("../../app");
const CalculationModel = require("../../db/models/calculation.model");
const { default: mongoose } = require("mongoose");

// path to check of the site is working
// app.get("/", (_, res) => {
//   res.status(200).send({
//     status: 200,
//     message: "Up and running!",
//   });
// });

app.get("/api/get-calculations", async (req, res) => {
  const email = req.query.email;

  try {
    const response = await axios.post(
      "http://127.0.0.1:3000/api/auth/check-if-email-exist",
      {
        email: email,
      }
    );
    if (!response.data.emailExist) {
      res.status(400).send({ error: "User is not authorised!" });
      return;
    }
  } catch (error) {
    res.status(400).send({ error: "User is not authorised!" });
    return;
  }

  const response = await CalculationModel.find({ email: email }).sort({
    _id: -1,
  });

  const responseData = [];
  response.map((data) => {
    responseData.push({
      ...data.toObject(),
      timestamp: data._id.getTimestamp(),
    });
  });

  res.status(200).send(responseData);
});
