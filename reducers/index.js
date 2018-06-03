import { GET_DECKS, GET_DECK_DETAIL } from '../actions';

function decks (state = {data: [], deck: {}}, action) {
  switch (action.type) {
    case GET_DECKS :
      return {
        ...state,
        data: action.decks
      }
     case GET_DECK_DETAIL: 
     	return {
     		...state,
     		deck: action.deck
     	}
    default :
      return state
  }
}

export default decks;