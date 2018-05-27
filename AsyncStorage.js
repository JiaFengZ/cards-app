import { AsyncStorage } from 'react-native';

let storage_object = [
  {
    title: 'React',
    key: '1',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  {
    title: 'JavaScript',
    key: '2',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
]

AsyncStorage.setItem('storage', JSON.stringify(storage_object), () => {

});

export function getDecks() {
	return AsyncStorage.getItem('storage');
}

export function getDeck() {

}

export function saveDeckTitle() {

}

export function addCardToDeck() {

}