function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}
let dummy = [];
let graphData = [];

function fillDummy(min, max) {
  if (dummy.length < 12) {
    dummy.push(getRandomIntInclusive(min, max))
  } else {
    dummy.splice(0, 1);
    dummy.push(getRandomIntInclusive(min, max))
  }
  return dummy;
}

function updateGraphData(value) {
  if (graphData.length < 12) {
    graphData.push(value)
  } else {
    graphData.splice(0, 1);
    graphData.push(value)
  }
  return graphData;
}


export default updateGraphData
