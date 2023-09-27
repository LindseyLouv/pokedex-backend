const express = require("express");
const router = express.Router();
const {
  extractPokemonDataWithDetail,
  loadPokemonDataFromJSON,
} = require("../utils/pokemonUtils");

// Define a route to serve data for Pokémon detail
router.get("/:number", (req, res) => {
  const pokemonData = loadPokemonDataFromJSON();
  const pokemonNumber = parseInt(req.params.number); // Get the Pokémon number from the URL parameter
  const pokemon = pokemonData[pokemonNumber - 1]; // Arrays are zero-indexed
  const extractedPokemonData = extractPokemonDataWithDetail(pokemon);
  if (pokemon) {
    res.json(extractedPokemonData);
  } else {
    res.status(404).json({
      error: "Pokémon not found, only first gen Pokémon available (1 to 151)",
    });
  }
});

module.exports = router;
