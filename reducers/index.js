import { GET_DECKS } from '../actions';

function decks (state = {data: []}, action) {
  switch (action.type) {
    case GET_DECKS :
      return {
        ...state,
        data: action.decks
      }
    default :
      return state
  }
}

export default decks;