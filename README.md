# Pokedex BackEnd
This application fetches data from PokeApi.co
It then extracts data to only keep each Pokémon :
- number
- name
- image
- types

## Stack 
- NodeJS
- Express
- Axios

## How to use
- Clone the project
- Install dependencies
`npm install`
- Start the server
`node app.js`
- Access the application
`http://localhost:3030`


## Available routes
First 151 Pokémons data
`http://localhost:3030/pokemon`

Specific Pokémon data by number
`http://localhost:3030/pokemon/1` for example for the Pokémon number 1