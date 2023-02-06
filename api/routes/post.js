const app = require("../../app");
const { getProcessedData, getCalculation } = require("../../utils/routes/post");

app.post("/calculate", (req, res) => {
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
    weights.length - 1,
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
    totalCost += costs[i];
    if (calculation[1].includes(i)) {
      weightsUtilized += weights[i];
      namesToTake.push(names[i]);
      costsToTake.push(costs[i]);
      weightsToTake.push(weights[i]);
    } else {
      weightsRemaining += weights[i];
      namesNotToTake.push(names[i]);
      costsNotToTake.push(costs[i]);
      weightsNotToTake.push(weights[i]);
    }
  }

  res.status(200).send({
    itemsUtilized: namesToTake.length,
    itemsRemaining: namesNotToTake.length,
    totalItems: names.length,
    weightsUtilized,
    weightsRemaining,
    totalWeights: weightsUtilized + weightsRemaining,
    containerWeightCapacity: weight,
    costUtilized: calculation[0],
    costRemaining: totalCost - calculation[0],
    totalCost,
    names: namesToTake,
    costs: costsToTake,
    weights: weightsToTake,
    namesNotToTake,
    costsNotToTake,
    weightsNotToTake,
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
  });
});
