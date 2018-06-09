import { AsyncStorage } from 'react-native';
import { Notifications } from 'expo';

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

export function hasPlanThisDay(date) {
  return AsyncStorage.getItem('plan')
  .then((result) => {    
    const data = JSON.parse(result);
    const keys = Object.keys(data);
    if (keys.length === 0) return false;
    return keys.map((key) => data[key]).some((item) => {
      return item.date === date;
    })    
  });
}