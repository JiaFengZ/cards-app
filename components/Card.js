import React, { Component } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

class Card extends Component {
  render() {
    return (
      <View style={{alignItems: 'center', padding: 20}}>
      	<View style={{width: 100, marginBottom: 10}}>
	      	<Button
			  onPress={() => this.props.navigation.navigate('CreateCard')}
			  title="add card"
			  color="#841584"		  
			  accessibilityLabel="Learn more about this purple button"
			/>  	    
	      </View>
	      <View>      	
	  	    <Button
			  onPress={() => this.props.navigation.navigate('Quiz')}
			  title="start quit"
			  color="#841584"		  
			  accessibilityLabel="Learn more about this purple button"
			/>
	      </View>
      </View>
      
    )
  }
}

export default Card;