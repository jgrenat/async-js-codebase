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
  const template = `
    <div>
      <h2>
        Some Pokemons for the ${region.name} 
        (${region.names[0].name}) region:
      </h2>
    </div>
  `;
  document.getElementById('js-region').innerHTML = template;
  console.log(region, pokedex);
}

export function displayPokemons(pokemons) {
  console.log(pokemons);
}

export {default as co} from './assets/co/index.js';
