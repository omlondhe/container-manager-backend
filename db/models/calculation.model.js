const mongoose = require("mongoose");

const Calculation = new mongoose.Schema(
  {
    itemsUtilized: { type: Number, required: true },
    itemsRemaining: { type: Number, required: true },
    totalItems: { type: Number, required: true },
    weightsUtilized: { type: Number, required: true },
    weightsRemaining: { type: Number, required: true },
    totalWeights: { type: Number, required: true },
    costUtilized: { type: Number, required: true },
    costRemaining: { type: Number, required: true },
    totalCost: { type: Number, required: true },
    namesToTake: { type: [String], required: true },
    costsToTake: { type: [Number], required: true },
    weightsToTake: { type: [Number], required: true },
    namesNotToTake: { type: [String], required: true },
    costsNotToTake: { type: [Number], required: true },
    weightsNotToTake: { type: [Number], required: true },
    requestedWeightCapacity: { type: Number, required: true },
    requestedNames: { type: [String], required: true },
    requestedCosts: { type: [Number], required: true },
    requestedWeights: { type: [Number], required: true },
    dataToTake: { type: [{}], required: true },
    dataNotToTake: { type: [{}], required: true },
    by: { type: String, required: true },
  },
  { collection: "Calculations" }
);

const CalculationModel = mongoose.model("Calculation", Calculation);
module.exports = CalculationModel;
