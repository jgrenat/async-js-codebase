const ENDPOINT = 'https://pokeo.surge.sh/api/v2';
const ENDPOINT_SUFFIX = 'index.json';

export function getRegions(callback) {
  makeRequest(`${ENDPOINT}/region/${ENDPOINT_SUFFIX}`, (error, response) => {
    callback(error, response && response.results);
  });
}

export function getRegionDetails(region, callback) {
  makeRequest(`${region.url}/${ENDPOINT_SUFFIX}`, callback);
}

export function getPokemonsFromPokedex(pokedex, callback) {
  makeRequest(
    `${pokedex.url}/${ENDPOINT_SUFFIX}`,
    (error, pokedexDetails) => {
      if (error) {
        callback(error, null);
        return;
      }
      const pokemons = pokedexDetails.pokemon_entries.map(
        entry => entry.pokemon_species,
      );
      const description = pokedexDetails.descriptions.find(
        pokedexD => pokedexD.language.name==="fr"
      );

      callback(null, {pokemons, description});
    },
  );
}

export function getPokemonDetails(pokemon, callback) {
  makeRequest(`${pokemon.url}/${ENDPOINT_SUFFIX}`, callback);
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
