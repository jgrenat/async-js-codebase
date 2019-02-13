import {findCards} from '../pokemon-api.js';
import {displayCards} from '../utils.js';

document.getElementById('js-submit').addEventListener('click', () => {
  findCards(document.getElementById('js-search').value, (err, cards) => {
    if (err) {
      console.error('An error occurred', err);
      return;
    }
    displayCards(cards.cards);
  });
});