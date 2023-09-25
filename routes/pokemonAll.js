// WIP : doesn't work ATM
const express = require("express");
const pokemonDataCache = require("../app");
const router = express.Router();

// Define a route to serve the cached data for the first 151 Pokémon
router.get("/", (req, res) => {
  // Extract specific information to be sent
  console.log(pokemonDataCache);
  const extractedPokemonData = pokemonDataCache.map((pokemon) => ({
    number: pokemon.id,
    name: pokemon.name,
    image: pokemon.sprites.other["official-artwork"].front_default,
    type: pokemon.types.map((type) => type.type.name),
  }));
  res.json(pokemonDataCache);
});

module.exports = router;
