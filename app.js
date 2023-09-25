const axios = require("axios");
const express = require("express");
const cors = require("cors");
const pokemonAllRouter = require("./routes/pokemonAll");
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3030;

let pokemonDataCache = []; // To store specific data for the first 151 Pokémon

// Function to fetch and cache specific data for the first 151 Pokémon
const fetchAndCachePokemonData = async () => {
  try {
    // Fetch data for Pokémon 1 to 151
    const pokemonPromises = Array.from({ length: 151 }, async (_, index) => {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${index + 1}`
      );
      return response.data;
    });
    // Wait for all requests to complete
    pokemonDataCache = await Promise.all(pokemonPromises);
    dataReadyCallback();
  } catch (error) {
    console.error("Could not fetch data from the PokeAPI", error);
  }
};

// Fetch and cache specific Pokémon data when the server starts
fetchAndCachePokemonData();

// Define a route to serve the cached data for the first 151 Pokémon
app.get("/pokemon/all", (req, res) => {
  // Extract specific information to be sent
  const extractedPokemonData = pokemonDataCache.map((pokemon) => ({
    number: pokemon.id,
    name: pokemon.name,
    image: pokemon.sprites.other["official-artwork"].front_default,
    type: pokemon.types.map((type) => type.type.name),
  }));
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

const dataReadyCallback = () => {
  // Start the server once data is fetched and cached
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  // Export pokemonDataCache once data is fetched and cached
  module.exports = pokemonDataCache;
};
