import React, { Component } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

class Card extends Component {
  render() {
    const deck = this.props.navigation.state.params.deck;
    return (
      <View style={{height: '100%', alignItems: 'center', justifyContent: 'space-between', padding: 20}}>      	
      	<View style={style.cards}>
      		<Text style={{fontSize: 20}}>{deck.title}</Text>
      		<Text style={{color: '#666'}}>{deck.questions.length}&nbsp;cards</Text>
      	</View>
      	<View style={{width: 200, marginBottom: 10}}>
	      	<View>
	      		<Button
						  onPress={() => this.props.navigation.navigate('CreateCard')}
						  title="添加卡片"
						  color="#1194f6"		  
						  accessibilityLabel="Learn more about this purple button"
						/>
	      	</View>
	      	<View style={{marginTop: 10}}>
	      		<Button
						  onPress={() => this.props.navigation.navigate('Quiz', {questions: deck.questions})}
						  title="开始测试"
						  color="#841584"		  
						  accessibilityLabel="Learn more about this purple button"
						/> 	    
	      	</View>	      	 		
	    	</View>
      </View>
      
    )
  }
}

export default Card;

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
});