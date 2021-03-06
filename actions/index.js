import * as API from '../AsyncStorage';
import { removeNotificationByDate } from '../Notification';

export const GET_DECKS = 'GET_DECKS';
export const GET_DECK_DETAIL = 'GET_DECK_DETAIL';
export const GET_PLANS = 'GET_PLANS';

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

function receivePlans(plans) {
  return {
    type: GET_PLANS,
    plans: plans
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

export function removeDeck(deckKey) {
  return function(dispatch) {
    return API.removeDeck(deckKey).then(() => dispatch(getDecks()))
  }
}

export function addCardToDeck(card) {
  return function(dispatch) {
    return API.addCardToDeck(card).then(() => {
      dispatch(getDeck(card.deckKey));
      dispatch(getDecks());
    })
  }
}

export function getPlanCalendar() {
  return function(dispatch) {
    return API.getPlanCalendar().then(data => dispatch(receivePlans(data)))       
  }
}

export function addPlan(plan) {
  return function(dispatch) {
    return API.addPlan(plan).then(() => dispatch(getPlanCalendar()))
  }
}

export function removePlan(planKey, planDate) {
  return function(dispatch) {
    return API.removePlan(planKey).then(() => {
      dispatch(getPlanCalendar());
      API.hasPlanThisDay(planDate)
      .then(result => {
        if (!result) {
          removeNotificationByDate(planDate);
        }
      })
    })
  }
}