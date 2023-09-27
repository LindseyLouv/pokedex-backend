const fs = require("fs");
const axios = require("axios");

// Function extract Pokémon data give a starting and ending Pokémon number
function extractPokemonData(
  firstPokemonNumber,
  lastPokemonNumber,
  pokemonDataCache
) {
  // Minus - 1 because array is 0 indexed
  return pokemonDataCache
    .slice(firstPokemonNumber - 1, lastPokemonNumber)
    .map((pokemon) => ({
      number: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites.other["official-artwork"].front_default,
      type: pokemon.types.map((type) => type.type.name),
    }));
}

// Function extract Pokémon data with more details for single Pokémon page view
function extractPokemonDataWithDetail(pokemon) {
  return {
    number: pokemon.id,
    name: pokemon.name,
    image: pokemon.sprites.other["official-artwork"].front_default,
    type: pokemon.types.map((type) => type.type.name),
    height: pokemon.height,
    weight: pokemon.weight,
    stats: pokemon.stats,
  };
}

// Function to read data from the JSON file and populate the cache
const loadPokemonDataFromJSON = () => {
  try {
    const data = fs.readFileSync("data/pokemonData.json");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return [];
  }
};

// Function to fetch from PokeApi and store data into JSON file
const fetchAndStorePokemonData = async (pokemonNumber) => {
  try {
    // Fetch data for Pokémon 1 to to pokemonNumber
    const pokemonPromises = Array.from(
      { length: pokemonNumber },
      async (_, index) => {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${index + 1}`
        );
        return response.data;
      }
    );
    // Wait for all requests to complete
    pokemonData = await Promise.all(pokemonPromises);
    // Save the data to a JSON file
    fs.writeFileSync("data/pokemonData.json", JSON.stringify(pokemonData));
    console.log("Data saved to pokemonData.json");
    cacheData();
    console.log("Data cached");
  } catch (error) {
    console.error("Could not fetch data from the PokeAPI", error);
  }
};

const testPokemonData = () => {
  let pokemonNumber = 386; // The last pokémon we want to get info (national pokédex number)
  let pokemonDataCache = loadPokemonDataFromJSON(); // Load data from pokemonData
  console.log(
    `There is data for ${pokemonDataCache.length} pokémon out of ${pokemonNumber} expected.`
  );

  // Test if pokemonData is empty or if the number of pokemon isn't corresponding to pokemonNumber
  // So we only fetch data once and limit API call to PokéApi
  if (pokemonDataCache == null || pokemonDataCache.length !== pokemonNumber) {
    fetchAndStorePokemonData(pokemonNumber);
    console.log("Data fetched from PokéAPI");
    pokemonDataCache = loadPokemonDataFromJSON(); // Load data from pokemonData
  }
};

const pokemonDataCache = [];
const cacheData = () => {
  const newCache = loadPokemonDataFromJSON();
  pokemonDataCache.length = 0;
  pokemonDataCache.push(...newCache);
};

module.exports = {
  extractPokemonData,
  extractPokemonDataWithDetail,
  loadPokemonDataFromJSON,
  fetchAndStorePokemonData,
  testPokemonData,
  cacheData,
  pokemonDataCache,
};
