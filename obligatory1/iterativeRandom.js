let citiesLeftToVisit = [];
let numberOfCities = 50;
let citiesVisited = [];
let costOfTravel = 0;

// Pick a random number (min and max is inclusive)
let randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Create array of cities
for (let i = 0; i < numberOfCities; i++) {
  // Each city has 49 connections, one to each other city
  let cityObj = {
    id: i,
    connections: [],
  };
  citiesLeftToVisit.push(cityObj); // Add the new city object to the array
  for (let j = 0; j < numberOfCities; j++) { // Fill the entire array with the number -1
    citiesLeftToVisit[i].connections.push(-1);
  }
}

// Generate the graph containing the connections between cities
for (let i = 0; i < numberOfCities; i++) {
  for (let j = 0; j < numberOfCities; j++) {
    // Check that we are not updating a link to the same city and that we only update cities once (not override)
    if (citiesLeftToVisit[i].connections[j] == -1 && i !== j) {
      let random = Math.floor(Math.random() * 9 + 1);
      citiesLeftToVisit[i].connections[j] = random;
      citiesLeftToVisit[j].connections[i] = random;
    }
  }
}

let dontFuckWithCopy = [...citiesLeftToVisit];
let outerLoopCopy = [...citiesLeftToVisit];
let scores = [];

while (outerLoopCopy.length > 0) {

    citiesLeftToVisit = [...dontFuckWithCopy]; // Make sure we start with the original array
    let outerLoopIndex = randomIntFromInterval(0, outerLoopCopy.length - 1); // Add -1 because length is 1 more
    let currentOuterLoopCity = outerLoopCopy[outerLoopIndex]; // Used to get the ID of the city which is the index
    outerLoopCopy.splice(outerLoopIndex, 1);

    let currentCityIndex = outerLoopIndex; // The starting node
    let currentCity = currentOuterLoopCity
    citiesLeftToVisit.splice(currentCityIndex, 1)

    while (citiesLeftToVisit.length > 0) {
        nextCityIndex = randomIntFromInterval(0, citiesLeftToVisit.length - 1); // Pick a random city
        nextCity = citiesLeftToVisit[nextCityIndex];
        costOfTravel += nextCity.connections[currentCity.id]; // Add the cost of the connection
        currentCity = nextCity;
        citiesVisited.push(citiesLeftToVisit.splice(nextCityIndex, 1)[0]); // Remove the city from the array and add to visited
    }

    scores.push(costOfTravel);
    costOfTravel = 0;
}

console.log(scores)
