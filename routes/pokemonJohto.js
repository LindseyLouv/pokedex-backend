const express = require("express");
const router = express.Router();
const {
  extractPokemonData,
  loadPokemonDataFromJSON,
} = require("../utils/pokemonUtils");

// Define a route to serve data for Johto's region Pokémon
router.get("/", (req, res) => {
  const pokemonData = loadPokemonDataFromJSON();
  // Extract specific information to be sent for Pokémon from index 152 to 251
  const extractedPokemonData = extractPokemonData(152, 251, pokemonData);
  res.json(extractedPokemonData);
});

module.exports = router;
