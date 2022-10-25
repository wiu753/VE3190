let cities = [],
    tour = [],
    trail = []
let amount = 500,
    cost = 0,
    greedyIterations = 5000,
    greedyCount = 0

// Pick a random number, min and max is inclusive
    let randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// Calculate the cost of a tour
let calculateCost = (tour) => {
    let prev,
        current,
        cost = 0

    for (let i = 1; i < tour.length; i++) {
        prev = tour[i - 1].id
        current = tour[i]
        cost += current.connections[prev]
    }

    return cost
}

// Push cities into array
for (let i = 0; i < amount; i++) {
    let cityObj = {
        id: i,
        connections: [],
    }

    cities.push(cityObj)

    for (let j = 0; j < amount; j++) {
        cities[i].connections.push(-1)
    }
}

// Loop over all the cities and their connections to set a random cost
for (let i = 0; i < amount; i++) {
    for (let j = 0; j < amount; j++) {
        // Update all connections that are -1 and not a connection to itself
        if (cities[i].connections[j] == -1 && i !== j) {
            let random = Math.floor(Math.random() * 9 + 1)
            cities[i].connections[j] = cities[j].connections[i] = random
        }
    }
}

// Pick a random city to start in
let currentCityIndex = randomIntFromInterval(0, cities.length - 1) // Add -1 because length is 1 more
let currentCity = cities[currentCityIndex]
tour.push(cities.splice(currentCityIndex, 1)[0])

// Loop over all cities, adding to the total cost and tour
while (cities.length > 0) {
    nextCityIndex = randomIntFromInterval(0, cities.length - 1)
    nextCity = cities[nextCityIndex]
    cost += nextCity.connections[currentCity.id]
    trail.push(nextCity.connections[currentCity.id])
    currentCity = nextCity
    tour.push(cities.splice(nextCityIndex, 1)[0])
}

// console.log("The cost trail: ", trail)
console.log("Initial cost of tour: ", cost)

// Greedy improvement algorithm
while (greedyCount < greedyIterations) {
    let swap,
        firstRandomCity = randomIntFromInterval(0, tour.length - 1),
        secondRandomCity = randomIntFromInterval(0, tour.length - 1),
        temp = [...tour]

    swap = temp[firstRandomCity]
    temp[firstRandomCity] = temp[secondRandomCity]
    temp[secondRandomCity] = swap

    if (calculateCost(temp) < cost) {
        cost = calculateCost(tour)
        tour = temp
    }

    greedyCount++
}

console.log("Cost of tour after greedy improvement heuristic:", cost)
