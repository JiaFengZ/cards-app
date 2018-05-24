import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import Decks from './components/Decks';
import Card from './components/Card';
import CreateDeck from './components/CreateDeck';


const Tabs = createBottomTabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    }
  },
  CreateDeck: {
    screen: CreateDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
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
  CardDetail: {
    screen: Card,
    navigationOptions: ({ navigation }) => ({
      title: '卡片详情'
    })
  }
}, {
  initialRouteName: 'Home'
})


export default class App extends React.Component {
  render() {
    return (
      <MainNavigator/>
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
