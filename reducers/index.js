import { GET_DECKS, GET_DECK_DETAIL, GET_PLANS } from '../actions';

function decks (state = {data: [], deck: {}, plans: []}, action) {
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
    case GET_PLANS: 
      return {
        ...state,
        plans: action.plans
      }
    default :
      return state
  }
}

export default decks;