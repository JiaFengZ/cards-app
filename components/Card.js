import React, { Component } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

class Card extends Component {
  render() {
    const deck = this.props.navigation.state.params.deck;
    return (
      <View style={{height: '100%', alignItems: 'center', justifyContent: 'space-between', padding: 20}}>      	
      	<View style={{marginTop: 20, alignItems: 'center', width: '100%', borderRadius: 5, borderColor: '#555', borderWidth: 2, backgroundColor: '#fff', padding: 10}}>
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