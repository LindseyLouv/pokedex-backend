const express = require("express");
const router = express.Router();
const {
  extractPokemonDataWithDetail,
  pokemonDataCache,
} = require("../utils/pokemonUtils");

// Define a route to serve data for Pokémon detail
router.get("/:number", (req, res) => {
  const pokemon = pokemonDataCache[parseInt(req.params.number) - 1]; // Arrays are zero-indexed
  const extractedPokemonData = extractPokemonDataWithDetail(pokemon);
  if (pokemon) {
    res.json(extractedPokemonData);
  } else {
    res.status(404).json({
      error: "Pokémon not found",
    });
  }
});

module.exports = router;
