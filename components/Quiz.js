import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';

class Quiz extends Component {
  constructor(props) {
  	super(props);
  	this.showAnswer = this.showAnswer.bind(this);
  	this.hideAnswer = this.hideAnswer.bind(this);
  }

  state = {
  	showAnswer: false
  }

  showAnswer() {
  	this.setState({
  		showAnswer: true
  	})
  }

  hideAnswer() {
  	this.setState({
  		showAnswer: false
  	})
  }

  render() {
    return (
      <View style={{alignItems: 'center', padding: 20}}>      	
      	{this.state.showAnswer ? (
      		<Text style={{fontSize: 18}}>错误</Text>
      	):(
      		<Text style={{fontSize: 18, textAlign: 'center'}}>我是一个很重要的问题，请慎重回答，对不对？</Text>      		
      	)}
      	{this.state.showAnswer ? (      		
      		<TouchableOpacity onPress={this.hideAnswer}>
	      		<Text style={{color: '#d4271b'}}>问题</Text>
	    	</TouchableOpacity>
      	):(      		
      		<TouchableOpacity onPress={this.showAnswer}>
	      		<Text style={{color: '#d4271b'}}>答案</Text>
	    	</TouchableOpacity>
      	)}
      	<View style={{width: 100, marginBottom: 10, marginTop: 20}}>
	      	<Button
			  onPress={() => this.props.navigation.goBack()}
			  title="正确"
			  color="#841584"		  
			  accessibilityLabel="submit the title of the deck"
			/>
		</View>
		<View style={{width: 100}}>
			<Button
			  onPress={() => this.props.navigation.goBack()}
			  title="错误"
			  color="#d4271b"
			  accessibilityLabel="submit the title of the deck"
			/>
		</View>
      </View>
    )
  }
}

export default Quiz;