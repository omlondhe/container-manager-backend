function getProcessedData(n, costs, names, weights) {
  data = [];
  for (let i = 0; i < n; i++) {
    data.push({ name: names[i], cost: costs[i], weight: weights[i] });
  }
  return data;
}

function getCalculation(index, weight, costs, names, weights) {
  if (weight === 0) return [0, []];
  if (index === 0) {
    return weights[index] <= weight ? [costs[index], [index]] : [0, []];
  }

  const take = [0, []];
  if (weights[index] <= weight) {
    const result = getCalculation(
      index - 1,
      weight - weights[index],
      costs,
      names,
      weights
    );
    take[0] += result[0] + costs[index];
    take[1].push(...result[1], index);
  }
  const notTake = getCalculation(index - 1, weight, costs, names, weights);

  return take[0] >= notTake[0] ? take : notTake;
}

module.exports = { getProcessedData, getCalculation };
