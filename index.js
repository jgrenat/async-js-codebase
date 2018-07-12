import {
  getRegions,
  getPokemonsFromPokedex,
  getRegionDetails,
  getPokemonDetails,
} from './pokemon-api.js';
import {after, pick, pickOne, displayRegion, displayPokemons} from './utils.js';

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

    const pokedex = pickOne(regionDetails.pokedexes);

    displayRegion(regionDetails, pokedex);

    getPokemonsFromPokedex(pokedex, (error, pokemonsList) => {
      if (error) {
        console.error(error);
        return;
      }

      const randomPokemons = pick(pokemonsList, 8);

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
