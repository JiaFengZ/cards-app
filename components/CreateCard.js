import React, { Component } from 'react';
import { View, Text, Button, TextInput, Switch, StyleSheet } from 'react-native';

class CreateDecks extends Component {
  constructor(props) {
  	super(props);
  	this.selectAnswer = this.selectAnswer.bind(this);
  }

  state = {
  	answer: false
  }

  selectAnswer(value) {
  	this.setState({
  		answer: value
  	})
  }

  render() {
    return (
      <View style={{alignItems: 'center', padding: 20}}>      	
      	<TextInput style={{width: 200, padding: 10}} placeholder="请输入卡片问题"></TextInput>
      	<Text>答案：</Text>    	
      	<View style={{flexDirection: 'row', padding: 10}}>      		      		
      		<Switch value={this.state.answer} onValueChange={(value) => this.selectAnswer(value)}></Switch>
      		<Text style={{color: '#999'}}>{this.state.answer?'正确':'错误'}</Text>
      	</View>
      	<Button
		  onPress={() => this.props.navigation.goBack()}
		  title="提交"
		  color="#841584"		  
		  accessibilityLabel="submit the title of the deck"
		/>
      </View>
    )
  }
}

export default CreateDecks;