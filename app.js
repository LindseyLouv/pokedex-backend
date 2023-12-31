const express = require("express");
const cors = require("cors");
const pokemonKantoRouter = require("./routes/pokemonKanto");
const pokemonJohtoRouter = require("./routes/pokemonJohto");
const pokemonHoennRouter = require("./routes/pokemonHoenn");
const pokemonDetailRouter = require("./routes/pokemonDetail");
const { testPokemonData, cacheData } = require("./utils/pokemonUtils");
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3030;

// Test if data exists, if not or incomplete, fetch data from PokéAPI and store data into cache
testPokemonData();

// Cache the data
cacheData();

// ---- ROUTES ----- //

// Define a route to serve the cached data for Kanto's region Pokémon
app.use("/pokemon/kanto", pokemonKantoRouter);

// Define a route to serve the cached data for Johto's region Pokémon
app.use("/pokemon/johto", pokemonJohtoRouter);

// Define a route to serve the cached data for Hoenn's region Pokémon
app.use("/pokemon/hoenn", pokemonHoennRouter);

// Define a route to fetch data for a specific Pokémon by number
app.use("/pokemon", pokemonDetailRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
