const axios = require("axios");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const pokemonAllRouter = require("./routes/pokemonAll");
const { extractPokemonData } = require("./utils/pokemonUtils");
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3030;

let pokemonDataCache = []; // To store pokemon data
let pokemonNumber = 386; // The last pokémon we want to get info (national pokédex number)

// Function to fetch and cache specific data from PokeApi
const fetchAndCachePokemonData = async () => {
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

pokemonDataCache = loadPokemonDataFromJSON(); // Load data from pokemonData
console.log(
  `There is data for ${pokemonDataCache.length} pokémon out of ${pokemonNumber} expected.`
);

// Test if pokemonDataCache is empty or if the number of pokemon isn't corresponding to pokemonNumber
// So we only fetch data once and limit API call to PokéApi
if (pokemonDataCache == [] || pokemonDataCache.length !== pokemonNumber) {
  // If one of the case is true, fetch and cache the data
  fetchAndCachePokemonData();
  console.log("Data fetched from PokéAPI");
}

// ---- ROUTES ----- //

// Define a route to serve the cached data for Kanto's region Pokémon
app.get("/pokemon/kanto", (req, res) => {
  // Extract specific information to be sent for Pokémon 1 to 151
  const extractedPokemonData = extractPokemonData(1, 151, pokemonDataCache);
  res.json(extractedPokemonData);
});

// Define a route to serve the cached data for Kanto's region Pokémon
app.get("/pokemon/johto", (req, res) => {
  // Extract specific information to be sent for Pokémon from index 152 to 251
  const extractedPokemonData = extractPokemonData(152, 251, pokemonDataCache);
  res.json(extractedPokemonData);
});

// Define a route to serve the cached data for Kanto's region Pokémon
app.get("/pokemon/hoenn", (req, res) => {
  // Extract specific information to be sent for Pokémon from index 152 to 251
  const extractedPokemonData = extractPokemonData(252, 386, pokemonDataCache);
  res.json(extractedPokemonData);
});

// Define a route to fetch data for a specific Pokémon by number
app.get("/pokemon/:number", (req, res) => {
  const pokemonNumber = parseInt(req.params.number); // Get the Pokémon number from the URL parameter
  const pokemon = pokemonDataCache[pokemonNumber - 1]; // Arrays are zero-indexed
  const extractedPokemonData = {
    number: pokemon.id,
    name: pokemon.name,
    image: pokemon.sprites.other["official-artwork"].front_default,
    type: pokemon.types.map((type) => type.type.name),
    height: pokemon.height,
    weight: pokemon.weight,
    stats: pokemon.stats,
  };
  if (pokemon) {
    res.json(extractedPokemonData);
  } else {
    res.status(404).json({
      error: "Pokémon not found, only first gen Pokémon available (1 to 151)",
    });
  }
});

// WIP Test route for pokemonALL in a separate file
app.use("/pokemon/alltest", pokemonAllRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
