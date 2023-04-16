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
