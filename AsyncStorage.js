import { AsyncStorage } from 'react-native';

let storage_object = {
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
}

AsyncStorage.setItem('storage', JSON.stringify(storage_object), () => {

});

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