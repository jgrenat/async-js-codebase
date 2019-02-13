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
  const poke = region.names.find((poke) => poke.language.name === 'fr');
  const template = `
      <h2>
        Some Pokemons for the ${poke.name} 
        (${region.names[0].name}) region:
      </h2>
  `;
  document.getElementById('js-region').innerHTML = template;
}

export function displayRegionDescription(description) {
  const template = `
    <div>
      ${description.description};
    </div>
  `;
  document.getElementById('js-region').innerHTML += template;
}

export function displayPokemons(pokemons) {
  let pokemonTemplate = [];
  pokemons.forEach((pokemon, index) => {
    const name = pokemon.names.find((poke) => poke.language.name === 'fr');
    const flavor_text = pokemon.flavor_text_entries.find((poke) => poke.language.name === 'fr');
    const genus = pokemon.genera.find((poke) => poke.language.name === 'fr');
    const color = pokemon.color.name === 'white' ? 'grey' : pokemon.color.name;
    const template = `
    <section id=${pokemon.id} class="pokemon cell" style="border-color: ${color}; background-image:radial-gradient(white, ${pokemon.color.name});">
      <h2>${name.name}</h2>
      <article><h3>Color: </h3><span>${pokemon.color.name}</span></article>
      <article><h3>Generation: </h3><span>${genus.genus}</span></article>
      <article><h3>Is Baby: </h3><span>${pokemon.is_baby}</span></article>
      <article><h3>Flavor text: </h3><span>${flavor_text.flavor_text}</span></article>
    </section>`;

    pokemonTemplate.push(template);

    switch (index) {
      case 3:
        document.getElementById('js-pokemons-1').innerHTML = pokemonTemplate.join('');
        pokemonTemplate = [];
        break;
      case 7:
        document.getElementById('js-pokemons-2').innerHTML = pokemonTemplate.join('');
        break;
      default:
        break;
    }
  });
}


export function displayCards(cards) {
  const template = `<div class="card"><img src="{{url}}" alt="{{name}}"></div>`;
  document.getElementById('js-cardsList').innerHTML = cards.map(card => {
    return template.replace('{{url}}', card.imageUrl).replace('{{name}}', card.name);
  }).join('\n');
}

export {default as co} from './assets/co/index.js';
