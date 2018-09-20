const ENDPOINT = 'https://pokeapi.co/api/v2';

export function getRegions(callback) {
  makeRequest(`${ENDPOINT}/region/`, (error, response) => {
    callback(error, response && response.results);
  });
}

export function getRegionDetails(region, callback) {
  makeRequest(`${ENDPOINT}/region/${region.name}`, callback);
}

export function getPokemonsFromPokedex(pokedex, callback) {
  makeRequest(
    `${ENDPOINT}/pokedex/${pokedex.name}`,
    (error, pokedexDetails) => {
      if (error) {
        callback(error, null);
        return;
      }
      const pokemons = pokedexDetails.pokemon_entries.map(
        entry => entry.pokemon_species,
      );
      callback(null, pokemons);
    },
  );
}

export function getPokemonDetails(pokemon, callback) {
  makeRequest(`${ENDPOINT}/pokemon/${pokemon.name}`, callback);
}

function makeRequest(url, callback) {
  const request = new XMLHttpRequest();
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status === 200) {
        callback(null, request.response);
      } else {
        callback('Error ' + request.status);
      }
    }
  };
  request.responseType = 'json';
  request.open('GET', url);
  request.send();
}

export const defaultPokedex = {
  name: 'kanto',
};
