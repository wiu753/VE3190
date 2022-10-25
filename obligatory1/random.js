let cities = [],
    tour = [],
    trail = [],
    amount = 500,
    cost = 0

// Pick a random number, min and max is inclusive
let randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
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
            let randomCost = Math.floor(Math.random() * 9 + 1)
            cities[i].connections[j] = cities[j].connections[i] = randomCost
        }
    }
}

// Pick a random city to start in
let currentIndex = randomIntFromInterval(0, cities.length - 1)
let currentCity = cities[currentIndex]
tour.push(cities.splice(currentIndex, 1)[0])

// Loop over all cities, adding to the total cost and tour
while (cities.length > 0) {
    nextIndex = randomIntFromInterval(0, cities.length - 1)
    nextCity = cities[nextIndex]
    cost += nextCity.connections[currentCity.id]
    trail.push(nextCity.connections[currentCity.id])
    currentCity = nextCity
    tour.push(cities.splice(nextIndex, 1)[0])
}

// console.log("The tour: ", tour)
// console.log("The trail: ", trail)
console.log("Cost of travel: ", cost)
