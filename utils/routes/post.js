function getProcessedData(n, costs, names, weights) {
  data = [];
  for (let i = 0; i < n; i++) {
    data.push({ name: names[i], cost: costs[i], weight: weights[i] });
  }
  return data;
}

function getCalculation(index, weight, costs, names, weights) {
  return getCalculation(index, weight, costs, names, weights);
  // if (weight === 0) return [0, []];
  // if (index === 0) {
  //   return weights[index] <= weight ? [costs[index], [index]] : [0, []];
  // }
  // const take = [0, []];
  // if (weights[index] <= weight) {
  //   const result = getCalculation(
  //     index - 1,
  //     weight - weights[index],
  //     costs,
  //     names,
  //     weights
  //   );
  //   take[0] += result[0] + costs[index];
  //   take[1].push(...result[1], index);
  // }
  // const notTake = getCalculation(index - 1, weight, costs, names, weights);
  // return take[0] >= notTake[0] ? take : notTake;
}

function binarySearch(arr, x) {
  let start = 0;
  let end = arr.length - 1;

  while (start < end) {
    let mid = Math.floor((start + end) / 2);
    if (arr[mid] < x) start = mid + 1;
    else end = mid;
  }

  return start;
}

function getCalculation(n, weight, costs, names, weights) {
  let dp = new Array(n);
  for (let i = 0; i < n; i++) dp[i] = new Array(n);
  for (let i = 0; i < n; i++) for (let j = 0; j <= weight; j++) dp[i][j] = 0;
  for (let i = weights[0]; i <= weight; i++) dp[0][i] = costs[0];

  for (let i = 1; i < n; i++) {
    for (let w = 0; w <= weight; w++) {
      let take = 0;
      let notTake = dp[i - 1][w];
      if (weights[i] <= w) take = dp[i - 1][w - weights[i]] + costs[i];
      dp[i][w] = take > notTake ? take : notTake;
    }
  }

  // let arr = new Array(n);
  // let target = dp[n - 1][weight];
  // for (let i = n - 1; i > 0; i--) {
  //   const index = binarySearch(dp[i], target);
  //   const areEqual = dp[i][index] === dp[i - 1][index];
  //   arr[i] = areEqual ? 0 : 1;
  //   if (!areEqual) target -= costs[i];
  // }
  // arr[0] = target === 0 ? 0 : 1;

  let arr = [];
  let target = dp[n - 1][weight];
  for (let i = n - 1; i > 0; i--) {
    const index = binarySearch(dp[i], target);
    const areEqual = dp[i][index] === dp[i - 1][index];
    if (!areEqual) {
      arr.push(i);
      target -= costs[i];
    }
  }
  if (target !== 0) arr.push(0);

  return [dp[n - 1][weight], arr];
}

module.exports = { getProcessedData, getCalculation };
