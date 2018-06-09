import React, { Component } from 'react';
import { Alert, View, Text, StyleSheet } from 'react-native';
import TouchButton from './share/TouchButton';
import { connect } from 'react-redux';
import { getDeck, removeDeck } from '../actions';

class Deck extends Component {
  componentDidMount() {   
    this.props.dispatch(getDeck(this.props.navigation.state.params.deckKey));
  }

  goToQuit = (deck) => {
    if (deck.questions.length === 0) {
      Alert.alert(
      '提示',
      '卡片集中还没有添加卡片！',
      [        
        {text: '确定', onPress: () => {}},
      ])    
      return;
    }
    this.props.navigation.navigate('Quiz', {questions: deck.questions});
  }

  showRemoveModal = (deckKey) => {    
    Alert.alert(
      '提示',
      '确定要删除吗？',
      [        
        {text: '确定', onPress: () => {
          this.props.dispatch(removeDeck(deckKey));
          this.props.navigation.goBack();
        }},
        {text: '取消', onPress: () => {}},
      ],
    ) 
  }

  render() {
    const { deck } = this.props;
    return (
      <View style={style.container}>
        <View style={style.cards}>
          <Text style={{color: '#f2f2f2', fontSize: 20}}>{deck.title}</Text>
          <Text style={{color: '#ddd'}}>{deck.questions&&deck.questions.length}&nbsp;cards</Text>
        </View>
        <View style={{width: 200, marginBottom: 10}}>
          <View>
            <TouchButton text='添加卡片' handlePress={() => this.props.navigation.navigate('CreateCard', {deckKey: deck.key})}/>
          </View>
          <View>
            <TouchButton text='开始测试' handlePress={() => this.goToQuit(deck)}/>
          </View>             
          <View>
            <TouchButton text='删除' handlePress={() => this.showRemoveModal(deck.key)}/>
          </View>             
        </View>
      </View>
      
    )
  }
}

function mapStateToProps(state) {    
  return {
    deck: state.deck
  }
}

export default connect(
  mapStateToProps
)(Deck)

const style = StyleSheet.create({
  cards: {
    marginTop: 20, 
    alignItems: 'center', 
    width: '100%', 
    borderRadius: 5,
    backgroundColor: '#841584', 
    shadowColor: 'rgba(0, 0, 0, 0.6)',
    shadowOpacity: 0.6,
    shadowOffset: {width: 0, height: 2},
    elevation: 10,
    padding: 10
  },
  container: {
    height: '100%', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: 20
  }
});