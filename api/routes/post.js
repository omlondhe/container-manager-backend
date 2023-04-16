const jwt = require("jsonwebtoken");
const app = require("../../app");
const { getProcessedData, getCalculation } = require("../../utils/routes/post");
const { default: axios } = require("axios");
const CalculationModel = require("../../db/models/calculation.model");
const User = require("../../db/models/user.model");

app.post("/api/calculate", async (req, res) => {
  const token = req.body.token;
  const decoded = jwt.verify(
    token,
    "t1h2i3s4j5s6o0n9w8e7b4t6o7k9e3n2m4u5s@$b!ek3ept54sec23r2et3sot5h36atno34o!!$$cr312yp$!$!%^%^tthis&*!*user"
  );
  if (!decoded.email) {
    res.status(400).send({ error: "User is not authorized!" });
    return;
  }

  try {
    const email = decoded.email;
    const user = await User.findOne({
      email,
    });

    if (!user) {
      res.status(400).send({ error: "User is not authorized!" });
      return;
    }
  } catch (error) {
    res.status(400).send({ error: "User is not authorized!" });
    return;
  }

  const weight = req.body.weight;
  const names = req.body.names;
  const costs = req.body.costs;
  const weights = req.body.weights;

  const namesLength = names.length;
  const costsLength = costs.length;
  const weightsLength = weights.length;

  if (weight <= 0) {
    return res.status(400).send({
      error: `Weight can't be ${weight < 0 ? "negative" : "zero"}`,
    });
  }

  if (weightsLength === 0 || costsLength === 0 || namesLength === 0) {
    return res.status(400).send({
      error: `Length of ${
        weightsLength === 0 && costsLength === 0 && namesLength === 0
          ? "Weights, Costs and Names"
          : weightsLength === 0 && costsLength === 0
          ? "Weights and Costs"
          : costsLength === 0 && namesLength === 0
          ? "Costs and Names"
          : weightsLength === 0 && namesLength === 0
          ? "Weights and Names"
          : weightsLength === 0
          ? "Weights"
          : costsLength === 0
          ? "Costs"
          : "Names"
      } can't be zero`,
    });
  }

  if (
    weightsLength !== costsLength ||
    weightsLength !== namesLength ||
    costsLength !== namesLength
  ) {
    return res.status(400).send({
      error:
        `Costs has length ${costsLength}, ` +
        `Names has length ${namesLength}, ` +
        `Weights has length ${weightsLength}, ` +
        `but they must have same number of data elements.`,
    });
  }

  // data = getProcessedData(weights.length, costs, names, weights);
  // console.log(data);
  const calculation = getCalculation(
    weights.length,
    weight,
    costs,
    names,
    weights
  );

  let totalCost = 0;
  let weightsUtilized = 0;
  let weightsRemaining = 0;
  const namesToTake = [];
  const namesNotToTake = [];
  const weightsToTake = [];
  const weightsNotToTake = [];
  const costsToTake = [];
  const costsNotToTake = [];

  for (let i = 0; i < weights.length; i++) {
    totalCost += Number(costs[i]);
    if (calculation[1].includes(i)) {
      weightsUtilized += Number(weights[i]);
      namesToTake.push(names[i]);
      costsToTake.push(costs[i]);
      weightsToTake.push(weights[i]);
    } else {
      weightsRemaining += Number(weights[i]);
      namesNotToTake.push(names[i]);
      costsNotToTake.push(costs[i]);
      weightsNotToTake.push(weights[i]);
    }
  }

  const responseData = {
    itemsUtilized: namesToTake.length,
    itemsRemaining: namesNotToTake.length,
    totalItems: names.length,
    weightsUtilized,
    weightsRemaining,
    totalWeights: weightsUtilized + weightsRemaining,
    costUtilized: calculation[0],
    costRemaining: totalCost - calculation[0],
    totalCost,
    namesToTake,
    costsToTake,
    weightsToTake,
    namesNotToTake,
    costsNotToTake,
    weightsNotToTake,
    requestedWeightCapacity: weight,
    requestedData: getProcessedData(names.length, costs, names, weights),
    dataToTake: getProcessedData(
      namesToTake.length,
      costsToTake,
      namesToTake,
      weightsToTake
    ),
    dataNotToTake: getProcessedData(
      namesNotToTake.length,
      costsNotToTake,
      namesNotToTake,
      weightsNotToTake
    ),
    by: decoded.email,
  };

  res.status(200).send(responseData);
});

app.post(`/api/save-calculation`, async (req, res) => {
  const token = req.body.token;
  const decoded = jwt.verify(
    token,
    "t1h2i3s4j5s6o0n9w8e7b4t6o7k9e3n2m4u5s@$b!ek3ept54sec23r2et3sot5h36atno34o!!$$cr312yp$!$!%^%^tthis&*!*user"
  );

  if (!decoded.email) {
    res.status(400).send({ error: "User is not authorized!" });
    return;
  }

  console.log(decoded.email);
  try {
    const email = decoded.email;
    const user = await User.findOne({
      email,
    });

    if (!user) {
      res.status(400).send({ error: "User is not authorized!" });
      return;
    }
  } catch (error) {
    res.status(400).send({ error: "User is not authorized!" });
    return;
  }

  const responseData = req.body.responseData;
  try {
    await CalculationModel.create(responseData);
    res
      .status(200)
      .send({ message: "Added to database", addedToDatabase: true });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ error: "An error occurred!", addedToDatabase: false });
  }
});
