let citiesLeftToVisit = []
let numberOfCities = 500
let citiesVisited = []
let costOfTravel = 0

// Pick a random number (min and max is inclusive)
let randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// Create array of cities
for (let i = 0; i < numberOfCities; i++) {
    // Each city has 49 connections, one to each other city
    let cityObj = {
        id: i,
        connections: [],
    }
    citiesLeftToVisit.push(cityObj) // Add the new city object to the array
    for (let j = 0; j < numberOfCities; j++) {
        // Fill the entire array with the number -1
        citiesLeftToVisit[i].connections.push(-1)
    }
}

// Generate the graph containing the connections between cities
for (let i = 0; i < numberOfCities; i++) {
    for (let j = 0; j < numberOfCities; j++) {
        // Check that we are not updating a link to the same city and that we only update cities once (not override)
        if (citiesLeftToVisit[i].connections[j] == -1 && i !== j) {
            let random = Math.floor(Math.random() * 9 + 1)
            citiesLeftToVisit[i].connections[j] = random
            citiesLeftToVisit[j].connections[i] = random
        }
    }
}

let originalArray = [...citiesLeftToVisit]
let outerLoopCopy = [...citiesLeftToVisit]
let scores = []
let bestTour = []
let bestScore = 99999

while (outerLoopCopy.length > 0) {
    citiesLeftToVisit = [...originalArray] // Make sure we start with the original array
    let outerLoopIndex = randomIntFromInterval(0, outerLoopCopy.length - 1) // Add -1 because length is 1 more
    let currentOuterLoopCity = outerLoopCopy[outerLoopIndex] // Used to get the ID of the city which is the index
    outerLoopCopy.splice(outerLoopIndex, 1)
    // console.log("Original array", originalArray)
    // console.log("Copy which should have been removed 1 timed from", outerLoopCopy)

    let currentCityIndex = outerLoopIndex // The starting node
    let currentCity = currentOuterLoopCity
    let currentTour = [currentCity]
    // console.log("Starting node:", currentTour) // It is picking the right starting node every time
    citiesLeftToVisit.splice(currentCity.id, 1)

    while (citiesLeftToVisit.length > 0) {
        nextCityIndex = randomIntFromInterval(0, citiesLeftToVisit.length - 1) // Pick a random city
        nextCity = citiesLeftToVisit[nextCityIndex]
        // console.log("Can't be the same as the starting node:", nextCity) // This can't be the same as the 
        costOfTravel += nextCity.connections[currentCity.id] // Add the cost of the connection
        currentCity = nextCity
        currentTour.push(citiesLeftToVisit.splice(nextCityIndex, 1)[0]) // Remove the city from the array and add to visited
    }
    // console.log(currentTour)

    // If the score is lower than the previous, save the tour
    // console.log(currentTour)

    if (costOfTravel < bestScore) {
        bestScore = costOfTravel
        bestTour = [...currentTour]
    }
    scores.push(costOfTravel)
    costOfTravel = 0
}

// console.log("Best tour", bestTour)
// console.log("all scores:", scores)
// console.log("The best score: ", bestScore)

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
    let firstRandomCity = randomIntFromInterval(0, bestTour.length - 1)
    let secondRandomCity = randomIntFromInterval(0, bestTour.length - 1)
    let copy = [...bestTour]

    temp = copy[firstRandomCity]
    copy[firstRandomCity] = copy[secondRandomCity]
    copy[secondRandomCity] = temp
    if (calculateCost(copy) < bestScore) {
        // console.log("Current cost", bestScore)
        bestScore = calculateCost(bestTour)
        // console.log("New cost", bestScore)
        bestTour = [...copy]
    }
    running++
}

console.log(bestScore)
