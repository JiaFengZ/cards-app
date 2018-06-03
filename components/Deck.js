import React, { Component } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { getDeck } from '../actions';

class Deck extends Component {
  componentDidMount() {   
    this.props.dispatch(getDeck(this.props.navigation.state.params.deckKey));
  }

  render() {
    const { deck } = this.props;    
    return (
      <View style={style.container}>
      	<View style={style.cards}>
      		<Text style={{fontSize: 20}}>{deck.title}</Text>
      		<Text style={{color: '#666'}}>{deck.questions&&deck.questions.length}&nbsp;cards</Text>
      	</View>
      	<View style={{width: 200, marginBottom: 10}}>
	      	<View>
	      		<Button
						  onPress={() => this.props.navigation.navigate('CreateCard', {deckKey: deck.key})}
						  title="添加卡片"
						  color="#1194f6"		  
						  accessibilityLabel="add card"
						/>
	      	</View>
	      	<View style={{marginTop: 10}}>
	      		<Button
						  onPress={() => this.props.navigation.navigate('Quiz', {questions: deck.questions})}
						  title="开始测试"
						  color="#841584"		  
						  accessibilityLabel="quit"
						/> 	    
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
    backgroundColor: '#fff', 
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