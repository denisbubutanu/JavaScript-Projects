const creatureListUrl = "https://rpg-creature-api.freecodecamp.rocks/api/creatures";
const searchBtn = document.getElementById("search-button");
const inputField = document.getElementById("search-input");
const creatureName = document.getElementById("creature-name");
const creatureID = document.getElementById("creature-id");
const creatureWeight = document.getElementById("weight");
const creatureHeight = document.getElementById("height");
const creatureHP = document.getElementById("hp");
const creatureTypes = document.getElementById("types");
const creatureAttack = document.getElementById("attack");
const creatureDefense = document.getElementById("defense");
const creatureSpecialAttack = document.getElementById("special-attack");
const creatureSpecialDefense = document.getElementById("special-defense");
const creatureSpeed = document.getElementById("speed");

// Main API try-catch function which requests the data, parses it and applies a function to it if found
const searchCreatureData = async (id) => {
  const creatureEndpointLink = creatureListUrl.slice(0, -1) + `/${id}`;
  try {
    const res = await fetch(creatureEndpointLink);
    const data = await res.json();
    creatureData(data);
  } catch (err) {
    console.log(err);
    alert("Creature not found");
  }
}

// Main function of the solution, which destructures the data requested data and either simply outputs it in the right category or appends a child to the DOM element with the necessary attributes
const creatureData = (object) => {
  const {
    id,
    name,
    weight,
    height,
    stats,
    types
  } = object;
  creatureName.textContent = `${name.toUpperCase()}`;
  creatureID.textContent = `${id}`;
  creatureWeight.textContent = `${weight}`;
  creatureHeight.textContent = `${height}`;

  stats.forEach((stat) => {
    document.getElementById(`${stat.name}`).textContent = `${stat.base_stat}`;
  })

  types.forEach((type) => {
    const typeName = type.name;
    let typeChild = creatureTypes.appendChild(Object.assign(document.createElement("p"), { id: `${typeName}`}))
    typeChild.textContent = `${typeName.toUpperCase()}`;
  })
}

// Clear function which clears the table content of the creature, ready to be reused
const clearAttributes = () => {
  creatureTypes.innerHTML = "";
  creatureName.textContent = "";
  creatureID.textContent = "";
  creatureWeight.textContent = "";
  creatureHeight.textContent = "";
  creatureHP.textContent = "";
  creatureAttack.textContent = "";
  creatureDefense.textContent = "";
  creatureSpecialAttack.textContent = "";
  creatureSpecialDefense.textContent = "";
  creatureSpeed.textContent = "";
}

// Click event listener which also clears the old data in the process
searchBtn.addEventListener("click" , () => {
  clearAttributes();
  searchCreatureData(inputField.value);
});
