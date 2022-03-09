const card = document.getElementById("card");
card.innerHTML = "Loading...";

const form = document.getElementById("form");
const userInputName = document.getElementById("name");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  getCharacter(userInputName.value);
});

const getCharacter = async (character) => {
  const response = await fetch("./harry-potter-data.json");
  const dataset = await response.json();

  card.innerHTML = "Character not found.";

  dataset.forEach((data) => {
    if (character.toUpperCase() === data.name.toUpperCase()) {
      createCard(data);
    } else {
      data.alternate_names.forEach((alternate_name) => {
        if (character.toUpperCase() === alternate_name.toUpperCase()) {
          createCard(data);
        }
      });
    }
  });
};

const createCard = (data) => {
  let character = {};

  for (key in data) {
    if (data[key] !== "") {
      character[key] = data[key];
    }
  }

  console.log(character);

  const name = character.name;
  const img = character.image
    ? `<img src=${character.image} alt=${name}/>`
    : "";
  const birthday = character.dateOfBirth ? "Born " + character.dateOfBirth : "";
  const actor = character.actor ? character.actor : "";

  const alternate_actors = character.alternate_actors.map(
    (actor) => ", " + actor
  );

  const ancestry = character.ancestry
    ? "Blood status: " + character.ancestry
    : "";
  const house = character.house ? "Hogwarts house: " + character.house : "";
  const patronus = character.patronus ? "Patronus: " + character.patronus : "";

  const cardHTML = `
            <div class="profile">
                  <h2>${name}</h2>
                  ${img}
                  <p>${birthday}</p>
                  <p>Played by: ${actor}${
    alternate_actors ? alternate_actors : ""
  }
            </div>
            <div class="info">
                  </p>
                  <h2>Info</h2>
                  <p>${ancestry}</p>
                  <p>${house}</p>
                  <p>${patronus}</p>
            </div>
              `;

  card.innerHTML = cardHTML;
};

getCharacter("ron weasley");
