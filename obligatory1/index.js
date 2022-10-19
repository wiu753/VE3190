let cities = [];

// There are 50 cities
for (let i = 0; i < 50; i++) {
  // Each city has 49 connections, one to each other city
  cities.push([]);
  for (let j = 0; j < 50; j++) {
    cities[i].push(-1);
  }
}

// Generate the graph (cities)
for (let i = 0; i < 50; i++) {
  for (let j = 0; j < 50; j++) {
    // Check that we are not updating a link to the same city and that we only
    // update cities once (not override)
    if (cities[i][j] == -1 && i !== j) {
      let random = Math.floor(Math.random() * 9 + 1);
      cities[i][j] = random
      cities[j][i] = random
    }
  }
}



console.log(cities);
