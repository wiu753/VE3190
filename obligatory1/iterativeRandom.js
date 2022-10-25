let cities = [],
    numberOfCities = 50,
    tour = [],
    cost = 0,
    scores = [],
    bestScore = 999999

// Pick a random number, min and max is inclusive
let randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// Push cities into array
for (let i = 0; i < numberOfCities; i++) {
    let cityObj = {
        id: i,
        connections: [],
    }

    cities.push(cityObj)

    for (let j = 0; j < numberOfCities; j++) {
        cities[i].connections.push(-1)
    }
}

// Loop over all the cities and their connections to set a random cost
for (let i = 0; i < numberOfCities; i++) {
    for (let j = 0; j < numberOfCities; j++) {
        // Update all connections that are -1 and not a connection to itself
        if (cities[i].connections[j] == -1 && i !== j) {
            let random = Math.floor(Math.random() * 9 + 1)
            cities[i].connections[j] = random
            cities[j].connections[i] = random
        }
    }
}

let original = [...cities],
    copy = [...cities]

// Outer loop goes over all the different starting cities
// The inner while loop loops over all the cities randomly but starts at a new index until all are started from
while (copy.length > 0) {
    cities = [...original] // Make sure we start with the original array

    // Pick a random city to start in
    let outerIndex = randomIntFromInterval(0, copy.length - 1),
        outerCity = copy[outerIndex] // Used to get the ID of the city which is the index
    copy.splice(outerIndex, 1)

    let currentCity = outerCity,
        currentTour = [currentCity]
    cities.splice(currentCity.id, 1)

    // Inner loop goes over all the cities of the starting city
    while (cities.length > 0) {
        nextCityIndex = randomIntFromInterval(0, cities.length - 1)
        nextCity = cities[nextCityIndex]
        cost += nextCity.connections[currentCity.id]
        currentCity = nextCity
        currentTour.push(cities.splice(nextCityIndex, 1)[0])
    }

    // If the score is lower than the previous, save the tour
    if (cost < bestScore) {
        bestScore = cost
        tour = [...currentTour]
    }

    scores.push(cost)
    cost = 0
}

console.log(scores)
console.log("", bestScore)
