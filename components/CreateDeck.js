import React, { Component } from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';

class CreateCard extends Component {
  render() {
    return (
      <View style={{height: '100%', alignItems: 'center', padding: 20, justifyContent: 'space-between'}}>
      	<View>
          <Text style={{fontSize: 20, textAlign: 'center'}}>请输入卡片集的名称？</Text>
          <TextInput style={{width: 200, padding: 10}} placeholder="卡片集名称"></TextInput>  
        </View>        
      	<View style={{width: 120}}>
          <Button
            onPress={() => this.props.navigation.goBack()}
            title="创建卡片集"
            color="#1194f6"     
            accessibilityLabel="submit the title of the deck"
          />
        </View>
      </View>
    )
  }
}

export default CreateCard;