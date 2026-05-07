let round = 1;

// Initial state
let deerPopulation = 10;

// Habitat capacities
let habitat = {
  food: 6,
  water: 6,
  shelter: 6
};

function updateStats() {
  document.getElementById("stats").innerHTML = `
    <strong>Round:</strong> ${round}<br>
    <strong>Deer population:</strong> ${deerPopulation}<br>
    <strong>Habitat:</strong>
    Food (${habitat.food}),
    Water (${habitat.water}),
    Shelter (${habitat.shelter})
  `;
}

updateStats();

function playTurn(playerChoice) {
  let choices = [];

  // Player choice
  choices.push(playerChoice);

  // Computer deer make random choices
  for (let i = 1; i < deerPopulation; i++) {
    let opts = ["food", "water", "shelter"];
    choices.push(opts[Math.floor(Math.random() * opts.length)]);
  }

  let results = resolveCompetition(choices);
  let survivors = results.successes;

  let logText = `
    Deer seeking food: ${results.counts.food}<br>
    Deer seeking water: ${results.counts.water}<br>
    Deer seeking shelter: ${results.counts.shelter}<br>
    Survivors: ${survivors}<br>
  `;

  // Each surviving deer reproduces (+1)
  deerPopulation = survivors * 2;

  round++;

  document.getElementById("log").innerHTML = logText;
  updateStats();
}

function resolveCompetition(choices) {
  let counts = { food: 0, water: 0, shelter: 0 };

  choices.forEach(c => counts[c]++);

  let successes = 0;

  for (let type in counts) {
    successes += Math.min(counts[type], habitat[type]);
  }

  return { successes, counts };
}
