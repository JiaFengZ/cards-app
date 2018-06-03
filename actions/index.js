import * as API from '../AsyncStorage';

export const GET_DECKS = 'GET_DECKS';
export const GET_DECK_DETAIL = 'GET_DECK_DETAIL';

function receiveDecks(data) {
  return {
    type: GET_DECKS,
    decks: data
  }
}

function receiveDeckDetail(deck) {	
	return {
		type: GET_DECK_DETAIL,
		deck: deck
	}
}

export function getDecks() {
	return function(dispatch) {
	  return API.getDecks().then(data => dispatch(receiveDecks(data)))	      
	}
}

export function getDeck(deckKey) {
	return function(dispatch) {
		return API.getDeck(deckKey).then((deck) => dispatch(receiveDeckDetail(deck)))
	}	
}

export function addDeck(deck) {
	return function(dispatch) {
		return API.saveDeckTitle(deck).then(() => dispatch(getDecks()))
	}
}

export function addCardToDeck(card) {
	return function(dispatch) {
		return API.addCardToDeck(card).then(() => dispatch(getDeck(card.deckKey)))
	}
}