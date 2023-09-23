const axios = require('axios');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

let pokemonDataCache = []; // To store specific data for the first 151 Pokémon

// Function to fetch and cache specific data for the first 151 Pokémon
const fetchAndCachePokemonData = async () => {
  try {
    // Fetch data for Pokémon 1 to 151
    const pokemonPromises = Array.from({ length: 151 }, async (_, index) => {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${index + 1}`);
      const pokemonData = response.data;
      
      // Extract specific information and store it in the cache
      const { id, name, sprites, types } = pokemonData;
      const pokemonInfo = {
        number: id,
        name: name,
        image: sprites.other['official-artwork'].front_default,
        type: types.map(type => type.type.name),
      };
      return pokemonInfo;
    });

    // Wait for all requests to complete
    pokemonDataCache = await Promise.all(pokemonPromises);
  } catch (error) {
    console.error('Could not fetch data from the PokeAPI', error);
  }
};

// Fetch and cache specific Pokémon data when the server starts
fetchAndCachePokemonData();

// Define a route to serve the cached data for the first 151 Pokémon
app.get('/pokemon', (req, res) => {
  res.json(pokemonDataCache);
});

// Define a route to fetch data for a specific Pokémon by number
app.get('/pokemon/:number', (req, res) => {
    const pokemonNumber = parseInt(req.params.number); // Get the Pokémon number from the URL parameter
    const pokemon = pokemonDataCache[pokemonNumber - 1]; // Arrays are zero-indexed
  
    if (pokemon) {
      res.json(pokemon);
    } else {
      res.status(404).json({ error: 'Pokémon not found, only first gen Pokémon available (1 to 151)' });
    }
  });
  
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});