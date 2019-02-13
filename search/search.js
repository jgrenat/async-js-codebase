import {findCards} from '../pokemon-api.js';
import {displayCards} from '../utils.js';
import {fromEvent} from 'https://dev.jspm.io/rxjs@6/_esm2015';
import {map} from 'https://dev.jspm.io/rxjs@6/_esm2015/operators';

document.getElementById('js-submit').addEventListener('click', () => {
  findCards(document.getElementById('js-search').value, (err, cards) => {
    if (err) {
      console.error('An error occurred', err);
      return;
    }
    displayCards(cards.cards);
  });
});