tailwind.config = {
  theme: {
    extend: {
      colors: {
        clifford: "#da373d",
      },
    },
  },
};

const charactersContainer = document.getElementById("characters-container");
const searchInput = document.getElementById("search");
const paginationContainer = document.getElementById("pagination");

function goToHomePage() {
  location.reload();
}

let currentPage = 1;
let totalPages = 1;

async function fetchCharacters(page = 1) {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${page}`
  );
  const data = await response.json();
  totalPages = data.info.pages;
  return data.results;
}

async function displayCharacters() {
  const characters = await fetchCharacters(currentPage);
  charactersContainer.innerHTML = "";

  characters.forEach((character) => {
    const card = document.createElement("div");
    const nameElement = document.createElement("h3");
    card.className =
      "bg-zinc-900 p-2 border border-zinc-800 rounded-md max-w-[200px] w-full gap-2 flex flex-col items-start justify-center";
    nameElement.textContent = character.name;
    nameElement.className = "truncate";
    card.appendChild(nameElement);

    const episodesElement = document.createElement("p");
    episodesElement.textContent = `Episódios : ${character.episode.length}`;
    card.appendChild(episodesElement);

    const imageElement = document.createElement("img");
    imageElement.className = "w-full rounded-lg";
    imageElement.src = character.image;
    imageElement.alt = character.name;
    card.appendChild(imageElement);

    charactersContainer.appendChild(card);
  });

  displayPagination();
}

function searchCharacter() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  if (searchTerm === "") {
    alert("Procure pelo nome do personagem");
    return;
  }

  fetch(`https://rickandmortyapi.com/api/character/?name=${searchTerm}`)
    .then((response) => response.json())
    .then((data) => {
      charactersContainer.innerHTML = "";

      if (data.results.length === 0) {
        alert("No matching characters found.");
        return;
      }

      data.results.forEach((character) => {
        const card = document.createElement("div");
        card.className =
          "bg-zinc-900 p-2 border border-zinc-800 rounded-md max-w-[200px] w-full gap-2 flex flex-col items-start justify-center";

        const nameElement = document.createElement("h3");
        nameElement.textContent = character.name;
        nameElement.className = "truncate";
        card.appendChild(nameElement);

        const episodesElement = document.createElement("p");
        episodesElement.textContent = `Episodes: ${character.episode.length}`;
        card.appendChild(episodesElement);

        const imageElement = document.createElement("img");
        imageElement.className = "w-full rounded-lg";
        imageElement.src = character.image;
        imageElement.alt = character.name;
        card.appendChild(imageElement);

        charactersContainer.appendChild(card);
      });

      displayPagination();
    })
    .catch((error) => console.error("Error fetching characters:", error));
}

function displayPagination() {
  paginationContainer.innerHTML = "";

	paginationContainer.className = "flex gap-2 flex-wrap py-5"

  for (let i = 1; i <= totalPages; i++) {
    const pageLink = document.createElement("button");
    pageLink.className = "bg-green-500 p-2 rounded-md min-w-[40px]"
    pageLink.textContent = i;
    pageLink.addEventListener("click", () => changePage(i));

    paginationContainer.appendChild(pageLink);
  }
}

function changePage(page) {
  currentPage = page;
  displayCharacters();
}

displayCharacters();
