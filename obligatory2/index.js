// 1. The size of the graphs should be: 100, 500, and 1000
// 2. They should have one of three colors
// 3. Should have 10, 20, 40, and 60 starting population sizes
// 4. Use two point crossover, pick two points and and swap everything in betweeen
// 5. The probability of mutating a new child should be 0.1, 0.3, 0.5, 0.7, and 0.9

// Return a random color
let randomColor = () => {
    let colors = ["red", "green", "blue"]
    return colors[Math.floor(Math.random() * colors.length)]
}

// Return a random graph with random number of connections
let generateGraph = (size) => {
    let graph = []
    for (let i = 0; i < size; i++) {
        let node = {
            id: i,
            color: "",
            connections: [],
        }
        graph.push(node)
    }

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            // Not a connection to itself
            if (i !== j) {
                // Randomly decide if there is a connection
                if (Math.random() > 0.5) {
                    // If the connection doesn't exist, add it
                    if (!graph[i].connections.includes(j)) {
                        graph[i].connections.push(j)
                    }
                    if (!graph[j].connections.includes(i)) {
                        graph[j].connections.push(i)
                    }
                }
            }
        }
    }
    return graph
}

// Generate one individual
let generateIndividual = (graph) => {
    // Force a deep copy
    let newGraph = JSON.parse(JSON.stringify(graph))
    for (let i = 0; i < graph.length; i++) {
        newGraph[i].color = randomColor()
    }
    return newGraph
}

// Generate a population
let generatePopulation = (graph, size) => {
    let population = []
    for (let i = 0; i < size; i++) {
        population.push(generateIndividual(graph))
    }
    return population
}

// Calculate the fitness for each individual in a population
let calculateFitness = (population) => {
    let fitness = []
    for (let i = 0; i < population.length; i++) {
        let individualFitness = 0
        for (let j = 0; j < population[i].length; j++) {
            for (let k = 0; k < population[i][j].connections.length; k++) {
                if (
                    population[i][j].color !==
                    population[i][population[i][j].connections[k]].color
                ) {
                    individualFitness++
                }
            }
        }
        fitness.push(individualFitness)
    }
    return fitness
}

// Crossover two parents and make two children
let crossover = (parent1, parent2) => {
    let child1 = JSON.parse(JSON.stringify(parent1))
    let child2 = JSON.parse(JSON.stringify(parent2))
    let point1 = Math.floor(Math.random() * parent1.length)
    let point2 = Math.floor(Math.random() * parent1.length)
    let start = Math.min(point1, point2)
    let end = Math.max(point1, point2)
    console.log("start: ", start, "end: ", end - 1)
    for (let i = start; i < end; i++) {
        child1[i].color = parent2[i].color
        child2[i].color = parent1[i].color
    }
    return [child1, child2]
}

// Reproduce each individual with the next individual
let reproduce = (population) => {
    let newPopulation = []
    for (let i = 0; i < population.length / 2; i++) {
        let parent1 = population[i]
        let parent2 = population[(i + 1) % population.length]
        let children = crossover(parent1, parent2)
        console.log(
            "parent1:",
            parent1.map((node, index) => [index, node.color])
        )
        console.log(
            "parent2:",
            parent2.map((node, index) => [index, node.color])
        )
        console.log(
            "child1: ",
            children[0].map((node, index) => [index, node.color])
        )
        console.log(
            "child2: ",
            children[1].map((node, index) => [index, node.color])
        )
        newPopulation.push(children[0])
        newPopulation.push(children[1])
    }
    return newPopulation
}

// Randomly mutate an individual with a given probability from a population
let mutate = (population, probability) => {
    let newPopulation = []
    for (let i = 0; i < population.length; i++) {
        let individual = population[i]
        let newIndividual = JSON.parse(JSON.stringify(individual))
        for (let j = 0; j < individual.length; j++) {
            if (Math.random() < probability) {
                newIndividual[j].color = randomColor()
            }
        }
        newPopulation.push(newIndividual)
    }
    return newPopulation
}

let graphSize = 10
let populationSize = 10

let graph = generateGraph(graphSize)
let population = generatePopulation(graph, populationSize)
let fitnessPopulation = calculateFitness(population)

console.log("Population:", population)
console.log("Fitness:", fitnessPopulation)

let newPopulation = reproduce(population)
let fitnessNewPopulation = calculateFitness(newPopulation)

console.log("New Population:", newPopulation)
console.log("Fitness kids:", fitnessNewPopulation)

// let graphSizes = [100, 500, 1000]
// let populationSizes = [10, 20, 40, 60]
// let mutationProbabilities = [0.1, 0.3, 0.5, 0.7, 0.9]
