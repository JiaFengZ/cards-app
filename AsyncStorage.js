import { AsyncStorage } from 'react-native';
import { Notifications } from 'expo';

/*let storage_object = {
  React: {
    title: 'React',
    key: 'React',
    questions: [
      {
        question: 'Is React a library for managing user interfaces?',
        answer: true
      },
      {
        question: 'Do we make Ajax requests in React in the componentDidMount lifecycle event?',
        answer: true
      }
    ]
  },
  Javascript: {
    title: 'JavaScript',
    key: 'Javascript',
    questions: [
      {
        question: 'The combination of a function and the lexical environment within which that function was declared',
        answer: true
      }
    ]
  }
}*/

AsyncStorage.getItem('storage')
  .then(JSON.parse)
  .then(result => {
    if (result === null) {
      AsyncStorage.setItem('storage', JSON.stringify({}));
    }
  })

AsyncStorage.getItem('plan')
  .then(JSON.parse)
  .then(result => {
    if (result === null) {
      AsyncStorage.setItem('plan', JSON.stringify({}));
    }
  })

AsyncStorage.getItem('notificationsIdList')
  .then(JSON.parse)
  .then(result => {
    if (result === null) {
      AsyncStorage.setItem('notificationsIdList', JSON.stringify([]));
    }
  })

export function getDecks() {
	return AsyncStorage.getItem('storage')
  .then((result) => {    
    const data = JSON.parse(result);
    const keys = Object.keys(data);
    return keys.map((key) => data[key]);
  });
}

export function getDeck(deckKey) {
  return AsyncStorage.getItem('storage')
  .then((result) => {    
    const data = JSON.parse(result);
    return data[deckKey] || {};
  });
}

export function saveDeckTitle({key, title}) {
  return AsyncStorage.mergeItem('storage', JSON.stringify({
    [key]: {title: title, key: key, questions: []}
  }))
}

export function addCardToDeck({question, answer, deckKey}) {
  return AsyncStorage.getItem('storage')
  .then((result) => {
    const data = JSON.parse(result);
    const item = data[deckKey];
    item.questions.push({question: question, answer: answer});    
    return AsyncStorage.mergeItem('storage', JSON.stringify({
      [deckKey]: item
    }))
  })
}

export function addPlan({date, deck}) {  
  const planKey = new Date().getTime();
  return AsyncStorage.mergeItem('plan', JSON.stringify({
      [planKey]: {
        date: date.getFullYear() + '-' + 
          ((date.getMonth() + 1) < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1)) + '-' + 
          (date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate()),
        deck: deck,        
        key: planKey
      }
    }))
}

export function getPlanCalendar() {
  return AsyncStorage.getItem('plan')
  .then((result) => {    
    const data = JSON.parse(result);
    const keys = Object.keys(data);
    return keys.map((key) => data[key]);
  });
}

export function removePlan(planKey) {
  return AsyncStorage.getItem('plan')
  .then((result) => {    
    const data = JSON.parse(result);
    const keys = Object.keys(data);
    delete data[planKey];
    return AsyncStorage.setItem('plan', JSON.stringify(data));
  });
}