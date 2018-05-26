import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

class Quiz extends Component {
  render() {
    return (
      <View style={{alignItems: 'center', padding: 20}}>      	
      	<Text>我是一个很重要的问题，请慎重回答，对不对？</Text>
      	<Text>我是对的。</Text>
      	<View style={{width: 100, marginBottom: 10}}><Button
		  onPress={() => this.props.navigation.goBack()}
		  title="正确"
		  color="#841584"		  
		  accessibilityLabel="submit the title of the deck"
		/></View>
		<View><Button
		  onPress={() => this.props.navigation.goBack()}
		  title="错误"
		  color="#d4271b"
		  accessibilityLabel="submit the title of the deck"
		/></View>
      </View>
    )
  }
}

export default Quiz;