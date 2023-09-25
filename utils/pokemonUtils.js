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
const fetchAndCachePokemonData = async (pokemonNumber) => {
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
    pokemonDataCache = await Promise.all(pokemonPromises);
    // Save the data to a JSON file
    fs.writeFileSync("data/pokemonData.json", JSON.stringify(pokemonDataCache));
    console.log("Data saved to pokemonData.json");
  } catch (error) {
    console.error("Could not fetch data from the PokeAPI", error);
  }
};

module.exports = {
  extractPokemonData,
  loadPokemonDataFromJSON,
  fetchAndCachePokemonData,
};
