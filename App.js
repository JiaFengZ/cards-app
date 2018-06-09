import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';

import { setLocalNotification } from './Notification';
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
  initialRouteName: 'Decks',
  tabBarOptions: {
    style: {
      backgroundColor: '#333'
    },
    labelStyle: {
      color: '#fff'
    }
  }
})

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: ({ navigation }) => ({      
      headerTitle: () => <Text style={style.headText}>主页</Text>,
      headerStyle: style.head
    })
  },
  DeckDetail: {
    screen: Deck,
    navigationOptions: ({ navigation }) => ({      
      headerTitle: () => <Text style={style.headText}>卡片详情</Text>,
      headerStyle: style.head,
      headerBackImage: () => <Ionicons name='md-arrow-round-back' size={30} color='#fff'/> 
    })
  },
  CreateCard: {
    screen: CreateCard,
    navigationOptions: ({ navigation }) => ({      
      headerTitle: () => <Text style={style.headText}>创建卡片</Text>,
      headerStyle: style.head,
      headerBackImage: () => <Ionicons name='md-arrow-round-back' size={30} color='#fff'/> 
    })
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({ navigation }) => ({      
      headerTitle: () => <Text style={style.headText}>测试</Text>,
      headerStyle: style.head,
      headerBackImage: () => <Ionicons name='md-arrow-round-back' size={30} color='#fff'/> 
    })
  }
}, {
  initialRouteName: 'Home'
})


export default class App extends React.Component {  
  componentDidMount() {
    setLocalNotification()
  }

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


const style = StyleSheet.create({
  head: {
    backgroundColor: '#333',
    paddingLeft: 20
  },
  headText: {
    color: '#fff', 
    fontSize: 18
  }
});