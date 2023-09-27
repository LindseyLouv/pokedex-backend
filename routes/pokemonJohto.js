const express = require("express");
const router = express.Router();
const {
  extractPokemonData,
  pokemonDataCache,
} = require("../utils/pokemonUtils");

// Define a route to serve data for Johto's region Pokémon
router.get("/", (req, res) => {
  // Extract specific information to be sent for Pokémon from index 152 to 251
  const extractedPokemonData = extractPokemonData(152, 251, pokemonDataCache);
  res.json(extractedPokemonData);
});

module.exports = router;
