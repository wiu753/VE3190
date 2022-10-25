let citiesLeftToVisit = [];
let numberOfCities = 4;
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

// Pick a random city to start in
let currentCityIndex = randomIntFromInterval(0, citiesLeftToVisit.length - 1); // Add -1 because length is 1 more
let currentCity = citiesLeftToVisit[currentCityIndex];
citiesVisited.push(citiesLeftToVisit.splice(currentCityIndex, 1)[0]);
let tour = [currentCity];

while (citiesLeftToVisit.length > 0) {
  nextCityIndex = randomIntFromInterval(0, citiesLeftToVisit.length - 1); // Pick a random city
  nextCity = citiesLeftToVisit[nextCityIndex];
  tour.push(nextCity);
  costOfTravel += nextCity.connections[currentCity.id]; // Add the cost of the connection
  currentCity = nextCity;
  citiesVisited.push(citiesLeftToVisit.splice(nextCityIndex, 1)[0]); // Remove the city from the array and add to visited
}

console.log("Cost of travel", costOfTravel);
// console.log(citiesVisited)
// console.log(citiesVisited.length)

console.log(citiesVisited)

let calculateCost = (tour) => {
    let prev
    let current
    let cost = 0

    for (let i = 1; i < tour.length; i++) {
        prev = tour[i - 1].id
        current = tour[i]
        cost += current.connections[prev]
    }

    return cost
}

let running = 0

while (running < 5000) {
    let temp = null
    let firstRandomCity = randomIntFromInterval(0, tour.length - 1)
    let secondRandomCity = randomIntFromInterval(0, tour.length - 1)
    let copy = [...tour]
    
    temp = copy[firstRandomCity]
    copy[firstRandomCity] = copy[secondRandomCity]
    copy[secondRandomCity] = temp
    if (calculateCost(copy) < costOfTravel) {
        console.log("Current cost", costOfTravel)
        costOfTravel = calculateCost(tour)
        console.log("New cost", costOfTravel)
        tour = copy
    }
    running++
}

console.log("Final cost", costOfTravel)