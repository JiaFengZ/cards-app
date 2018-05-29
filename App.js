import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import Decks from './components/Decks';
import Card from './components/Card';
import CreateDeck from './components/CreateDeck';
import CreateCard from './components/CreateCard';
import Quiz from './components/Quiz';

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
