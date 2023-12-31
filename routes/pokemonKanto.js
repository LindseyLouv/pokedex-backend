const express = require("express");
const router = express.Router();
const {
  extractPokemonData,
  pokemonDataCache,
} = require("../utils/pokemonUtils");

// Define a route to serve data for Kanto's region Pokémon
router.get("/", (req, res) => {
  // Extract specific information to be sent for Pokémon from index 1 to 151
  const extractedPokemonData = extractPokemonData(1, 151, pokemonDataCache);
  res.json(extractedPokemonData);
});

module.exports = router;
