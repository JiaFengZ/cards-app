import * as API from '../AsyncStorage';

export const GET_DECKS = 'GET_DECKS';

function receiveDecks(data) {
  return {
    type: GET_DECKS,
    decks: data
  }
}

export function getDecks() {
	return function(dispatch) {
	  return API.getDecks().then(data => dispatch(receiveDecks(data)))	      
	}
}

export function addDeck(deck) {
	return function(dispatch) {
		return API.saveDeckTitle(deck).then(() => dispatch(getDecks()))
	}
}