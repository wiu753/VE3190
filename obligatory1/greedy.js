let amount = 500,
    cities = [],
    cost = 0,
    count = 0,
    lowestCost = 999999,
    cheapestCity = null

// Pick a random number, min and max is inclusive
let randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
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
let currentCity = cities[randomIntFromInterval(0, cities.length - 1)],
    tour = [currentCity]
currentCity.visited = true
count++

while (count < amount) {
    let index = currentCity.id

    // Find the cheapest connection
    for (let i = 0; i < amount; i++) {
        if (
            cities[i].visited == false &&
            cities[i].connections[index] !== -1 &&
            cities[i].connections[index] < lowestCost
        ) {
            lowestCost = cities[i].connections[index]
            cheapestCity = cities[i]
        }
    }

    tour.push(cheapestCity)
    cheapestCity.visited = true
    count++
    cost += lowestCost
    lowestCost = 999999
    currentCity = cheapestCity
}

// console.log("Tour:", tour)
console.log("The total cost: ", cost)
