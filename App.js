import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';

import Decks from './components/Decks';
import Deck from './components/Deck';
import CreateDeck from './components/CreateDeck';
import CreateCard from './components/CreateCard';
import Quiz from './components/Quiz';
import Calendars from './components/Calendars';

const Tabs = createBottomTabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: '卡片集',
      tabBarIcon: ({ tintColor }) => <Ionicons name='md-bookmarks' size={30} color={tintColor} />
    }
  },
  CreateDeck: {
    screen: CreateDeck,
    navigationOptions: {
      tabBarLabel: '创建卡片集',
      tabBarIcon: ({ tintColor }) => <Ionicons name='md-add-circle' size={30} color={tintColor} />
    }
  },
  Calendars: {
    screen: Calendars,
    navigationOptions: {
      tabBarLabel: '我的计划',
      tabBarIcon: ({ tintColor }) => <Ionicons name='md-calendar' size={30} color={tintColor} />
    }
  }
}, {
  initialRouteName: 'Decks'
})

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: ({ navigation }) => ({
      title: '主页'
    })
  },
  DeckDetail: {
    screen: Deck,
    navigationOptions: ({ navigation }) => ({
      title: '卡片详情'
    })
  },
  CreateCard: {
    screen: CreateCard,
    navigationOptions: ({ navigation }) => ({
      title: '创建卡片'
    })
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({ navigation }) => ({
      title: '测试'
    })
  }
}, {
  initialRouteName: 'Home'
})


export default class App extends React.Component {  
  render() {
    const store = createStore(
      reducers,
      applyMiddleware(
          thunkMiddleware        
        )
    );
    return (
      <Provider store={store}>
        <MainNavigator/>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
