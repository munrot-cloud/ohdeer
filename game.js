let round = 1;
let deerPopulation = 10;

// Start with more habitat so decline is visible
let habitat = {
  food: 15,
  water: 15,
  shelter: 15
};

// Slow regeneration
const REGEN_RATE = 1;

function updateStats() {
  document.getElementById("stats").innerHTML = `
    <h2>Level ${round}</h2>
    <strong>Deer population:</strong> ${deerPopulation}<br><br>
    <strong>Habitat available:</strong><br>
    Food: ${habitat.food}<br>
    Water: ${habitat.water}<br>
    Shelter: ${habitat.shelter}
  `;
}

updateStats();

function playTurn(playerChoice) {
  let choices = [];

  // Player choice
  choices.push(playerChoice);

  // Computer-controlled deer
  for (let i = 1; i < deerPopulation; i++) {
    let opts = ["food", "water", "shelter"];
    choices.push(opts[Math.floor(Math.random() * opts.length)]);
  }

  let { successes, consumption } = resolveCompetition(choices);

  // Births depend on success
  let births = Math.floor(successes * 0.5);

  deerPopulation = successes + births;

  // Regenerate habitat (slowly)
  for (let type in habitat) {
    habitat[type] += REGEN_RATE;
    if (habitat[type] < 0) habitat[type] = 0;
  }

  // Log this round clearly
  document.getElementById("log").innerHTML += `
    <div class="round-log">
      <h3>Level ${round}</h3>
      Survivors: ${successes}<br>
      Births: ${births}<br>
      Habitat used — 
      Food: ${consumption.food},
      Water: ${consumption.water},
      Shelter: ${consumption.shelter}
    </div>
  `;

  round++;
  updateStats();
}

function resolveCompetition(choices) {
  let demand = { food: 0, water: 0, shelter: 0 };
  let used = { food: 0, water: 0, shelter: 0 };

  choices.forEach(c => demand[c]++);

  let successes = 0;

  for (let type in demand) {
    let matched = Math.min(demand[type], habitat[type]);
    successes += matched;

    habitat[type] -= matched;
    used[type] = matched;
  }

  return { successes, consumption: used };
}
