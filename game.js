let round = 1;
let deerPopulation = 10;

let habitat = {
  food: 8,
  water: 8,
  shelter: 8
};

// Controls how fast habitat recovers
const REGEN_RATE = 2;

function updateStats() {
  document.getElementById("stats").innerHTML = `
    <h2>Level ${round}</h2>
    <strong>Deer population:</strong> ${deerPopulation}<br>
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

  // Computer deer choose randomly
  for (let i = 1; i < deerPopulation; i++) {
    let opts = ["food", "water", "shelter"];
    choices.push(opts[Math.floor(Math.random() * opts.length)]);
  }

  let results = resolveCompetition(choices);

  // Population update
  let survivors = results.successes;
  let births = Math.floor(survivors * 0.5); // 50% reproduce

  deerPopulation = survivors + births;

  // Habitat regeneration
  for (let type in habitat) {
    habitat[type] += REGEN_RATE;
    if (habitat[type] > 10) habitat[type] = 10; // cap
  }

  round++;

  document.getElementById("log").innerHTML += `
    <div class="round-log">
      <h3>Level ${round - 1} Results</h3>
      Deer survived: ${survivors}<br>
      New births: ${births}<br>
    </div>
  `;

  updateStats();
}

function resolveCompetition(choices) {
  let counts = { food: 0, water: 0, shelter: 0 };
  choices.forEach(c => counts[c]++);

  let successes = 0;

  for (let type in counts) {
    let matched = Math.min(counts[type], habitat[type]);
    successes += matched;
    habitat[type] -= matched; // habitat is consumed
  }

  return { successes };
}
