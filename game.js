let round = 1;

// Each deer is an object with a fixed need
let deer = [];

// Initial population
function initDeer(count) {
  deer = [];
  for (let i = 0; i < count; i++) {
    deer.push({
      need: randomNeed()
    });
  }
}

function randomNeed() {
  const needs = ["food", "water", "shelter"];
  return needs[Math.floor(Math.random() * needs.length)];
}

// Initial state
initDeer(12);

// Habitat pools (NO regeneration in Level 1)
let habitat = {
  food: 6,
  water: 6,
  shelter: 6
};

function updateStats() {
  document.getElementById("stats").innerHTML = `
    <h2>Level ${round}</h2>
    <strong>Deer population:</strong> ${deer.length}<br><br>
    <strong>Habitat remaining:</strong><br>
    Food: ${habitat.food}<br>
    Water: ${habitat.water}<br>
    Shelter: ${habitat.shelter}
  `;
}

updateStats();

function playTurn(playerChoice) {
  // Player overrides their deer’s need
  deer[0].need = playerChoice;

  let demand = { food: 0, water: 0, shelter: 0 };
  deer.forEach(d => demand[d.need]++);

  let survivors = [];

  for (let d of deer) {
    if (habitat[d.need] > 0) {
      habitat[d.need]--;
      survivors.push(d);
    }
  }

  // Reproduction: each survivor produces one offspring
  let offspring = survivors.map(d => ({
    need: randomNeed()
  }));

  deer = survivors.concat(offspring);

  document.getElementById("log").innerHTML += `
    <div class="round-log">
      <h3>Level ${round}</h3>
      Demand → Food: ${demand.food}, Water: ${demand.water}, Shelter: ${demand.shelter}<br>
      Survivors: ${survivors.length}<br>
      Offspring: ${offspring.length}
    </div>
  `;

  round++;
  updateStats();
}
