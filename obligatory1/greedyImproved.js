let nodes = 6
let cities = []
let cost = 0

// Pick a random number (min and max is inclusive)
let randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// Create array of cities
for (let i = 0; i < nodes; i++) {
    let city = {
        id: i,
        connections: [],
        visited: false,
    }

    cities.push(city) // Add the new city object to the array

    for (let j = 0; j < nodes; j++) {
        cities[i].connections.push(-1)
    }
}

// Generate the graph containing the connections between nodes
for (let i = 0; i < nodes; i++) {
    for (let j = 0; j < nodes; j++) {
        // Check that we are not updating a link to the same city and that we only update cities once (not override)
        if (cities[i].connections[j] == -1 && i !== j) {
            let random = Math.floor(Math.random() * 9 + 1)
            cities[i].connections[j] = cities[j].connections[i] = random
        }
    }
}

let citiesVisited = 0
let cheapest = 99
let cheapestCity = null

// Choose a random city
let currentCity = cities[randomIntFromInterval(0, cities.length - 1)]

currentCity.visited = true
citiesVisited++
console.log("First random city is", currentCity)
let tour = [currentCity]

while (citiesVisited < nodes) { 
    let index = currentCity.id

    // Find the cheapest connection
    for (let i = 0; i < nodes; i++) {
        if (
            cities[i].visited == false &&
            cities[i].connections[index] !== -1 &&
            cities[i].connections[index] < cheapest
        ) {
            cheapest = cities[i].connections[index]
            cheapestCity = cities[i]
        }
    }

    console.log(
        "The cheapest city is " +
            cheapestCity.id +
            " with a cost of " +
            cheapest
    )

    tour.push(cheapestCity)
    cheapestCity.visited = true
    citiesVisited++
    cost += cheapest
    cheapest = 99

    // console.log("Cheapest city", cheapestCity)
    // console.log("The cheapest cost", cheapest)
    currentCity = cheapestCity
}

console.log("All cities: ", cities)
console.log("The total cost: ", cost)
console.log(tour)

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
    if (calculateCost(copy) < cost) {
        console.log("Current cost", cost)
        cost = calculateCost(tour)
        console.log("New cost", cost)
        tour = copy
    }
    running++
}

// Something funky about the cost calculation, it's not working properly

console.log(cost)
// Choose two random cities in my tour
// Literally swap their locoation in the tour array
// if (calculateCost(tour) < initialCost) {
//     // Swap the cities
// else just keep the tour as it is
// Stop after 10 seconds

// console.log(calculateCost(tour))
