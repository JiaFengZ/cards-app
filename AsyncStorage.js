import { AsyncStorage } from 'react-native';

let storage_object = [
  {
    title: 'React',
    key: '1',
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
  {
    title: 'JavaScript',
    key: '2',
    questions: [
      {
        question: 'The combination of a function and the lexical environment within which that function was declared',
        answer: true
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