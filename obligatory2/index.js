// Notes
// Use pure functions

// Instructions
// 1. The size of the graphs should be: 100, 500, and 1000
// 2. They should have one of three colors
//  2.1 The colors should be: red, green, and blue
// 3. Should have 10, 20, 40, and 60 starting population sizes
// 4. Use two point crossover, pick two points and and swap everything in betweeen
// 5. The probability of mutating a new child should be 0.1, 0.3, 0.5, 0.7, and 0.9

let test = true
test ? console.log("------------ BEGIN TEST ------------") : null

// Return a random color
let randomColor = () => {
    let colors = ["red", "green", "blue"]
    return colors[Math.floor(Math.random() * colors.length)]
}

test ? console.log("Random color:", randomColor()) : null

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

let testGraph = generateGraph(5)
test ? console.log("Graph:", testGraph) : null

// Generate one individual
let generateIndividual = (graph) => {
    // Force a deep copy
    let newGraph = JSON.parse(JSON.stringify(graph))
    for (let i = 0; i < graph.length; i++) {
        newGraph[i].color = randomColor()
    }
    return newGraph
}

let individualOne = generateIndividual(testGraph)
let individualTwo = generateIndividual(testGraph)
let individualThree = generateIndividual(testGraph)

if (test) {
    console.log("Individual 1", individualOne)
    console.log("Individual 2", individualTwo)
    console.log("Individual 3", individualThree)
}

// Calculate the fitness of an individual
let calculateFitness = (individual) => {
    let fitness = 0
    for (let i = 0; i < individual.length; i++) {
        for (let j = 0; j < individual[i].connections.length; j++) {
            if (
                individual[i].color !==
                individual[individual[i].connections[j]].color
            ) {
                fitness++
            }
        }
    }
    return fitness
}

if (test) {
    console.log("Fitness 1:", calculateFitness(individualOne))
    console.log("Fitness 2:", calculateFitness(individualTwo))
    console.log("Fitness 3:", calculateFitness(individualThree))
}

test ? console.log("------------ END TEST ------------") : null
