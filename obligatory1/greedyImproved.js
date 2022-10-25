let amount = 50,
    cities = [],
    cost = 0,
    count = 0,
    cheapest = 999999,
    cheapestCity = null,
    greedyCount = 0,
    greedyIterations = 5000

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
    let city = {
        id: i,
        connections: [],
        visited: false,
    }

    cities.push(city)

    for (let j = 0; j < amount; j++) {
        cities[i].connections.push(-1)
    }
}

// Loop over all the cities and their connections to set a random cost
for (let i = 0; i < amount; i++) {
    for (let j = 0; j < amount; j++) {
        if (cities[i].connections[j] == -1 && i !== j) {
            let random = Math.floor(Math.random() * 9 + 1)
            cities[i].connections[j] = cities[j].connections[i] = random
        }
    }
}

// Choose a random city
let currentCity = cities[randomIntFromInterval(0, cities.length - 1)]

currentCity.visited = true
count++
let tour = [currentCity]

while (count < amount) {
    let index = currentCity.id

    // Find the cheapest connection
    for (let i = 0; i < amount; i++) {
        if (
            cities[i].visited == false &&
            cities[i].connections[index] !== -1 &&
            cities[i].connections[index] < cheapest
        ) {
            cheapest = cities[i].connections[index]
            cheapestCity = cities[i]
        }
    }

    tour.push(cheapestCity)
    cheapestCity.visited = true
    count++
    cost += cheapest
    cheapest = 999999
    currentCity = cheapestCity
}

console.log("Cost of tour: ", cost)

while (greedyCount < greedyIterations) {
    let swap = null,
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