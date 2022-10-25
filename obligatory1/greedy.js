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

// let a = [
//     { id: 1, connections: [ 1, -1, 7, 5, 5, 7 ], visited: true },
//     { id: 0, connections: [ -1, 1, 1, 3, 8, 3 ], visited: true },
//     { id: 2, connections: [ 1, 7, -1, 7, 9, 2 ], visited: true },
//     { id: 5, connections: [ 3, 7, 2, 1, 9, -1 ], visited: true },
//     { id: 3, connections: [ 3, 5, 7, -1, 4, 1 ], visited: true },
//     { id: 4, connections: [ 8, 5, 9, 4, -1, 9 ], visited: true },

//     1 + 1  + 2 + 1 + 4 = 9

//     { id: 5, connections: [ 3, 7, 2, 1, 9, -1 ], visited: true },
//     { id: 0, connections: [ -1, 1, 1, 3, 8, 3 ], visited: true },
//     { id: 2, connections: [ 1, 7, -1, 7, 9, 2 ], visited: true },
//     { id: 1, connections: [ 1, -1, 7, 5, 5, 7 ], visited: true },
//     { id: 3, connections: [ 3, 5, 7, -1, 4, 1 ], visited: true },
//     { id: 4, connections: [ 8, 5, 9, 4, -1, 9 ], visited: true }

//     3 + 1 + 7 + 5 + 4 = 20
// ]

// prev = 4
// curr = 1
// cost = 1 + 2 + 5 + 3 = 11
