function extractPokemonData(
  firstPokemonNumber,
  lastPokemonNumber,
  pokemonDataCache
) {
  // Minus - 1 because array is 0 indexed
  return pokemonDataCache
    .slice(firstPokemonNumber - 1, lastPokemonNumber)
    .map((pokemon) => ({
      number: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites.other["official-artwork"].front_default,
      type: pokemon.types.map((type) => type.type.name),
    }));
}

module.exports = {
  extractPokemonData,
};
