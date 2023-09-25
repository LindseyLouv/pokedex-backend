# Pokedex BackEnd

This application fetches data from PokeApi.co and stores it into a local JSON file to avoid the need to make multiple API calls.

It then gives endpoints to use.

## Stack

- NodeJS
- Express
- Axios

## How to use

- Clone the project
- Install dependencies
  `npm install`
- Rename pokemonDataTemp.json to pokemonData.json in the data folder
- Start the server
  `node app.js`
- If it's the first time, the server needs to be restarted for the endpoints to be working (CTRL+C and rerun node app.js) - fix is being worked on
- Access the application
  `http://localhost:3030`

## Available routes

Kanto Pokémon data (0-151)
`http://localhost:3030/pokemon/kanto`

Johto Pokémon data (152-251)
`http://localhost:3030/pokemon/johto`

Hoenn Pokémon data (252-386)
`http://localhost:3030/pokemon/hoenn`

Specific Pokémon data by number
`http://localhost:3030/pokemon/1` for example for the Pokémon number 1
