const express = require("express");
const router = express.Router();
const {
  extractPokemonData,
  loadPokemonDataFromJSON,
} = require("../utils/pokemonUtils");

// Define a route to serve data for Hoenn's region Pokémon
router.get("/", (req, res) => {
  const pokemonData = loadPokemonDataFromJSON();
  // Extract specific information to be sent for Pokémon from index 252 to 386
  const extractedPokemonData = extractPokemonData(252, 386, pokemonData);
  res.json(extractedPokemonData);
});

module.exports = router;
