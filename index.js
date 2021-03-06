import {
  getRegions,
  getPokemonsFromPokedex,
  getRegionDetails,
  getPokemonDetails,
  defaultPokedex
} from './pokemon-api.js';

import {after, pick, pickOne, displayRegion, displayPokemons, displayRegionDescription} from './utils.js';

getRegions((error, regions) => {
  if (error) {
    console.error(error);
    return;
  }
  const region = pickOne(regions);

  getRegionDetails(region, (error, regionDetails) => {
    if (error) {
      console.error(error);
      return;
    }

    const pokedex = pickPokedex(regionDetails);
    displayRegion(regionDetails, pokedex);

    getPokemonsFromPokedex(pokedex, (error, {pokemons, description}) => {
      if (error) {
        console.error(error);
        return;
      }

      const randomPokemons = pick(pokemons, 8);
      displayRegionDescription(description);

      getPokemonsDetails(randomPokemons, (error, pokemons) => {
        if (error) {
          console.error(error);
          return;
        }
        displayPokemons(pokemons);
      });
    });
  });
});

function getPokemonsDetails(pokemons, callback) {
  let pokemonsDetails = [];
  let thrownError;
  const done = after(pokemons.length, () => {
    if (thrownError) {
      callback(thrownError, null);
      return;
    }
    callback(null, pokemonsDetails);
  });
  pokemons.forEach(pokemon =>
    getPokemonDetails(pokemon, (error, pokemon) => {
      if (error) {
        thrownError = error;
      } else {
        pokemonsDetails.push(pokemon);
      }
      done();
    }),
  );
}

function pickPokedex(regionDetails) {
  return regionDetails.pokedexes.length === 0
    ? defaultPokedex
    : pickOne(regionDetails.pokedexes);
}
