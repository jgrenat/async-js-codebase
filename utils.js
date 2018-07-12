export function after(count, callback) {
  let remaining = count;
  return () => {
    if (remaining > 1) {
      remaining--;
      return;
    }
    callback();
  };
}

export function pickOne(elements) {
  return elements[Math.floor(Math.random() * elements.length)];
}

export function pick(elements, count) {
  const shuffled = elements.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function displayRegion(region, pokedex) {
  console.log(region, pokedex);
}

export function displayPokemons(pokemons) {
  console.log(pokemons);
}
