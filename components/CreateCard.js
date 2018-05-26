import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

class CreateDecks extends Component {
  render() {
    return (
      <View style={{alignItems: 'center', padding: 20}}>      	
      	<TextInput style={{width: 200}} placeholder="请输入卡片问题"></TextInput>
      	<TextInput style={{width: 200}} placeholder="请输入卡片答案"></TextInput>
      	<Button
		  onPress={() => this.props.navigation.goBack()}
		  title="submit"
		  color="#841584"		  
		  accessibilityLabel="submit the title of the deck"
		/>
      </View>
    )
  }
}

export default CreateDecks;