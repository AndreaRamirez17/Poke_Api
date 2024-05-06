// Función para obtener datos de Pokemon de la API
async function fetchPokemon(pokemonId) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const data = await response.json();
    return data;
}

// Función para guardar datos de Pokemon en localStorage
function savePokemonToLocalStorage(pokemonId, pokemonData) {
    localStorage.setItem(`pokemon_${pokemonId}`, JSON.stringify(pokemonData));
}

// Función para cargar datos de Pokemon desde localStorage
function loadPokemonFromLocalStorage(pokemonId) {
    const pokemonData = localStorage.getItem(`pokemon_${pokemonId}`);
    return pokemonData ? JSON.parse(pokemonData) : null;
}

// Función para limpiar el contenedor de Pokémon
function clearPokemonContainer() {
    const pokemonContainer = document.getElementById('pokemon-container');
    pokemonContainer.innerHTML = '';
}

// Función para mostrar los datos de Pokemon en una tarjeta en el DOM
function displayPokemonCard(pokemonData) {
    const pokemonContainer = document.getElementById('pokemon-container');

    const card = document.createElement('div');
    card.classList.add('pokemon-card');

    const name = document.createElement('h2');
    name.textContent = pokemonData.name;

    const id = document.createElement('p');
    id.textContent = `ID: ${pokemonData.id}`;

    const weight = document.createElement('p');
    weight.textContent = `Weight: ${pokemonData.weight}`;

    const image = document.createElement('img');
    image.classList.add('pokemon-img');
    image.src = pokemonData.sprites.front_default;
    image.alt = pokemonData.name;

    card.appendChild(name);
    card.appendChild(id);
    card.appendChild(weight);
    card.appendChild(image);

    pokemonContainer.appendChild(card);
}

// Función para obtener y mostrar datos de Pokemon
async function fetchAndDisplayPokemon() {
    const pokemonIdInput = document.getElementById('pokemon-id');
    const pokemonId = parseInt(pokemonIdInput.value);

    if (isNaN(pokemonId) || pokemonId < 1 || pokemonId > 898) {
        alert("Por favor ingresa un ID valido (entre 1 y 898).");
        return;
    }

    clearPokemonContainer();

    let pokemonData = loadPokemonFromLocalStorage(pokemonId);
    if (!pokemonData) {
        try {
            pokemonData = await fetchPokemon(pokemonId);
            savePokemonToLocalStorage(pokemonId, pokemonData);
        } catch (error) {
            alert("Por favor vuelve a intentarlo.");
            return;
        }
    }

    displayPokemonCard(pokemonData);
}
