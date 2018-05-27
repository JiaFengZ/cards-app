import React, { Component } from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';

class CreateCard extends Component {
  render() {
    return (
      <View style={{alignItems: 'center', padding: 20}}>
      	<Text style={{fontSize: 20, textAlign: 'center'}}>请输入卡片集的名称？</Text>
      	<TextInput style={{width: 200, padding: 10}} placeholder="卡片集名称"></TextInput>
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

export default CreateCard;